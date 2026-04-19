import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";



export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const profile = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
            },
        });

        // ❗ FIX: handle null user
        if (!profile) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const userId = profile.id;

        
        const [
            totalSubmissions,
            pendingSubmissions,
            earningsResult,
            approvedSubmissions,
        ] = await Promise.all([
            prisma.jobSubmissions.count({
                where: { employeeId: userId },
            }),

            prisma.jobSubmissions.count({
                where: { employeeId: userId, status: "pending" },
            }),

            prisma.transaction.aggregate({
                where: { receiverId: userId },
                _sum: { amount: true },
            }),

            prisma.jobSubmissions.findMany({
                where: { employeeId: userId, status: "accepted" },
                include: { job: true },
            }),
        ]);

        const totalEarnings = earningsResult._sum.amount ?? 0;

        return NextResponse.json({
            totalSubmissions,
            pendingSubmissions,
            totalEarnings,
            approvedSubmissions,
        });

    } catch (error) {
        console.error("Error fetching buyer stats:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}