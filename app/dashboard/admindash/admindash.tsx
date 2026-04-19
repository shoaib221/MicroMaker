"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/library/auth/context";
import axios from "axios";
import { Job, Transaction, User } from "@/prisma/generated/client";
import { Home } from "./home";
import { ManageUsers } from "./manageUsers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type TransactionWithSender = Transaction & {
    sender: User;
}




function ManageTasks() {
    const [jobs, setJobs] = useState<Job[]>([])
    const router = useRouter()


    useEffect(()=> {

        async function FetchJobs() {
            try {
                let res = await axios.get("/api/job/all");
                setJobs( res.data.jobs )
            } catch(err) {
                console.error("Error fetching jobs:", err);
            }
        }

        FetchJobs();


    }, [])


    async function DeleteJob (id: string) {
        alert("clicked")

        try {

            let res = await axios.delete(`/api/job/${id}`);

            toast.success("Job deleted successfully");
            setJobs(prevJobs => prevJobs.filter(job => job.id !== id));


        } 
        catch(err) {
            console.error("Error deleting job:", err);
        }
    }


    return (
        <div>
            <h2>Manage Tasks</h2>
            
            <div className="flex flex-col gap-4" >
                { jobs.length > 0 && jobs.map((job) => (
                    <div key={job.id} className="rounded-lg p-2 flex justify-between gap-4"  >
                        <div>
                            <p>Title: {job.title}</p>
                            <p>Salary: {job.salary} BDT per accepted task</p>
                            <p>Required Employees: {job.required_employees}</p>
                            <br/>
                            <button className="button-2 bg-(--color6)" style={{ backgroundColor: 'var(--color6)' }}  onClick={ () => DeleteJob( job.id ) } >Delete</button>
                        </div>

                        <div style={{ backgroundImage: `url(${job.imageUrl})` }} className="box-13 w-30 h-30 rounded-lg bg-cover"  onClick={ () => router.push( `/job/${ job.id }` ) } >

                        </div>
                    </div>
                )) }
            </div>
        </div>
    );

}


export function AdminDashboard() {
    const [path, setPath] = useState('home')

    return (
        <div className="cen-ver grow relative flex mx-auto gap-4" >
            <div className="flex flex-col gap-4 w-80" >
                <div onClick={() => setPath("home")} className={`path-1 ${path === "home" ? "active" : ""}`} >Home</div>
                <div onClick={() => setPath("manage-users")} className={`path-1 ${path === "manage-users" ? "active" : ""}`} >Manage Users</div>
                <div onClick={() => setPath("manage-tasks")} className={`path-1 ${path === "manage-tasks" ? "active" : ""}`} >Manage Tasks</div>
            </div>

            
                {path === "home" && <Home />}
                {path === "manage-users" && <ManageUsers />}
                {path === "manage-tasks" && <ManageTasks />}
            
        </div>
    );
}

