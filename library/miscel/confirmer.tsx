"use client"

import { useState } from "react"


export const useConfirmer = ({ message }: { message: string }) => {
    const [procede, setProcede] = useState(false)
    const [show, setShow] = useState(false)

    function Init() {
        setShow(true)
    }


    const Tag = () => {

        return (
            <div className={`fixed inset-0  bg-black/50 z-40 ${show ? "flex" : "hidden"} items-center justify-center`} >
                <div className="w-full max-w-200 rounded-lg bg-(--color1) text-(--color2) p-4 gap-4 flex flex-col justify-center items-center" >
                    <div> {message} </div>
                    <div className="flex gap-4" >
                        <button onClick={(e) => { e.stopPropagation(); setProcede(true); setShow(false) } } >Yes</button>
                        <button onClick={ (e) => { e.stopPropagation(); setShow(false); } } >No</button>
                    </div>
                </div>
            </div>
        )
    }

    return { Tag, procede, Init }


}