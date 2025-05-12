import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarRange } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'My Reservations - LibrarySphere',
    description: 'View and manage your document reservations',
};

export default async function ReservationsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    // Fetch all reservations for the current user
    const reservations = await prisma.reservation.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            document: true,
        },
        orderBy: {
            reservationDate: 'desc',
        },
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-10">
                <h1 className="text-3xl font-bold mb-6">My Reservations</h1>

                {reservations.length === 0 ? (
                    <div className="text-center py-10">
                        <CalendarRange className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h2 className="mt-4 text-xl font-semibold">No reservations</h2>
                        <p className="text-muted-foreground">
                            You don't have any documents reserved at the moment.
                        </p>
                        <div className="mt-6">
                            <Link href="/documents">
                                <Button>Browse Documents</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {reservations.map((reservation) => (
                            <Card key={reservation.id}>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{reservation.document.title}</CardTitle>
                                    <CardDescription>{reservation.document.author}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Document Code:</span>
                                            <span className="font-medium">{reservation.document.code}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Reserved On:</span>
                                            <span>{new Date(reservation.reservationDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Category:</span>
                                            <span>
                                                {reservation.document.category.charAt(0) +
                                                    reservation.document.category.slice(1).toLowerCase()}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between gap-2">
                                    <Link href={`/documents/${reservation.document.id}`} className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            View Document
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                        onClick={() => {
                                            // In a real app, this would be connected to an API endpoint
                                            // to cancel the reservation
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
} 