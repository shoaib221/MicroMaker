"use client"

import { Job } from "@/prisma/generated/browser";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {
    const id = useParams().id;
    const [job, setJob] = useState<Job | null>(null);

    useEffect(() => {
        if(!id) return;

        async function fetchData() {
            try {
                console.log("Fetching job data for ID:", id);
                //alert("Fetching job data for ID: " + id);
                const response = await axios.get(`/api/job/${id}`);
                setJob(response.data.job);
                console.log(response);
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        }
        
        fetchData();

    }, [id]);

    return (
        <div>
            <h1>Job ID: {id}</h1>
            {job && (
                <div>
                    <h2>{job.title}</h2>
                    <p>{job.description}</p>
                    {/* Display other job details as needed */}
                </div>
            )}
        </div>
    );
}

