import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                role: { label: 'Role', type: 'text' }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password || !credentials.role) {
                    return null;
                }

                try {
                    let user = null;

                    if (credentials.role === 'member') {
                        user = await prisma.member.findUnique({
                            where: { email: credentials.email },
                        });
                    } else if (credentials.role === 'staff') {
                        user = await prisma.employee.findUnique({
                            where: { email: credentials.email },
                        });
                    }

                    if (!user) {
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordValid) {
                        return null;
                    }

                    return {
                        id: user.id,
                        code: user.code,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        role: credentials.role === 'member' ? 'member' : user.role,
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                } finally {
                    await prisma.$disconnect();
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.code = user.code;
                token.role = user.role;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.code = token.code;
                session.user.role = token.role;
                session.user.name = token.name;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}; 