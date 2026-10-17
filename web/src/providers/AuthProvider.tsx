import { api } from "@/api/api";
import { AuthContext } from "@/context/AuthContext";
import { sleep } from "@/functions/sleep";
import useLoading from "@/hooks/useLoading";
import {
  LoginResponseSchema,
  UserSchema,
  VerifyResponseSchema,
} from "@/lib/schemas";
import type { User, UserLogin } from "@/lib/types";
import { useEffect, useState, type ReactNode } from "react";

import { z } from "zod";

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<User>();
  const { handleLoading } = useLoading();

  async function handleVerification() {
    handleLoading(true);
    const token = localStorage.getItem("token");
    if (token === null || token === "") {
      setAuth(false);
      setUser(undefined);
      handleLoading(false);
      return;
    }

    try {
      const result = await api.post("auth/verify", {
        token,
      });

      if (result.status === 400 || result.status === 500) {
        setAuth(false);
        setUser(undefined);
        handleLoading(false);
        return;
      }

      const response = VerifyResponseSchema.parse(result.data);
      const user: User = UserSchema.parse(response.data);
      localStorage.setItem("token", response.token);
      setUser(user);
      await sleep(2000);
      setAuth(true);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        setAuth(false);
        setUser(undefined);
        handleLoading(false);
        console.log(error);
        return;
      }
      setAuth(false);
      setUser(undefined);

      handleLoading(false);
      return;
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      void handleVerification();
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  async function handleLogin(userData: UserLogin) {
    handleLoading(true);
    try {
      const result = await api.post("auth/login", userData);
      const response = LoginResponseSchema.parse(result.data);
      const user = UserSchema.parse(response.user);
      setUser(user);
      localStorage.setItem("token", response.token);
      await sleep(2000);
      setAuth(true);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        setAuth(false);
        setUser(undefined);
        handleLoading(false);
        console.log(error);
        return;
      }
      setAuth(false);
      setUser(undefined);
      handleLoading(false);
      return;
    }
  }

  async function handleLogoff() {
    handleLoading(true);
    setUser(undefined);
    localStorage.removeItem("token");
    await sleep(1500);
    setAuth(false);
    return handleLoading(false);
  }

  return (
    <AuthContext.Provider value={{ auth, user, handleLogin, handleLogoff }}>
      {children}
    </AuthContext.Provider>
  );
}
