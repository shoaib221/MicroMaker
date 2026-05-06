"use client"

import { useRouter } from "next/navigation";
import { Box11 } from "../box/box1";
import Image from "next/image";


const jobs = [
    {
        name: "Software Engineering",
    },
    {
        name: "Data Science",
    },
    {
        name: "Product Management",
    },
    {
        name: "AI Services"
    },
    {
        name: "Development & IT"
    },
    {
        name: "Design & Creative"
    },
    {
        name: "Sales & Marketing"
    },
    {
        name: "Writing & Translation"
    },
    {
        name: "Admin & Customer Support"
    },
    {
        name: "Finance & Accounting"
    },
    {
        name: "Legal"
    },
    {
        name: "HR & Training"
    },
    {
        name: "Engineering & Architecture"
    }

]

import { FaBrain } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import { SiCoinmarketcap } from "react-icons/si";
import { AiOutlineTranslation } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdArchitecture } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import axios from "axios";
import { useEffect, useState } from "react";
import { JobCategory } from "@/prisma/generated/client";
import { toast } from "react-toastify";


export function Grid1() {
    const router = useRouter()
    const [categories, setCategories] = useState<JobCategory[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api/job/categories`)
                
                console.log( res.data.data )
                setCategories( res.data.data )

                
            } catch (err) {
                console.error(err)
                alert("error")
            }
        }

        fetchData();
    }, [])



    return (
        <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-4">

            {categories && categories.map((elem, _) => <Box11 key={_} title="" onClick={() => router.push( `/jobs?category-id=${ elem.id }` ) } >
                <div className="h-20 w-20 bg-center bg-cover rounded-lg" style={{ backgroundImage: `url(${elem.photo})` }} > 
                    
                </div>
                
                {elem.name}
            </Box11>)}

            <Box11 title="" onClick={() => router.push('/jobs')} >
                <FiArrowUpRight className="text-4xl" />
                All
            </Box11>

        </div>
    );

}