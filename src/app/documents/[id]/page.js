import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, CalendarCheck, ChevronLeft } from 'lucide-react';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const document = await prisma.document.findUnique({
        where: { id },
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
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const isAuthenticated = !!session;

    const document = await prisma.document.findUnique({
        where: { id },
    });

    if (!document) {
        notFound();
    }

    // Check if the document is available (not all copies are loaned)
    const activeLoansCount = await prisma.loan.count({
        where: {
            documentId: id,
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
                documentId: id,
            },
        });
        hasReserved = !!existingReservation;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 md:px-6">
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
                        </div>

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

                            {/* Availability & Actions */}
                            <div className="bg-muted p-4 rounded-lg mb-8">
                                <div className="flex items-center mb-4">
                                    <div className={`h-3 w-3 rounded-full mr-3 ${isAvailable ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                                    <span className="font-medium">{isAvailable ? 'Available for loan' : 'Currently on loan'}</span>
                                </div>

                                {isAuthenticated && (
                                    <div className="flex flex-wrap gap-4">
                                        {isAvailable && (
                                            <Button className="flex items-center">
                                                <BookOpen className="mr-2 h-4 w-4" />
                                                Borrow
                                            </Button>
                                        )}

                                        {!isAvailable && !hasReserved && (
                                            <Button className="flex items-center">
                                                <CalendarCheck className="mr-2 h-4 w-4" />
                                                Reserve
                                            </Button>
                                        )}

                                        {hasReserved && (
                                            <Button variant="outline" disabled>
                                                Already Reserved
                                            </Button>
                                        )}
                                    </div>
                                )}

                                {!isAuthenticated && (
                                    <div>
                                        <Link href="/login">
                                            <Button variant="outline">
                                                Login to borrow or reserve
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
} 