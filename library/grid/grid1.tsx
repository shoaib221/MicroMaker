"use client"

import { useRouter } from "next/navigation";
import { Box11 } from "../box/box1";
import Image from "next/image";


const  jobs =  [
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


export function Grid1() {
    const router = useRouter()


    return (
        <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-4">
            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=ai') } >
                <FaBrain className="text-4xl" />
                Artificial Intelligence
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=it') } >
                <FaGithub className="text-4xl" />
                Development & IT
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=design') } >
                <MdOutlineDesignServices className="text-4xl" />
                Design & Creative
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=sales') } >
                <SiCoinmarketcap  className="text-4xl"  />
                Sales & Marketing
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=writing') } >
                <AiOutlineTranslation className="text-4xl" />
                Writing & Translation
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=admin') } >
                <MdAdminPanelSettings className="text-4xl" />
                Admin & Support
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=finance') } >
                <FaMoneyCheckAlt className="text-4xl" />
                Finance & Accounting
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=legal') }  >
                <GoLaw className="text-4xl" />
                Legal
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=hr') }  >
                <FaPeopleGroup className="text-4xl" />
                HR & People
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=architecture') } >
                <MdArchitecture className="text-4xl" />
                Engineering & Architecture
                
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=architecture') } >
                <FaPaintBrush className="text-4xl" />
                Fine Arts
                
            </Box11>


            <Box11 title="" onClick={ () => router.push('/jobs') } >
                <FiArrowUpRight className="text-4xl" />
                All Jobs
            </Box11>
            
        </div>
    );

}