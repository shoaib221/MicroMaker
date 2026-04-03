import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export async function GET() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    
    const users = await prisma.user.findMany({
        where: { },
    });

    return NextResponse.json({
        users,
    }, { status: 200 });
}
