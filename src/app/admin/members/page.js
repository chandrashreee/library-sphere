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
import { PencilIcon, PlusCircle, Trash2, UserIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Manage Members - LibrarySphere',
    description: 'Admin dashboard for managing library members',
};

export default async function ManageMembersPage() {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/login');
    }

    // Fetch all members
    const members = await prisma.user.findMany({
        where: {
            role: 'MEMBER',
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
                        <h1 className="text-3xl font-bold">Manage Members</h1>
                        <p className="text-muted-foreground">
                            View and manage library members
                        </p>
                    </div>

                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Member
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Library Members</CardTitle>
                        <CardDescription>
                            A list of all registered members in the library system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {members.length === 0 ? (
                            <div className="text-center py-10">
                                <UserIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h2 className="mt-4 text-xl font-semibold">No members found</h2>
                                <p className="text-muted-foreground">
                                    There are no registered members in the system.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Member Code</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>City</TableHead>
                                            <TableHead className="w-[100px] text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {members.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell className="font-medium">{member.code}</TableCell>
                                                <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
                                                <TableCell>{member.email}</TableCell>
                                                <TableCell>{member.phone}</TableCell>
                                                <TableCell>{member.address?.city || 'N/A'}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <PencilIcon className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Delete</span>
                                                        </Button>
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