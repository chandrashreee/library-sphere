import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentForm from '@/components/forms/DocumentForm';

export const metadata = {
    title: 'Add New Document - LibrarySphere',
    description: 'Add a new document to the library system',
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

export default async function NewDocumentPage() {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has appropriate role
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EMPLOYEE')) {
        redirect('/login');
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
                        <h1 className="text-3xl font-bold">Add New Document</h1>
                        <p className="text-muted-foreground">
                            Create a new document in the library system
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Document Information</CardTitle>
                            <CardDescription>
                                Fill in the details for the new document
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DocumentForm
                                categories={categories}
                                types={types}
                                classifyings={classifyings}
                            />
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
} 