import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/utils/db";
import type { Adapter } from 'next-auth/adapters';
import { Session, SessionStrategy, TokenSet } from "next-auth";
import { Roles, User } from "@prisma/client";

export const authOptions = {
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/new-user",
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.password || !credentials?.email) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email,
                    },
                });

                if (
                    user &&
                    (await bcrypt.compare(credentials.password, user.password!))
                ) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: user.role,
                    }
                }

                return null;
            },
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
            style: {
                logo: "/apple.svg",
                text: "#000",
                bg: "#fff",
            },
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        })
    ],
    cookies: {
        csrfToken: {
            name: 'next-auth.csrf-token',
            options: {
                httpOnly: true,
                sameSite: false,
                path: '/',
                secure: true
            }
        },
        pkceCodeVerifier: {
            name: 'next-auth.pkce.code_verifier',
            options: {
                httpOnly: true,
                sameSite: false,
                path: '/',
                secure: true
            }
        }
    },
    session: { strategy: "jwt" as SessionStrategy},
    callbacks: {
        async jwt({ token, user } : { token: TokenSet, user: User }) {
            if(user){
                token.role = user.role
                token.userId = user.id
            }
            return token
        },
        async session({ session, token } : { session: Session, token: TokenSet }) {
            if(session.user) {
                session.user.role = token.role as Roles
                session.user.id = token.userId as string
            }

            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};