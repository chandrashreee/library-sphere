import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookX } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Page Not Found - LibrarySphere',
    description: 'The requested page could not be found',
};

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <BookX className="h-20 w-20 text-muted-foreground mb-6" />
                <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link href="/">
                    <Button size="lg">
                        Return to Home
                    </Button>
                </Link>
            </main>
        </div>
    );
} 