import Stripe from "stripe";
const stripe = new Stripe(process.env['STRIPE_KEY']!);

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

const YOUR_DOMAIN = process.env[ 'YOUR_DOMAIN' ] || "http://localhost:3000";


export async function POST(req: Request) {

    try {
        const session = await getServerSession(authOptions);
        if ( !session || !session.user || !session.user.email ) {
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


        console.log(body)

        

        //const { session_id } = Object.fromEntries(new URL(req.url).searchParams);
        const stripe_session = await stripe.checkout.sessions.retrieve(body.stripe_session_id as string);

        //console.log("Stripe session retrieved:", stripe_session);

        if(!stripe_session || stripe_session.payment_status !== "paid" || !stripe_session.metadata ) {
            return NextResponse.redirect(`${YOUR_DOMAIN}/payment/failure`);
        }

        const transaction = await prisma.transaction.create({
            data: {
                amount: parseInt(stripe_session.metadata.amount) * 10,
                user: {
                    connect: { id: user.id }
                },
                type: "cashin",
                stripe_session_id: stripe_session.id
            }
        });

        const new_user = await prisma.user.update({
            where: { id: user.id },
            data: {
                coins: {
                    increment: parseInt(stripe_session.metadata.amount) * 10
                }
            }
        });

        console.log(new_user);

        //console.log("Transaction recorded in database:", transaction);
        return NextResponse.json({ message: "Payment verified successfully", ...transaction, payment_status: stripe_session.payment_status, payment_intent: stripe_session.payment_intent });
    } catch (err) {
        console.error("Error processing payment success:", err);
        return NextResponse.redirect(`${YOUR_DOMAIN}/payment/failure`);
    }

}

