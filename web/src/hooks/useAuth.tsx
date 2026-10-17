import { useContext } from "react";
import { AuthContext, type AuthContextProps } from "@/context/AuthContext";

export default function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  return context;
}
