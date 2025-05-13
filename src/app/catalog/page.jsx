"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search, Filter, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CatalogPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        category: "all-categories",
        classifying: "all-ratings",
        type: "all-genres",
    });

    // Categories, Classifications, and Types for filtering
    const categories = ["Novel", "Comics", "VideoGame", "Film"];
    const classifications = ["Kids", "Teens", "Adults"];
    const types = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi"];

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const response = await fetch("/api/documents?includeReservations=true");
                const data = await response.json();
                setDocuments(data);
                setFilteredDocuments(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch documents:", error);
                toast.error("Failed to load catalog");
                setIsLoading(false);
            }
        }

        fetchDocuments();
    }, []);

    // Filter documents when search query or filters change
    useEffect(() => {
        let results = [...documents];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            results = results.filter(
                (doc) =>
                    doc.title.toLowerCase().includes(query) ||
                    doc.author.toLowerCase().includes(query) ||
                    doc.description.toLowerCase().includes(query)
            );
        }

        // Apply category filter
        if (filters.category && filters.category !== "all-categories") {
            results = results.filter((doc) => doc.category === filters.category);
        }

        // Apply classification filter
        if (filters.classifying && filters.classifying !== "all-ratings") {
            results = results.filter((doc) => doc.classifying === filters.classifying);
        }

        // Apply type filter
        if (filters.type && filters.type !== "all-genres") {
            results = results.filter((doc) => doc.type === filters.type);
        }

        setFilteredDocuments(results);
    }, [searchQuery, filters, documents]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (value, filterType) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const resetFilters = () => {
        setSearchQuery("");
        setFilters({
            category: "all-categories",
            classifying: "all-ratings",
            type: "all-genres",
        });
    };

    const handleDocumentAction = async (documentId, action, reservationId = null) => {
        if (!session) {
            toast.error("You must be logged in to perform this action");
            router.push("/login");
            return;
        }

        // Prevent staff from creating loans for themselves
        const isStaff = session.user.role === 'employee' || session.user.role === 'admin';
        if (action === "loan" && isStaff && !reservationId) {
            toast.error("Staff members cannot loan books for themselves");
            return;
        }

        try {
            if (action === "loan") {
                // Call API to create loan
                const response = await fetch("/api/loans", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ documentId }),
                });

                if (response.ok) {
                    toast.success("Document loaned successfully");
                    // Refresh document list to update availability
                    const docsResponse = await fetch("/api/documents?includeReservations=true");
                    const docsData = await docsResponse.json();
                    setDocuments(docsData);
                } else {
                    const error = await response.json();
                    toast.error(error.error || "Failed to loan document");
                }
            } else if (action === "reserve") {
                // Call API to create reservation
                const response = await fetch("/api/reservations", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ documentId }),
                });

                if (response.ok) {
                    toast.success("Reservation created successfully");
                    // Refresh document list to update reservation status
                    const docsResponse = await fetch("/api/documents?includeReservations=true");
                    const docsData = await docsResponse.json();
                    setDocuments(docsData);
                } else {
                    const error = await response.json();
                    toast.error(error.error || "Failed to reserve document");
                }
            } else if (action === "fulfill") {
                // Call API to fulfill a reservation
                const response = await fetch("/api/reservations", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ reservationId }),
                });

                if (response.ok) {
                    toast.success("Reservation fulfilled successfully");
                    // Refresh document list to update availability and reservation status
                    const docsResponse = await fetch("/api/documents?includeReservations=true");
                    const docsData = await docsResponse.json();
                    setDocuments(docsData);
                } else {
                    const error = await response.json();
                    toast.error(error.error || "Failed to fulfill reservation");
                }
            }
        } catch (error) {
            console.error(`Failed to ${action} document:`, error);
            toast.error(`An error occurred while processing your ${action} request`);
        }
    };

    // Placeholder image when no image is available
    const placeholderImage = "https://placehold.co/400x600/133b5c/ffffff?text=No+Image";

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-primary animate-pulse" />
                    <h2 className="mt-4 text-xl font-medium">Loading Catalog...</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-serif font-bold text-[#0E2A47]">Library Catalog</h1>
                <p className="text-muted-foreground">
                    Browse our collection of books, comics, games, and more. Use the search and filters to find what you're looking for.
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 rounded-lg border bg-card p-4 shadow">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title, author, or description..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Filters:</span>
                    </div>

                    <Select value={filters.category} onValueChange={(value) => handleFilterChange(value, "category")}>
                        <SelectTrigger className="w-[150px] h-9">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-categories">All Categories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={filters.classifying} onValueChange={(value) => handleFilterChange(value, "classifying")}>
                        <SelectTrigger className="w-[150px] h-9">
                            <SelectValue placeholder="Age Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-ratings">All Ratings</SelectItem>
                            {classifications.map((classification) => (
                                <SelectItem key={classification} value={classification}>
                                    {classification}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={filters.type} onValueChange={(value) => handleFilterChange(value, "type")}>
                        <SelectTrigger className="w-[150px] h-9">
                            <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all-genres">All Genres</SelectItem>
                            {types.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={resetFilters} className="ml-auto h-9">
                        Reset Filters
                    </Button>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                    Showing {filteredDocuments.length} of {documents.length} items
                </p>
            </div>

            {/* Document Grid */}
            {filteredDocuments.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredDocuments.map((document) => {
                        const isAvailable = !document.loans?.some(loan => loan.status === 'Active');
                        const isStaff = session?.user?.role === 'employee' || session?.user?.role === 'admin';

                        // Check if document has pending reservations
                        const pendingReservation = document.reservations?.find(res =>
                            res.status === 'Pending'
                        );

                        // For staff: check if a reservation can be fulfilled (document is available and has pending reservation)
                        const canFulfillReservation = isStaff && isAvailable && pendingReservation;

                        // For members: check if this document is already reserved by someone else
                        const isReservedByOthers = pendingReservation &&
                            (!session || pendingReservation.memberId !== session.user.id);

                        // For members: check if this document is reserved by the current user
                        const isReservedByUser = session &&
                            pendingReservation &&
                            pendingReservation.memberId === session.user.id;

                        return (
                            <Card key={document.id} className="overflow-hidden">
                                <div className="aspect-[2/3] relative">
                                    <img
                                        src={document.imagePath || placeholderImage}
                                        alt={document.title}
                                        className="h-full w-full object-cover"
                                    />
                                    {!isAvailable && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute right-2 top-2"
                                        >
                                            Unavailable
                                        </Badge>
                                    )}
                                    {pendingReservation && (
                                        <Badge
                                            variant="secondary"
                                            className="absolute left-2 top-2 bg-amber-100 text-amber-800 hover:bg-amber-100"
                                        >
                                            Reserved
                                        </Badge>
                                    )}
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex gap-2 mb-2">
                                        <Badge variant="outline" className="px-2 py-0 text-xs">
                                            {document.category}
                                        </Badge>
                                        <Badge variant="outline" className="px-2 py-0 text-xs">
                                            {document.classifying}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg font-medium line-clamp-1">
                                        {document.title}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">{document.author} ({document.year})</p>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-sm line-clamp-2">{document.description}</p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 flex gap-2">
                                    {/* For staff with ability to fulfill a reservation */}
                                    {canFulfillReservation ? (
                                        <Button
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                            onClick={() => handleDocumentAction(document.id, "fulfill", pendingReservation.id)}
                                        >
                                            Fulfill Reservation
                                        </Button>
                                    ) : isAvailable ? (
                                        <>
                                            {/* Document is available but might be reserved */}
                                            {isReservedByOthers ? (
                                                <Button
                                                    className="flex-1"
                                                    variant="outline"
                                                    disabled
                                                    title="This document is reserved by another member"
                                                >
                                                    Reserved by Member
                                                </Button>
                                            ) : isStaff ? (
                                                <Button
                                                    className="flex-1"
                                                    variant="outline"
                                                    disabled
                                                    title="Staff members cannot loan books for themselves"
                                                >
                                                    Staff Cannot Loan
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="flex-1 bg-[#133b5c] hover:bg-[#0E2A47]"
                                                    onClick={() => handleDocumentAction(document.id, "loan")}
                                                >
                                                    Loan
                                                </Button>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {/* Document is unavailable */}
                                            {isReservedByUser ? (
                                                <Button
                                                    className="flex-1"
                                                    variant="outline"
                                                    disabled
                                                >
                                                    You've Reserved This
                                                </Button>
                                            ) : isReservedByOthers ? (
                                                <Button
                                                    className="flex-1"
                                                    variant="outline"
                                                    disabled
                                                >
                                                    Already Reserved
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="flex-1"
                                                    variant="outline"
                                                    onClick={() => handleDocumentAction(document.id, "reserve")}
                                                >
                                                    Reserve
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div className="flex h-60 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                        <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No Documents Found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
} 