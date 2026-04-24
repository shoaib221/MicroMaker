"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/library/auth/context";
import axios from "axios";
import { Transaction, User } from "@/prisma/generated/client";
import { toast } from "react-toastify";
import { Loading } from "@/library/miscel/loading";

type TransactionWithSender = Transaction & {
    user: User;
}

export function Home() {
    const [stats, setStats] = useState({
        totalWorkers: 0,
        totalBuyers: 0,
        totalCoins: 0,
        totalPayments: 0
    });

    const [withdrawalRequests, setWithdrawalRequests] = useState<TransactionWithSender[]>([]);
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function fetchStats() {
            try {
                let res = await axios.get(`/api/stats/admin?page=${page}&limit=10`);
                console.log("Stats fetched:", res.data);
                setStats({ ...res.data });
                setWithdrawalRequests(res.data.withdrawalRequests);
                setPages(res.data.pages)
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false)
            }
        }
        fetchStats();
    }, [])



    const PageTag = () => {

        if (loading) return <Loading />

        if (withdrawalRequests && withdrawalRequests.length > 0) return (
            <div className="flex gap-4 mx-auto justify-center items-center my-4" >
                {page > 1 && <div className={`button-2`}
                    onClick={() => setPage(page - 1)} >
                    Previous
                </div>}



                {[...Array(pages).keys()].map((__, _) => (
                    <div key={_} className={`${page === _ + 1 && 'button-2'} hover:opacity-70 font-bold px-2 cursor-pointer`} onClick={() => setPage(_ + 1)} >
                        {_ + 1}
                    </div>
                ))}

                {page < pages && <div className={`button-2`}
                    onClick={() => setPage(page + 1)} >
                    Next
                </div>}
            </div>
        )

        return (
            <div className="font-bold text-center my-4" >No Data Found</div>
        )
    }


    async function ApproveWithdrawal(action: string, transactionId: string) {
        try {
            let res = await axios.post('/api/payment/stripe/transfer', { action, transactionId })
            if (action === 'reject') toast.success("Withdrawal Rejected");
            else toast.success("Withdrawal Accepted")

        } catch (err) {
            alert("Error")
            console.log(err);
        }
    }


    return (
        <div className="grow" >

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




            <div className="w-full h-20" ></div>
            <div className="header-1" >
                Withdraw Requests
            </div>

            <div className="flex flex-col gap-4" >
                {withdrawalRequests.length > 0 && withdrawalRequests.map((req) => (
                    <div key={req.id} className="shadow1 rounded-lg p-2 flex justify-between" >
                        <div>
                            <p>Amount: {req.amount} coins</p>
                            <p>Withdrawer: {req.user?.name} </p>
                            <div>
                                Contact: {req.user?.email}
                            </div>
                            <div>
                                Available coins: {req.user.coins}
                            </div>
                        </div>

                        <div className="flex flex-row lg:flex-col gap-2" >
                            <button className="button-2" onClick={() => ApproveWithdrawal('accept', req.id)} >Accept</button>
                            <button className="button-2" onClick={() => ApproveWithdrawal('reject', req.id)} style={{ backgroundColor: 'var(--color6)' }} >Reject</button>
                        </div>
                    </div>
                ))}
            </div>

            <PageTag />
        </div>
    );
}