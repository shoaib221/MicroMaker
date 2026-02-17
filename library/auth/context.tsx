

'use client';



import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


/* 1. Define the shape of the context */
type ThemeContextType = {
    theme: string | null;
    setTheme: (theme: string | null) => void;
};


/* 2. Create context (undefined by default) */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


/* 3. Provider props */
type AppProviderProps = {
    children: ReactNode;
};



/* 4. Context Provider */
export function ThemeProvider({ children }: AppProviderProps) {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        // document is available ONLY on the client
        const color = document.documentElement.getAttribute('color-theme');
        setTheme(color);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
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




