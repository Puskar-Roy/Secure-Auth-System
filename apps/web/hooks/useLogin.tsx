"use client"
import { useState } from "react";
import axios from "axios";
import { LoginData } from "../interfaces";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter()
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isSucess, setisSucess] = useState<boolean>(false);
  const login = async ({ email, password }: LoginData) => {
    setisLoading(true);
    setError(false);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/auth/login`,
        {
          email,
          password,
        }
      );
    
      setisSucess(true);
      setisLoading(false);
      router.push(`/login/${email}`)
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
      setisSucess(false);
      setTimeout(() => {
        setisLoading(false);
      }, 3000);
    }
  };
  return { login, error, isLoading, isSucess };
};
