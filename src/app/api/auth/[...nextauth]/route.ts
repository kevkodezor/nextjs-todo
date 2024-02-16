import prisma from '@/lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters';


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
                username: { label: 'Email', type: 'email', placeholder: 'enter your email' },
                password: { label: 'Password', type: 'password', placeholder: 'enter your password' }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
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
            console.log(token);
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