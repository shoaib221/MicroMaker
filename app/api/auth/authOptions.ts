import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) {
                    return null;
                }

                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (credentials.email === user.email && isValidPassword) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                }

                return null;
            },
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),



    ],
    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,


    callbacks: {
        async signIn({ user, account }) {
            // Only run for OAuth providers

            if (account?.provider === "google" || account?.provider === "github") {

                console.log("signin callback ###")

                if (!user.email) {
                    console.log(user, "No email from provider");
                    user.email = `${user.name?.replace(/\s+/g, '.').toLowerCase()}${user.id}@oauth.com`;
                }

                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });

                console.log("signin callback *****");

                console.log(existingUser)

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email!,
                            name: user.name,
                            image: user.image,
                            password: "", // OAuth users won't have a password
                            role: "user", // default role
                        },
                    });
                }

                
            }

            return true; // allow login
        },


        // Runs when token is created / updated
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                //token.role = user.role; // if you have role
            }
            return token;
        },

        // Runs when session is returned to frontend
        async session({ session, token }) {
            if (session.user) {
                //session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                //session.user.role = token.role;
            }
            return session;
        },
    }
}