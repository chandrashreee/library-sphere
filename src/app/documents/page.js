import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookIcon, BookOpenIcon } from 'lucide-react';
import DocumentFilters from '@/components/ui/DocumentFilters';

export const metadata = {
    title: 'Documents - LibrarySphere',
    description: 'Browse and search documents',
};

// Example filter function to get all document categories
async function getDocumentCategories() {
    return [
        'NOVEL',
        'COMICS',
        'GAMES',
        'EDUCATIONAL',
        'REFERENCE',
        'OTHER'
    ];
}

// Example filter function to get all document types
async function getDocumentTypes() {
    return [
        'COMEDY',
        'DRAMA',
        'HORROR',
        'SCIFI',
        'FANTASY',
        'ROMANCE',
        'THRILLER',
        'BIOGRAPHY',
        'NONFICTION',
        'OTHER'
    ];
}

// Get document classifying age ranges
async function getDocumentClassifying() {
    return ['KIDS', 'TEENS', 'ADULTS'];
}

export default async function DocumentsPage({ searchParams }) {
    const session = await getServerSession(authOptions);
    const isAuthenticated = !!session;

    // Get filter values from search params
    const params = await searchParams;
    const category = params.category ?? undefined;
    const type = params.type ?? undefined;
    const classifying = params.classifying ?? undefined;
    const query = params.q?.toLowerCase() ?? '';

    // Fetch all documents with filters
    const documents = await prisma.document.findMany({
        where: {
            ...(category && { category }),
            ...(type && { type }),
            ...(classifying && { classifying }),
            ...(query && {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { author: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            }),
        },
        orderBy: {
            title: 'asc',
        },
    });

    // Get filter options for the client component
    const categories = await getDocumentCategories();
    const types = await getDocumentTypes();
    const classifyings = await getDocumentClassifying();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Documents</h1>
                            <p className="text-muted-foreground">Browse our collection of documents</p>
                        </div>
                    </div>

                    {/* Use the client-side filter component */}
                    <div className="mb-8">
                        <DocumentFilters
                            categories={categories}
                            types={types}
                            classifyings={classifyings}
                        />
                    </div>

                    {/* Document grid */}
                    {documents.length === 0 ? (
                        <div className="text-center py-10">
                            <BookIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h2 className="mt-4 text-xl font-semibold">No documents found</h2>
                            <p className="text-muted-foreground">
                                Try changing your search criteria or check back later for new additions.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {documents.map((document) => (
                                <Card key={document.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle>{document.title}</CardTitle>
                                                <CardDescription>{document.author} ({document.year})</CardDescription>
                                            </div>
                                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                                                <BookOpenIcon className="h-4 w-4 text-primary" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
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
                                        <p className="text-sm text-muted-foreground line-clamp-3">
                                            {document.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Link href={`/documents/${document.id}`}>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                        {isAuthenticated && (
                                            <Button size="sm">
                                                Reserve
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
} 