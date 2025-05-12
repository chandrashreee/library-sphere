import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { BadgeCheck, PencilIcon, PlusCircle, Trash2, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Manage Employees - LibrarySphere',
    description: 'Admin dashboard for managing library employees',
};

export default async function ManageEmployeesPage() {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/login');
    }

    // Fetch all employees (including admins)
    const employees = await prisma.user.findMany({
        where: {
            OR: [
                { role: 'EMPLOYEE' },
                { role: 'ADMIN' },
            ],
        },
        orderBy: {
            code: 'asc',
        },
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Manage Employees</h1>
                        <p className="text-muted-foreground">
                            View and manage library staff members
                        </p>
                    </div>

                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Employee
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Library Staff</CardTitle>
                        <CardDescription>
                            A list of all employees and administrators in the library system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {employees.length === 0 ? (
                            <div className="text-center py-10">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h2 className="mt-4 text-xl font-semibold">No employees found</h2>
                                <p className="text-muted-foreground">
                                    There are no employees registered in the system.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Employee Code</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead className="w-[100px] text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.map((employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="font-medium">{employee.code}</TableCell>
                                                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                                                <TableCell>{employee.email}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        {employee.role === 'ADMIN' ? (
                                                            <>
                                                                <BadgeCheck className="h-4 w-4 text-primary mr-1" />
                                                                <span>Administrator</span>
                                                            </>
                                                        ) : (
                                                            <span>Employee</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{employee.phone}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <PencilIcon className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Button>
                                                        {/* Don't allow deleting yourself */}
                                                        {employee.id !== session.user.id && (
                                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                                                <Trash2 className="h-4 w-4" />
                                                                <span className="sr-only">Delete</span>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}