import { createContext } from "react";

export interface ThemeContextProps {
  handleThemeChange: () => void;
  enabled: boolean
}

export const ThemeContext = createContext({} as ThemeContextProps);
