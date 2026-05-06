import { DateDisplay } from "@/library/miscel/date";
import { usePagination1 } from "@/library/miscel/pagination";
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

    
    const { data: approvedSubmissions, PageTag } = usePagination1<SubmissionWithJob>( { url: "/api/job/submissions/approved" } )


    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await axios.get("/api/stats/worker");
                setStats({...response.data});
                console.log("Fetched stats:", response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }

        fetchStats();
    }, []);


    return (
        <div className="grow" >
            <br/>
            <div className="header-1" >Stats</div>
            <br/>
            <div className="flex flex-col lg:flex-row justify-evenly gap-4" >
                <div>
                    <div className="header-2" >{stats.totalSubmissions}</div>
                    <div className="text-lg text-center" >Total Submissions</div>
                </div>

                <div>
                    <div className="header-2" >{stats.pendingSubmissions}</div>
                    <div className="text-lg text-center" >Pending Submissions</div>                    
                </div>

                <div>
                    <div className="header-2" >{stats.totalEarnings}</div>
                    <div className="text-lg text-center" >Coins Earned</div>
                </div>

            </div>

            <br /> <br /> <br/>
            <div className="header-1" >
                Approved Submissions
            </div>
            <br/>

            <div className="flex flex-col gap-4 p-4" >
                {
                    approvedSubmissions.length > 0 && approvedSubmissions.map((submission) => (
                        <div key={submission.id} className="box-15" >
                            <div className="header-3" >
                                {submission.job.title}
                            </div>
                            
                            <div>
                                Earned: {submission.job.salary} coins
                            </div>

                            <div>
                                Submitted at: <DateDisplay date={submission.createdAt} />
                            </div>
                        </div>
                    )) 
                }
            </div>

            <PageTag />
        </div>
    )
}


