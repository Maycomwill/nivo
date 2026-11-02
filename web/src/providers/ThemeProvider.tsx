import { ThemeContext } from "@/context/ThemeContext";
import { useEffect, useState, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [enabled, setEnabled] = useState(theme == "dark");
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(enabled ? "light" : "dark");
    setEnabled((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ handleThemeChange, enabled }}>
      {children}
    </ThemeContext.Provider>
  );
}
