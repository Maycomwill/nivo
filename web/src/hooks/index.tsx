import { TransactionContextProvider } from "@/providers/TransactionProvider";
import { AuthContextProvider } from "@/providers/AuthProvider";
import { LoadingContextProvider } from "@/providers/LoadingProvider";
import { ThemeContextProvider } from "@/providers/ThemeProvider";
import type { ReactNode } from "react";

function AppProvider({ children }: { children: ReactNode }) {
  return (
    <LoadingContextProvider>
      <ThemeContextProvider>
        <AuthContextProvider>
          <TransactionContextProvider>{children}</TransactionContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </LoadingContextProvider>
  );
}

export default AppProvider;
