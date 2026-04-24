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

        if (!user ||  user.role !== 'admin' ) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        if(body.action === 'reject' ) {
            await prisma.transaction.update({
                where: {
                    id: body.transactionId
                },
                data: {
                    status: 'rejected'
                }
            })

            return NextResponse.json( { message: "rejected" }, {status: 200} )
        }

        const transaction = await prisma.transaction.findUnique({
            where: {
                id: body.transactionId
            },
            include : {
                user: true
            }
        })

        if( !transaction || !transaction.user || !transaction.amount || !transaction.user.stripe_account_id ) {
            return NextResponse.json(
                { message: "Transaction or user stripe account not found" },
                { status: 400 }
            );
        }

        let amount =  ( transaction.amount || 0 )  ; 
        console.log(amount)

        const transfer = await stripe.transfers.create({
            amount: Math.ceil(transaction.amount / 2000 ), 
            currency: "USD",
            destination: transaction.user.stripe_account_id,
        });

        console.log(transfer);

        await prisma.transaction.update({
            where : { id: transaction.id },
            data: { status: 'accepted', stripe_session_id: transfer.id }
        })

        await prisma.user.update({
            where: { email: transaction.user.email },
            data: {
                coins: {
                    decrement: transaction.amount
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