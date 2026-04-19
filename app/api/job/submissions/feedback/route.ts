import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";




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


        const { jobId, submissionId, feedback } = await req.json();

        const job = await prisma.job.findUnique({
            where: {
                id: jobId,
            },
        });

        if (!job || job.employerId !== user.id || job.required_employees <= 0) {
            return NextResponse.json(
                { message: "Unsuccessful" },
                { status: 200 }
            );
        }

        await prisma.job.update({
            where: {
                id: jobId,
            },
            data: {
                required_employees: feedback === "accept" ? job.required_employees - 1 : job.required_employees,
            },
        });

        const updatedSubmission = await prisma.jobSubmissions.update({
            where: {
                id: submissionId
            },
            data: {
                status: feedback === "accept" ? "accepted" : "rejected",
            }
        });

        if( feedback === "accept") {
            await prisma.user.update({
                where: {
                    id: updatedSubmission.employeeId,
                },
                data: {
                    coins: {
                        increment: job.salary,
                    },
                },
            });

            await prisma.user.update({
                where: {
                    id: job.employerId,
                },

                data: {
                    coins: {
                        decrement: job.salary,
                    },
                },
            });

            await prisma.transaction.create({
                data: {
                    amount: job.salary,
                    type: "send",
                    senderId: job.employerId,
                    receiverId: updatedSubmission.employeeId,
                },
            });
        }

        

        return NextResponse.json(
            {
                success: true,
                message: "Job created successfully",
                updatedSubmission
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

// https://express-practice-chi.vercel.app/auth/send-message





