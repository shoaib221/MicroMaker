"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/library/auth/context";
import axios from "axios";
import { Transaction, User } from "@/prisma/generated/client";

type TransactionWithSender = Transaction & {
    sender: User;
}

export function Home() {
    const [ stats, setStats ] = useState({
        totalWorkers: 0,
        totalBuyers: 0,
        totalCoins: 0,
        totalPayments: 0
    });

    const [ withdrawalRequests, setWithdrawalRequests ] = useState<TransactionWithSender[]>([]);

    useEffect(() => {
        async function fetchStats() {
            try {
                let res = await axios.get("/api/stats/admin");
                console.log("Stats fetched:", res.data);
                setStats({...res.data});
                setWithdrawalRequests(res.data.withdrawalRequests);
            } catch(err) {
                console.error("Error fetching stats:", err);

            }
        }
        fetchStats();
    }, [])


    return (
        <div className="grow border-2" >

            <div className="flex flex-col lg:flex-row justify-evenly" >
                <div className="text-center" >
                    <div className="text-4xl font-bold text-(--color3)" >{stats.totalWorkers}</div>
                    <div className="font-bold" >Total Workers </div>
                </div>

                <div className="text-center" >
                    <div className="text-4xl font-bold text-(--color3)" >{stats.totalBuyers}</div>
                    <div className="font-bold" >Total Buyers </div>
                </div>

                <div className="text-center" >
                    <div className="text-4xl font-bold text-(--color3)" >{stats.totalCoins}</div>
                    <div className="font-bold" >Total Available Coins</div>
                </div>

                <div className="text-center" >
                    <div className="text-4xl font-bold text-(--color3)" >{stats.totalPayments}</div>
                    <div className="font-bold" >Total Payments</div>
                </div>

                
            
            </div>
            
            
            
            
            <br/> <br/>
            <div className="text-center text-2xl font-bold" >
                Withdraw Requests
            </div>

            <div className="flex flex-col gap-4" >
                { withdrawalRequests.length > 0 && withdrawalRequests.map((req) => (
                    <div key={req.id} className="shadow1 rounded-lg p-2 flex justify-between" >
                        <div>
                            <p>Amount: {req.amount}</p>
                            <p>Sender: {req.sender?.name} ({req.sender?.email})</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}