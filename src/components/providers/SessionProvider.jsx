"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({ children }) {
    return (
        <NextAuthSessionProvider
            refetchInterval={0}
            refetchOnWindowFocus={false}
        >
            {children}
        </NextAuthSessionProvider>
    );
} 