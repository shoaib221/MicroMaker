"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { DateDisplay } from "@/library/miscel/date";


export function useSubmissionDetail({ submission }: { submission: any }) {
    const [detail, setDetail] = useState<any>(null);
    const [show, setShow] = useState(false);

    function Show(submission: any) {
        setDetail(submission);
        setShow(true);
    }


    async function handleFeedback(action: "accept" | "reject") {
        try {
            await axios.post("/api/job/submissions/feedback", { jobId: detail.job?.id || "", submissionId: detail.id, feedback: action });
            toast.success(`Submission ${action}ed successfully`);
            setShow(false)
        }
        catch (error) {
            console.error(`Error ${action}ing submission:`, error);
            toast.error(`Error ${action}ing submission`);
        }
    }


    const Tag = () => {

        if (show) return (
            <div className="z-30 fixed inset-0 bg-black/50" >

                <div className="max-w-150 mx-auto bg-(--color1) text-(--color2) m-8 p-4 relative" >
                    

                    <ImCross  className="absolute top-2 right-2 text-(--color3) rounded-lg hover:opacity-70" onClick={() => setShow(false)} />


                    <div className="text-4xl font-bold text-(--color3) text-center" >{detail.job?.title}</div>
                    

                    <div className="font-bold text-(--color3)" >Submitted By</div>
                    <div>  {detail.employee?.name || "Unknown"} </div>

                    

                    <div className="font-bold text-(--color3)" >Submitted At</div>
                    <DateDisplay date={detail.createdAt} />
                    

                    

                    <div className="font-bold text-(--color3)" >Status</div>
                    <div>  {detail.status} </div>

                    

                    <div className="font-bold text-(--color3)" >Credential</div>
                    <div>
                        {detail.credential}
                    </div>

                    <br/><br/><br/>

                    <div className="gap-4 justify-center items-center flex" >
                        <button className="button-1" style={{ backgroundColor: 'var(--color5)', color: 'white' }} onClick={() => handleFeedback("accept")} >Accept</button>

                        <button className="button-1" style={{ backgroundColor: 'var(--color6)', color: 'white' }}   onClick={() => handleFeedback("reject")} >Reject</button>
                    </div>

                    

                </div>
            </div>
        )

        return null;
    }

    return { Show, Tag };
}