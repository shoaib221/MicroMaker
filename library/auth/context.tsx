

'use client';

import { useSession, signIn, signOut } from "next-auth/react"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


type ProfileType = {
    name: string;
    username: string;
    image: string;
}


/* 1. Define the shape of the context */
type AuthContextType = {
    myProfile: ProfileType | null;
    
};


/* 2. Create context (undefined by default) */
const AuthContext = createContext<AuthContextType | undefined>(undefined);


/* 3. Provider props */
type AppProviderProps = {
    children: ReactNode;
};



/* 4. Context Provider */
export function AuthProvider({ children }: AppProviderProps) {
    const [myProfile, setMyProfile] = useState<ProfileType | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            const { name, image } = session.user || {};
            const username = session.user?.email?.split('@')[0] || '';
            setMyProfile({ name: name || '', username, image: image || '' });
        } else {
            setMyProfile(null);
        }
    }, [session]);
    

    return (
        <AuthContext.Provider value={{ myProfile }}>
            {children}
        </AuthContext.Provider>
    );
}


/* 5. Custom hook (IMPORTANT) */
export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeContext must be used inside AppProvider');
    }

    return context;
}




