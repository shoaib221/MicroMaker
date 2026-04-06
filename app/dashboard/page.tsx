"use client"

import { useAuthContext } from "@/library/auth/context";
import { useState } from "react";
import './style1.css'
import { AdminDashboard } from "./admindash";
import { BuyerDashboard } from "./buyerdash";




function WorkerDashboard() {
    const [path, setPath] = useState("home");


    return (
        <div className="cen-ver grow relative flex  mx-auto border-2" >

            <div className="flex flex-col gap-4 w-80" >
                <div onClick={ () => setPath("home") } className={`path-1 ${path === "home" ? "active" : ""}`} >Home</div> 
                <div onClick={ () => setPath("taskList") } className={`path-1 ${path === "taskList" ? "active" : ""}`} >Task List</div>
                <div onClick={ () => setPath("submissions") } className={`path-1 ${path === "submissions" ? "active" : ""}`} >My Submissions</div>
                <div onClick={ () => setPath("withdrawals") } className={`path-1 ${path === "withdrawals" ? "active" : ""}`} >Withdrawals</div>
            </div>


            <div>
                
                {path === "home" && <div>Worker Home</div>}
                {path === "taskList" && <div>Task List</div>}
                {path === "submissions" && <div>My Submissions</div>}
                {path === "withdrawals" && <div>Withdrawals</div>}
                
            </div>

        </div>
    );
}





export default function Dashboard() {
    const { myProfile } = useAuthContext()
    return (
        <div className="cen-ver grow relative mx-auto p-4" >
            <div>

            </div>

            {myProfile?.role === "buyer" && <BuyerDashboard />}
            {myProfile?.role === "user" && <WorkerDashboard />}
            {myProfile?.role === "admin" && <AdminDashboard />}

        </div>
    );
}

