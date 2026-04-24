"use client"

import { useAuthContext } from "@/library/auth/context";
import { useEffect, useState } from "react";
import '../style1.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMyImage } from "@/library/Media/image1";
import { useDatePicker } from "@/library/Media/date";
import { toast, ToastContainer } from "react-toastify";
import '@/library/box/box1.css';
import { useRouter } from "next/navigation";
import { Job, JobCategory, JobSubmissions, Transaction, User } from "@/prisma/generated/client";
import { useSubmissionDetail } from "./SubmissionDetail";
import { DateDisplay } from "@/library/miscel/date";
import { AddTask } from "./addtask";
import { Home } from "./home";
import { usePagination1 } from "@/library/miscel/pagination";


type SubmissionWithJob = JobSubmissions & {
    job: {
        title: string;
        id: string;
        salary: number;
    },
    employee: {
        name: string;
    } | null;
}




function MyTasks() {


    const router = useRouter();

    const { data: jobs, PageTag } = usePagination1<Job>({ url: "/api/job" })



    return (
        <>
            <div className="flex flex-col gap-4 p-4" >
                { jobs && jobs.length > 0 && jobs.map((job: any) => (
                    <div key={job.id} onClick={() => router.push(`/job/${job.id}`)} className="box-13 flex gap-4">


                        <div style={{ backgroundImage: `url(${job.imageUrl})` }} className="w-20 h-20 rounded-lg bg-cover" >

                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-(--color3)">{job.title}</h2>
                            <div> { job.required_employees } Tasks left </div>
                            <div> Deadline: <DateDisplay date={job.deadline} /> </div>
                        </div>


                    </div>
                )) }

            </div>

            <PageTag />

        </>
    )
}


function PurchaseCoin() {
    const router = useRouter();

    async function handlePurchase(amount: number) {
        try {
            const response = await axios.post("/api/payment", { amount });
            router.push(response.data.url)
        } catch (error) {
            console.error("Error initiating purchase:", error);
            toast.error("Error initiating purchase");
        }
    }

    return (
        <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] gap-4 p-4" >
            <div className="box-12 flex flex-col justify-center items-center" onClick={() => handlePurchase(1000)} >
                <div>100 BDT</div>
                <div className="h-20 w-20 bg-contain rounded-full" style={{ backgroundImage: `url(/coin.png)` }}  >  </div>
                <div>1000 coins</div>

            </div>

            <div className="box-12 flex flex-col justify-center items-center" onClick={() => handlePurchase(2000)} >
                <div>200 BDT</div>
                <div className="h-20 w-20 bg-contain rounded-full" style={{ backgroundImage: `url(/coin.png)` }}  >  </div>
                <div>2000 coins</div>
            </div>

            <div className="box-12 flex flex-col justify-center items-center" onClick={() => handlePurchase(5000)} >
                <div>500 BDT</div>
                <div className="h-20 w-20 bg-contain rounded-full" style={{ backgroundImage: `url(/coin.png)` }}  >  </div>
                <div>5000 coins</div>
            </div>

            <div className="box-12 flex flex-col justify-center items-center" onClick={() => handlePurchase(10000)} >
                <div>1000 BDT</div>
                <div className="h-20 w-20 bg-contain rounded-full" style={{ backgroundImage: `url(/coin.png)` }}  >  </div>
                <div>10000 coins</div>
            </div>

            <div className="box-12 flex flex-col justify-center items-center" onClick={() => handlePurchase(20000)} >
                <div>2000 BDT</div>
                <div className="h-20 w-20 bg-contain rounded-full" style={{ backgroundImage: `url(/coin.png)` }}  >  </div>
                <div>20000 coins</div>
            </div>

            <div className="box-12 flex flex-col justify-center items-center" onClick={() => handlePurchase(50000)} >
                <div>5000 BDT</div>
                <div className="h-20 w-20 bg-contain rounded-full" style={{ backgroundImage: `url(/coin.png)` }}  >  </div>
                <div>50000 coins</div>
            </div>


        </div>
    )
}

type TransactionWithReceiver = Transaction & {
    receiver: User
}

function PaymentHistory() {


    const { data: payments, PageTag } = usePagination1<TransactionWithReceiver>({ url: "/api/payment/history" });



    return (
        <>
            <div className="flex flex-col gap-4 p-4" >
                {payments && payments.length > 0 && payments.map((payment: any) => (
                    <div key={payment.id} className="border p-4 rounded-md">
                        <div> Receiver:  <span className="text-(--color3) font-bold" >{ payment.receiver.name }</span>  </div>
                        <h2 className=""> {payment.amount} Coins transferred</h2>
                        Paid at <DateDisplay date={payment.createdAt} />
                    </div>
                )) }
            </div>
            <PageTag />
        </>
    )
}




export function BuyerDashboard() {
    const [path, setPath] = useState("home");

    return (
        <div className="cen-ver grow relative flex flex-col lg:flex-row mx-auto gap-4" >

            <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-60 lg:min-w-60 lg:sticky lg:top-0 lg:self-start overflow-auto" >
                <div onClick={() => setPath("home")} className={`path-1 min-w-40 ${path === "home" ? "active" : ""}`} >Home</div>
                <div onClick={() => setPath("add")} className={`path-1 min-w-40 ${path === "add" ? "active" : ""}`} >Add new Tasks</div>
                <div onClick={() => setPath("mytasks")} className={`path-1 min-w-40 ${path === "mytasks" ? "active" : ""}`} >My Tasks</div>
                <div onClick={() => setPath("purchase")} className={`path-1 min-w-40 ${path === "purchase" ? "active" : ""}`} >Purchase Coin</div>
                <div onClick={() => setPath("payment")} className={`path-1 min-w-40 ${path === "payment" ? "active" : ""}`} >Payment history</div>
                
            </div>

            <div className="grow" >
                {path === "home" && <Home />}
                {path === "add" && <AddTask />}
                {path === "mytasks" && <MyTasks />}
                {path === "purchase" && <PurchaseCoin />}
                {path === "payment" && <PaymentHistory />}
            </div>
        </div>
    );
}


