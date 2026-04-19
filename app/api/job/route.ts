import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";


// create job - employer only
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }


        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });


        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }


        const body = await req.json();

        console.log("Received job creation request:", body);

        const new_job = await prisma.job.create({
            data: {
                title: body.title,
                description: body.description,
                salary: body.salary,
                required_employees: body.required_employees,
                deadline: body.deadline,
                submission_info: body.submission_info,
                imageUrl: body.imageUrl,
                employer: {
                    connect: { id: user.id },
                },
                category: {
                    connect: { id: body.categoryId || "1" },
                }
            },
        });


        return NextResponse.json(
            {
                success: true,
                message: "Job created successfully",
                job: new_job,
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



// employer's jobs
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
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }


        const jobs = await prisma.job.findMany({
            where: {
                employerId: user.id,
            },

        });

        return NextResponse.json({ jobs }, { status: 200 });



    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }

}


