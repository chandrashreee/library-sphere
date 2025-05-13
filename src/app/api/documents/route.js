import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const includeReservations = url.searchParams.get('includeReservations') === 'true';

        const documents = await prisma.document.findMany({
            include: {
                loans: {
                    where: {
                        status: 'Active',
                    },
                    select: {
                        id: true,
                        status: true,
                        memberId: true,
                    },
                },
                reservations: includeReservations ? {
                    where: {
                        status: 'Pending',
                    },
                    select: {
                        id: true,
                        status: true,
                        memberId: true,
                        member: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                code: true,
                            }
                        }
                    },
                } : {
                    where: {
                        status: 'Pending',
                    },
                    select: {
                        id: true,
                        status: true,
                    },
                },
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

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        // Check if user is authenticated and has appropriate role
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Only employees and admins can create documents
        if (!['employee', 'admin'].includes(session.user.role)) {
            return NextResponse.json(
                { error: 'You do not have permission to create documents' },
                { status: 403 }
            );
        }

        const data = await request.json();

        // Generate a unique document code (DOC + 4-digit number)
        const documentCount = await prisma.document.count();
        const code = `DOC${String(documentCount + 1).padStart(4, '0')}`;

        // Create the document
        const document = await prisma.document.create({
            data: {
                code,
                title: data.title,
                author: data.author,
                year: parseInt(data.year),
                category: data.category,
                classifying: data.classifying,
                type: data.type,
                description: data.description,
                ISBN: data.ISBN || null,
                imagePath: data.imagePath || null,
            },
        });

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error creating document:', error);
        return NextResponse.json(
            { error: 'Failed to create document' },
            { status: 500 }
        );
    }
}

export async function PATCH(request) {
    try {
        const session = await getServerSession(authOptions);

        // Check if user is authenticated and has appropriate role
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Only employees and admins can update documents
        if (!['employee', 'admin'].includes(session.user.role)) {
            return NextResponse.json(
                { error: 'You do not have permission to update documents' },
                { status: 403 }
            );
        }

        const data = await request.json();
        const { id, ...updateData } = data;

        // Check if document exists
        const document = await prisma.document.findUnique({
            where: { id },
        });

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        // Parse year as integer if provided
        if (updateData.year) {
            updateData.year = parseInt(updateData.year);
        }

        // Update document
        const updatedDocument = await prisma.document.update({
            where: { id },
            data: updateData,
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

export async function DELETE(request) {
    try {
        const session = await getServerSession(authOptions);

        // Check if user is authenticated and has appropriate role
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Only employees and admins can delete documents
        if (!['employee', 'admin'].includes(session.user.role)) {
            return NextResponse.json(
                { error: 'You do not have permission to delete documents' },
                { status: 403 }
            );
        }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Document ID is required' },
                { status: 400 }
            );
        }

        // Check if document exists
        const document = await prisma.document.findUnique({
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

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 }
            );
        }

        // Check if document has active loans or reservations
        if (document.loans.length > 0) {
            return NextResponse.json(
                { error: 'Document has active loans and cannot be deleted' },
                { status: 400 }
            );
        }

        if (document.reservations.length > 0) {
            return NextResponse.json(
                { error: 'Document has pending reservations and cannot be deleted' },
                { status: 400 }
            );
        }

        // Delete document
        await prisma.document.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
            { error: 'Failed to delete document' },
            { status: 500 }
        );
    }
} 