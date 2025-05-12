import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserForm from '@/components/forms/UserForm';

export const metadata = {
    title: 'Add New Member - LibrarySphere',
    description: 'Add a new member to the library system',
};

export default async function NewMemberPage() {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/login');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Add New Member</h1>
                        <p className="text-muted-foreground">
                            Create a new member account in the library system
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Member Information</CardTitle>
                            <CardDescription>
                                Fill in the details for the new member
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserForm
                                roles={['MEMBER']}
                            />
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
} 