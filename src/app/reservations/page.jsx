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
    const [documentAvailability, setDocumentAvailability] = useState({});

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

                // Check availability for all documents in pending reservations
                const pendingReservations = data.filter(res => res.status === "Pending");
                const documentIds = [...new Set(pendingReservations.map(res => res.documentId))];

                // Create an availability check for each document
                const availabilityChecks = {};
                for (const documentId of documentIds) {
                    const docResponse = await fetch(`/api/documents?includeReservations=true`);
                    const documents = await docResponse.json();

                    // Find the matching document
                    const document = documents.find(doc => doc.id === documentId);
                    if (document) {
                        // A document is available if it has no active loans
                        availabilityChecks[documentId] = !document.loans?.some(loan => loan.status === 'Active');
                    }
                }

                setDocumentAvailability(availabilityChecks);
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

    const handleFulfillReservation = async (reservationId) => {
        try {
            const response = await fetch("/api/reservations", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reservationId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fulfill reservation");
            }

            const result = await response.json();

            // Update the reservation in the state
            setReservations(
                reservations.map((reservation) =>
                    reservation.id === reservationId
                        ? { ...reservation, status: "Fulfilled" }
                        : reservation
                )
            );
            setFilteredReservations(
                filteredReservations.map((reservation) =>
                    reservation.id === reservationId
                        ? { ...reservation, status: "Fulfilled" }
                        : reservation
                )
            );

            toast.success("Reservation fulfilled successfully. Loan created.");

            // Refresh availability data
            const updatedAvailability = { ...documentAvailability };
            const reservationDoc = reservations.find(r => r.id === reservationId)?.documentId;
            if (reservationDoc) {
                updatedAvailability[reservationDoc] = false; // Now not available
            }
            setDocumentAvailability(updatedAvailability);

        } catch (error) {
            console.error("Error fulfilling reservation:", error);
            toast.error(error.message || "Failed to fulfill reservation");
        }
    };

    const handleCancelReservation = async (reservationId) => {
        try {
            const response = await fetch("/api/reservations", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reservationId, status: "Cancelled" }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to cancel reservation");
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

            toast.success("Reservation cancelled successfully");
        } catch (error) {
            console.error("Error cancelling reservation:", error);
            toast.error(error.message || "Failed to cancel reservation");
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
                                <TableHead>Availability</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReservations.map((reservation) => {
                                const isExpired =
                                    reservation.status === "Pending" &&
                                    new Date(reservation.expiryDate) < new Date();
                                const isPending = reservation.status === "Pending";
                                const isDocumentAvailable = documentAvailability[reservation.documentId];

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
                                        <TableCell>
                                            {isPending && (
                                                <Badge
                                                    variant={isDocumentAvailable ? "success" : "outline"}
                                                    className={isDocumentAvailable ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                                                >
                                                    {isDocumentAvailable ? "Available" : "Unavailable"}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {isPending && (
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleFulfillReservation(reservation.id)}
                                                        className="h-8 gap-1"
                                                        disabled={!isDocumentAvailable}
                                                        title={!isDocumentAvailable ? "Document is currently on loan" : ""}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        <span>Fulfill</span>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleCancelReservation(reservation.id)}
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