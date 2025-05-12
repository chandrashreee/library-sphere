import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/providers/SessionProvider';
import ToastProvider from '@/components/providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LibrarySphere - Library Management System',
  description: 'A modern library management system',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider session={session}>
          {children}
          <ToastProvider />
        </SessionProvider>
      </body>
    </html>
  );
}
