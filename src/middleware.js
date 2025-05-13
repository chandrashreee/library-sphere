import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = await getToken({
        req: request,
        secret: 'LibrarySphere_Default_Secret_For_Development'
    });

    // Public routes that anyone can access without auth
    const publicPaths = ['/login', '/api/auth'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // Root path handling
    if (pathname === '/') {
        return token
            ? NextResponse.redirect(new URL('/catalog', request.url))
            : NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect from login page if authenticated
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/catalog', request.url));
    }

    // Redirect to login if accessing protected route without auth
    if (!isPublicPath && !token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
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