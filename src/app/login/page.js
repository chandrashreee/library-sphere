import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AuthForm from '@/components/auth/AuthForm';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Login - LibrarySphere',
    description: 'Login to your LibrarySphere account',
};

export default async function LoginPage() {
    // Check if user is already logged in
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <AuthForm type="login" />
                </div>
            </main>
        </div>
    );
} 