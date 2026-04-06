"use client"
import { useEffect } from "react"
import axios from "axios";

import { useSearchParams } from "next/navigation";


export default function Page() {
    const searchParams = useSearchParams();
    const stripe_session_id = searchParams.get("session_id");

    useEffect(() => {
        async function verifyPayment() {
            try {
                alert(stripe_session_id);
                const response = await axios.post("/api/payment/success", { stripe_session_id } );
                const result = await response.data;
                console.log("Payment verification result:", result);
            } catch (error) {
                console.error("Error verifying payment:", error);
            }
        }

        verifyPayment();
    }, []);


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-green-500 mb-4">Payment Successful</h1>
            <p className="text-lg text-gray-700">Your payment has been processed successfully.</p>
        </div>
    )
}

