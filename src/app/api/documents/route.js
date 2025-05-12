import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET all documents
export async function GET(request) {
    try {
        const documents = await prisma.document.findMany({
            orderBy: {
                title: 'asc',
            },
        });

        return NextResponse.json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            { error: 'Failed to fetch documents' },
            { status: 500 }
        );
    }
}

// CREATE a new document
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        // Check permissions (only admins and employees can create documents)
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EMPLOYEE')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await request.json();

        // Basic validation
        if (!data.code || !data.title || !data.author) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if a document with the same code already exists
        const existingDocument = await prisma.document.findFirst({
            where: { code: data.code },
        });

        if (existingDocument) {
            return NextResponse.json(
                { error: 'A document with this code already exists' },
                { status: 409 }
            );
        }

        // Create the document
        const document = await prisma.document.create({
            data: {
                code: data.code,
                title: data.title,
                author: data.author,
                year: parseInt(data.year) || new Date().getFullYear(),
                description: data.description,
                category: data.category,
                type: data.type,
                classifying: data.classifying,
                imagePath: data.imagePath || null,
            },
        });

        return NextResponse.json(document, { status: 201 });
    } catch (error) {
        console.error('Error creating document:', error);
        return NextResponse.json(
            { error: 'Failed to create document' },
            { status: 500 }
        );
    }
} 