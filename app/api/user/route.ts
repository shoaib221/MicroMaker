import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export async function GET(req: Request) {

    try {



        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }


        const { searchParams } = new URL(req.url);

        const userType = searchParams.get("userType");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");


        const allowedTypes = ["buyer", "worker", "admin"];

        const filter =
            userType && allowedTypes.includes(userType)
                ? { role: userType }
                : {};

        let pages = await prisma.user.count({
            where: filter
        })

        pages = Math.ceil(pages / limit);

        const users = await prisma.user.findMany({
            where: filter,
            skip: (page - 1) * limit,
            take: limit,

        });



        return NextResponse.json({ data: users, pages }, { status: 200 });

    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: err }, { status: 500 })
    }


}
