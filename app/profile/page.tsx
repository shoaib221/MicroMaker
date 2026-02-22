"use client"

import { useAuthContext } from "@/library/auth/context";
import { useEffect, useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { useMyImage } from "@/library/Media/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";


export default function UpdateProfile() {
    const { myProfile } = useAuthContext();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const [name, setName] = useState("");
    const { PhotoTag, uploadPhoto, resetPhoto } = useMyImage({ url: myProfile?.image || "" })


    return (

        <div className="cen-ver grow relative border-2 border-(--color2) max-w-150 mx-auto" >
            <div className="text-center" > {myProfile?.email} </div>
            <PhotoTag />

            <button onClick={() => signOut()} > Sign Out </button>

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

            <button>
                Update
            </button>

        </div>

    )
}
