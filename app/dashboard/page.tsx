"use client"

import { useAuthContext } from "@/library/auth/context";
import { useState } from "react";
import './style1.css';
import { AdminDashboard } from "./admindash/admindash";
import { BuyerDashboard } from "./buyerdash/buyerdash";
import { WorkerDashboard } from "./workerdash/workerdash";





export default function Dashboard() {
    const { myProfile } = useAuthContext();

    return (
        <div className="cen-ver grow relative mx-auto p-4" >
            <div>
                
            </div>

            {myProfile?.role === "buyer" && <BuyerDashboard />}
            {myProfile?.role === "worker" && <WorkerDashboard />}
            {myProfile?.role === "admin" && <AdminDashboard />}

        </div>
    );
}

