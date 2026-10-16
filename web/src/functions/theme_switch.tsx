import { Toggle } from "@/components/ui/toggle";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const [enabled, setEnabled] = useState(theme == "light");

  const handleThemeChange = (enabled: boolean) => {
    setTheme(enabled ? "light" : "dark");
    setEnabled(enabled);
  };
  return (
    <Toggle
      pressed={enabled}
      onPressedChange={handleThemeChange}
      variant={"outline"}
      className="rounded-full p-0"
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Toggle>
  );
}

export default ThemeSwitch;
