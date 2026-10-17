import { createContext } from "react";

export interface LoadingContextProps {
  handleLoading: (status: boolean) => void;
  loading: boolean;
}

export const LoadingContext = createContext({} as LoadingContextProps);
