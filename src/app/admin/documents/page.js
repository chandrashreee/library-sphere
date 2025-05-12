import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { BookIcon, BookPlus, PencilIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Manage Documents - LibrarySphere',
    description: 'Admin dashboard for managing library documents',
};

export default async function ManageDocumentsPage() {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has appropriate role
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EMPLOYEE')) {
        redirect('/login');
    }

    // Fetch all documents
    const documents = await prisma.document.findMany({
        orderBy: {
            code: 'asc',
        },
        include: {
            _count: {
                select: {
                    loans: {
                        where: {
                            actualReturnDate: null,
                        },
                    },
                    reservations: true,
                },
            },
        },
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Manage Documents</h1>
                            <p className="text-muted-foreground">
                                View and manage library documents
                            </p>
                        </div>

                        <Button>
                            <BookPlus className="h-4 w-4 mr-2" />
                            Add New Document
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Library Collection</CardTitle>
                            <CardDescription>
                                A list of all documents in the library system.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {documents.length === 0 ? (
                                <div className="text-center py-10">
                                    <BookIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h2 className="mt-4 text-xl font-semibold">No documents found</h2>
                                    <p className="text-muted-foreground">
                                        There are no documents in the system yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Code</TableHead>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Author</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Age Rating</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="w-[100px] text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {documents.map((document) => {
                                                const activeLoans = document._count.loans;
                                                const reservations = document._count.reservations;
                                                const isAvailable = activeLoans === 0;

                                                return (
                                                    <TableRow key={document.id}>
                                                        <TableCell className="font-medium">{document.code}</TableCell>
                                                        <TableCell>{document.title}</TableCell>
                                                        <TableCell>{document.author}</TableCell>
                                                        <TableCell>
                                                            {document.category.charAt(0) + document.category.slice(1).toLowerCase()}
                                                        </TableCell>
                                                        <TableCell>
                                                            {document.classifying.charAt(0) + document.classifying.slice(1).toLowerCase()}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center">
                                                                <div className={`h-2 w-2 rounded-full mr-2 ${isAvailable ? 'bg-green-500' : 'bg-amber-500'
                                                                    }`} />
                                                                <span>{isAvailable ? 'Available' : `Loaned (${activeLoans})`}</span>
                                                                {reservations > 0 && (
                                                                    <span className="ml-2 text-xs text-muted-foreground">
                                                                        {reservations} reservation{reservations > 1 ? 's' : ''}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Link href={`/documents/${document.id}`}>
                                                                    <Button variant="ghost" size="sm">
                                                                        <BookIcon className="h-4 w-4" />
                                                                        <span className="sr-only">View</span>
                                                                    </Button>
                                                                </Link>
                                                                <Button variant="ghost" size="sm">
                                                                    <PencilIcon className="h-4 w-4" />
                                                                    <span className="sr-only">Edit</span>
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                                                    <Trash2 className="h-4 w-4" />
                                                                    <span className="sr-only">Delete</span>
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
} 