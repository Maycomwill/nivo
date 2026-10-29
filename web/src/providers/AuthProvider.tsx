import { api } from "@/api/api";
import { AuthContext } from "@/context/AuthContext";
import { sleep } from "@/functions/sleep";
import { validadeExp } from "@/functions/validade_token_exp";
import useLoading from "@/hooks/useLoading";
import {
  LoginResponseSchema,
  RegisterResponseSchema,
  UserSchema,
  VerifyResponseSchema,
} from "@/lib/schemas";
import type { User, UserLogin, UserRegister } from "@/lib/types";
import { useEffect, useState, type ReactNode } from "react";

import { z } from "zod";

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<User>();
  const { handleLoading } = useLoading();

  async function handleVerification() {
    handleLoading(true);
    const token = localStorage.getItem("token");
    const token_exp = localStorage.getItem("token-exp");
    const user_name = localStorage.getItem("user");
    const user_email = localStorage.getItem("user_email");
    const user_id = localStorage.getItem("user_id");

    if (
      token === null ||
      token === "" ||
      token_exp === null ||
      token_exp === ""
    ) {
      setAuth(false);
      setUser(undefined);
      return handleLoading(false);
    }
    const token_valido = validadeExp(token_exp);
    if (
      token_valido &&
      user_name !== null &&
      user_email !== null &&
      user_id !== null
    ) {
      setAuth(true);
      setUser({ name: user_name, email: user_email, id: user_id });
      return handleLoading(false);
    }

    try {
      const result = await api.post("auth/verify", {
        token,
      });

      if (result.status === 400 || result.status === 500) {
        setAuth(false);
        setUser(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("token-exp");
        localStorage.removeItem("user");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_id");
        return handleLoading(false);
      }

      const response = VerifyResponseSchema.parse(result.data);

      const user: User = UserSchema.parse(response.data);
      localStorage.setItem("token", response.token);
      localStorage.setItem("token-exp", response.data.exp.toString());
      localStorage.setItem("user", response.data.name);
      localStorage.setItem("user_email", response.data.email);
      localStorage.setItem("user_id", response.data.id);
      setUser(user);
      //   await sleep(2000);
      setAuth(true);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        setAuth(false);
        setUser(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("token-exp");
        localStorage.removeItem("user");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_id");
        console.log(error);
        return handleLoading(false);
      }
      setAuth(false);
      setUser(undefined);
      localStorage.removeItem("token");
      localStorage.removeItem("token-exp");
      localStorage.removeItem("user");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_id");
      return handleLoading(false);
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
      const email_trimed = userData.email.trim().toLowerCase();
      const result = await api.post("auth/login", {
        email: email_trimed,
        password: userData.password,
        remember: userData.remember,
      });
      const response = LoginResponseSchema.parse(result.data);
      const user = UserSchema.parse(response.user);
      setUser(user);
      localStorage.setItem("token", response.token);
      localStorage.setItem("token-exp", response.exp.toString());
      localStorage.setItem("user", response.user.name);
      localStorage.setItem("user_email", response.user.email);
      localStorage.setItem("user_id", response.user.id);
      await sleep(2000);
      setAuth(true);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        setAuth(false);
        setUser(undefined);
        console.log(error);
        return handleLoading(false);
      }
      setAuth(false);
      setUser(undefined);
      return handleLoading(false);
    }
  }

  async function handleLogoff() {
    handleLoading(true);
    localStorage.removeItem("token");
    await sleep(1500);
    setUser(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("token-exp");
    localStorage.removeItem("user");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    setAuth(false);
    return handleLoading(false);
  }

  async function handleRegister(userData: UserRegister) {
    handleLoading(true);
    try {
      const email_trimed = userData.email.trim().toLowerCase();
      const result = await api.post("auth/register", {
        ...userData,
        email: email_trimed,
      });
      const response = RegisterResponseSchema.parse(result.data);
      console.log(response);
      await sleep(2000);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        console.log(error);
        await sleep(2000);
        return handleLoading(false);
      }
      await sleep(2000);
      return handleLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ auth, user, handleLogin, handleLogoff, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
