import { LoadingContext } from "@/context/LoadingContext";
import { useEffect, useState, type ReactNode } from "react";

export function LoadingContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {}, []);

  const handleLoading = async (status: boolean) => {
    return setLoading(status);
  };

  return (
    <LoadingContext.Provider value={{ loading, handleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
