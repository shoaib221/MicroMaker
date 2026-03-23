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
    return (
        <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4">
            <Box11 title="" >
                <Image src="/ai-services.png" alt="AI Services" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/development-it.png" alt="Development & IT" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/design-creative.png" alt="Development & IT" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/sales-marketing.png" alt="Sales & Marketing" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/writing.png" alt="Sales & Marketing" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/admin.png" alt="Sales & Marketing" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/finance.png" alt="Sales & Marketing" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/legal.png" alt="Legal" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/hr-training.png" alt="HR & Training" width={200} height={200} />
            </Box11>

            <Box11 title="" >
                <Image src="/architecture.png" alt="Engineering & Architecture" width={200} height={200} />
            </Box11>
            
        </div>
    );

}