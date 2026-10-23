import { createContext } from "react";

export interface ThemeContextProps {
  handleThemeChange: (enabled: boolean) => void;
  enabled: boolean
}

export const ThemeContext = createContext({} as ThemeContextProps);
