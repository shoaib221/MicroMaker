"use client"

import { useEffect, useState } from "react";
import axios from "axios";


export function usePagination ( { url }: { url: string } ) {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([])
    const [pages, setPages] = useState(1)
    const [ searchBy, setSearchBy ] = useState("")
    const [ searchFor, setSearchFor ] = useState("")
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get( `${url}?searchBy=${searchBy}&searchFor=${searchFor}&page=${page}&limit=${limit}` )
                setData(res.data.data)
                setPages( res.data.pages )
            } catch(err) {

            }
        }


    }, [])




}