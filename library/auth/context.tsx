

'use client';

import { useSession, signIn, signOut } from "next-auth/react";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import axios from "axios";

type ProfileType = {
    name: string;
    email: string;
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
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session || !session.user)  return;
        
        async function fetchProfile() {
            try {
                const response = await axios.get("/api/profile");
                setMyProfile(response.data.profile);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }

        fetchProfile();

    }, [session]);
    

    return (
        <AuthContext.Provider value={{ myProfile }}>
            {children}
        </AuthContext.Provider>
    );
}


/* 5. Custom hook (IMPORTANT) */
export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used inside AuthProvider');
    }

    return context;
}




