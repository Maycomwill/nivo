import { useContext } from "react";
import {type ThemeContextProps, ThemeContext} from "../context/ThemeContext";

export default function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);
  return context;
}
