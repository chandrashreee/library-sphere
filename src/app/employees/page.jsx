"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, UserPlus, UserCog, Eye, Edit, Trash2, Plus, X, Check, Loader2 } from "lucide-react";
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

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Loading states for buttons
    const [isAddLoading, setIsAddLoading] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    // State for dialogs
    const [selectedEmployee, setSelectedEmployee] = useState(null);
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
        password: "",
        role: "employee"
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch("/api/employees");
            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }
            const data = await response.json();
            setEmployees(data);
            setFilteredEmployees(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching employees:", error);
            toast.error("Failed to load employees");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const results = employees.filter(
                (employee) =>
                    employee.firstName.toLowerCase().includes(query) ||
                    employee.lastName.toLowerCase().includes(query) ||
                    employee.email.toLowerCase().includes(query) ||
                    employee.code.toLowerCase().includes(query) ||
                    employee.city.toLowerCase().includes(query) ||
                    employee.phone.includes(query) ||
                    employee.role.toLowerCase().includes(query)
            );
            setFilteredEmployees(results);
        } else {
            setFilteredEmployees(employees);
        }
    }, [searchQuery, employees]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewEmployee = (employee) => {
        setSelectedEmployee(employee);
        setIsViewDialogOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            street: employee.street || "",
            city: employee.city,
            province: employee.province,
            password: "", // Leave password empty when editing
            role: employee.role
        });
        setIsEditDialogOpen(true);
    };

    const handleAddEmployee = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            province: "",
            password: "",
            role: "employee"
        });
        setIsAddDialogOpen(true);
    };

    const handleDeleteEmployee = (employee) => {
        setSelectedEmployee(employee);
        setIsDeleteDialogOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoleChange = (value) => {
        setFormData(prev => ({
            ...prev,
            role: value
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsAddLoading(true);
        try {
            const response = await fetch("/api/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add employee");
            }

            const newEmployee = await response.json();
            setEmployees(prev => [...prev, newEmployee]);
            setIsAddDialogOpen(false);
            toast.success("Employee added successfully");
        } catch (error) {
            console.error("Error adding employee:", error);
            toast.error(error.message || "Failed to add employee");
        } finally {
            setIsAddLoading(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsEditLoading(true);
        try {
            const response = await fetch("/api/employees", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: selectedEmployee.id,
                    ...formData
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update employee");
            }

            const updatedEmployee = await response.json();

            setEmployees(prev =>
                prev.map(employee =>
                    employee.id === selectedEmployee.id ? updatedEmployee : employee
                )
            );
            setIsEditDialogOpen(false);
            toast.success("Employee updated successfully");
        } catch (error) {
            console.error("Error updating employee:", error);
            toast.error(error.message || "Failed to update employee");
        } finally {
            setIsEditLoading(false);
        }
    };

    const handleDeleteSubmit = async () => {
        setIsDeleteLoading(true);
        try {
            const response = await fetch(`/api/employees?id=${selectedEmployee.id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete employee");
            }

            setEmployees(prev => prev.filter(employee => employee.id !== selectedEmployee.id));
            setIsDeleteDialogOpen(false);
            toast.success("Employee deleted successfully");
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error(error.message || "Failed to delete employee");
        } finally {
            setIsDeleteLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <UserCog className="mx-auto h-12 w-12 text-primary animate-pulse" />
                    <h2 className="mt-4 text-xl font-medium">Loading Employees...</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-serif font-bold text-[#0E2A47]">Employees</h1>
                <p className="text-muted-foreground">
                    View and manage library employees.
                </p>
            </div>

            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, code, or role..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <Button onClick={handleAddEmployee} className="bg-[#133b5c] hover:bg-[#0E2A47]">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Employee
                </Button>
            </div>

            {filteredEmployees.length > 0 ? (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEmployees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className="font-medium">{employee.code}</TableCell>
                                    <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.phone}</TableCell>
                                    <TableCell>{employee.city}</TableCell>
                                    <TableCell>
                                        <Badge variant={employee.role === "admin" ? "destructive" : "outline"}>
                                            {employee.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleViewEmployee(employee)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleEditEmployee(employee)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDeleteEmployee(employee)}
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
                        <UserCog className="mx-auto h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No Employees Found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {searchQuery
                                ? "Try adjusting your search query."
                                : "There are no employees in the system yet."}
                        </p>
                    </div>
                </div>
            )}

            {/* View Employee Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Employee Details</DialogTitle>
                        <DialogDescription>
                            Detailed information about the employee.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedEmployee && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Code</Label>
                                <div className="col-span-3">{selectedEmployee.code}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Name</Label>
                                <div className="col-span-3">{selectedEmployee.firstName} {selectedEmployee.lastName}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Email</Label>
                                <div className="col-span-3">{selectedEmployee.email}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Phone</Label>
                                <div className="col-span-3">{selectedEmployee.phone}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">City</Label>
                                <div className="col-span-3">{selectedEmployee.city}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Province</Label>
                                <div className="col-span-3">{selectedEmployee.province}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Role</Label>
                                <div className="col-span-3">
                                    <Badge variant={selectedEmployee.role === "admin" ? "destructive" : "outline"}>
                                        {selectedEmployee.role}
                                    </Badge>
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

            {/* Add Employee Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Employee</DialogTitle>
                        <DialogDescription>
                            Fill in the details to add a new employee to the library system.
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
                                    disabled={isAddLoading}
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
                                    disabled={isAddLoading}
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
                                    disabled={isAddLoading}
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
                                    disabled={isAddLoading}
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
                                    disabled={isAddLoading}
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
                                    disabled={isAddLoading}
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
                                    disabled={isAddLoading}
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
                                    disabled={isAddLoading}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">Role*</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={handleRoleChange}
                                    disabled={isAddLoading}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="employee">Employee</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsAddDialogOpen(false)}
                                disabled={isAddLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#133b5c] hover:bg-[#0E2A47]"
                                disabled={isAddLoading}
                            >
                                {isAddLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Employee
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Employee Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                        <DialogDescription>
                            Update the employee's information.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedEmployee && (
                        <form onSubmit={handleEditSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Code</Label>
                                    <div className="col-span-3">{selectedEmployee.code}</div>
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
                                        disabled={isEditLoading}
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
                                        disabled={isEditLoading}
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
                                        disabled={isEditLoading}
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
                                        disabled={isEditLoading}
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
                                        disabled={isEditLoading}
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
                                        disabled={isEditLoading}
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
                                        disabled={isEditLoading}
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
                                        disabled={isEditLoading}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">Role*</Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={handleRoleChange}
                                        disabled={isEditLoading}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="employee">Employee</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                    disabled={isEditLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#133b5c] hover:bg-[#0E2A47]"
                                    disabled={isEditLoading}
                                >
                                    {isEditLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Employee Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Employee</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this employee? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedEmployee && (
                        <div className="py-4">
                            <p>
                                You are about to delete employee <span className="font-semibold">{selectedEmployee.firstName} {selectedEmployee.lastName}</span> ({selectedEmployee.code}).
                            </p>
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
                            disabled={isDeleteLoading}
                        >
                            {isDeleteLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Employee
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 