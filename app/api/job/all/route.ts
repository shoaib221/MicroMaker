import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";


// fetch all jobs
export async function GET(req: Request) {
    try {

        const jobs = await prisma.job.findMany({
            
        });

        return NextResponse.json({ jobs }, { status: 200 } );

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

