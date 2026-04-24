import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";


export async function GET  (req: Request, context: { params: Promise<{ id: string }> } )  {
    const { id } = await context.params;
    //console.log( 'params', params);

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


        console.log(id);
        const job = await prisma.job.findUnique({
            where: {
                id: id,
            },
            include: {
                employer: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
                category: {
                    select: {
                        name: true
                    }
                }
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


export async function DELETE  (req: Request, context: { params: Promise<{ id: string }> } )  {
    const { id } = await context.params;

    console.log("Delete request for job id:", id);

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

        if (!user ) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

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


        if (user.role !== "admin" && user.id !== job.employerId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        
        //console.log("Delete request for job id:", id);

        

        await prisma.job.delete({
            where: {
                id: id,
            },
        });

        //console.log("Delete request for job id:", id);

        return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 } );

    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json(   
        { message: "Internal server error" },
        { status: 500 }
        );
    }

};