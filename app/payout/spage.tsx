"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react"


export function PayoutPage() {
    const [status, setStatus] = useState(false);
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount");

    useEffect(() => {
        async function checkStripeOnboarding() {
            try {
                const response = await axios.post("/api/payment/stripe/transfer", { amount });
                setStatus(true)
                alert("Successfully transferred!")
            } catch (error) {
                console.error("Error checking Stripe onboarding:", error);
                alert("Error during transfer. Please try again.")
            }
        }

        checkStripeOnboarding();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Payout Page</h1>

            { status ? (
                <div>
                    <p>Successfully transferred!</p>
                </div>
            ) : (
                <div>
                    <p>Transfering ...</p>
                </div>
            )}
        </div>
    )
}