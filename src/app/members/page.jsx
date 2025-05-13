"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, UserPlus, Users, Eye, Edit, Trash2, Plus, X, Check } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // State for dialogs
    const [selectedMember, setSelectedMember] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // Form state for adding/editing
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        province: "",
        password: ""
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch("/api/members");
            if (!response.ok) {
                throw new Error("Failed to fetch members");
            }
            const data = await response.json();

            // Ensure all members have a loans array
            const updatedData = data.map(member => ({
                ...member,
                loans: member.loans || []
            }));

            setMembers(updatedData);
            setFilteredMembers(updatedData);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching members:", error);
            toast.error("Failed to load members");
            setIsLoading(false);
        }
    };

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

    const handleViewMember = (member) => {
        setSelectedMember(member);
        setIsViewDialogOpen(true);
    };

    const handleEditMember = (member) => {
        setSelectedMember(member);
        setFormData({
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            phone: member.phone,
            street: member.street || "",
            city: member.city,
            province: member.province,
            password: "" // Leave password empty when editing
        });
        setIsEditDialogOpen(true);
    };

    const handleAddMember = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            province: "",
            password: ""
        });
        setIsAddDialogOpen(true);
    };

    const handleDeleteMember = (member) => {
        setSelectedMember(member);
        setIsDeleteDialogOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const response = await fetch("/api/members", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add member");
            }

            const newMember = await response.json();
            // Ensure the new member has a loans array
            newMember.loans = newMember.loans || [];

            setMembers(prev => [...prev, newMember]);
            setIsAddDialogOpen(false);
            toast.success("Member added successfully");
        } catch (error) {
            console.error("Error adding member:", error);
            toast.error(error.message || "Failed to add member");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const response = await fetch("/api/members", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: selectedMember.id,
                    ...formData
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update member");
            }

            const updatedMember = await response.json();
            // Preserve the loans array from the original member
            updatedMember.loans = updatedMember.loans || selectedMember?.loans || [];

            setMembers(prev =>
                prev.map(member =>
                    member.id === selectedMember.id ? updatedMember : member
                )
            );
            setIsEditDialogOpen(false);
            toast.success("Member updated successfully");
        } catch (error) {
            console.error("Error updating member:", error);
            toast.error(error.message || "Failed to update member");
        }
    };

    const handleDeleteSubmit = async () => {
        try {
            const response = await fetch(`/api/members?id=${selectedMember.id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete member");
            }

            setMembers(prev => prev.filter(member => member.id !== selectedMember.id));
            setIsDeleteDialogOpen(false);
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

                <Button onClick={handleAddMember} className="bg-[#133b5c] hover:bg-[#0E2A47]">
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
                                    <TableCell>{member.loans?.length || 0}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleViewMember(member)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleEditMember(member)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDeleteMember(member)}
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

            {/* View Member Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Member Details</DialogTitle>
                        <DialogDescription>
                            Detailed information about the member.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedMember && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Code</Label>
                                <div className="col-span-3">{selectedMember.code}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Name</Label>
                                <div className="col-span-3">{selectedMember.firstName} {selectedMember.lastName}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Email</Label>
                                <div className="col-span-3">{selectedMember.email}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Phone</Label>
                                <div className="col-span-3">{selectedMember.phone}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">City</Label>
                                <div className="col-span-3">{selectedMember.city}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Province</Label>
                                <div className="col-span-3">{selectedMember.province}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Active Loans</Label>
                                <div className="col-span-3">{selectedMember.loans?.length || 0}</div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Member Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Member</DialogTitle>
                        <DialogDescription>
                            Fill in the details to add a new member to the library.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleAddSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="firstName" className="text-right">First Name*</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    className="col-span-3"
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lastName" className="text-right">Last Name*</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    className="col-span-3"
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email*</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="col-span-3"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="password" className="text-right">Password*</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="col-span-3"
                                    value={formData.password}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">Phone*</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    className="col-span-3"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="street" className="text-right">Street*</Label>
                                <Input
                                    id="street"
                                    name="street"
                                    className="col-span-3"
                                    value={formData.street}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="city" className="text-right">City*</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    className="col-span-3"
                                    value={formData.city}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="province" className="text-right">Province*</Label>
                                <Input
                                    id="province"
                                    name="province"
                                    className="col-span-3"
                                    value={formData.province}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-[#133b5c] hover:bg-[#0E2A47]">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Member
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Member Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Member</DialogTitle>
                        <DialogDescription>
                            Update the member's information.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedMember && (
                        <form onSubmit={handleEditSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Code</Label>
                                    <div className="col-span-3">{selectedMember.code}</div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="firstName" className="text-right">First Name*</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        className="col-span-3"
                                        value={formData.firstName}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="lastName" className="text-right">Last Name*</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        className="col-span-3"
                                        value={formData.lastName}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">Email*</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="col-span-3"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="col-span-3"
                                        value={formData.password}
                                        onChange={handleFormChange}
                                        placeholder="Leave blank to keep current password"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">Phone*</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        className="col-span-3"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="street" className="text-right">Street*</Label>
                                    <Input
                                        id="street"
                                        name="street"
                                        className="col-span-3"
                                        value={formData.street}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="city" className="text-right">City*</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        className="col-span-3"
                                        value={formData.city}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="province" className="text-right">Province*</Label>
                                    <Input
                                        id="province"
                                        name="province"
                                        className="col-span-3"
                                        value={formData.province}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-[#133b5c] hover:bg-[#0E2A47]">
                                    <Check className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Member Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Member</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this member? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedMember && (
                        <div className="py-4">
                            <p>
                                You are about to delete member <span className="font-semibold">{selectedMember.firstName} {selectedMember.lastName}</span> ({selectedMember.code}).
                            </p>

                            {(selectedMember.loans?.length > 0) && (
                                <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md">
                                    <p className="font-medium">Warning:</p>
                                    <p>This member has {selectedMember.loans?.length} active loans. These must be returned before the member can be deleted.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteSubmit}
                            disabled={selectedMember && (selectedMember.loans?.length > 0)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Member
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 