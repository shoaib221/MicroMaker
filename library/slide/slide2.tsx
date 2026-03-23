"use client";

import { motion } from "framer-motion";
import React, { use, useEffect, useState } from "react";
import { prisma } from "@/prisma/client";
import axios from "axios";
import { set } from "react-hook-form";
import { User } from "@/app/types";


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


export function Slide2() {
    // Duplicate items for seamless infinite loop
    const [items, setItems] = React.useState<User[] | null>(null);
    const speed = 20; // Adjust this value to change the speed of the carousel

    useEffect(() => {
        // This effect is just to trigger a re-render when the component mounts

        async function fetchData() {
            const response = await axios.get("/api/best-workers");
            setItems([...response.data.workers, ...response.data.workers]);
            //console.log(response.data);
        }
        fetchData();
    }, []);

    return (
        <div className="overflow-hidden w-full">
            <motion.div
                className="flex"
                animate={{ x: ["0%", "-200%"] }}
                transition={{
                    ease: "linear",
                    duration: speed,
                    repeat: Infinity,
                }}
            >
                {items && items.map((item, index) => (
                    <div
                        key={index}
                        className="w-1/5 shrink-0 p-4"
                    >
                        <div className="bg-blue-500 text-white p-10 text-center rounded-xl">
                            <h3 className="text-lg font-bold">{item.name}</h3>
                            <p className="text-sm">Coins: {item.coins}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
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


export  function Slide21() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const visibleCount = 3; // show 3 at a time
    const maxIndex = items.length - visibleCount;

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
                            className="w-1/3 shrink-0 p-4"
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