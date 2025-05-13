"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { BookOpen, User, ClipboardList, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AccountPage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState(null);
    const [loans, setLoans] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            if (!session?.user) return;

            try {
                // Fetch active loans - only show the current user's loans
                const loansResponse = await fetch("/api/loans?onlyUserLoans=true");
                if (!loansResponse.ok) throw new Error("Failed to fetch loans");
                const loansData = await loansResponse.json();

                // Fetch reservations - only show the current user's reservations
                const reservationsResponse = await fetch("/api/reservations?onlyUserReservations=true");
                if (!reservationsResponse.ok) throw new Error("Failed to fetch reservations");
                const reservationsData = await reservationsResponse.json();

                setLoans(loansData);
                setReservations(reservationsData);
                setProfile(session.user);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load your account data");
                setIsLoading(false);
            }
        }

        fetchUserData();
    }, [session]);

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(date);
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <User className="mx-auto h-12 w-12 text-primary animate-pulse" />
                    <h2 className="mt-4 text-xl font-medium">Loading Account...</h2>
                </div>
            </div>
        );
    }

    const activeLoans = loans.filter(loan => loan.status === 'Active');
    const pendingReservations = reservations.filter(res => res.status === 'Pending');

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-serif font-bold text-[#0E2A47]">My Account</h1>
                <p className="text-muted-foreground">
                    View your profile, loans, and reservations.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Profile Information */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-[#0E2A47]" />
                            Profile Information
                        </CardTitle>
                        <CardDescription>Your account details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                <p>{profile?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <p>{profile?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Code</p>
                                <p>{profile?.code}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Role</p>
                                <Badge
                                    variant={profile?.role === 'admin' ? 'default' : 'outline'}
                                    className={
                                        profile?.role === 'admin'
                                            ? 'bg-[#133b5c]'
                                            : profile?.role === 'employee'
                                                ? 'border-[#133b5c] text-[#133b5c]'
                                                : 'border-gray-400 text-gray-700'
                                    }
                                >
                                    {profile?.role === 'admin'
                                        ? 'Administrator'
                                        : profile?.role === 'employee'
                                            ? 'Employee'
                                            : 'Member'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Loans */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-[#0E2A47]" />
                            My Loans
                        </CardTitle>
                        <CardDescription>
                            Books and other items you currently have on loan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {activeLoans.length > 0 ? (
                            <div className="space-y-4">
                                {activeLoans.map((loan) => {
                                    const isOverdue = new Date(loan.expectedReturnDate) < new Date();

                                    return (
                                        <div key={loan.id} className="rounded-md border p-3">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">{loan.document.title}</h4>
                                                <Badge
                                                    variant={isOverdue ? "destructive" : "default"}
                                                    className={!isOverdue ? "bg-[#133b5c]" : ""}
                                                >
                                                    {isOverdue ? "Overdue" : "Active"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {loan.document.author} ({loan.document.year})
                                            </p>
                                            <div className="mt-2 text-sm">
                                                <div className="flex justify-between border-t pt-2">
                                                    <span>Borrowed:</span>
                                                    <span>{formatDate(loan.loanDate)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Due by:</span>
                                                    <span className={isOverdue ? "text-red-500 font-medium" : ""}>
                                                        {formatDate(loan.expectedReturnDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex h-40 flex-col items-center justify-center rounded-md border-2 border-dashed p-4 text-center">
                                <BookOpen className="h-8 w-8 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-medium">No Active Loans</h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    You don't have any items currently on loan
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Reservations */}
                <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <CalendarClock className="h-5 w-5 text-[#0E2A47]" />
                            My Reservations
                        </CardTitle>
                        <CardDescription>
                            Items you've reserved for future pickup
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingReservations.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {pendingReservations.map((reservation) => {
                                    const isExpired = new Date(reservation.expiryDate) < new Date();

                                    return (
                                        <div key={reservation.id} className="rounded-md border p-3">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">{reservation.document.title}</h4>
                                                <Badge
                                                    variant={isExpired ? "destructive" : "outline"}
                                                    className={!isExpired ? "border-[#133b5c] text-[#133b5c]" : ""}
                                                >
                                                    {isExpired ? "Expired" : "Pending"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {reservation.document.author} ({reservation.document.year})
                                            </p>
                                            <div className="mt-2 text-sm">
                                                <div className="flex justify-between border-t pt-2">
                                                    <span>Reserved on:</span>
                                                    <span>{formatDate(reservation.reservationDate)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Expires on:</span>
                                                    <span className={isExpired ? "text-red-500 font-medium" : ""}>
                                                        {formatDate(reservation.expiryDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex h-40 flex-col items-center justify-center rounded-md border-2 border-dashed p-4 text-center">
                                <CalendarClock className="h-8 w-8 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-medium">No Active Reservations</h3>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    You don't have any pending reservations
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 