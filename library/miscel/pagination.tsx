"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "./loading";


export function usePagination1<T>({ url, perPage= 10 }: { url: string, perPage?: number }) {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<T[]>([])
    const [pages, setPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const limit =  perPage;

    async function fetchData() {
        setLoading(true);
        try {
            const res = await axios.get(`${url}?page=${page}&limit=${limit}`)
            setData(res.data.data)
            setPages(res.data.pages)
            
            console.log( res.data )
        } catch (err) {
            console.log(err)
            alert(err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        fetchData();

    }, [page])


    const PageTag = () => {

        if(loading) return <Loading />

        if(  data && data.length > 0 ) return (
            <div className="flex gap-4 mx-auto justify-center items-center my-4" >
                {page > 1 && <div className={`button-2`}
                    onClick={() => setPage(page - 1)} >
                    Previous
                </div>}

                

                {[...Array(pages).keys()].map((__, _) => (
                    <div key={_} className={`${page === _ + 1 && 'button-3'} hover:opacity-70 font-bold px-2 cursor-pointer`} onClick={() => setPage(_ + 1)} >
                        {_ + 1}
                    </div>
                ))}

                {page < pages && <div className={`button-2`}
                    onClick={() => setPage(page + 1)} >
                    Next
                </div>}
            </div>
        )

        return (
            <div className="font-bold text-(--color3)" >Not Data Found</div>
        )
    }

    return { data, PageTag, refetch: fetchData }

}