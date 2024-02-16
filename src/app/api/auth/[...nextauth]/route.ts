import prisma from '@/lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters';
import { loginCredentials } from '@/actions';

export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
                password: { label: 'Password', type: 'password', placeholder: 'Enter your password' }
            },
            async authorize(credentials, req) {
                const user = await loginCredentials(credentials!.email, credentials!.password);
                if (user) return user;
                return null;
            }
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            return true;
        },
        async jwt({ token, user, account, profile }) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
            token.rol = dbUser?.rol ?? ['no-rol'];
            token.id = dbUser?.id ?? 'no-uuid';
            return token;
        },
        async session ({ session, token, user }) {
            if (session && session.user) {
                session.user.rol = token.rol;
                session.user.id = token.id;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };