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
                let data = response.data.workers;
                data.length = 6;
                setWorkers(data);
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
                        <div className="font-bold text-(--color3) text-lg" > {item.name} </div>
                        <div className="h-20 w-20 rounded-full  my-4 bg-cover bg-top" style={{ backgroundImage: `url(${item.image})` }} ></div>
                        <div> {item.coins} Coins </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}


const trustedItems = [
    {
        name: "Microsoft",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDiQXGMUd-boRykgZmJXW-MG1JD2x8GHwIyw&s"
    },
    {
        name: "Google",
        photo: "https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg"
    },
    {
        name: "Amazon",
        photo: "https://static.vecteezy.com/system/resources/thumbnails/019/766/223/small_2x/amazon-logo-amazon-icon-transparent-free-png.png"
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
        photo: "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/69861232304b5d001d1029fd.png"
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
                        <div className="bg-cover bg-center my-4 h-20 w-20 rounded-full" style={{ backgroundImage: `url(${item.photo})` }} ></div>
                        <div className="font-bold text-lg text-(--color3)" > {item.name    } </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}



const items = [
    {
        "name": "Arafat Hossain",
        "photo": "https://pps.services.adobe.com/api/profile/05DB6D5C5B9AB33F0A495E23@AdobeID/image/542d96f8-c3b6-4c85-90b2-5868567a718a/276",
        "profession": "Student",
        "feedback": "The platform is easy to use and helps me earn some extra money in my free time."
    },
    {
        "name": "Rahim Uddin",
        "photo": "https://i1.sndcdn.com/avatars-000522793086-q0pyb3-t240x240.jpg",
        "profession": "Software Developer",
        "feedback": "Task verification process could be faster, but overall the system works smoothly."
    },
    {
        "name": "Mina Akter",
        "photo": "https://www.communitycare.co.uk/media/oqxfcfp1/singeta-kalhan-gregory.jpg?width=525&height=295&bgcolor=White&v=1dc0776a2d67010",
        "profession": "Graphic Designer",
        "feedback": "I like the variety of tasks available, especially creative ones."
    },
    {
        "name": "Jalal Sheikh",
        "photo": "https://i1.sndcdn.com/avatars-8yp4fsfsdf4Vd3zV-1y3e3A-t1080x1080.jpg",
        "profession": "Farmer",
        "feedback": "Simple tasks and mobile-friendly design make it accessible for everyone."
    },
    {
        "name": "Fatema Begum",
        "photo": "https://parkroyaldental.co.uk/wp-content/uploads/2025/01/Sara-1-scaled-e1738755396385-929x1024.jpg",
        "profession": "Homemaker",
        "feedback": "Great way to earn a little income while managing household responsibilities."
    },
    {
        "name": "Ali Hasan",
        "photo": "https://www.healthhubalfuttaim.com/wp-content/uploads/sites/34/2025/12/shared-image-2.jpg",
        "profession": "Digital Marketer",
        "feedback": "Good platform, but task rewards should be a bit higher."
    },
    {
        "name": "Nasim Ahmed",
        "photo": "https://www.terry.uga.edu/wp-content/uploads/nasim-ahmed-2025.jpg",
        "profession": "Content Writer",
        "feedback": "The content-related tasks are interesting and well-described."
    },
    {
        "name": "Sakib Rahman",
        "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSifxhc5xufyVtUoyNvjShswnNHUtlZn7cYew&s",
        "profession": "IT Support Specialist",
        "feedback": "Sometimes the website loads slowly, needs performance improvement."
    },
    {
        "name": "Rupa Das",
        "photo": "https://media.licdn.com/dms/image/v2/D5603AQEZsshjyTVQtQ/profile-displayphoto-scale_400_400/B56ZstY3k3JwAg-/0/1765993053455?e=2147483647&v=beta&t=k_eA49kdjvmXtHAage3e6gnKezp69IfNyxGqLAoHJ-E",
        "profession": "College Student",
        "feedback": "Very helpful for students looking for part-time earning opportunities."
    },
    {
        "name": "Kamal Hossain",
        "photo": "https://static.just.edu.bd/public/ca_1555324054186_genesys.jpg",
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
                                <div className="font-bold text-lg text-(--color3)">{item.name}</div>
                                <div className="text-sm">{item.profession}</div>
                                <div className="h-20 w-20 rounded-full my-4 mx-auto bg-cover bg-center" style={{ backgroundImage: `url(${item.photo})` }} > </div>
                                <div className="mt-2">{item.feedback}</div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}