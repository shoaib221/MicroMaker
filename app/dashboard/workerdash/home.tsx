import { DateDisplay } from "@/library/miscel/date";
import { Job, JobSubmissions } from "@/prisma/generated/client";
import axios from "axios";
import { useEffect, useState } from "react";

type SubmissionWithJob = JobSubmissions & {
    job: Job
}


export function Home() {
    const [stats, setStats] = useState({
        totalSubmissions: 0,
        pendingSubmissions: 0,
        totalEarnings: 0,
        
    });

    const [approvedSubmissions, setApprovedSubmissions] = useState< SubmissionWithJob []>([])


    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await axios.get("/api/stats/worker");
                setStats({...response.data});
                setApprovedSubmissions( response.data.approvedSubmissions )
                console.log("Fetched stats:", response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }

        fetchStats();
    }, []);


    return (
        <div className="grow" >
            <div className="flex flex-col lg:flex-row justify-evenly" >
                <div>
                    <div className="text-4xl font-bold text-center text-(--color3)" >{stats.totalSubmissions}</div>
                    <div className="text-lg text-center" >Total Submissions</div>
                </div>

                <div>
                    <div className="text-4xl font-bold text-center text-(--color3)" >{stats.pendingSubmissions}</div>
                    <div className="text-lg text-center" >Pending Submissions</div>                    
                </div>

                <div>
                    <div className="text-4xl font-bold text-center text-(--color3)" >{stats.totalEarnings}</div>
                    <div className="text-lg text-center" >Coins Earned</div>
                </div>

            </div>

            <br /> <br /> <br/>
            <div className="text-center text-xl font-bold text-(--color3)" >
                Approved Submissions
            </div>
            <br/>

            <div className="flex flex-col gap-4" >
                {
                    approvedSubmissions.length > 0 ? approvedSubmissions.map((submission) => (
                        <div key={submission.id} className="box-13" >
                            <div className="text-lg font-bold" >
                                {submission.job.title}
                            </div>
                            
                            <div>
                                Earned: {submission.job.salary} coins
                            </div>

                            <div>
                                Submitted at: <DateDisplay date={submission.createdAt} />
                            </div>
                        </div>
                    )) : <div className="text-center" >
                        No approved submissions yet.
                    </div>
                }
            </div>
        </div>
    )
}


