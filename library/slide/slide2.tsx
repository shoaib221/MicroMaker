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
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <SwiperSlide key={item}>
                    <div className="bg-blue-500 text-white h-40 flex items-center justify-center rounded">
                        Slide {item}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}


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
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <SwiperSlide key={item}>
                    <div className="bg-blue-500 text-white h-40 flex items-center justify-center rounded">
                        Slide {item}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}







const items = [
    "AI Services",
    "Development & IT",
    "Design & Creative",
    "Sales & Marketing",
    "Writing & Translation",
    "Admin & Customer Support",
    "Finance & Accounting",
    "Legal",
    "HR & Training",
    "Engineering & Architecture"
];


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
            <div className="absolute right-0 top-0 flex gap-2 p-2 z-10">
                <button
                    onClick={handlePrev}
                    className="px-3 py-1 bg-gray-800 text-white rounded"
                >
                    ◀
                </button>
                <button
                    onClick={handleNext}
                    className="px-3 py-1 bg-gray-800 text-white rounded"
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
                            <div className="bg-blue-500 text-white p-10 text-center rounded-xl">
                                {item}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}