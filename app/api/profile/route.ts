import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { authOptions } from "../auth/authOptions";

export async function GET() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    

    const profile = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    return NextResponse.json({
        profile,
    }, { status: 200 });
}




export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        console.log("Received profile update request:", body);

        const updation: { name?: string; image?: string } = {}


        if (body.name) updation.name = body.name;
        if (body.image) updation.image = body.image;

        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: updation,
        });

        console.log("User updated successfully:", updatedUser);

        return NextResponse.json(
            {
                success: true,
                message: "User updated successfully",
                data: updatedUser,
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

