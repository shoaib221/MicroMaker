"use client"


import { useAuthContext } from "@/library/auth/context";
import { useEffect, useState } from "react";
import '../style1.css';
import { Job } from "@/prisma/generated/browser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { JobSubmissions, Transaction } from "@/prisma/generated/client";
import { DateDisplay } from "@/library/miscel/date";
import { Home } from "./home";
import { usePagination1 } from "@/library/miscel/pagination";
import { Withdrawals } from "./withdrawals";


export type SubmissionWithJob = JobSubmissions & {
    job: Job;
}

export type Withdrawal = {
    id: string;
};


function TaskList() {
    const [tasks, setTasks] = useState<Job[]>([]);



    useEffect(() => {

        async function fetchTasks() {
            try {
                const response = await axios.get("/api/job/all");
                setTasks(response.data.jobs);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }


        fetchTasks();
    }, []);

    const router = useRouter()



    return (
        <div className="grow" >

            <div className="gap-4 flex flex-col" >
                {tasks.map((task) => (
                    <div key={task.id} className="box-13 w-full flex justify-between max-w-150" onClick={() => router.push(`/job/${task.id}`)}  >

                        <div>
                            <div className="text-xl font-bold" >{task.title}</div>
                            <div>{task.salary} BDT per accepted task</div>
                            <div>{task.required_employees} employees required</div>
                        </div>

                        <div style={{ backgroundImage: `url(${task.imageUrl})` }} className="w-20 h-20 rounded-lg bg-cover" >

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}


function Submissions() {

    const { data: submissions, PageTag } = usePagination1<SubmissionWithJob>({ url: "/api/job/submissions" })


    return (
        <div className="grow" >
            <div className="grow flex flex-col gap-4 mx-auto p-4" >
                {
                    submissions.length > 0 && submissions.map((submission) => (
                        <div key={submission.id} className="box-13 flex justify-between max-w-150 mx-auto w-full" >

                            <div>
                                <div className="text-xl font-bold" >{submission.job?.title}</div>
                                <div> Submitted at <DateDisplay date={submission.createdAt} /> </div>
                                <p>Status: {submission.status}</p>
                            </div>

                            <div className="w-20 h-20 rounded-lg bg-cover" style={{ backgroundImage: `url(${submission.job.imageUrl})` }} >

                            </div>
                        </div>
                    ))
                }
            </div>

            <PageTag />
        </div>
    )
}






export function WorkerDashboard() {
    const [path, setPath] = useState("home");


    return (
        <div className="cen-ver grow relative flex flex-col lg:flex-row mx-auto gap-4" >

            <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-60 lg:min-w-60 lg:sticky lg:top-0 lg:self-start overflow-auto" >
                <div onClick={() => setPath("home")} className={`path-1 min-w-40 ${path === "home" ? "active" : ""}`} >Home</div>
                
                <div onClick={() => setPath("submissions")} className={`path-1 min-w-40 ${path === "submissions" ? "active" : ""}`} >My Submissions</div>
                <div onClick={() => setPath("withdrawals")} className={`path-1 min-w-40 ${path === "withdrawals" ? "active" : ""}`} >Withdrawals</div>
            </div>



            {path === "home" && <Home />}
            
            {path === "submissions" && <Submissions />}
            {path === "withdrawals" && <Withdrawals />}



        </div>
    );
}