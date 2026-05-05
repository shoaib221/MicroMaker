import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";


// fetch all jobs
export async function GET(req: Request) {
    try {
        console.log("job all");
        const { searchParams } = new URL(req.url);
        const searchBy = searchParams.get("searchBy");
        const searchFor = searchParams.get("searchFor");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const category_id = searchParams.get("category_id");
        const allowedFields = ["title", "category"];

        console.log(category_id, category_id ? "true" : "false")

        let filter = {};

        if (searchBy === "title") filter = {
            [searchBy]: {
                contains: searchFor,
                mode: "insensitive"
            }
        }
        else if (searchBy === "category") filter = {
            category: {
                name: {
                    contains: searchFor,
                    mode: "insensitive"
                }
            }
        }
        else if (category_id) filter = {
            categoryId: category_id
        }

        let pages = await prisma.job.count({
            where: filter
        })

        pages = Math.ceil(pages / limit);

        const jobs = await prisma.job.findMany({
            where: filter,
            skip: (page - 1) * limit,
            take: limit,

        });

        console.log("job all")

        return NextResponse.json({ data: jobs, pages }, { status: 200 });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

