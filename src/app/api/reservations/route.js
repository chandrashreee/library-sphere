import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get the URL to parse query parameters
        const url = new URL(request.url);
        const onlyUserReservations = url.searchParams.get('onlyUserReservations') === 'true';

        let reservations;
        const userRole = session.user.role;

        if (userRole === 'member' || onlyUserReservations) {
            // For members or when explicitly requesting only user reservations
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
            // For staff, show all reservations (when not explicitly requesting only user reservations)
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

        // Use a transaction to ensure atomicity
        const result = await prisma.$transaction(async (tx) => {
            // Check if document exists with detailed loan information
            const document = await tx.document.findUnique({
                where: { id: documentId },
                include: {
                    loans: {
                        where: {
                            status: 'Active',
                        },
                        select: {
                            id: true,
                            memberId: true,
                            status: true
                        }
                    },
                    reservations: {
                        where: {
                            status: 'Pending',
                        },
                    },
                },
            });

            if (!document) {
                throw new Error('Document not found');
            }

            // Debug log for loan information
            console.log(`Document ${documentId} has ${document.loans.length} active loans`);
            if (document.loans.length > 0) {
                console.log(`Loan details:`, JSON.stringify(document.loans));
            }

            // Check if the document is available (if it is, loan it directly instead of reservation)
            if (document.loans.length === 0) {
                throw new Error('Document is available. You can loan it directly.');
            }

            // Check if the member already has an active loan for this document
            const activeUserLoan = document.loans.find(loan => loan.memberId === targetMemberId);
            if (activeUserLoan) {
                throw new Error('You already have this document on loan');
            }

            // Check if there's already any pending reservation for this document (from any member)
            if (document.reservations.length > 0) {
                throw new Error('This document is already reserved by another member');
            }

            // Create a reservation with a 14-day expiry period
            const reservationDate = new Date();
            const expiryDate = new Date(reservationDate);
            expiryDate.setDate(expiryDate.getDate() + 14);

            const reservation = await tx.reservation.create({
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

            return reservation;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error creating reservation:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create reservation' },
            { status: 400 }
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

// Add a new endpoint to fulfill a reservation (for staff only)
export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Only staff can fulfill reservations
        if (session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to fulfill reservations' },
                { status: 403 }
            );
        }

        const { reservationId } = await request.json();

        // Use a transaction to ensure atomicity
        const result = await prisma.$transaction(async (tx) => {
            // Get the reservation with document details
            const reservation = await tx.reservation.findUnique({
                where: { id: reservationId },
                include: {
                    document: true,
                    member: true,
                },
            });

            if (!reservation) {
                throw new Error('Reservation not found');
            }

            if (reservation.status !== 'Pending') {
                throw new Error('Only pending reservations can be fulfilled');
            }

            // Check if the document is available (not on loan)
            const existingActiveLoan = await tx.loan.findFirst({
                where: {
                    documentId: reservation.documentId,
                    status: 'Active',
                },
            });

            if (existingActiveLoan) {
                throw new Error('Document is currently on loan and cannot be fulfilled');
            }

            // Create a loan with a 30-day loan period
            const loanDate = new Date();
            const expectedReturnDate = new Date(loanDate);
            expectedReturnDate.setDate(expectedReturnDate.getDate() + 30);

            const loan = await tx.loan.create({
                data: {
                    memberId: reservation.memberId,
                    documentId: reservation.documentId,
                    loanDate,
                    expectedReturnDate,
                    status: 'Active',
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

            // Update the reservation status to Fulfilled
            const updatedReservation = await tx.reservation.update({
                where: { id: reservationId },
                data: {
                    status: 'Fulfilled',
                },
            });

            return {
                loan,
                reservation: updatedReservation,
                message: 'Reservation fulfilled successfully'
            };
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fulfilling reservation:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fulfill reservation' },
            { status: 400 }
        );
    }
} 