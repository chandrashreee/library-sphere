'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookIcon, LogOutIcon, UserIcon } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const isAdmin = session?.user?.role === 'ADMIN';
    const isEmployee = session?.user?.role === 'EMPLOYEE' || isAdmin;

    const getInitials = () => {
        if (!session?.user?.name) return 'U';
        return session.user.name
            .split(' ')
            .map((n) => n[0])
            .join('');
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/documents', label: 'Documents' },
    ];

    if (isAuthenticated) {
        navLinks.push({ href: '/dashboard', label: 'Dashboard' });
        navLinks.push({ href: '/loans', label: 'My Loans' });
        navLinks.push({ href: '/reservations', label: 'My Reservations' });
    }

    if (isEmployee) {
        navLinks.push({ href: '/admin/documents', label: 'Manage Documents' });
    }

    if (isAdmin) {
        navLinks.push({ href: '/admin/members', label: 'Manage Members' });
        navLinks.push({ href: '/admin/employees', label: 'Manage Employees' });
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
                <div className="mr-4 flex">
                    <Link href="/" className="flex items-center space-x-2">
                        <BookIcon className="h-6 w-6" />
                        <span className="font-bold inline-block">LibrarySphere</span>
                    </Link>
                </div>

                <nav className="flex items-center text-sm font-medium space-x-6 mx-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors hover:text-foreground/80 ${pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="ml-auto flex items-center space-x-4">
                    {!isAuthenticated ? (
                        <>
                            <Link href="/login">
                                <Button variant="outline" size="sm">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">
                                    Register
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="" alt={session?.user?.name || 'User'} />
                                        <AvatarFallback>{getInitials()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session?.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex w-full cursor-pointer items-center">
                                        <UserIcon className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="cursor-pointer"
                                >
                                    <LogOutIcon className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
} 