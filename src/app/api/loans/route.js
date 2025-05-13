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
        const onlyUserLoans = url.searchParams.get('onlyUserLoans') === 'true';

        let loans;
        const userRole = session.user.role;

        if (userRole === 'member' || onlyUserLoans) {
            // For members or when explicitly requesting only user loans
            loans = await prisma.loan.findMany({
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
                    loanDate: 'desc',
                },
            });
        } else {
            // For staff, show all loans (when not explicitly requesting only user loans)
            loans = await prisma.loan.findMany({
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
                    loanDate: 'desc',
                },
            });
        }

        return NextResponse.json(loans);
    } catch (error) {
        console.error('Error fetching loans:', error);
        return NextResponse.json(
            { error: 'Failed to fetch loans' },
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

        // If no memberId is provided, use the current user's ID (for member self-checkout)
        const targetMemberId = memberId || session.user.id;

        // Prevent staff from creating loans for themselves
        const isStaff = session.user.role === 'employee' || session.user.role === 'admin';
        if (!memberId && isStaff) {
            return NextResponse.json(
                { error: 'Staff members cannot loan books for themselves' },
                { status: 403 }
            );
        }

        // For staff creating loans for members, we need to check permissions
        if (memberId && session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to create loans for other members' },
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
            },
        });

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        // Check if document is already on loan
        if (document.loans.length > 0) {
            return NextResponse.json(
                { error: 'Document is already on loan' },
                { status: 400 }
            );
        }

        // Create a loan with a 30-day loan period
        const loanDate = new Date();
        const expectedReturnDate = new Date(loanDate);
        expectedReturnDate.setDate(expectedReturnDate.getDate() + 30);

        const loan = await prisma.loan.create({
            data: {
                memberId: targetMemberId,
                documentId,
                loanDate,
                expectedReturnDate,
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

        // If there's a pending reservation for this document by this member, fulfill it
        await prisma.reservation.updateMany({
            where: {
                memberId: targetMemberId,
                documentId,
                status: 'Pending',
            },
            data: {
                status: 'Fulfilled',
            },
        });

        return NextResponse.json(loan);
    } catch (error) {
        console.error('Error creating loan:', error);
        return NextResponse.json(
            { error: 'Failed to create loan' },
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

        // Only staff can return loans
        if (session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to return loans' },
                { status: 403 }
            );
        }

        const { loanId } = await request.json();

        // Check if loan exists
        const loan = await prisma.loan.findUnique({
            where: { id: loanId },
        });

        if (!loan) {
            return NextResponse.json(
                { error: 'Loan not found' },
                { status: 404 }
            );
        }

        // Check if loan is already returned
        if (loan.actualReturnDate) {
            return NextResponse.json(
                { error: 'Loan is already returned' },
                { status: 400 }
            );
        }

        // Update loan with actual return date
        const updatedLoan = await prisma.loan.update({
            where: { id: loanId },
            data: {
                actualReturnDate: new Date(),
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

        return NextResponse.json(updatedLoan);
    } catch (error) {
        console.error('Error returning loan:', error);
        return NextResponse.json(
            { error: 'Failed to return loan' },
            { status: 500 }
        );
    }
} 