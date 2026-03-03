"use client";

import { motion } from "framer-motion";
import React from "react";

type InfiniteCarouselProps = {
    items: React.ReactNode[];
    speed?: number;
};

const items = [
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


export  function Slide2() {
    // Duplicate items for seamless infinite loop
    const loopItems = [...items, ...items];
    const speed = 20; // Adjust this value to change the speed of the carousel

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
                {loopItems.map((item, index) => (
                    <div
                        key={index}
                        className="w-1/5 shrink-0 p-4"
                    >
                        <div className="bg-blue-500 text-white p-10 text-center rounded-xl">
                            {item}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}