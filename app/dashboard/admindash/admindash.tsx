"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/library/auth/context";
import axios from "axios";
import { Job, Transaction, User } from "@/prisma/generated/client";
import { Home } from "./home";
import { ManageUsers } from "./manageUsers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { usePagination1 } from "@/library/miscel/pagination";






function ManageTasks() {

    const router = useRouter()
    const { data: jobs, PageTag, refetch } = usePagination1<Job>({ url: "/api/job/all" })




    async function DeleteJob(id: string, e: React.MouseEvent<HTMLButtonElement> ) {
        e.stopPropagation();
        

        try {
            let res = await axios.delete(`/api/job/${id}`);
            toast.success("Job deleted successfully");
            refetch();
        }
        catch (err) {
            console.error("Error deleting job:", err);
        }
    }


    return (
        <div className="grow" >


            <div className="flex flex-col gap-4 p-4" >
                {jobs && jobs.length > 0 && jobs.map((job) => (
                    <div key={job.id} className="rounded-lg p-2 flex justify-between gap-4 box-13" onClick={() => router.push(`/job/${job.id}`)} >
                        <div>
                            <div className="font-bold text-(--color3) " >Title: {job.title}</div>
                            <p>Salary: {job.salary} coins per task</p>
                            <p>Required Employees: {job.required_employees}</p>
                            <br />
                            <button className="button-2" style={{ backgroundColor: 'var(--color6)', color: 'white' }} onClick={(e) => DeleteJob(job.id, e )} >Delete</button>
                        </div>

                        <div style={{ backgroundImage: `url(${job.imageUrl})` }} className="w-30 h-30 rounded-lg bg-cover" onClick={() => router.push(`/job/${job.id}`)} >

                        </div>
                    </div>
                ))}
            </div>

            <PageTag />
        </div>
    );

}


export function AdminDashboard() {
    const [path, setPath] = useState('home')

    return (
        <div className="cen-ver grow relative flex flex-col lg:flex-row mx-auto gap-4" >

            <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-60 lg:min-w-60 lg:sticky lg:top-0 lg:self-start overflow-auto" >
                <div onClick={() => setPath("home")} className={`path-1 min-w-40 ${path === "home" ? "active" : ""}`} >Home</div>
                <div onClick={() => setPath("manage-users")} className={`path-1 min-w-40 ${path === "manage-users" ? "active" : ""}`} >Manage Users</div>
                <div onClick={() => setPath("manage-tasks")} className={`path-1 min-w-40 ${path === "manage-tasks" ? "active" : ""}`} >Manage Tasks</div>
            </div>


            {path === "home" && <Home />}
            {path === "manage-users" && <ManageUsers />}
            {path === "manage-tasks" && <ManageTasks />}

        </div>
    );
}

