import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";




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

        const data = await prisma.jobCategory.findMany({});

        return NextResponse.json({ data }, { status: 200 });



    } catch (error) {
        console.error("Error fetching submissions:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }

}





