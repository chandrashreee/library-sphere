import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AuthForm from '@/components/auth/AuthForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Register - LibrarySphere',
    description: 'Create a new account on LibrarySphere',
};

export default async function RegisterPage() {
    // Check if user is already logged in
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <AuthForm type="register" />
                </div>
            </main>
            <Footer />
        </div>
    );
} 