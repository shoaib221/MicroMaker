import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";



// employer's received submissions for their jobs
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

        const { searchParams } = new URL(req.url);


        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");


        const submissions = await prisma.jobSubmissions.findMany({
            where: {
                job: {
                    employerId: user.id,
                },
                status: "pending",
            },
            include: {
                job: true,
                employee: true
            },
        });

        console.log("Submissions:", submissions);


        return NextResponse.json(
            {
                success: true,
                message: "Job created successfully",
                submissions
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("REGISTER ERROR:", error);

        

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}



// employee's submissions
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

        const { searchParams } = new URL(req.url);


        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        let pages = await prisma.jobSubmissions.count({
            where: {
                employeeId: user.id,
            },
        });

        pages = Math.ceil( pages / limit );


        const submissions = await prisma.jobSubmissions.findMany({
            where: {
                employeeId: user.id,
            },
            include: {
                job: true,
            },
            skip: (page-1) * limit,
            take: limit,
            orderBy: {
                createdAt: "desc",
            }

        });

        return NextResponse.json({ data: submissions, pages }, { status: 200 });



    } catch (error) {
        console.error("Error fetching submissions:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }

}





