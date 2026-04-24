
'use client';

import { useRouter, usePathname } from "next/navigation";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeButton, ThemeButton1 } from '@/library/theme/theme1';
import { useAuthContext } from '../auth/context';
import { SiTask } from "react-icons/si";


type NavItem = {
    label: string;
    href: string;
};


const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Jobs', href: '/jobs' }
];



export function AppLogo() {
    return (
        <div className="flex items-center gap-2">
            <ThemeButton1 />
            <Link href="/" className="text-xl font-bold flex items-center gap-2 text-(--color3)">
                <SiTask className="text-(--color3)" size={24} />
                MicroMaker
            </Link>
        </div>
    );
}



export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { myProfile } = useAuthContext();
    const router = useRouter();
    const pathName = usePathname()
    const [path, setPath] = useState( '/' )

    useEffect(() => {

        if(pathName.includes('dashboard')) setPath('/dashboard');
        else if( pathName.includes('jobs') ) setPath( '/jobs' )
        else if( !pathName.includes( 'profile' ) ) setPath('/');
        else setPath('')

    }, [pathName])

    return (
        <nav className="w-full border-b">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-700"
                    aria-label="Toggle menu"
                >
                    ☰
                </button>

                <AppLogo />





                {/* Desktop Menu */}
                <div className="hidden space-x-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${ path === item.href ? 'text-(--color3) font-bold' : '' }  hover:opacity-70 transition`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {myProfile ? (
                    <div title={ `${ myProfile.name }` } className="cursor-pointer  h-8 w-8 rounded-full right-4 top-4 flex items-center space-x-2 bg-cover bg-top" style={{ backgroundImage: `url(${myProfile.image})` }} onClick={() => router.push('/profile')} >
                        
                    </div>
                ) :
                    (<div className="right-4 top-4">
                        <Link href="/register" className="text-sm text-gray-700 hover:text-black">
                            Register
                        </Link>
                    </div>)
                }
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
