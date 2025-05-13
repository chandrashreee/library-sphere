"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Search, CalendarClock, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ReservationsPage() {
    const { data: session } = useSession();
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchReservations() {
            try {
                const response = await fetch("/api/reservations");
                if (!response.ok) {
                    throw new Error("Failed to fetch reservations");
                }
                const data = await response.json();
                setReservations(data);
                setFilteredReservations(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching reservations:", error);
                toast.error("Failed to load reservations");
                setIsLoading(false);
            }
        }

        fetchReservations();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const results = reservations.filter(
                (reservation) =>
                    reservation.member.firstName.toLowerCase().includes(query) ||
                    reservation.member.lastName.toLowerCase().includes(query) ||
                    reservation.member.code.toLowerCase().includes(query) ||
                    reservation.document.title.toLowerCase().includes(query) ||
                    reservation.document.code.toLowerCase().includes(query)
            );
            setFilteredReservations(results);
        } else {
            setFilteredReservations(reservations);
        }
    }, [searchQuery, reservations]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleUpdateReservation = async (reservationId, status) => {
        try {
            const response = await fetch("/api/reservations", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reservationId, status }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to ${status.toLowerCase()} reservation`);
            }

            // Update the reservation in the state
            const updatedReservation = await response.json();
            setReservations(
                reservations.map((reservation) =>
                    reservation.id === reservationId ? updatedReservation : reservation
                )
            );
            setFilteredReservations(
                filteredReservations.map((reservation) =>
                    reservation.id === reservationId ? updatedReservation : reservation
                )
            );

            toast.success(`Reservation ${status.toLowerCase()} successfully`);
        } catch (error) {
            console.error(`Error updating reservation:`, error);
            toast.error(error.message || `Failed to update reservation`);
        }
    };

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
                    <CalendarClock className="mx-auto h-12 w-12 text-primary animate-pulse" />
                    <h2 className="mt-4 text-xl font-medium">Loading Reservations...</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-serif font-bold text-[#0E2A47]">Reservations Management</h1>
                <p className="text-muted-foreground">
                    View and manage all pending and fulfilled reservations.
                </p>
            </div>

            <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by member name, code, or document title..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {filteredReservations.length > 0 ? (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Document</TableHead>
                                <TableHead>Reservation Date</TableHead>
                                <TableHead>Expiry Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReservations.map((reservation) => {
                                const isExpired =
                                    reservation.status === "Pending" &&
                                    new Date(reservation.expiryDate) < new Date();
                                const isPending = reservation.status === "Pending";

                                return (
                                    <TableRow key={reservation.id}>
                                        <TableCell className="font-medium">
                                            {reservation.member.firstName} {reservation.member.lastName}
                                            <div className="text-xs text-muted-foreground">
                                                {reservation.member.code}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {reservation.document.title}
                                            <div className="text-xs text-muted-foreground">
                                                {reservation.document.code}
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatDate(reservation.reservationDate)}</TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    isExpired ? "text-red-500 font-medium" : ""
                                                }
                                            >
                                                {formatDate(reservation.expiryDate)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {isPending ? (
                                                <Badge
                                                    variant={isExpired ? "destructive" : "outline"}
                                                    className={!isExpired ? "border-[#133b5c] text-[#133b5c]" : ""}
                                                >
                                                    {isExpired ? "Expired" : "Pending"}
                                                </Badge>
                                            ) : (
                                                <Badge variant="default" className="bg-[#133b5c]">Fulfilled</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {isPending && (
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleUpdateReservation(reservation.id, "Fulfilled")}
                                                        className="h-8 gap-1"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        <span>Fulfill</span>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleUpdateReservation(reservation.id, "Cancelled")}
                                                        className="h-8 gap-1"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        <span>Cancel</span>
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="flex h-60 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                        <CalendarClock className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No Reservations Found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {searchQuery
                                ? "Try adjusting your search query."
                                : "There are no reservations in the system yet."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
} 