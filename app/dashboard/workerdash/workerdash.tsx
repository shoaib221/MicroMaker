"use client"


import { useAuthContext } from "@/library/auth/context";
import { useEffect, useState } from "react";
import '../style1.css';
import { Job } from "@/prisma/generated/browser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { JobSubmissions } from "@/prisma/generated/client";
import { DateDisplay } from "@/library/miscel/date";
import { Home } from "./home";


export type SubmissionWithJob = JobSubmissions & {
    job: Job;
}


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
    const [submissions, setSubmissions] = useState<SubmissionWithJob[]>([]);


    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const response = await axios.get("/api/job/submissions");
                setSubmissions(response.data.submissions);
            }
            catch (error) {
                console.error("Error fetching submissions:", error);
            }
        }

        fetchSubmissions();
    }, []);



    return (
        <div className="grow flex flex-col gap-4" >
            {
                submissions.length > 0 && submissions.map((submission) => (
                    <div key={submission.id} className="box-13 flex justify-between max-w-150" >

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
    )
}



function Withdrawals() {
    const { myProfile } = useAuthContext();
    const [amount, setAmount] = useState(0);
    const [acno, setAcno] = useState("");

    async function handleOnboard(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
            const response = await axios.post("/api/payment/stripe/onboard", { amount });
            const { url } = response.data;
            alert(url);
            window.location.href = url;
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

            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOnboard}>
                Initiate Stripe Onboarding
            </button> */}
        </div>
    )
}





export function WorkerDashboard() {
    const [path, setPath] = useState("home");


    return (
        <div className="flex flex-col lg:flex-row gap-4 min-h-[80vh]" >


            <div className="flex flex-row lg:flex-col lg:min-w-60 gap-2" >
                <div onClick={() => setPath("home")} className={`path-1 ${path === "home" ? "active" : ""}`} >Home</div>
                <div onClick={() => setPath("taskList")} className={`path-1 ${path === "taskList" ? "active" : ""}`} >Task List</div>
                <div onClick={() => setPath("submissions")} className={`path-1 ${path === "submissions" ? "active" : ""}`} >My Submissions</div>
                <div onClick={() => setPath("withdrawals")} className={`path-1 ${path === "withdrawals" ? "active" : ""}`} >Withdrawals</div>
            </div>



            {path === "home" && <Home />}
            {path === "taskList" && <TaskList />}
            {path === "submissions" && <Submissions />}
            {path === "withdrawals" && <Withdrawals />}



        </div>
    );
}