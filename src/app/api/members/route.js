import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Only staff can view members
        if (session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to view members' },
                { status: 403 }
            );
        }

        const members = await prisma.member.findMany({
            select: {
                id: true,
                code: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                city: true,
                province: true,
                createdAt: true,
                loans: {
                    where: {
                        actualReturnDate: null
                    },
                    select: {
                        id: true,
                    }
                },
                reservations: {
                    where: {
                        status: 'Pending'
                    },
                    select: {
                        id: true,
                    }
                }
            },
            orderBy: {
                lastName: 'asc',
            },
        });

        return NextResponse.json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json(
            { error: 'Failed to fetch members' },
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

        // Only staff can create members
        if (session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to create members' },
                { status: 403 }
            );
        }

        const data = await request.json();

        // Check if email already exists
        const existingMember = await prisma.member.findUnique({
            where: { email: data.email },
        });

        if (existingMember) {
            return NextResponse.json(
                { error: 'A member with this email already exists' },
                { status: 400 }
            );
        }

        // Generate a unique member code (MEM + 3-digit number)
        const memberCount = await prisma.member.count();
        const code = `MEM${String(memberCount + 1).padStart(3, '0')}`;

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create the member
        const member = await prisma.member.create({
            data: {
                code,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                street: data.street,
                city: data.city,
                province: data.province,
            },
            select: {
                id: true,
                code: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                city: true,
                province: true,
            },
        });

        return NextResponse.json(member);
    } catch (error) {
        console.error('Error creating member:', error);
        return NextResponse.json(
            { error: 'Failed to create member' },
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

        // Only staff can update members
        if (session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to update members' },
                { status: 403 }
            );
        }

        const data = await request.json();
        const { id, ...updateData } = data;

        // Check if member exists
        const member = await prisma.member.findUnique({
            where: { id },
        });

        if (!member) {
            return NextResponse.json(
                { error: 'Member not found' },
                { status: 404 }
            );
        }

        // Hash password if provided
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Update member
        const updatedMember = await prisma.member.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                code: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                street: true,
                city: true,
                province: true,
            },
        });

        return NextResponse.json(updatedMember);
    } catch (error) {
        console.error('Error updating member:', error);
        return NextResponse.json(
            { error: 'Failed to update member' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Only staff can delete members
        if (session.user.role === 'member') {
            return NextResponse.json(
                { error: 'You do not have permission to delete members' },
                { status: 403 }
            );
        }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Member ID is required' },
                { status: 400 }
            );
        }

        // Check if member exists
        const member = await prisma.member.findUnique({
            where: { id },
            include: {
                loans: {
                    where: {
                        actualReturnDate: null,
                    },
                },
                reservations: {
                    where: {
                        status: 'Pending',
                    },
                },
            },
        });

        if (!member) {
            return NextResponse.json(
                { error: 'Member not found' },
                { status: 404 }
            );
        }

        // Check if member has active loans or reservations
        if (member.loans.length > 0 || member.reservations.length > 0) {
            return NextResponse.json(
                { error: 'Cannot delete member with active loans or reservations' },
                { status: 400 }
            );
        }

        // Delete member
        await prisma.member.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting member:', error);
        return NextResponse.json(
            { error: 'Failed to delete member' },
            { status: 500 }
        );
    }
} 