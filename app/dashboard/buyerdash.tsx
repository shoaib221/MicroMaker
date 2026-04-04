"use client"

import { useAuthContext } from "@/library/auth/context";
import { useState } from "react";
import './style1.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import {  useMyImage } from "@/library/Media/image1";
import { useDatePicker } from "@/library/Media/date";


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
    const { date, DatePicker } = useDatePicker();

    async function onSubmit(data: any) {
        try {
            data.deadline = date;
            data.imageUrl = await uploadPhoto();
            let res = await axios.post("/api/job", data);
            resetPhoto(null);
            alert("Task added successfully");
        } catch (err) {
            console.error("Error adding task:", err);
            alert("Error adding task");
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[700px]">
            <div>
                Add New Task
            </div>


            <PhotoTag />

            <br /> 
            
            {/* Title */}
            <div>
                <label className="text-xl font-bold" >Title:</label> <br />
                <input
                    className="w-full input1"
                    {...register("title", { required: "Title is required" })}
                    placeholder="Give a title"
                />
                {errors.title && <p className="text-red-500" >{errors.title?.message?.toString()}</p>}
            </div>

            <br/>
            {/* Description */}
            <div>
                <label className="text-xl font-bold" >Description:</label>
                <br />
                <textarea
                    className="w-full resize-none input1"
                    {...register("description", { required: "Description is required" })}
                    rows={3}
                    placeholder="Write a short into..."
                />
                {errors.description && <p className="text-red-500" >{errors.description?.message?.toString()}</p>}
            </div>

            <br/>
            {/* Salary */}
            <div>
                <label className="text-xl font-bold" >Salary:</label>
                <br/>
                <input
                    type="number"
                    className="w-full input1"
                    {...register("salary", { required: "Salary is required" })}
                    placeholder="in BDT"
                />
                {errors.salary && <p className="text-red-500" >{errors.salary?.message?.toString()}</p>}
            </div>

            <br/>
            {/* Required Employees */}
            <div>
                <label className="text-xl font-bold" >Required Employees:</label>
                <br/>
                <input
                    type="number"
                    className="w-full input1"
                    {...register("required_employees", { required: "Required employees is required" })}
                    placeholder="number of employees"
                />
                {errors.required_employees && <p className="text-red-500" >{errors.required_employees?.message?.toString()}</p>}
            </div>  

            <br/>
            {/* Deadline */}
            <div>
                <label className="text-xl font-bold" >Deadline:</label>
                {/* <input
                    type="number"
                    {...register("deadline", { required: "Deadline is required" })}
                /> */}
                <DatePicker />
                {errors.deadline && <p className="text-red-500" >{errors.deadline?.message?.toString()}</p>}
            </div>
            
            <br/>
            {/* Submission Info */}
            <div>
                <label className="text-xl font-bold" >Submission Info:</label>
                <textarea
                    className="w-full resize-none input1"
                    {...register("submission_info", { required: "Submission info is required" })}
                    rows={3}
                    placeholder="What needs to be submitted"
                />
                {errors.submission_info && <p className="text-red-500" >{errors.submission_info?.message?.toString()}</p>}
            </div>

            <br/>

            {/* Submit */}
            <button type="submit" className="button-2" >Submit</button>
        </form>
    )
}


export function BuyerDashboard() {
    const [path, setPath] = useState("home");

    return (
        <div className="cen-ver grow relative flex mx-auto gap-4" >

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
