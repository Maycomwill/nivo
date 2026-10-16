import { ThemeContextProvider } from "@/providers/ThemeProvider";
import type { ReactNode } from "react";

function AppProvider({ children }: { children: ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}

export default AppProvider;
