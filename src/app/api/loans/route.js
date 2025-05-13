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

        // Use a transaction to ensure atomicity and prevent race conditions
        const result = await prisma.$transaction(async (tx) => {
            // First, check if there's an active loan for this document
            const existingActiveLoan = await tx.loan.findFirst({
                where: {
                    documentId,
                    status: 'Active',
                },
            });

            if (existingActiveLoan) {
                throw new Error('Document is already on loan');
            }

            // Check if document exists
            const document = await tx.document.findUnique({
                where: { id: documentId },
            });

            if (!document) {
                throw new Error('Document not found');
            }

            // Check if member exists
            const member = await tx.member.findUnique({
                where: { id: targetMemberId },
            });

            if (!member) {
                throw new Error('Member not found');
            }

            // Create a loan with a 30-day loan period
            const loanDate = new Date();
            const expectedReturnDate = new Date(loanDate);
            expectedReturnDate.setDate(expectedReturnDate.getDate() + 30);

            const loan = await tx.loan.create({
                data: {
                    memberId: targetMemberId,
                    documentId,
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

            // If there's a pending reservation for this document by this member, fulfill it
            await tx.reservation.updateMany({
                where: {
                    memberId: targetMemberId,
                    documentId,
                    status: 'Pending',
                },
                data: {
                    status: 'Fulfilled',
                },
            });

            return loan;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error creating loan:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create loan' },
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
        if (loan.status === 'Returned' || loan.actualReturnDate) {
            return NextResponse.json(
                { error: 'Loan is already returned' },
                { status: 400 }
            );
        }

        // Update loan with actual return date and status
        const updatedLoan = await prisma.loan.update({
            where: { id: loanId },
            data: {
                actualReturnDate: new Date(),
                status: 'Returned',
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