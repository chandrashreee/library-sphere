import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET a specific user
export async function GET(req, { params }) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);

        // Check permissions (only admins or the user themselves can view user details)
        if (!session || (session.user.id !== id && session.user.role !== 'ADMIN')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                code: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

// UPDATE a user
export async function PUT(req, { params }) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);

        // Check permissions (only admins can update users)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await req.json();

        // Basic validation
        if (!data.code || !data.firstName || !data.lastName || !data.email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id },
            include: { address: true },
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if email or code is already in use by another user
        if (data.email !== existingUser.email || data.code !== existingUser.code) {
            const duplicateUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: data.email, id: { not: id } },
                        { code: data.code, id: { not: id } }
                    ]
                },
            });

            if (duplicateUser) {
                return NextResponse.json(
                    {
                        error: duplicateUser.email === data.email ?
                            'A user with this email already exists' :
                            'A user with this code already exists'
                    },
                    { status: 409 }
                );
            }
        }

        // Update the user and their address
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                code: data.code,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone || '',
                role: data.role,
                address: {
                    city: data.address?.city || '',
                    street: data.address?.street || '',
                    number: data.address?.number || '',
                    province: data.address?.province || ''
                }
            },
            select: {
                id: true,
                code: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                address: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

// DELETE a user
export async function DELETE(req, { params }) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);

        // Check permissions (only admins can delete users)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Check if user has active loans or reservations
        const [activeLoans, reservations] = await Promise.all([
            prisma.loan.findFirst({
                where: {
                    userId: id,
                    actualReturnDate: null,
                },
            }),
            prisma.reservation.findFirst({
                where: {
                    userId: id,
                },
            }),
        ]);

        if (activeLoans) {
            return NextResponse.json(
                { error: 'Cannot delete user with active loans' },
                { status: 400 }
            );
        }

        if (reservations) {
            return NextResponse.json(
                { error: 'Cannot delete user with active reservations' },
                { status: 400 }
            );
        }

        // Delete user
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: 'User deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
} 