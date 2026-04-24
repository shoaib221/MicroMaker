"use client"

import { useRouter } from "next/navigation";

export function NotFound() {
    const router = useRouter()
    return (
        <div className="h-[50vh] flex flex-col justify-center items-center gap-4" >
            <h1 className="font-bold text-4xl text-(--color3)" >404</h1>
            <p>The page you are looking for does not exist.</p>
            <div className="button-2" onClick={() => router.push('/') } >Back To Home</div>
        </div>
    );
}

