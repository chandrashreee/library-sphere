import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // Public routes that anyone can access
    const publicPaths = ['/login', '/api/auth'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // If it's the root path, redirect to login if not logged in
    if (pathname === '/') {
        return token
            ? NextResponse.redirect(new URL('/catalog', request.url))
            : NextResponse.redirect(new URL('/login', request.url));
    }

    // If accessing public path and logged in, redirect to catalog
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/catalog', request.url));
    }

    // If trying to access protected path without being logged in
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role-based access control
    if (token) {
        const userRole = token.role;

        // Admin-only routes
        if (pathname.startsWith('/employees') && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/catalog', request.url));
        }

        // Staff-only routes (admin & employee)
        const staffOnlyPaths = ['/members', '/loans', '/reservations'];
        const isStaffOnlyPath = staffOnlyPaths.some(path => pathname.startsWith(path));

        if (isStaffOnlyPath && userRole === 'member') {
            return NextResponse.redirect(new URL('/catalog', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|images|favicon.ico).*)',
    ],
}; 