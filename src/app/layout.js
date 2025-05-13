import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/components/providers/SessionProvider";
import SidebarWrapper from "@/components/layout/SidebarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LibrarySphere - Montreal Library",
  description: "A modern library management system for Montreal Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <SidebarWrapper>
            {children}
          </SidebarWrapper>
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
