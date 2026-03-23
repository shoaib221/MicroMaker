"use client"

import { createContext, useContext, useEffect, useState } from "react";

const NavContext = createContext({
    screen: {
        width: 0,
        height: 0,
    },
});


export const NavProvider = ({ children } : { children: React.ReactNode
 }  ) => {
    const [screen, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });


    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <NavContext.Provider value={{ screen }}>
            {children}
        </NavContext.Provider>
    );

}

    
export const useNavContext = () => useContext( NavContext );