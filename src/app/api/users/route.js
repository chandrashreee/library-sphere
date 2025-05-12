import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET all users with optional role filter
export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        // Check permissions (only admins can view all users)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get query params
        const url = new URL(request.url);
        const params = await url.searchParams;
        const role = params.get('role');

        // Build query
        const whereClause = role ? { role } : {};

        const users = await prisma.user.findMany({
            where: whereClause,
            orderBy: {
                code: 'asc',
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

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// CREATE a new user
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        // Check permissions (only admins can create users)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await request.json();

        // Basic validation
        if (!data.code || !data.firstName || !data.lastName || !data.email || !data.password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if a user with the same email or code already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { code: data.code }
                ]
            },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    error: existingUser.email === data.email ?
                        'A user with this email already exists' :
                        'A user with this code already exists'
                },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                code: data.code,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone || '',
                role: data.role || 'MEMBER',
                password: hashedPassword,
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

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
} 