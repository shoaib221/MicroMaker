
'use client';

import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useState } from 'react';
import { ThemeButton } from '../theme/theme1';
import { useAuthContext } from '../auth/context';


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
    const { myProfile } = useAuthContext();
    const router = useRouter();

    return (
        <nav className="w-full border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    MyApp
                </Link>

                <ThemeButton />

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


            {myProfile ? (
                <div className="absolute right-4 top-4 flex items-center space-x-2" onClick={ () => router.push('/profile') } >
                    <img src={myProfile.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                </div>
            ) : 
            (<div className="absolute right-4 top-4">
                <Link href="/register" className="text-sm text-gray-700 hover:text-black">
                    Register
                </Link>
            </div>)
            }

        </nav>
    );
}
