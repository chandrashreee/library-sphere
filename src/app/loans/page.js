import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatDistance } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookCheck, BookX, CalendarClock } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'My Loans - LibrarySphere',
    description: 'View and manage your borrowed documents',
};

export default async function LoansPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    // Fetch active and past loans for the current user
    const [activeLoans, pastLoans] = await Promise.all([
        prisma.loan.findMany({
            where: {
                userId: session.user.id,
                actualReturnDate: null,
            },
            include: {
                document: true,
            },
            orderBy: { expectedReturnDate: 'asc' },
        }),
        prisma.loan.findMany({
            where: {
                userId: session.user.id,
                actualReturnDate: { not: null },
            },
            include: {
                document: true,
            },
            orderBy: { actualReturnDate: 'desc' },
            take: 10, // Limit to recent 10 loans
        }),
    ]);

    const currentDate = new Date();
    const overdueLoans = activeLoans.filter((loan) => new Date(loan.expectedReturnDate) < currentDate);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl font-bold mb-6">My Loans</h1>

                    <Tabs defaultValue="active">
                        <TabsList className="mb-6">
                            <TabsTrigger value="active">
                                Active Loans ({activeLoans.length})
                            </TabsTrigger>
                            <TabsTrigger value="history">
                                Loan History ({pastLoans.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="active">
                            {activeLoans.length === 0 ? (
                                <div className="text-center py-10">
                                    <BookCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h2 className="mt-4 text-xl font-semibold">No active loans</h2>
                                    <p className="text-muted-foreground">
                                        You don't have any documents currently on loan.
                                    </p>
                                    <div className="mt-6">
                                        <Link href="/documents">
                                            <Button>Browse Documents</Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {activeLoans.map((loan) => {
                                        const isOverdue = new Date(loan.expectedReturnDate) < currentDate;

                                        return (
                                            <Card
                                                key={loan.id}
                                                className={isOverdue ? "border-red-200 bg-red-50" : ""}
                                            >
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <CardTitle className="line-clamp-1">{loan.document.title}</CardTitle>
                                                            <CardDescription>{loan.document.author}</CardDescription>
                                                        </div>
                                                        {isOverdue && (
                                                            <div className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                                                                Overdue
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Document Code:</span>
                                                            <span className="font-medium">{loan.document.code}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Borrowed On:</span>
                                                            <span>{new Date(loan.loanDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Due Date:</span>
                                                            <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                                                                {new Date(loan.expectedReturnDate).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        {isOverdue && (
                                                            <div className="flex justify-between">
                                                                <span className="text-red-600">Overdue by:</span>
                                                                <span className="text-red-600 font-medium">
                                                                    {formatDistance(loan.expectedReturnDate, currentDate)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </CardContent>
                                                <CardFooter>
                                                    <Link href={`/documents/${loan.document.id}`} className="w-full">
                                                        <Button variant="outline" className="w-full">
                                                            View Document
                                                        </Button>
                                                    </Link>
                                                </CardFooter>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="history">
                            {pastLoans.length === 0 ? (
                                <div className="text-center py-10">
                                    <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h2 className="mt-4 text-xl font-semibold">No loan history</h2>
                                    <p className="text-muted-foreground">
                                        You haven't borrowed any documents yet.
                                    </p>
                                    <div className="mt-6">
                                        <Link href="/documents">
                                            <Button>Browse Documents</Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {pastLoans.map((loan) => (
                                        <Card key={loan.id}>
                                            <CardHeader>
                                                <CardTitle className="line-clamp-1">{loan.document.title}</CardTitle>
                                                <CardDescription>{loan.document.author}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Document Code:</span>
                                                        <span className="font-medium">{loan.document.code}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Borrowed On:</span>
                                                        <span>{new Date(loan.loanDate).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-muted-foreground">Returned On:</span>
                                                        <span>{new Date(loan.actualReturnDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Link href={`/documents/${loan.document.id}`} className="w-full">
                                                    <Button variant="outline" className="w-full">
                                                        View Document
                                                    </Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
}