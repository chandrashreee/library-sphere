"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/catalog");
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // This is just a simple loading indicator while checking session
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <BookOpen className="h-16 w-16 text-[#0E2A47] animate-pulse" />
      <h1 className="mt-6 text-2xl font-serif">Montreal Library</h1>
      <p className="mt-2 text-muted-foreground">Loading...</p>
    </div>
  );
}
