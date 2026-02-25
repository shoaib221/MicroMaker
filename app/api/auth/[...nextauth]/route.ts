import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import { authOptions } from "../authOptions";


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };

