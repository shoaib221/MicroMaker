import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export async function GET() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    
    const users = await prisma.user.findMany({
        where: { },
    });

    return NextResponse.json({
        users,
    }, { status: 200 });
}


export async function DELETE( req: Request, context: { params: Promise<{ id: string }> } ) {
    const params = await context.params;

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        await prisma.user.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(
            { message: "User deleted successfully" },
            { status: 200 }
        );
    }

    catch (err) {
        console.error("Error deleting user:", err);
        return NextResponse.json(
            { message: "Error deleting user" },
            { status: 500 }
        );
    }
}


export async function PUT( req: Request,  context: { params: Promise<{ id: string }> } ) {
    const params = await context.params;
    console.log("Received PUT request for user ID:", params.id);

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { role } = await req.json();
        console.log("Updating user ID:", params.id, "to role:", role);
        await prisma.user.update({
            where: {
                id: params.id,
            },
            data: {
                role,
            },
        });
        return NextResponse.json(
            { message: "User updated successfully" },
            { status: 200 }
        );
    }
    catch (err) {
         console.error("Error updating user:", err);
        return NextResponse.json(
            { message: "Error updating user" },
            { status: 500 }
        );
    }

}