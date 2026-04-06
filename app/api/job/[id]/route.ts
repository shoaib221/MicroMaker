import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = await params;
    console.log( 'params', params);

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
        console.log(id)
        const job = await prisma.job.findUnique({
            where: {
                id: id,
            },
        });

        if (!job) {
            return NextResponse.json(
                { message: "Job not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ job }, { status: 200 } );
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }



};