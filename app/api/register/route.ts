import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import bcrypt  from "bcrypt"


export async function GET() {

    const tests = await prisma.test.findMany();

    return NextResponse.json({
        success: true,
        message: "Tests fetched successfully",
        data: tests,
    });
}


export async function POST(req: Request) {
    try {
        const body = await req.json();

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "User registered successfully",
                data: newUser,
            },
            { status: 201 }
        );
        
    } catch (error: any) {
        console.error("REGISTER ERROR:", error);

        // Prisma unique constraint error
        if (error.code === "P2002") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email already exists",
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}

