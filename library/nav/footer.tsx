"use client";

import { useEffect, useState } from "react";
import { useNavContext } from "./context";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";


const Elements = [
    {
        title: "For Client",
        elements: [
            "How to hire", "Talent Marketplace", "Project Catalog",
            "Hire an agency", "Enterprise", "Business Plus", "Any Hire",
            "Contract-to-hire", "Direct Contracts", "Hire worldwide",
            "Hire in the USA"
        ]
    },
    {
        title: "For Talent",
        elements: [
            "How to find work", "Direct Contracts",
            "Find freelance jobs worldwide", "Find freelance jobs in the USA",
            "Win work with ads", "Exclusive resources with Freelancer Plus"
        ]
    },
    {
        title: "Resources",
        elements: [
            "Help & support", "Success stories", "Upwork reviews",
            "Resources", "Blog", "Affiliate programme",
            "Free Business Tools", "Release notes"
        ]
    },
    {
        title: "Company",
        elements: [
            "About us", "Leadership", "Investor relations",
            "Careers", "Our impact", "Press",
            "Contact us", "Partners",
            "Trust, safety & security",
            "Modern slavery statement"
        ]
    }
]



function SubFooter ( { elem } : { elem: { title: string, elements: string[] } }  ) {
    const [ opener, setOpener ] = useState(false);
    const { screen } = useNavContext();

    function handleClick () {
        setOpener( prev => !prev );
    }

    return (
        <div  className="my-4" >
            <div className="font-bold text-lg text-(--color3) flex justify-between cursor-pointer" onClick={ handleClick } >
                {elem.title} 

                { screen.width < 1024 && <> { opener ? <IoIosArrowUp /> : <IoIosArrowDown /> } </> }

            </div>

            { (opener || screen.width > 1024) && elem.elements && elem.elements.map( ( item, _ ) => <div key={_} className="hover:underline cursor-pointer" > { item } </div> ) }
        </div>
    )
}




export function Footer () {


    return (
        <div className="w-full p-4 mt-16" >

            <div className="flex flex-col lg:flex-row justify-evenly" >

                { Elements.map( (item, _) => <SubFooter key={_} elem={ item } /> ) }

            </div>

            <div className="flex justify-center gap-8" >
                
            </div>
            
        </div>
    )
}