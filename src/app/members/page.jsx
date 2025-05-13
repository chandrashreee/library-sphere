"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Search, UserPlus, Users, Eye, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function MembersPage() {
    const router = useRouter();
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await fetch("/api/members");
                if (!response.ok) {
                    throw new Error("Failed to fetch members");
                }
                const data = await response.json();
                setMembers(data);
                setFilteredMembers(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching members:", error);
                toast.error("Failed to load members");
                setIsLoading(false);
            }
        }

        fetchMembers();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const results = members.filter(
                (member) =>
                    member.firstName.toLowerCase().includes(query) ||
                    member.lastName.toLowerCase().includes(query) ||
                    member.email.toLowerCase().includes(query) ||
                    member.code.toLowerCase().includes(query) ||
                    member.city.toLowerCase().includes(query) ||
                    member.phone.includes(query)
            );
            setFilteredMembers(results);
        } else {
            setFilteredMembers(members);
        }
    }, [searchQuery, members]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewMember = (memberId) => {
        // Navigate to member details page
        router.push(`/members/${memberId}`);
    };

    const handleDeleteMember = async (memberId) => {
        try {
            // Check if user confirms the deletion
            if (!window.confirm("Are you sure you want to delete this member?")) {
                return;
            }

            const response = await fetch(`/api/members?id=${memberId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete member");
            }

            // Remove member from state
            setMembers(members.filter((member) => member.id !== memberId));
            setFilteredMembers(filteredMembers.filter((member) => member.id !== memberId));

            toast.success("Member deleted successfully");
        } catch (error) {
            console.error("Error deleting member:", error);
            toast.error(error.message || "Failed to delete member");
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <Users className="mx-auto h-12 w-12 text-primary animate-pulse" />
                    <h2 className="mt-4 text-xl font-medium">Loading Members...</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-serif font-bold text-[#0E2A47]">Members</h1>
                <p className="text-muted-foreground">
                    View and manage library members.
                </p>
            </div>

            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, code, or city..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <Button onClick={() => router.push("/members/new")} className="bg-[#133b5c] hover:bg-[#0E2A47]">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Member
                </Button>
            </div>

            {filteredMembers.length > 0 ? (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Active Loans</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMembers.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">{member.code}</TableCell>
                                    <TableCell>{member.firstName} {member.lastName}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{member.phone}</TableCell>
                                    <TableCell>{member.city}</TableCell>
                                    <TableCell>{member.loans.length}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleViewMember(member.id)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => router.push(`/members/${member.id}/edit`)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDeleteMember(member.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="flex h-60 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                        <Users className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No Members Found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {searchQuery
                                ? "Try adjusting your search query."
                                : "There are no members in the system yet."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
} 