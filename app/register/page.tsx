"use client"


import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";


const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});


type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    image?: string;
    role: string;
};



export default function RegisterForm() {

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>();


    const onSubmit = async (data: RegisterFormInputs, e?: React.BaseSyntheticEvent) => {
        e?.preventDefault();
        console.log("Form Data:", data);

        // Example API call
        try {
            const response = await api.post("/register", {
                name: data.name,
                email: data.email,
                password: data.password,
            });

            console.log("API Response:", response.data);
        } catch (error: Error | any) {
            console.error("API Error:", error.response ? error.response.data : error.message);
            setError("email", {
                type: "server",
                message: error.response?.data?.message || "Registration failed",
            });
        }
    };


    const password = watch("password");


    return (
        <div className="w-full bg-cover bg-center p-4" style={{ backgroundImage: `url(https://t4.ftcdn.net/jpg/09/02/53/81/360_F_902538150_JCEcejSQkRHHR7d5jE1nbmfhXHdcd9E3.jpg)` }} >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[500px] mx-auto p-6 space-y-4 shadow rounded bg-(--color1) text-(--color2) opacity-80"
            >
                <h2 className="header-1">Register</h2>

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
                        className="input1"
                        placeholder="Type your name ..."
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                {/* Avatar URL */}
                <div>
                    <label className="block mb-1">Image URL</label>
                    <input
                        type="text"
                        {...register("image", {
                            required: false,
                        })}
                        className="input1"
                        placeholder="Your Image URL ..."
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image.message}</p>
                    )}


                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
                            },
                        })}
                        className="input1"
                        placeholder="Your email ..."
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                {/* Role */}
                <div>
                    <label>Role</label>
                    <select
                        {...register("role", { required: "Role is required" })}
                        className="input1"

                    >
                        <option value="">Select role</option>
                        <option value="worker">Worker</option>
                        <option value="buyer">Buyer</option>

                    </select>

                    {errors.role && (
                        <p className="text-red-500 text-sm">
                            {errors.role.message as string}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="input1"
                        placeholder="Provide strong password ..."
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block mb-1">Confirm Password</label>
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        className="input1"
                        placeholder="Confirm your password ..."
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-2 mx-auto text-center block"
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                <div className="text-center font-bold" >
                    Already have an account?
                    <button
                        onClick={() => signIn()}
                        className="text-(--color3) hover:underline ml-1 cursor-pointer underline"
                    >
                        Sign In
                    </button>
                </div>
            </form>



        </div>
    );
}