import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function GET() {


    const workers = await prisma.user.findMany({
        where: {
            role: "worker",
        },
        orderBy: {
            coins: "desc",
        },        
        take: 10,
    });

    return NextResponse.json({
        workers,
    }, { status: 200 });
}

