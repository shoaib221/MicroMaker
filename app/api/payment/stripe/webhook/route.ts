

import { stripe } from "@/app/api/payment/stripe";


export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "account.updated") {
        const account = event.data.object;
        console.log("Account updated:", account.id);
    }

    if (event.type === "transfer.created") {
        console.log("Transfer sent!");
    }

    return new Response("OK", { status: 200 });
}