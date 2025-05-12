import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistance } from '@/lib/utils';

export const metadata = {
    title: 'Dashboard - LibrarySphere',
    description: 'Your LibrarySphere dashboard',
};

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    // Fetch user data including active loans and reservations
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            loans: {
                where: { actualReturnDate: null },
                include: { document: true },
                orderBy: { expectedReturnDate: 'asc' },
            },
            reservations: {
                include: { document: true },
                orderBy: { reservationDate: 'desc' },
            },
        },
    });

    if (!user) {
        redirect('/login');
    }

    const activeLoansCount = user.loans.length;
    const reservationsCount = user.reservations.length;

    // Get overdue loans
    const currentDate = new Date();
    const overdueLoans = user.loans.filter(loan =>
        loan.expectedReturnDate < currentDate && !loan.actualReturnDate
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-10">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                <div className="grid gap-6 md:grid-cols-3 mb-10">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Active Loans</CardTitle>
                            <CardDescription>Currently borrowed documents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{activeLoansCount}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Reservations</CardTitle>
                            <CardDescription>Documents on your waitlist</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{reservationsCount}</p>
                        </CardContent>
                    </Card>

                    <Card className={overdueLoans.length > 0 ? "border-red-200 bg-red-50" : ""}>
                        <CardHeader className="pb-2">
                            <CardTitle className={overdueLoans.length > 0 ? "text-red-600" : ""}>
                                Overdue Items
                            </CardTitle>
                            <CardDescription>
                                Items past their return date
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className={`text-4xl font-bold ${overdueLoans.length > 0 ? "text-red-600" : ""}`}>
                                {overdueLoans.length}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {activeLoansCount > 0 && (
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {user.loans.map((loan) => (
                                <Card key={loan.id} className={
                                    loan.expectedReturnDate < currentDate
                                        ? "border-red-200 bg-red-50"
                                        : ""
                                }>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">{loan.document.title}</CardTitle>
                                        <CardDescription>{loan.document.author}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Borrowed:</span>
                                                <span>{new Date(loan.loanDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Due:</span>
                                                <span className={loan.expectedReturnDate < currentDate ? "text-red-600 font-medium" : ""}>
                                                    {new Date(loan.expectedReturnDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {loan.expectedReturnDate < currentDate && (
                                                <div className="flex justify-between">
                                                    <span className="text-red-600">Overdue by:</span>
                                                    <span className="text-red-600 font-medium">
                                                        {formatDistance(loan.expectedReturnDate, currentDate)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {reservationsCount > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Your Reservations</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {user.reservations.map((reservation) => (
                                <Card key={reservation.id}>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">{reservation.document.title}</CardTitle>
                                        <CardDescription>{reservation.document.author}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Reserved on:</span>
                                                <span>{new Date(reservation.reservationDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
} 