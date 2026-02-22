import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET() {

    const tests = await prisma.test.findMany();

    return NextResponse.json({
        success: true,
        message: "Tests fetched successfully",
        data: tests,
    });
}


export async function POST(req: Request) {
    const body = await req.json();

    return NextResponse.json({
        success: true,
        receivedData: body,
    });
}
