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

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        await prisma.transaction.create({
            data: {
                status: 'pending',
                type: 'cashout',
                amount: body.amount,
                userId: user.id,
            }
        })

        console.log("Initiating Stripe onboarding process...");

        let accountId = "";

        if (!user.stripe_account_id) {

            const account = await stripe.accounts.create({
                type: "express",
            });

            accountId = account.id;

            await prisma.user.update({
                where: { email: session.user.email },
                data: { stripe_account_id: accountId },
            });

            const accountLink = await stripe.accountLinks.create({
                account: accountId,
                refresh_url: "http://localhost:3000/reauth",
                return_url: `http://localhost:3000/dashboard`,
                type: "account_onboarding",
            });

            return NextResponse.json({ url: accountLink.url }, { status: 200 });

        }


        return NextResponse.json( { url: null }, { status: 200 } )


    } catch (error: any) {
        console.error("Error initiating Stripe onboarding:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// transfer money