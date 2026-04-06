"use client"

import { useAuthContext } from "@/library/auth/context";
import { useEffect, useState } from "react";
import './style1.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import {  useMyImage } from "@/library/Media/image1";
import { useDatePicker } from "@/library/Media/date";
import { toast } from "react-toastify";
import '@/library/box/box1.css';
import { useRouter } from "next/navigation";


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
        reset,
    } = useForm();

    
    const { resetPhoto, uploadPhoto, PhotoTag } = useMyImage({ url: "" });
    const { date, DatePicker, setDate } = useDatePicker();

    async function onSubmit(data: any) {
        try {
            data.deadline = date;
            data.imageUrl = await uploadPhoto();
            console.log("Form data to submit:", data);
            await axios.post("/api/job", data);
            reset();
            resetPhoto(null);
            setDate(undefined);
            toast.success("Task added successfully");
        } catch (err) {
            console.error("Error adding task:", err);
            toast.error("Error adding task");
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
                    {...register("salary", { required: "Salary is required", valueAsNumber: true })}
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
                    {...register("required_employees", { required: "Required employees is required", valueAsNumber: true })}
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


function MyTasks() {

    const [jobs, setJobs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchMyTasks() {
            try {
                const response = await axios.get("/api/job");
                console.log("My Tasks:", response.data.jobs);
                setJobs(response.data.jobs);
            } catch (error) {
                console.error("Error fetching my tasks:", error);
            }
        }

        fetchMyTasks();

    }, []);

    return (
        <div>
            { jobs.length >0 ? jobs.map((job: any) => (
                <div key={job.id} onClick={() => router.push(`/job/${job.id}`)} className="border p-4 rounded-md mb-4">
                    <h2 className="text-xl font-bold">{job.title}</h2>
                </div>
            )) : <p>No jobs found.</p> }

        </div>
    )
}


function PurchaseCoin() {
    const router = useRouter();

    async function handlePurchase(amount: number) {
        try {
            const response = await axios.post("/api/payment", { amount });
            router.push( response.data.url )
        } catch (error) {
            console.error("Error initiating purchase:", error);
            toast.error("Error initiating purchase");
        }
    }

    return (
        <div className="grid grid-cols-3 gap-8" >
            <div className="box-12" onClick={ () => handlePurchase(100) } >100 BDT</div>
            <div className="box-12" onClick={ () => handlePurchase(200) } >200 BDT</div>
            <div className="box-12" onClick={ () => handlePurchase(500) } >500 BDT</div>
            <div className="box-12" onClick={ () => handlePurchase(1000) } >1000 BDT</div>
            <div className="box-12" onClick={ () => handlePurchase(2000) } >2000 BDT</div>
            <div className="box-12" onClick={ () => handlePurchase(5000) } >5000 BDT</div>
            <div className="box-12" onClick={ () => handlePurchase(10000) } >10000 BDT</div>
        </div>
    )
}


function PaymentHistory() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        async function fetchPaymentHistory() {
            try {
                const response = await axios.get("/api/payment/history");
                //console.log("Payment History:", response.data.payments);
                setPayments(response.data.transactions);
            } catch (error) {
                console.error("Error fetching payment history:", error);
            }
        }

        fetchPaymentHistory();
    }, []);

    return (
        <div>
            { payments && payments.length > 0 ? payments.map((payment: any) => (
                <div key={payment.id} className="border p-4 rounded-md mb-4">
                    <h2 className="text-xl font-bold"> {payment.type} </h2> 
                    <h2 className="">Amount: {payment.amount} BDT</h2> 
                    <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                </div>
            )) : <p>No payment history found.</p> }
        </div>
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
                {path === "mytasks" && <MyTasks /> }
                {path === "purchase" && <PurchaseCoin /> }
                {path === "payment" && <PaymentHistory /> }
            </div>
        </div>
    );
}


