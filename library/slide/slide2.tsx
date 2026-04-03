"use client";

import { motion } from "framer-motion";
import React, { use, useEffect, useState } from "react";
import { prisma } from "@/prisma/client";
import axios from "axios";
import { set } from "react-hook-form";
import { User } from "@/app/types";
import Image from "next/image";
import { useNavContext } from "../nav/context";


type InfiniteCarouselProps = {
    items: React.ReactNode[];
    speed?: number;
};


const dummyItems = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "item 6",
    "item 7",
    "item 8",
    "item 9",
    "item 10",
];



import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";



export function Slide2() {
    const [workers, setWorkers] = useState<User[]>([]);

    useEffect(() => {

        async function fetchWorkers() {
            try {
                const response = await axios.get("/api/best-workers");
                setWorkers(response.data.workers);
                console.log("Best Workers:", response.data.workers);
            } catch (error) {
                console.error("Error fetching best workers:", error);
            }
        }

        fetchWorkers();

    }, []);



    return (
        <Swiper
            modules={[Autoplay, FreeMode]}
            loop={true}
            spaceBetween={20}
            freeMode={true}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
            }}

            breakpoints={{
                200: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
            }}

            speed={5000}
        >
            {workers && workers.map((item, _) => (
                <SwiperSlide key={_}>
                    <div className="h-40 flex flex-col items-center justify-center rounded">
                        <div> {item.name} </div>
                        <div className="h-20 w-20 rounded-full border-2" style={{ backgroundImage: `url(${item.image})` }} ></div>
                        <div> {item.coins} </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}


const trustedItems = [
    {
        name: "Microsoft",
        photo: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/3468188/DSCF1179.0.jpg?quality=90&strip=all&crop=0,21.465968586387,100,78.534031413613"
    },
    {
        name: "Google",
        photo: "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw"
    },
    {
        name: "Amazon",
        photo: "https://www.tfe.agency/wp-content/uploads/2022/03/amazon.png"
    },
    {
        name: "Apple",
        photo: "https://yt3.googleusercontent.com/s5hlNKKDDQWjFGzYNnh8UeOW2j2w6id-cZGx7GdAA3d5Fu7zEi7ZMXEyslysuQUKigXNxtAB=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        name: "Facebook",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png"
    },
    {
        name: "IBM",
        photo: "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/d4c2niwf9htmk2sp1vli?ik-sanitizeSvg=true"
    }
    

]

export function Slide20() {
    return (
        <Swiper
            modules={[Autoplay, FreeMode]}
            loop={true}
            spaceBetween={20}
            freeMode={true}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true,
            }}

            breakpoints={{
                200: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
            }}

            speed={5000}
        >
            {trustedItems.map((item) => (
                <SwiperSlide key={item.name}>
                    <div className="h-40 flex flex-col items-center justify-center rounded">
                        <div className="h-20 w-20 rounded-full border-2" style={{ backgroundImage: `url(${item.photo})`, backgroundSize: 'cover' }} ></div>
                        <div> {item.name    } </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}



const items = [
    {
        "name": "Arafat Hossain",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "Student",
        "feedback": "The platform is easy to use and helps me earn some extra money in my free time."
    },
    {
        "name": "Rahim Uddin",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "Software Developer",
        "feedback": "Task verification process could be faster, but overall the system works smoothly."
    },
    {
        "name": "Mina Akter",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "Graphic Designer",
        "feedback": "I like the variety of tasks available, especially creative ones."
    },
    {
        "name": "Jalal Sheikh",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "Farmer",
        "feedback": "Simple tasks and mobile-friendly design make it accessible for everyone."
    },
    {
        "name": "Fatema Begum",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "Homemaker",
        "feedback": "Great way to earn a little income while managing household responsibilities."
    },
    {
        "name": "Ali Hasan",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "Digital Marketer",
        "feedback": "Good platform, but task rewards should be a bit higher."
    },
    {
        "name": "Nasim Ahmed",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "Content Writer",
        "feedback": "The content-related tasks are interesting and well-described."
    },
    {
        "name": "Sakib Rahman",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "IT Support Specialist",
        "feedback": "Sometimes the website loads slowly, needs performance improvement."
    },
    {
        "name": "Rupa Das",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "College Student",
        "feedback": "Very helpful for students looking for part-time earning opportunities."
    },
    {
        "name": "Kamal Hossain",
        "photo": "https://avatars.githubusercontent.com/u/107314630?v=4",
        "profession": "Small Business Owner",
        "feedback": "I use it both for earning and promoting my business tasks. Very useful!"
    }
]



export function Slide21() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { screen } = useNavContext();

    const [visibleCount, setVisibleCount] = useState(3);
    const [maxIndex, setMaxIndex] = useState(items.length - visibleCount);


    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev >= maxIndex ? 0 : prev + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev <= 0 ? maxIndex : prev - 1
        );
    };

    useEffect(() => {
        if (screen.width < 640) {
            setVisibleCount(1);
            setMaxIndex(items.length - 1);
        } else if (screen.width < 1024) {
            setVisibleCount(2);
            setMaxIndex(items.length - 2);
        } else {
            setVisibleCount(4);
            setMaxIndex(items.length - 4);
        }

    }, [screen.width]);

    return (
        <div className="relative w-full overflow-hidden">

            {/* Buttons Top Right */}
            <div className="absolute right-0 -top-4 flex gap-2 p-2 z-10">

                <button
                    onClick={handlePrev}
                    className="px-3 py-1 rounded"
                >
                    ◀
                </button>
                <button
                    onClick={handleNext}
                    className="px-3 py-1 rounded"
                >
                    ▶
                </button>
            </div>


            {/* Sliding Container */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="shrink-0 p-4"
                            style={{ width: `${100 / visibleCount}%` }}
                        >
                            <div className="p-10 text-center rounded-xl">
                                <div className="font-bold text-lg">{item.name}</div>
                                <div className="text-sm">{item.profession}</div>
                                <div className="h-20 w-20 rounded-full border-2 mx-auto" style={{ backgroundImage: `url(${item.photo})`, backgroundSize: 'cover' }} > </div>
                                <div className="mt-2">{item.feedback}</div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}