"use client"

import { useAuthContext } from "@/library/auth/context";
import { useState } from "react";
import './style1.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import {  useMyImage } from "@/library/Media/image1";


function Home() {

    return (
        <div>
            Buyer will see his total task Count (task added by user),  pending Task( sum of all  required_workers count of his added Tasks), and total payment paid by the user.
        </div>
    )
}


function AddTask() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    
    const { resetPhoto, uploadPhoto, PhotoTag } = useMyImage({ url: "" });

    async function onSubmit(data: any) {
        try {
            let res = await axios.post("/api/task", data);
            alert("Task added successfully");
        } catch (err) {
            console.error("Error adding task:", err);
            alert("Error adding task");
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full border-2 max-w-[700px]">
            <div>
                Add New Task
            </div>


            <PhotoTag />

            <br /> 
            
            {/* Title */}
            <div>
                <label>Title:</label> <br />
                <input
                    className="w-full"
                    {...register("title", { required: "Title is required" })}
                    placeholder="Give a title"
                />
                {errors.title && <p>{errors.title?.message?.toString()}</p>}
            </div>


            {/* Description */}
            <div>
                <label>Description:</label>
                <textarea
                    className="w-full resize-none"
                    {...register("description", { required: "Description is required" })}
                    rows={3}
                    placeholder="Write a short into..."
                />
                {errors.description && <p>{errors.description?.message?.toString()}</p>}
            </div>

            {/* Salary */}
            <div>
                <label>Salary:</label>
                <br/>
                <input
                    type="number"
                    className="w-full"
                    {...register("salary", { required: "Salary is required" })}
                    placeholder="in BDT"
                />
                {errors.salary && <p>{errors.salary?.message?.toString()}</p>}
            </div>

            {/* Required Employees */}
            <div>
                <label>Required Employees:</label>
                <br/>
                <input
                    type="number"
                    className="w-full"
                    {...register("required_employees", { required: "Required employees is required" })}
                    placeholder="number of employees"
                />
                {errors.required_employees && <p>{errors.required_employees?.message?.toString()}</p>}
            </div>

            {/* Deadline */}
            <div>
                <label>Deadline:</label>
                <input
                    type="number"
                    {...register("deadline", { required: "Deadline is required" })}
                />
                {errors.deadline && <p>{errors.deadline?.message?.toString()}</p>}
            </div>

            {/* Submission Info */}
            <div>
                <label>Submission Info:</label>
                <textarea
                    className="w-full resize-none"
                    {...register("submission_info", { required: "Submission info is required" })}
                    rows={3}
                    placeholder="What needs to be submitted"
                />
                {errors.deadline && <p>{errors.deadline?.message?.toString()}</p>}
            </div>



            {/* Submit */}
            <button type="submit">Submit</button>
        </form>
    )
}


export function BuyerDashboard() {
    const [path, setPath] = useState("home");

    return (
        <div className="cen-ver grow relative flex mx-auto" >

            <div className="flex flex-col gap-4 min-w-60" >
                <div onClick={() => setPath("home")} className={`path-1 ${path === "home" ? "active" : ""}`} >Home</div>
                <div onClick={() => setPath("add")} className={`path-1 ${path === "add" ? "active" : ""}`} >Add new Tasks</div>
                <div onClick={() => setPath("mytasks")} className={`path-1 ${path === "mytasks" ? "active" : ""}`} >My Task’s</div>
                <div onClick={() => setPath("purchase")} className={`path-1 ${path === "purchase" ? "active" : ""}`} >Purchase Coin</div>
                <div onClick={() => setPath("payment")} className={`path-1 ${path === "payment" ? "active" : ""}`} >Payment history</div>
            </div>

            <div className="grow" >
                {path === "home" && <Home />}
                {path === "add" && <AddTask />}
                {path === "mytasks" && <div>My Task’s</div>}
                {path === "purchase" && <div>Purchase Coin</div>}
                {path === "payment" && <div>Payment history</div>}
            </div>
        </div>
    );
}
