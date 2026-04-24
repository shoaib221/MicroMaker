"use client"

import { useAuthContext } from "@/library/auth/context";
import { useDatePicker } from "@/library/Media/date";
import { useMyImage } from "@/library/Media/image1";
import { Job, JobCategory } from "@/prisma/generated/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export function AddTask() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: "",
            categoryId: "",
            description: "",
            salary: 0,
            required_employees: 1,
            submission_info: ""
        }
    });

    const { myProfile } = useAuthContext()


    const { resetPhoto, uploadPhoto, PhotoTag } = useMyImage({ url: "" });
    const { date, DatePicker, setDate } = useDatePicker();
    const [categories, setCategories] = useState<JobCategory[]>([])

    async function FetchCategories() {
        try {
            let res = await axios.get('/api/job/categories');
            setCategories(res.data.data);
        } catch (err) {
            console.log(err)
        }

    }

    useEffect( () => {
        FetchCategories();
    }, [] )

    async function onSubmit(data: { title: string; categoryId: string; description: string; salary: number; required_employees: number; submission_info: string }) {

        if (!myProfile?.coins || (data.salary * data.required_employees > myProfile?.coins)) {
            toast.error("Insufficient Balance")
            return;
        }

        if (!date) {
            toast.error("Please select a deadline");
            return;
        }

        try {
            const jobData = {
                ...data,
                deadline: date,
                imageUrl: await uploadPhoto()
            };
            
            console.log("Form data to submit:", jobData);
            await axios.post("/api/job", jobData);
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-175 p-4">

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

            <br />


            <div>
                <label className="text-xl font-bold" >Category: </ label> 
                <select  {...register("categoryId", { required: "Category is required" })} >
                    <option value={""} >Select a category</option>
                    {
                        categories.length > 0 && categories.map(elem => (
                            <option key={elem.id} value={elem.id} >
                                {elem.name}
                            </option>
                        ))
                    }
                </select>
                {errors.title && <p className="text-red-500" >{errors.title?.message?.toString()}</p>}
            </div>


            <br />
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

            <br />
            {/* Salary */}
            <div>
                <label className="text-xl font-bold" >Salary: Coin per task</label>
                <br />

                <input
                    type="number"
                    className="w-full input1"
                    {...register("salary", { required: "Salary is required", valueAsNumber: true })}
                    placeholder="in BDT"
                />

                {errors.salary && <p className="text-red-500" >{errors.salary?.message?.toString()}</p>}
            </div>

            <br />
            {/* Required Employees */}
            <div>
                <label className="text-xl font-bold" >Required Employees:</label>
                <br />
                <input
                    type="number"
                    className="w-full input1"
                    {...register("required_employees", { required: "Required employees is required", valueAsNumber: true })}
                    placeholder="number of employees"
                />
                {errors.required_employees && <p className="text-red-500" >{errors.required_employees?.message?.toString()}</p>}
            </div>

            <br />
            {/* Deadline */}
            <div>
                <label className="text-xl font-bold" >Deadline: </label>
                
                <DatePicker />
                
            </div>

            <br />
            {/* Submission Info */}
            <div>
                <label className="text-xl font-bold" >What To Submit</label>
                <br />
                <textarea
                    className="w-full resize-none input1"
                    {...register("submission_info", { required: "Submission info is required" })}
                    rows={5}
                    placeholder="What needs to be submitted"
                />
                {errors.submission_info && <p className="text-red-500" >{errors.submission_info?.message?.toString()}</p>}
            </div>

            <br />

            {/* Submit */}
            <button type="submit" className="button-2" >Submit</button>
        </form>
    )
}
