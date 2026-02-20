"use client"


import { signIn, signOut, useSession } from "next-auth/react";


export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Register Page</h1>


            <div>
                Already have an account
                <button onClick={() => signIn()} className="text-sm">
                    Login
                </button>
            </div>
        </div>
    );
}
