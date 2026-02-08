import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/UseLocalStorage";

// 1. Define the Shape
// What data will be available in the "WiFi signal"?
type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};

// 2. Create the Context (The "Router")
// We start with undefined because the provider hasn't turned on yet.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create the Provider (The "Power Plant")
// This component will wrap your entire App.
export function ThemeProvider({ children }: { children: ReactNode }) {
    // We use your custom hook inside the provider!
    const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>("app-theme", false);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 4. Create a Custom Hook to use it (The "Plug")
// This checks if the component is actually inside the provider.
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}