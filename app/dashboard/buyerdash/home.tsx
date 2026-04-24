"use client"

import { useEffect, useState } from "react";
import { SubmissionWithJob } from "../workerdash/workerdash";
import { useSubmissionDetail } from "./SubmissionDetail";
import axios from "axios";
import { Loading } from "@/library/miscel/loading";
import { Job, JobSubmissions, User } from "@/prisma/generated/client";

export type Aha = JobSubmissions & {
    job: Job,
    employee: User
}


export function Home() {
    const [submissions, setSubmissions] = useState<Aha[]>([]);

    const [stats, setStats] = useState({
        totalTasks: 0,
        pendingTasks: 0,
        totalPayment: 0,
    });

    const { Show, Tag } = useSubmissionDetail({ submission: null });

    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [loading, setLoading] = useState(true)


    async function GetStat() {
        try {
            const response = await axios.get(`/api/stats/buyer`);
            setStats({ ...response.data });
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    }

    async function fetchSubmissions() {
        try {
            const response = await axios.post(`/api/job/submissions?page=${page}`);
            setSubmissions(response.data.submissions);
            setPages(response.data.pages)
            // alert(`${response.data.submissions.length} submissions found`);
        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {



        GetStat();
        fetchSubmissions();
    }, []);



    const PageTag = () => {

        if (loading) return <Loading />

        if (submissions && submissions.length > 0) return (
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
            <div className="font-bold text-center" >No Data Found</div>
        )
    }




    return (
        <div>
            <Tag />
            <div className="flex gap-4 flex-col lg:flex-row justify-evenly" >

                <div className="text-center" >
                    <div className="text-4xl font-bold text-(--color3)" >{stats.totalTasks}</div>
                    <div> My Total Jobs </div>
                </div>

                <div className="text-center" >
                    <div className="text-4xl font-bold text-(--color3)" >{stats.pendingTasks}</div>
                    <div> Incomplete Jobs </div>
                </div>

                <div className="text-center" >
                    <div className="text-4xl font-bold text-(--color3)" >{stats.totalPayment}</div>
                    <div> Coins Paid </div>
                </div>



            </div>

            <br /> <br />

            <div className="header-1" >Review Tasks</div>

            <div className="flex flex-col gap-4 p-4" >
                {
                    submissions.length > 0 && submissions.map((submission) => (
                        <div key={submission.id} className="box-13 flex justify-between items-center" >
                            <div>
                                <div className="text-xl font-bold text-(--color3)" >{submission.job?.title}</div>
                                <div>Submitted By: {submission.employee?.name || "Unknown"}</div>
                                <div>{submission.job?.salary} Coins to be paid </div>
                            </div>

                            <div onClick={() => Show(submission)} className="box-14" >View Detail </div>



                        </div>
                    ))
                }
            </div>

            <PageTag />
        </div>
    )
}

