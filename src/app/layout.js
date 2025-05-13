import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/components/providers/SessionProvider";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LibrarySphere - Montreal Library",
  description: "A modern library management system for Montreal Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Sidebar />
          <div className="pl-64 min-h-screen">
            <main className="px-6 py-6">
              {children}
            </main>
          </div>
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
