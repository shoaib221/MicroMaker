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
};



export default function RegisterForm() {

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>();


    const onSubmit = async (data: RegisterFormInputs) => {
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
        <>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 space-y-4 shadow rounded"
        >
            <h2 className="text-2xl font-bold text-center">Register</h2>

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
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                    className="w-full border p-2 rounded"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                    className="w-full border p-2 rounded"
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
                    className="w-full border p-2 rounded"
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
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                {isSubmitting ? "Registering..." : "Register"}
            </button>
        </form>

        <div className="text-center" >
            Already have an account? 
            <button
                onClick={() => signIn()}
                className="text-blue-600 hover:underline ml-1 cursor-pointer"
            >
                Sign In
            </button>
        </div>

        </>
    );
}