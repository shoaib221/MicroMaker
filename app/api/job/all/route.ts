import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";


// fetch all jobs
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const searchBy = searchParams.get("searchBy");
        const searchFor = searchParams.get("searchFor");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "1");

        const allowedFields = ["title", "description", "category"];

        const filter =
            (searchBy && allowedFields.includes(searchBy) && searchFor)
                ? {
                    [searchBy]: {
                        contains: searchFor,
                        mode: "insensitive",
                    },
                }
                : {};

        let pages = await prisma.job.count({
            where: filter
        })

        pages = (pages + limit -1)/limit;

        const jobs = await prisma.job.findMany({
            where: filter,
            skip: (  page - 1) * limit,
            take: limit,
            
        });

        return NextResponse.json({ jobs, pages }, { status: 200 });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

