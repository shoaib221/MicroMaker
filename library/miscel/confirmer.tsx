"use client"

import { useState } from "react"


export const useConfirmer = ({ message }: { message: string }) => {
    const [procede, setProcede] = useState(false)
    const [show, setShow] = useState(false)

    function Init() {
        setShow(true)
    }

    function resetProcede() {
        setShow(false);
        setProcede(false);
    }


    const Tag = () => {

        return (
            <div className={`fixed inset-0  bg-black/50 z-40 ${show ? "flex" : "hidden"} items-center justify-center`} >
                <div className="w-full max-w-200 rounded-lg bg-(--color1) text-(--color2) p-4 gap-4 flex flex-col justify-center items-center" >
                    <div className="font-bold text-lg text-center" > {message} </div>
                    <br />
                    <div className="flex gap-16" >
                        <button onClick={(e) => { e.stopPropagation(); setProcede(true); setShow(false) } } className="text-green-700 font-bold hover:opacity-80 text-xl" >Yes</button>
                        <button onClick={ (e) => { e.stopPropagation(); setShow(false); } } className="text-red-700 font-bold hover:opacity-80 text-xl" >No</button>
                    </div>
                    <br />
                </div>
            </div>
        )
    }

    return { Tag, procede, Init, resetProcede }


}