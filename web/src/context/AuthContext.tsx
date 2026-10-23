import type { User, UserLogin, UserRegister } from "@/lib/types";
import { createContext } from "react";

export interface AuthContextProps {
  handleLogin: (userData: UserLogin) => void;
  handleRegister: (userData: UserRegister) => void;
  handleLogoff: () => void;
  auth: boolean;
  user: User | undefined;
}

export const AuthContext = createContext({} as AuthContextProps);
