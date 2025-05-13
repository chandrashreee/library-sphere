"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Search, UserCog, UserPlus, Eye, Edit, Trash2 } from "lucide-react";
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

export default function EmployeesPage() {
    const router = useRouter();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchEmployees() {
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
        }

        fetchEmployees();
    }, []);

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

    const handleViewEmployee = (employeeId) => {
        // Navigate to employee details page
        router.push(`/employees/${employeeId}`);
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            // Check if user confirms the deletion
            if (!window.confirm("Are you sure you want to delete this employee?")) {
                return;
            }

            const response = await fetch(`/api/employees?id=${employeeId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete employee");
            }

            // Remove employee from state
            setEmployees(employees.filter((employee) => employee.id !== employeeId));
            setFilteredEmployees(filteredEmployees.filter((employee) => employee.id !== employeeId));

            toast.success("Employee deleted successfully");
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error(error.message || "Failed to delete employee");
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

                <Button onClick={() => router.push("/employees/new")} className="bg-[#133b5c] hover:bg-[#0E2A47]">
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
                                        <Badge
                                            variant={employee.role === 'admin' ? 'default' : 'outline'}
                                            className={
                                                employee.role === 'admin'
                                                    ? 'bg-[#133b5c]'
                                                    : 'border-[#133b5c] text-[#133b5c]'
                                            }
                                        >
                                            {employee.role === 'admin' ? 'Admin' : 'Employee'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleViewEmployee(employee.id)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => router.push(`/employees/${employee.id}/edit`)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDeleteEmployee(employee.id)}
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
        </div>
    );
} 