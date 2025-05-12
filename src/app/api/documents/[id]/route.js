import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET a specific document
export async function GET(req, { params }) {
    const { id } = await params;
    try {
        const document = await prisma.document.findUnique({
            where: { id },
        });

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json(
            { error: 'Failed to fetch document' },
            { status: 500 }
        );
    }
}

// UPDATE a document
export async function PUT(req, { params }) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);

        // Check permissions (only admins and employees can update documents)
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EMPLOYEE')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const data = await req.json();

        // Basic validation
        if (!data.code || !data.title || !data.author) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if document exists
        const existingDocument = await prisma.document.findUnique({
            where: { id },
        });

        if (!existingDocument) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        // Check if code is already in use by another document
        if (data.code !== existingDocument.code) {
            const documentWithSameCode = await prisma.document.findFirst({
                where: {
                    code: data.code,
                    id: { not: id },
                },
            });

            if (documentWithSameCode) {
                return NextResponse.json(
                    { error: 'A document with this code already exists' },
                    { status: 409 }
                );
            }
        }

        // Update the document
        const updatedDocument = await prisma.document.update({
            where: { id },
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

        return NextResponse.json(updatedDocument);
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json(
            { error: 'Failed to update document' },
            { status: 500 }
        );
    }
}

// DELETE a document
export async function DELETE(req, { params }) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);

        // Check permissions (only admins and employees can delete documents)
        if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EMPLOYEE')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if document exists
        const existingDocument = await prisma.document.findUnique({
            where: { id },
        });

        if (!existingDocument) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        // Check if document has associated loans or reservations
        const [activeLoans, reservations] = await Promise.all([
            prisma.loan.findFirst({
                where: {
                    documentId: id,
                    actualReturnDate: null,
                },
            }),
            prisma.reservation.findFirst({
                where: {
                    documentId: id,
                },
            }),
        ]);

        if (activeLoans) {
            return NextResponse.json(
                { error: 'Cannot delete document with active loans' },
                { status: 400 }
            );
        }

        if (reservations) {
            return NextResponse.json(
                { error: 'Cannot delete document with active reservations' },
                { status: 400 }
            );
        }

        // Delete the document
        await prisma.document.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: 'Document deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
            { error: 'Failed to delete document' },
            { status: 500 }
        );
    }
} 