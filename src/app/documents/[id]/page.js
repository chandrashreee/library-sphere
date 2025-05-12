import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, CalendarCheck, ChevronLeft } from 'lucide-react';

export async function generateMetadata({ params }) {
    const document = await prisma.document.findUnique({
        where: { id: params.id },
    });

    if (!document) {
        return {
            title: 'Document Not Found - LibrarySphere',
        };
    }

    return {
        title: `${document.title} - LibrarySphere`,
        description: document.description,
    };
}

export default async function DocumentDetailPage({ params }) {
    const session = await getServerSession(authOptions);
    const isAuthenticated = !!session;

    const document = await prisma.document.findUnique({
        where: { id: params.id },
    });

    if (!document) {
        notFound();
    }

    // Check if the document is available (not all copies are loaned)
    const activeLoansCount = await prisma.loan.count({
        where: {
            documentId: document.id,
            actualReturnDate: null,
        },
    });

    // Assuming there's only one copy per document for simplicity
    const isAvailable = activeLoansCount === 0;

    // Check if the user has already reserved this document
    let hasReserved = false;
    if (isAuthenticated) {
        const existingReservation = await prisma.reservation.findFirst({
            where: {
                userId: session.user.id,
                documentId: document.id,
            },
        });
        hasReserved = !!existingReservation;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-10">
                <div className="mb-6">
                    <Link href="/documents" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        <span>Back to Documents</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {/* Document cover/image */}
                    <div className="order-1 md:order-1">
                        <div className="bg-muted rounded-lg aspect-[2/3] flex items-center justify-center overflow-hidden">
                            {document.imagePath ? (
                                <img
                                    src={document.imagePath}
                                    alt={document.title}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <BookOpen className="h-24 w-24 text-muted-foreground" />
                            )}
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-2">Status</h3>
                                <div className="flex items-center">
                                    <div className={`h-3 w-3 rounded-full mr-2 ${isAvailable ? 'bg-green-500' : 'bg-amber-500'}`} />
                                    <span>{isAvailable ? 'Available' : 'Currently Loaned'}</span>
                                </div>
                            </div>

                            {isAuthenticated && (
                                <div className="space-y-3">
                                    {isAvailable ? (
                                        <Button className="w-full" size="lg">
                                            Borrow This Document
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-full"
                                            size="lg"
                                            disabled={hasReserved}
                                        >
                                            {hasReserved ? 'Already Reserved' : 'Reserve This Document'}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Document details */}
                    <div className="md:col-span-2 order-2 md:order-2">
                        <h1 className="text-3xl font-bold mb-2">{document.title}</h1>
                        <p className="text-xl text-muted-foreground mb-6">by {document.author} ({document.year})</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
                                {document.category.charAt(0) + document.category.slice(1).toLowerCase()}
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
                                {document.type.charAt(0) + document.type.slice(1).toLowerCase()}
                            </span>
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
                                {document.classifying.charAt(0) + document.classifying.slice(1).toLowerCase()}
                            </span>
                        </div>

                        <div className="prose max-w-none dark:prose-invert mb-10">
                            <h2 className="text-xl font-semibold mb-4">Description</h2>
                            <p>{document.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-5">
                                <h3 className="font-medium mb-3 flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
                                    Document Details
                                </h3>
                                <dl className="space-y-2">
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Code:</dt>
                                        <dd className="font-medium">{document.code}</dd>
                                    </div>
                                    {document.ISBN && (
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">ISBN:</dt>
                                            <dd className="font-medium">{document.ISBN}</dd>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Publication Year:</dt>
                                        <dd className="font-medium">{document.year}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="border rounded-lg p-5">
                                <h3 className="font-medium mb-3 flex items-center">
                                    <CalendarCheck className="h-5 w-5 mr-2 text-muted-foreground" />
                                    Loan Information
                                </h3>
                                <dl className="space-y-2">
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Status:</dt>
                                        <dd className="font-medium">{isAvailable ? 'Available' : 'Currently Loaned'}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Loan Period:</dt>
                                        <dd className="font-medium">14 days</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Late Fees:</dt>
                                        <dd className="font-medium">$0.50 per day</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 