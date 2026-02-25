"use client"

import { useAuthContext } from "@/library/auth/context";
import { useEffect, useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { useMyImage } from "@/library/Media/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button1 } from "@/library/button/button1";
import "@/library/button/button1.css"


export default function UpdateProfile() {
    const { myProfile } = useAuthContext();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const { PhotoTag, uploadPhoto, resetPhoto } = useMyImage({ url: myProfile?.image || "" });

    async function UpdateProfile(data: any) {
        try {
            let image = await uploadPhoto();
            const response = await axios.post("/api/profile", {
                name: data.name,
                image: image || myProfile?.image || "",
            });
            console.log("Profile updated:", response.data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    useEffect(() => {
        if (myProfile) {
            reset({
                email: myProfile.email,
                name: myProfile.name,
            });

            resetPhoto(myProfile.image);
        }
    }, [myProfile]);

    return (
        <div className="cen-ver grow relative  max-w-150 mx-auto" >
            <div className="text-center" > {myProfile?.email} </div>
            <PhotoTag />

            <button className="button-1" onClick={() => signOut()} > Sign Out </button>

            {/* Name */}
            <div>
                <label className="block mb-1">Name</label>
                <input
                    type="text"
                    {...register("name", {
                        required: "Name is required",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                        },
                    })}
                    className="w-full border p-2 rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name?.message?.toString()}</p>
                )}
            </div>

            <button className="button-1" onClick={handleSubmit(UpdateProfile)}  >
                Update
            </button>

        </div>

    )
}
