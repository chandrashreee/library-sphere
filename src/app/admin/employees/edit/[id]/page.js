import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserForm from '@/components/forms/UserForm';

export const metadata = {
    title: 'Edit Employee - LibrarySphere',
    description: 'Edit an existing employee in the library system',
};

export default async function EditEmployeePage({ params }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/login');
    }

    // Fetch the user
    const user = await prisma.user.findUnique({
        where: { id },
        include: { address: true },
    });

    // If user not found or not an employee/admin, redirect to 404
    if (!user || (user.role !== 'EMPLOYEE' && user.role !== 'ADMIN')) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Edit Employee</h1>
                        <p className="text-muted-foreground">
                            Update employee information in the library system
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Employee Information</CardTitle>
                            <CardDescription>
                                Edit the details for {user.firstName} {user.lastName}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserForm
                                user={user}
                                roles={['EMPLOYEE', 'ADMIN']}
                                isEdit={true}
                            />
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
} 