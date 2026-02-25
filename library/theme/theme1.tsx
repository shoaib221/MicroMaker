

import { useThemeContext } from "./theme";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";


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


export function ThemeButton1() {
    const { theme, setTheme } = useThemeContext();

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('color-theme', newTheme);
        setTheme(newTheme);
    };

    return (
        <div className="h-8 w-8 rounded-full bg-cover bg-top cursor-pointer overflow-hidden"  onClick={toggleTheme} >
            <div className={`flex p-2 gap-2 h-8 w-16 transition-all transform duration-300 ease-in-out ${theme === 'dark' ? '-translate-x-8' : ''}`}  >
                <MdOutlineWbSunny  size={16} />
                <IoMoon  size={16} />
            </div>
        </div>
    );
}