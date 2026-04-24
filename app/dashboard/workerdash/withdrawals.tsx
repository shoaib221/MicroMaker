"use client"

import { useAuthContext } from "@/library/auth/context";
import { DateDisplay } from "@/library/miscel/date";
import { usePagination1 } from "@/library/miscel/pagination";
import { Transaction } from "@/prisma/generated/client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";



export function Withdrawals() {
    const { myProfile } = useAuthContext();
    const [amount, setAmount] = useState(0);
    const [acno, setAcno] = useState("");
    const { data, PageTag } = usePagination1<Transaction>({ url: '/api/withdrawals' })


    async function handleOnboard(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            const response = await axios.post("/api/payment/stripe/onboard", { amount });
            const { url } = response.data;
            
            if(url) {
                toast.info("Please setup your connected account")
                window.location.href = url;
            } else {
                toast.success( "Withdrawal request placed" );
            }
            
        } catch (error) {
            console.error("Error initiating Stripe onboarding:", error);
        }
    }

    return (
        <div className="grow p-4" >
            <div className="" >
                <div className="text-4xl font-bold text-(--color3) pl-16" >{myProfile?.coins}</div>
                <div>Coins Available For Withdrawal </div>
            </div>

            <br /> <br />

            <div className="text-xl font-bold text-(--color3)" >Withdrawal Form</div>
            <br />

            <form>
                <div>Coin to Withdraw</div>

                <input type="number" placeholder="How much to withdraw..." className="p-2 input1"
                    value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />

                <div> {amount / 20} BDT to Withdraw</div>
                <br />

                <select>
                    <option>Select Payment System</option>
                    <option>Stripe</option>
                </select>

                <br /> <br />



                {myProfile?.coins && myProfile?.coins >= amount ? <button className="button-2" onClick={handleOnboard} >
                    Withdraw
                </button> : <button disabled>
                    Insufficient Coins
                </button>}



            </form>

            <div className="h-20 w-full" ></div>

            <div className="header-1" >Withdrawals</div>



            <div className="flex flex-col gap-4 p-4" >
                {data && data.map(elem => (
                    <div key={elem.id} className="box-12" >
                        Request for {elem.amount} coins  <br />
                        Requested at <DateDisplay date={elem.createdAt} /> <br />
                        Status: { elem.status }

                    </div>
                ))}
            </div>

            <PageTag />

        </div>
    )
}

