import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export async function GET( req: Request ) { 

    try {

        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const profile = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                name: true,
                email: true,
                image: true,
                id: true,
            },
        });

        if (!profile) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const totalWorkers = await prisma.user.count({
            where: {
                role: "worker",
            },
        });

        const totalBuyers = await prisma.user.count({
            where: {
                role: "buyer",
            },
        });

        const q1 = await prisma.user.aggregate({
            _sum: {
                coins: true,
            },
        });

        const totalCoins = q1._sum.coins || 0;

        const q2 = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
        });

        const totalPayments = q2._sum.amount || 0;

        const { searchParams } = new URL(req.url);

        
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        

        
            

        let pages = await prisma.transaction.count({
            where: {
                type: "cashout",
                status: "pending",
            },
        })

        pages = Math.ceil( pages / limit );

        


        const withdrawalRequests = await prisma.transaction.findMany({
            where: {
                type: "cashout",
                status: "pending",
            },
            include: {
                user: true,
            },
            orderBy : {
                createdAt: "asc"
            },
            skip: (  page - 1) * limit,
            take: limit,
            
        });

        return NextResponse.json({
            totalWorkers,
            totalBuyers,
            totalCoins, totalPayments,
            withdrawalRequests,
            pages
        }, { status: 200 });

    } catch (error) {
        
       
        
        console.error("Error fetching admin stats:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );

    }
}

           
