import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";



// fetch all withdrawals
export async function GET(req: Request) {
    try {

        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if ( !user || !user.id ) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);


        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        let pages = await prisma.transaction.count({
            where: {
                userId: user.id,
                type: 'cashout'
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        pages = Math.ceil( pages / limit );

        const data = await prisma.transaction.findMany({
            where: {
                userId: user.id,
                type: 'cashout'
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return NextResponse.json({ data, pages }, { status: 200 });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

