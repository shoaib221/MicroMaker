import { NextResponse } from "next/server";
import { stripe } from "@/app/api/payment/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { prisma } from "@/prisma/client";


// create account
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

        if (!user || !user.stripe_account_id)  {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const transfer = await stripe.transfers.create({
            amount: body.amount * 100 / 20, // Convert to smallest currency unit
            currency: "BDT",
            destination:    user.stripe_account_id,
        });


        await prisma.transaction.create({
            data: {
                amount: body.amount * 1,
                type: "cashout",
                userId: user.id,
                status: "completed",
                stripe_session_id: transfer.id

            }
        });

        await prisma.user.update({
            where: { email: session.user.email },
            data: {
                coins: {
                    decrement: body.amount * 1
                }
            }
        });


        return NextResponse.json({ transfer }, { status: 200 });
    } catch (error: any) {
        console.error("Error initiating Stripe onboarding:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// transfer money