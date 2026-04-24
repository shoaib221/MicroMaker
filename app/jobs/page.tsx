"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Job } from "@/prisma/generated/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DateDisplay } from "@/library/miscel/date";
import { Loading } from "@/library/miscel/loading";


export default function Page() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<Job[]>([])
    const [pages, setPages] = useState(1)
    const [searchBy, setSearchBy] = useState("")
    const [searchFor, setSearchFor] = useState("")
    const [limit, setLimit] = useState(10)
    const router = useRouter();

    async function fetchData() {
        try {
            const res = await axios.get(`/api/job/all?searchBy=${searchBy}&searchFor=${searchFor}&page=${page}&limit=${limit}`)
            setData(res.data.data)
            setPages(res.data.pages)
            //toast.success('Seccessfully Fetched')
        } catch (err) {
            console.error(err)
            alert("error")
        }
    }

    useEffect(() => {

        fetchData();

    }, [page])





    return (
        <div>
            <div className="bg-(--color3) text-(--color1) w-full max-w-[700px] mx-auto px-2 items-center my-4 flex rounded-2xl gap-2 border-2 border-(--color3)" >
                <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}
                    className="bg-(--color3) text-(--color1)" >
                    <option value={""} >Search By</option>
                    <option value={"category"} >Category</option>
                    <option value={"title"} >Title</option>
                </select>

                <input className="grow p-2" placeholder="Search for ..." value={searchFor} onChange={(e) => setSearchFor(e.target.value)} />

                <FaSearch onClick={fetchData} className="hover:opacity-70 cursor-pointer" />
            </div>


            <div className="flex flex-col gap-4 p-4 max-w-250 mx-auto" >
                {data && data.length > 0 && data.map((elem, _) => (
                    <div key={_} className="box-13 flex justify-between" onClick={() => router.push(`/job/${elem.id}`)} >
                        
                        <div>
                            <span className="text-(--color3) font-bold" >{elem.title}</span>  <br/>
                            Deadline : <DateDisplay date={elem.deadline} /> <br/>
                            { elem.required_employees } workers needed

                        </div> 

                        <div className="h-20 w-20 bg-cover bg-center" style={{ backgroundImage: `url(${ elem.imageUrl })` }} >

                        </div>
                    </div>
                ))}

            </div>

            

            {/* Pagination */}
            { data.length > 0 ? <div className="flex gap-4 mx-auto justify-center items-center my-4" >
                {page > 1 && <div  className={`button-2`}
                    onClick={() => setPage(page - 1)} >
                    Previous
                </div>}

                {[...Array(pages).keys()].map((__, _) => (
                    <div key={_} className={`${page === _ + 1 && 'button-2'} hover:opacity-70 font-bold px-2 cursor-pointer`} onClick={() => setPage(_ + 1)} >
                        {_ + 1}
                    </div>
                ))}

                {page < pages && <div className={`button-2`}
                    onClick={() => setPage(page + 1)} >
                    Next
                </div>}
            </div>: 
            <Loading />}


        </div>
    )
}