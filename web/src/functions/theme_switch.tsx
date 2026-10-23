import { Toggle } from "@/components/ui/toggle";
import useTheme from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

function ThemeSwitch() {
  const {enabled, handleThemeChange} = useTheme()
  return (
    <Toggle
      pressed={enabled}
      onPressedChange={handleThemeChange}
      variant={"outline"}
      className="rounded-full p-0"
    >
      {enabled ? <Moon /> : <Sun />}
    </Toggle>
  );
}

export default ThemeSwitch;
