import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function GET() {

    const session = await getServerSession(authOptions);

    const tests = await prisma.test.findMany();

    console.log("Testing API");

    return NextResponse.json({
        success: true,
        message: "Tests fetched successfully",
        tests,
        session,
        env_variables: {
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            GITHUB_ID: process.env.GITHUB_ID,
            GITHUB_SECRET: process.env.GITHUB_SECRET,
            DATABASE_URL: process.env.DATABASE_URL,
            DIRECT_URL: process.env.DIRECT_URL,
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

        },
        
    } , { status: 200 });
}


export async function POST(req: Request) {
    const body = await req.json();

    return NextResponse.json({
        success: true,
        receivedData: body,
    });
}
