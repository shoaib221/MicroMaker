import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";


// fetch all jobs
export async function GET(req: Request) {
    try {

        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const user  =  await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user || !user.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }



        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        const allowedFields = ["title", "description", "category"];

        const filter = {
            status: 'accepted',
            employeeId: user.id
        }


        let pages = await prisma.jobSubmissions.count({
            where: filter
        })

        pages =  Math.ceil( pages / limit ) ;

        const data = await prisma.jobSubmissions.findMany({
            where: filter,
            include: {
                job: true
            },
            skip: (page - 1) * limit,
            take: limit,

        });

        return NextResponse.json({ data: data, pages }, { status: 200 });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

