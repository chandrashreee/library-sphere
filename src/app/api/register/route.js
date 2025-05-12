import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password, firstName, lastName, phone, address, role } = body;

        // Check if required fields are missing
        if (!email || !password || !firstName || !lastName || !phone || !address) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user with email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'Email already exists' },
                { status: 400 }
            );
        }

        // Generate a unique user code
        const userCount = await prisma.user.count({
            where: {
                role: role || 'MEMBER',
            },
        });

        const prefix = (role === 'ADMIN' || role === 'EMPLOYEE') ? 'EMP' : 'MEM';
        const userCode = `${prefix}${(userCount + 1).toString().padStart(3, '0')}`;

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Create new user
        const user = await prisma.user.create({
            data: {
                code: userCode,
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                address,
                role: role || 'MEMBER',
            },
        });

        // Return the new user without the password
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'An error occurred during registration' },
            { status: 500 }
        );
    }
} 