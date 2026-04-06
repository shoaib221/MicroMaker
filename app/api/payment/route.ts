

import Stripe from "stripe";
const stripe = new Stripe(process.env['STRIPE_KEY']!);
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

const YOUR_DOMAIN = process.env['YOUR_DOMAIN'] || "http://localhost:3000";

// cashin
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

        const { amount } = await req.json();

        const stripe_session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'BDT',
                        unit_amount: amount * 100, // Convert to smallest currency unit
                        product_data: {
                            name: `MicroMaker Cash In`,
                        }
                    },
                    quantity: 1
                },
            ],
            customer_email: user.email,
            metadata: {
                amount,
                userId: user.id,
                type: "cashin"
            },
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/payment/failure?session_id={CHECKOUT_SESSION_ID}`
        });

        return NextResponse.json({ url: stripe_session.url });
    } catch (error: any) {
        console.error("PAYMENT ERROR:", error);
        return NextResponse.json(
            { message: "Payment processing failed" },
            { status: 500 }
        );
    }
}


