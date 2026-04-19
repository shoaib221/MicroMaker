import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";


// model JobSubmissions {
//   id          String   @id @default(cuid())
//   jobId       String
//   employeeId  String
//   credential String?
//   createdAt   DateTime @default(now())
//   status             String           @default("pending")
//   job  Job  @relation(fields: [jobId], references: [id], onDelete: Cascade)
//   user User @relation(fields: [employeeId], references: [id], onDelete: Cascade)
// }


export const POST = async (req: Request ) => {
    

    try {

        const body = await req.json();
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


        const new_submission = await prisma.jobSubmissions.create({
            data: {
                jobId: body.jobId,
                employeeId: user.id,
                credential: body.credential
            }
        });

        return NextResponse.json({ new_submission }, { status: 200 } );
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
};