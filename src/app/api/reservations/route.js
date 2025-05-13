import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        let reservations;
        const userRole = session.user.role;

        if (userRole === 'member') {
            // For members, only show their own reservations
            reservations = await prisma.reservation.findMany({
                where: {
                    member: {
                        id: session.user.id
                    }
                },
                include: {
                    document: true,
                    member: {
                        select: {
                            id: true,
                            code: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    reservationDate: 'desc',
                },
            });
        } else {
            // For staff, show all reservations
            reservations = await prisma.reservation.findMany({
                include: {
                    document: true,
                    member: {
                        select: {
                            id: true,
                            code: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    reservationDate: 'desc',
                },
            });
        }

        return NextResponse.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reservations' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { documentId, memberId } = await request.json();

        // If no memberId is provided, use the current user's ID (for member self-reservation)
        const targetMemberId = memberId || session.user.id;

        // For staff creating reservations for members, we need to check permissions
        if (memberId && session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to create reservations for other members' },
                { status: 403 }
            );
        }

        // Check if document exists
        const document = await prisma.document.findUnique({
            where: { id: documentId },
            include: {
                loans: {
                    where: {
                        actualReturnDate: null,
                    },
                },
                reservations: {
                    where: {
                        memberId: targetMemberId,
                        status: 'Pending',
                    },
                },
            },
        });

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        // Check if the document is available (if it is, loan it directly instead of reservation)
        if (document.loans.length === 0) {
            return NextResponse.json(
                { error: 'Document is available. You can loan it directly.' },
                { status: 400 }
            );
        }

        // Check if the member already has a pending reservation for this document
        if (document.reservations.length > 0) {
            return NextResponse.json(
                { error: 'You already have a pending reservation for this document' },
                { status: 400 }
            );
        }

        // Create a reservation with a 14-day expiry period
        const reservationDate = new Date();
        const expiryDate = new Date(reservationDate);
        expiryDate.setDate(expiryDate.getDate() + 14);

        const reservation = await prisma.reservation.create({
            data: {
                memberId: targetMemberId,
                documentId,
                reservationDate,
                expiryDate,
                status: 'Pending',
            },
            include: {
                document: true,
                member: {
                    select: {
                        code: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });

        return NextResponse.json(reservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        return NextResponse.json(
            { error: 'Failed to create reservation' },
            { status: 500 }
        );
    }
}

export async function PATCH(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Only staff can update reservations
        if (session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to update reservations' },
                { status: 403 }
            );
        }

        const { reservationId, status } = await request.json();

        // Check if reservation exists
        const reservation = await prisma.reservation.findUnique({
            where: { id: reservationId },
        });

        if (!reservation) {
            return NextResponse.json(
                { error: 'Reservation not found' },
                { status: 404 }
            );
        }

        // Update reservation status
        const updatedReservation = await prisma.reservation.update({
            where: { id: reservationId },
            data: {
                status,
            },
            include: {
                document: true,
                member: {
                    select: {
                        code: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedReservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        return NextResponse.json(
            { error: 'Failed to update reservation' },
            { status: 500 }
        );
    }
} 