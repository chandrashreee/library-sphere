import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentForm from '@/components/forms/DocumentForm';

export const metadata = {
    title: 'Edit Document - LibrarySphere',
    description: 'Edit an existing document in the library system',
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

export default async function EditDocumentPage({ params }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has appropriate role
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EMPLOYEE')) {
        redirect('/login');
    }

    // Fetch the document
    const document = await prisma.document.findUnique({
        where: { id },
    });

    // If document not found, redirect to 404
    if (!document) {
        notFound();
    }

    // Get filter options for the form
    const categories = await getDocumentCategories();
    const types = await getDocumentTypes();
    const classifyings = await getDocumentClassifying();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Edit Document</h1>
                        <p className="text-muted-foreground">
                            Update document information in the library system
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Document Information</CardTitle>
                            <CardDescription>
                                Edit the details for {document.title}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DocumentForm
                                document={document}
                                categories={categories}
                                types={types}
                                classifyings={classifyings}
                                isEdit={true}
                            />
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
} 