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

        // Only admins can view employees
        if (session.user.role !== 'admin') {
            return NextResponse.json(
                { error: 'You do not have permission to view employees' },
                { status: 403 }
            );
        }

        const employees = await prisma.employee.findMany({
            select: {
                id: true,
                code: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                city: true,
                province: true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                lastName: 'asc',
            },
        });

        return NextResponse.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        return NextResponse.json(
            { error: 'Failed to fetch employees' },
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

        // Only admins can create employees
        if (session.user.role !== 'admin') {
            return NextResponse.json(
                { error: 'You do not have permission to create employees' },
                { status: 403 }
            );
        }

        const data = await request.json();

        // Check if email already exists
        const existingEmployee = await prisma.employee.findUnique({
            where: { email: data.email },
        });

        if (existingEmployee) {
            return NextResponse.json(
                { error: 'An employee with this email already exists' },
                { status: 400 }
            );
        }

        // Generate a unique employee code (EMP + 3-digit number)
        const employeeCount = await prisma.employee.count();
        const code = `EMP${String(employeeCount + 1).padStart(3, '0')}`;

        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create the employee
        const employee = await prisma.employee.create({
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
                role: data.role || 'employee', // Default to employee if not specified
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
                role: true,
            },
        });

        return NextResponse.json(employee);
    } catch (error) {
        console.error('Error creating employee:', error);
        return NextResponse.json(
            { error: 'Failed to create employee' },
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

        // Only admins can update employees
        if (session.user.role !== 'admin') {
            return NextResponse.json(
                { error: 'You do not have permission to update employees' },
                { status: 403 }
            );
        }

        const data = await request.json();
        const { id, ...updateData } = data;

        // Check if employee exists
        const employee = await prisma.employee.findUnique({
            where: { id },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        // Hash password if provided
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Update employee
        const updatedEmployee = await prisma.employee.update({
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
                role: true,
            },
        });

        return NextResponse.json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee:', error);
        return NextResponse.json(
            { error: 'Failed to update employee' },
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

        // Only admins can delete employees
        if (session.user.role !== 'admin') {
            return NextResponse.json(
                { error: 'You do not have permission to delete employees' },
                { status: 403 }
            );
        }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Employee ID is required' },
                { status: 400 }
            );
        }

        // Check if employee exists
        const employee = await prisma.employee.findUnique({
            where: { id },
        });

        if (!employee) {
            return NextResponse.json(
                { error: 'Employee not found' },
                { status: 404 }
            );
        }

        // Cannot delete yourself
        if (employee.id === session.user.id) {
            return NextResponse.json(
                { error: 'You cannot delete your own account' },
                { status: 400 }
            );
        }

        // Delete employee
        await prisma.employee.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return NextResponse.json(
            { error: 'Failed to delete employee' },
            { status: 500 }
        );
    }
} 