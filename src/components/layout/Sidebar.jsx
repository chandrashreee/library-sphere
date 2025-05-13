"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpenText,
    Users,
    ClipboardList,
    CalendarClock,
    UserCog,
    User,
    LogOut,
    BookOpen,
    FileText
} from "lucide-react";

export default function Sidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const userRole = session?.user?.role || 'guest';

    const NavItem = ({ href, icon, label, onlyShowFor = [] }) => {
        // If onlyShowFor is empty, show to all roles, otherwise check if user role is included
        const shouldShow = onlyShowFor.length === 0 || onlyShowFor.includes(userRole);

        if (!shouldShow) return null;

        const isActive = pathname === href;

        return (
            <li>
                <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary/10"
                        }`}
                >
                    {icon}
                    <span>{label}</span>
                </Link>
            </li>
        );
    };

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#0E2A47] text-white">
            <div className="flex h-16 items-center justify-center border-b border-white/10">
                <BookOpen className="h-6 w-6 mr-2" />
                <h1 className="text-2xl font-serif">Montreal Library</h1>
            </div>

            <div className="px-3 py-4">
                <p className="mb-4 text-center text-sm text-white/60">Knowledge for everyone</p>
                <nav>
                    <ul className="space-y-1">
                        <NavItem
                            href="/catalog"
                            icon={<BookOpenText className="h-5 w-5" />}
                            label="Browse Catalog"
                        />

                        <NavItem
                            href="/documents"
                            icon={<FileText className="h-5 w-5" />}
                            label="Documents"
                            onlyShowFor={['admin', 'employee']}
                        />

                        <NavItem
                            href="/members"
                            icon={<Users className="h-5 w-5" />}
                            label="Members"
                            onlyShowFor={['admin', 'employee']}
                        />

                        <NavItem
                            href="/loans"
                            icon={<ClipboardList className="h-5 w-5" />}
                            label="Loans"
                            onlyShowFor={['admin', 'employee']}
                        />

                        <NavItem
                            href="/reservations"
                            icon={<CalendarClock className="h-5 w-5" />}
                            label="Reservations"
                            onlyShowFor={['admin', 'employee']}
                        />

                        <NavItem
                            href="/employees"
                            icon={<UserCog className="h-5 w-5" />}
                            label="Employees"
                            onlyShowFor={['admin']}
                        />

                        <NavItem
                            href="/account"
                            icon={<User className="h-5 w-5" />}
                            label="My Account"
                            onlyShowFor={['member', 'admin', 'employee']}
                        />
                    </ul>
                </nav>
            </div>

            {session && (
                <div className="absolute bottom-0 left-0 w-full border-t border-white/10">
                    <div className="px-4 py-3">
                        <div className="mb-2 text-sm">
                            <p className="text-white/60">Logged in as:</p>
                            <p className="font-medium">{session.user.name}</p>
                            <p className="text-xs text-white/60 capitalize">{session.user.role}</p>
                        </div>
                        <Link
                            href="/api/auth/signout"
                            className="flex w-full items-center justify-center gap-2 rounded bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Link>
                    </div>
                </div>
            )}
        </aside>
    );
} 