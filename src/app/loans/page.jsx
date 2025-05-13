"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Search, BookCheck, ClipboardList } from "lucide-react";
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

export default function LoansPage() {
    const { data: session } = useSession();
    const [loans, setLoans] = useState([]);
    const [filteredLoans, setFilteredLoans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchLoans() {
            try {
                const response = await fetch("/api/loans");
                if (!response.ok) {
                    throw new Error("Failed to fetch loans");
                }
                const data = await response.json();
                setLoans(data);
                setFilteredLoans(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching loans:", error);
                toast.error("Failed to load loans");
                setIsLoading(false);
            }
        }

        fetchLoans();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const results = loans.filter(
                (loan) =>
                    loan.member.firstName.toLowerCase().includes(query) ||
                    loan.member.lastName.toLowerCase().includes(query) ||
                    loan.member.code.toLowerCase().includes(query) ||
                    loan.document.title.toLowerCase().includes(query) ||
                    loan.document.code.toLowerCase().includes(query)
            );
            setFilteredLoans(results);
        } else {
            setFilteredLoans(loans);
        }
    }, [searchQuery, loans]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleReturnLoan = async (loanId) => {
        try {
            const response = await fetch("/api/loans", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loanId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to return loan");
            }

            // Update the loan in the state
            const updatedLoan = await response.json();
            setLoans(
                loans.map((loan) =>
                    loan.id === loanId ? updatedLoan : loan
                )
            );
            setFilteredLoans(
                filteredLoans.map((loan) =>
                    loan.id === loanId ? updatedLoan : loan
                )
            );

            toast.success("Loan marked as returned successfully");
        } catch (error) {
            console.error("Error returning loan:", error);
            toast.error(error.message || "Failed to return loan");
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
                    <ClipboardList className="mx-auto h-12 w-12 text-primary animate-pulse" />
                    <h2 className="mt-4 text-xl font-medium">Loading Loans...</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-serif font-bold text-[#0E2A47]">Loans Management</h1>
                <p className="text-muted-foreground">
                    View and manage all active and returned loans.
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

            {filteredLoans.length > 0 ? (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Document</TableHead>
                                <TableHead>Loan Date</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Return Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLoans.map((loan) => {
                                const isOverdue =
                                    !loan.actualReturnDate &&
                                    new Date(loan.expectedReturnDate) < new Date();
                                const isActive = !loan.actualReturnDate;

                                return (
                                    <TableRow key={loan.id}>
                                        <TableCell className="font-medium">
                                            {loan.member.firstName} {loan.member.lastName}
                                            <div className="text-xs text-muted-foreground">
                                                {loan.member.code}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {loan.document.title}
                                            <div className="text-xs text-muted-foreground">
                                                {loan.document.code}
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatDate(loan.loanDate)}</TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    isOverdue && isActive ? "text-red-500 font-medium" : ""
                                                }
                                            >
                                                {formatDate(loan.expectedReturnDate)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {loan.actualReturnDate
                                                ? formatDate(loan.actualReturnDate)
                                                : "-"}
                                        </TableCell>
                                        <TableCell>
                                            {isActive ? (
                                                <Badge
                                                    variant={isOverdue ? "destructive" : "default"}
                                                    className="bg-[#133b5c]"
                                                >
                                                    {isOverdue ? "Overdue" : "Active"}
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">Returned</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {isActive && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleReturnLoan(loan.id)}
                                                    className="h-8 gap-1"
                                                >
                                                    <BookCheck className="h-4 w-4" />
                                                    <span>Return</span>
                                                </Button>
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
                        <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No Loans Found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {searchQuery
                                ? "Try adjusting your search query."
                                : "There are no loans in the system yet."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
} 