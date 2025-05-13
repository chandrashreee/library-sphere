import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const documents = await prisma.document.findMany({
            include: {
                loans: {
                    where: {
                        actualReturnDate: null,
                    },
                    select: {
                        id: true,
                        actualReturnDate: true,
                    },
                },
                reservations: {
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