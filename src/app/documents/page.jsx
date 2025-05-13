"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, BookPlus, BookOpen, Eye, Edit, Trash2, Plus, X, Check, Loader2 } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DocumentsPage() {
    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Loading states for buttons
    const [isAddLoading, setIsAddLoading] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    // State for dialogs
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // Categories, Classifications, and Types for dropdowns
    const categories = ["Novel", "Comics", "VideoGame", "Film"];
    const classifications = ["Kids", "Teens", "Adults"];
    const types = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi"];

    // Form state for adding/editing
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        year: "",
        category: "Novel",
        classifying: "Adults",
        type: "Drama",
        description: "",
        ISBN: "",
        imagePath: ""
    });

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await fetch("/api/documents");
            if (!response.ok) {
                throw new Error("Failed to fetch documents");
            }
            const data = await response.json();
            setDocuments(data);
            setFilteredDocuments(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching documents:", error);
            toast.error("Failed to load documents");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const results = documents.filter(
                (document) =>
                    document.title.toLowerCase().includes(query) ||
                    document.author.toLowerCase().includes(query) ||
                    document.description.toLowerCase().includes(query) ||
                    document.code.toLowerCase().includes(query) ||
                    document.category.toLowerCase().includes(query) ||
                    document.type.toLowerCase().includes(query)
            );
            setFilteredDocuments(results);
        } else {
            setFilteredDocuments(documents);
        }
    }, [searchQuery, documents]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewDocument = (document) => {
        setSelectedDocument(document);
        setIsViewDialogOpen(true);
    };

    const handleEditDocument = (document) => {
        setSelectedDocument(document);
        setFormData({
            title: document.title,
            author: document.author,
            year: document.year.toString(),
            category: document.category,
            classifying: document.classifying,
            type: document.type,
            description: document.description,
            ISBN: document.ISBN || "",
            imagePath: document.imagePath || ""
        });
        setIsEditDialogOpen(true);
    };

    const handleAddDocument = () => {
        setFormData({
            title: "",
            author: "",
            year: new Date().getFullYear().toString(),
            category: "Novel",
            classifying: "Adults",
            type: "Drama",
            description: "",
            ISBN: "",
            imagePath: ""
        });
        setIsAddDialogOpen(true);
    };

    const handleDeleteDocument = (document) => {
        setSelectedDocument(document);
        setIsDeleteDialogOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.title || !formData.author || !formData.year || !formData.description) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsAddLoading(true);
        try {
            const response = await fetch("/api/documents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add document");
            }

            const newDocument = await response.json();

            // Add the empty loans and reservations arrays
            newDocument.loans = [];
            newDocument.reservations = [];

            setDocuments(prev => [...prev, newDocument]);
            setIsAddDialogOpen(false);
            toast.success("Document added successfully");
        } catch (error) {
            console.error("Error adding document:", error);
            toast.error(error.message || "Failed to add document");
        } finally {
            setIsAddLoading(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.title || !formData.author || !formData.year || !formData.description) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsEditLoading(true);
        try {
            const response = await fetch("/api/documents", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: selectedDocument.id,
                    ...formData
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update document");
            }

            const updatedDocument = await response.json();

            // Preserve the loans and reservations arrays
            updatedDocument.loans = selectedDocument.loans || [];
            updatedDocument.reservations = selectedDocument.reservations || [];

            setDocuments(prev =>
                prev.map(document =>
                    document.id === selectedDocument.id ? updatedDocument : document
                )
            );
            setIsEditDialogOpen(false);
            toast.success("Document updated successfully");
        } catch (error) {
            console.error("Error updating document:", error);
            toast.error(error.message || "Failed to update document");
        } finally {
            setIsEditLoading(false);
        }
    };

    const handleDeleteSubmit = async () => {
        setIsDeleteLoading(true);
        try {
            const response = await fetch(`/api/documents?id=${selectedDocument.id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete document");
            }

            setDocuments(prev => prev.filter(document => document.id !== selectedDocument.id));
            setIsDeleteDialogOpen(false);
            toast.success("Document deleted successfully");
        } catch (error) {
            console.error("Error deleting document:", error);
            toast.error(error.message || "Failed to delete document");
        } finally {
            setIsDeleteLoading(false);
        }
    };

    // Placeholder image when no image is available
    const placeholderImage = "https://placehold.co/400x600/133b5c/ffffff?text=No+Image";

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-primary animate-pulse" />
                    <h2 className="mt-4 text-xl font-medium">Loading Documents...</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-serif font-bold text-[#0E2A47]">Documents</h1>
                <p className="text-muted-foreground">
                    View and manage library documents, books, and other media.
                </p>
            </div>

            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by title, author, code, or category..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <Button onClick={handleAddDocument} className="bg-[#133b5c] hover:bg-[#0E2A47]">
                    <BookPlus className="mr-2 h-4 w-4" />
                    Add Document
                </Button>
            </div>

            {filteredDocuments.length > 0 ? (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDocuments.map((document) => (
                                <TableRow key={document.id}>
                                    <TableCell className="font-medium">{document.code}</TableCell>
                                    <TableCell>{document.title}</TableCell>
                                    <TableCell>{document.author}</TableCell>
                                    <TableCell>{document.year}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {document.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {document.loans && document.loans.length > 0 ? (
                                            <Badge variant="destructive">On Loan</Badge>
                                        ) : document.reservations && document.reservations.length > 0 ? (
                                            <Badge variant="secondary">Reserved</Badge>
                                        ) : (
                                            <Badge variant="success" className="bg-green-500 hover:bg-green-600">Available</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleViewDocument(document)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleEditDocument(document)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDeleteDocument(document)}
                                                disabled={document.loans && document.loans.length > 0 || document.reservations && document.reservations.length > 0}
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
                        <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No Documents Found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {searchQuery
                                ? "Try adjusting your search query."
                                : "There are no documents in the system yet."}
                        </p>
                    </div>
                </div>
            )}

            {/* View Document Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Document Details</DialogTitle>
                        <DialogDescription>
                            Detailed information about the document.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedDocument && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <div className="aspect-[2/3] overflow-hidden rounded-md">
                                        <img
                                            src={selectedDocument.imagePath || placeholderImage}
                                            alt={selectedDocument.title}
                                            className="h-full w-full object-cover"
                                            onError={(e) => { e.target.src = placeholderImage }}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">{selectedDocument.title}</h3>
                                        <p className="text-sm text-muted-foreground">by {selectedDocument.author}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="space-y-1">
                                            <p className="font-medium">Code:</p>
                                            <p>{selectedDocument.code}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">Year:</p>
                                            <p>{selectedDocument.year}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">Category:</p>
                                            <Badge variant="outline">{selectedDocument.category}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">Type:</p>
                                            <Badge variant="outline">{selectedDocument.type}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">Classification:</p>
                                            <Badge variant="outline">{selectedDocument.classifying}</Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-medium">ISBN:</p>
                                            <p>{selectedDocument.ISBN || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium">Description:</h4>
                                <p className="text-sm">{selectedDocument.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Status:</h4>
                                    <div className="flex items-center gap-2">
                                        {selectedDocument.loans && selectedDocument.loans.length > 0 ? (
                                            <Badge variant="destructive">On Loan</Badge>
                                        ) : selectedDocument.reservations && selectedDocument.reservations.length > 0 ? (
                                            <Badge variant="secondary">Reserved</Badge>
                                        ) : (
                                            <Badge variant="success" className="bg-green-500 hover:bg-green-600">Available</Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium">Availability:</h4>
                                    <p className="text-sm">
                                        {selectedDocument.loans && selectedDocument.loans.length > 0 ?
                                            "Currently on loan" :
                                            selectedDocument.reservations && selectedDocument.reservations.length > 0 ?
                                                "Reserved, but not yet loaned" :
                                                "Available for loan or reservation"}
                                    </p>
                                </div>
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

            {/* Document Form Dialog - Shared between Add and Edit */}
            {(isAddDialogOpen || isEditDialogOpen) && (
                <Dialog
                    open={isAddDialogOpen || isEditDialogOpen}
                    onOpenChange={isAddDialogOpen ? setIsAddDialogOpen : setIsEditDialogOpen}
                >
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>{isAddDialogOpen ? "Add New Document" : "Edit Document"}</DialogTitle>
                            <DialogDescription>
                                {isAddDialogOpen
                                    ? "Fill in the details to add a new document to the library catalog."
                                    : "Update the document's information."}
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={isAddDialogOpen ? handleAddSubmit : handleEditSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title*</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleFormChange}
                                            required
                                            disabled={isAddLoading || isEditLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="author">Author*</Label>
                                        <Input
                                            id="author"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleFormChange}
                                            required
                                            disabled={isAddLoading || isEditLoading}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="year">Year*</Label>
                                        <Input
                                            id="year"
                                            name="year"
                                            type="number"
                                            min="1000"
                                            max={new Date().getFullYear()}
                                            value={formData.year}
                                            onChange={handleFormChange}
                                            required
                                            disabled={isAddLoading || isEditLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category*</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => handleSelectChange(value, "category")}
                                            disabled={isAddLoading || isEditLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Type*</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(value) => handleSelectChange(value, "type")}
                                            disabled={isAddLoading || isEditLoading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {types.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="classifying">Classification*</Label>
                                    <Select
                                        value={formData.classifying}
                                        onValueChange={(value) => handleSelectChange(value, "classifying")}
                                        disabled={isAddLoading || isEditLoading}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select classification" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classifications.map((classification) => (
                                                <SelectItem key={classification} value={classification}>
                                                    {classification}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ISBN">ISBN (optional)</Label>
                                    <Input
                                        id="ISBN"
                                        name="ISBN"
                                        value={formData.ISBN}
                                        onChange={handleFormChange}
                                        disabled={isAddLoading || isEditLoading}
                                        placeholder="e.g., 978-3-16-148410-0"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="imagePath">Image URL (optional)</Label>
                                    <Input
                                        id="imagePath"
                                        name="imagePath"
                                        value={formData.imagePath}
                                        onChange={handleFormChange}
                                        disabled={isAddLoading || isEditLoading}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description*</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        rows={4}
                                        required
                                        disabled={isAddLoading || isEditLoading}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => isAddDialogOpen ? setIsAddDialogOpen(false) : setIsEditDialogOpen(false)}
                                    disabled={isAddLoading || isEditLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#133b5c] hover:bg-[#0E2A47]"
                                    disabled={isAddLoading || isEditLoading}
                                >
                                    {isAddLoading || isEditLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {isAddDialogOpen ? "Adding..." : "Saving..."}
                                        </>
                                    ) : (
                                        <>
                                            {isAddDialogOpen ? (
                                                <>
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Document
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Save Changes
                                                </>
                                            )}
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Document Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Document</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this document? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedDocument && (
                        <div className="py-4">
                            <p>
                                You are about to delete <span className="font-semibold">{selectedDocument.title}</span> by {selectedDocument.author} ({selectedDocument.code}).
                            </p>

                            {((selectedDocument.loans && selectedDocument.loans.length > 0) ||
                                (selectedDocument.reservations && selectedDocument.reservations.length > 0)) && (
                                    <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md">
                                        <p className="font-medium">Warning:</p>
                                        <p>
                                            This document has
                                            {selectedDocument.loans && selectedDocument.loans.length > 0 ?
                                                ` active loans` : ""}
                                            {selectedDocument.loans && selectedDocument.loans.length > 0 &&
                                                selectedDocument.reservations && selectedDocument.reservations.length > 0 ?
                                                " and" : ""}
                                            {selectedDocument.reservations && selectedDocument.reservations.length > 0 ?
                                                ` pending reservations` : ""}.
                                            These must be resolved before the document can be deleted.
                                        </p>
                                    </div>
                                )}
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isDeleteLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteSubmit}
                            disabled={
                                isDeleteLoading ||
                                (selectedDocument &&
                                    ((selectedDocument.loans && selectedDocument.loans.length > 0) ||
                                        (selectedDocument.reservations && selectedDocument.reservations.length > 0)))
                            }
                        >
                            {isDeleteLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Document
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 