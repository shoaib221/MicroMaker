'use client';

import Link from 'next/link';
import { useState } from 'react';

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    MyApp
                </Link>

                {/* Desktop Menu */}
                <div className="hidden space-x-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-gray-700 hover:text-black transition"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-700"
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t px-4 py-3 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-700 hover:text-black"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
