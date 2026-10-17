import { useContext } from "react";
import {
  LoadingContext,
  type LoadingContextProps,
} from "@/context/LoadingContext";

export default function useLoading(): LoadingContextProps {
  const context = useContext(LoadingContext);
  return context;
}
