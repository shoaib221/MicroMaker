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


export function Grid1() {
    const router = useRouter()


    return (
        <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4">
            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=ai') } >
                <Image src="/ai-services.png" alt="AI Services" width={200} height={200} />
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=it') } >
                <Image src="/development-it.png" alt="Development & IT" width={200} height={200} />
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=design') } >
                <Image src="/design-creative.png" alt="Design & Creative" width={200} height={200} />
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=sales') } >
                <Image src="/sales-marketing.png" alt="Sales & Marketing" width={200} height={200} />
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=writing') } >
                <Image src="/writing.png" alt="Writing" width={200} height={200} />
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=admin') } >
                <Image src="/admin.png" alt="Admin" width={200} height={200} />
            </Box11>

            <Box11 title=""  onClick={ () => router.push('/jobs?searchBy=finance') } >
                <Image src="/finance.png" alt="Finance" width={200} height={200} />
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=legal') }  >
                <Image src="/legal.png" alt="Legal" width={200} height={200} />
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=hr') }  >
                <Image src="/hr-training.png" alt="HR & Training" width={200} height={200} />
            </Box11>

            <Box11 title="" onClick={ () => router.push('/jobs?searchBy=architecture') } >
                <Image src="/architecture.png" alt="Engineering & Architecture" width={200} height={200} />
            </Box11>


            <Box11 title="" onClick={ () => router.push('/jobs') } >
                All Jobs
            </Box11>
            
        </div>
    );

}