import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpenCheck, BookText, BookUser, CalendarClock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Welcome to <span className="text-primary">LibrarySphere</span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                A modern library management system designed to streamline document management, loans, and reservations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/documents">
                  <Button variant="outline" size="lg">Browse Documents</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookText className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Extensive Collection</h3>
                <p className="text-muted-foreground">
                  Browse our vast collection of books, comics, games, and educational materials.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookOpenCheck className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Easy Loans</h3>
                <p className="text-muted-foreground">
                  Borrow documents with a simple process and manage your loans online.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <CalendarClock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Reservations</h3>
                <p className="text-muted-foreground">
                  Reserve documents in advance and get notified when they're available.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookUser className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Member Benefits</h3>
                <p className="text-muted-foreground">
                  Enjoy special benefits as a registered member of LibrarySphere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Join our community today and discover the joy of reading and learning.
              </p>
              <Link href="/register">
                <Button size="lg">Register Now</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
