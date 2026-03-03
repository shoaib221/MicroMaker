"use client"

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Exploring the Peaks",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop",
        description: "Discover the breathtaking majesty of the mountain ranges.",
    },
    {
        id: 2,
        title: "Serene Ocean Views",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop",
        description: "Relax by the crystal clear waters of the tropical islands.",
    },
    {
        id: 3,
        title: "Urban Nightlife",
        image:
            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=900&fit=crop",
        description:
            "Experience the vibrant energy of the world's greatest cities.",
    },
    {
        id: 4,
        title: "Enchanted Forests",
        image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=900&fit=crop",
        description: "Lose yourself in the lush greenery of the ancient woodlands.",
    },
    {
        id: 5,
        title: "Golden Desert",
        image:
            "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1600&h=900&fit=crop",
        description: "Traverse the vast expanse of the sun-drenched dunes.",
    },
];

export  function Slide11() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
        }),
    };

    return (
        <div className="h-100 w-full bg-black text-white overflow-hidden font-urbanist">
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@400;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
        
        .font-rethink { font-family: 'Rethink Sans', sans-serif; }
        .font-urbanist { font-family: 'Urbanist', sans-serif; }
      `}</style>

            {/* Main Carousel Container */}
            <div className="relative w-full h-screen flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out scale-110"
                            style={{
                                backgroundImage: `url(${slides[currentIndex].image})`,
                            }}
                        >
                            {/* Overlay for better text contrast */}
                            <div className="absolute inset-0 bg-black/40" />
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="font-rethink font-bold text-5xl md:text-8xl mb-4 tracking-tighter"
                            >
                                {slides[currentIndex].title}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-lg md:text-2xl text-white/80 max-w-2xl"
                            >
                                {slides[currentIndex].description}
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-8 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all group"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-8 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all group"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-12 z-20 flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "w-12 bg-white"
                                    : "w-4 bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}