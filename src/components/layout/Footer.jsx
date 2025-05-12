import Link from 'next/link';
import { BookIcon, GithubIcon, InstagramIcon, TwitterIcon } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <BookIcon className="h-6 w-6" />
                            <span className="font-bold">LibrarySphere</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            A modern library management system designed to streamline document management, loans, and reservations.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Documents
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
                                <TwitterIcon className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground transition-colors">
                                <InstagramIcon className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                                <GithubIcon className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} LibrarySphere. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 