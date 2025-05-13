"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper({ children }) {
    const { status } = useSession();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    // Don't render sidebar on login page
    const isLoginPage = pathname === "/login";

    // Show sidebar only when authenticated and not on login page
    const showSidebar = status === "authenticated" && !isLoginPage;

    // Use useEffect to handle client-side rendering
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && showSidebar && <Sidebar />}
            <div className={isMounted && showSidebar ? "pl-64 min-h-screen" : "min-h-screen"}>
                <main className={isMounted && showSidebar ? "px-6 py-6" : ""}>
                    {children}
                </main>
            </div>
        </>
    );
} 