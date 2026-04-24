"use client"

import { useAuthContext } from "@/library/auth/context";
import { useState } from "react";
import './style1.css';
import { AdminDashboard } from "./admindash/admindash";
import { BuyerDashboard } from "./buyerdash/buyerdash";
import { WorkerDashboard } from "./workerdash/workerdash";





export default function Dashboard() {
    const { myProfile } = useAuthContext();

    if (myProfile?.role === "buyer") return <BuyerDashboard />
    if (myProfile?.role === "worker") return <WorkerDashboard />
    if (myProfile?.role === "admin") return <AdminDashboard />

}

