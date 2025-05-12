import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
import { PencilIcon, PlusCircle, Trash2, UserIcon } from 'lucide-react';
import Link from 'next/link';
import DeleteUserButton from '@/components/admin/DeleteUserButton';

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
            <Header />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Manage Employees</h1>
                            <p className="text-muted-foreground">
                                View and manage library staff members
                            </p>
                        </div>

                        <Link href="/admin/employees/new">
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add New Employee
                            </Button>
                        </Link>
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
                                    <UserIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h2 className="mt-4 text-xl font-semibold">No employees found</h2>
                                    <p className="text-muted-foreground">
                                        There are no staff members in the system.
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
                                            {employees.map((employee) => {
                                                // Don't allow deleting yourself
                                                const isSelf = employee.id === session.user.id;

                                                return (
                                                    <TableRow key={employee.id}>
                                                        <TableCell className="font-medium">{employee.code}</TableCell>
                                                        <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                                                        <TableCell>{employee.email}</TableCell>
                                                        <TableCell>
                                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${employee.role === 'ADMIN' ?
                                                                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                                }`}>
                                                                {employee.role.charAt(0) + employee.role.slice(1).toLowerCase()}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>{employee.phone}</TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Link href={`/admin/employees/edit/${employee.id}`}>
                                                                    <Button variant="ghost" size="sm">
                                                                        <PencilIcon className="h-4 w-4" />
                                                                        <span className="sr-only">Edit</span>
                                                                    </Button>
                                                                </Link>
                                                                <DeleteUserButton
                                                                    userId={employee.id}
                                                                    userName={`${employee.firstName} ${employee.lastName}`}
                                                                    isDisabled={isSelf}
                                                                />
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}