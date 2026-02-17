

import { useThemeContext } from "./theme.tsx";


export function ThemeButton() {
    const { theme, setTheme } = useThemeContext();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('color-theme', newTheme);
        setTheme(newTheme);
    };

    return (
        <button onClick={toggleTheme} className="px-4 py-2 bg-(--color2) text-(--color1) rounded">
            Toggle Theme (Current: {theme})
        </button>
    );
}