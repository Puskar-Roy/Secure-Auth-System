"use client";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { LoginVerifyData } from "../interfaces";
import { useRouter } from "next/navigation";

export const useVerifyLogin = () => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isSucess, setisSucess] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const verify = async ({ email, otp }: LoginVerifyData) => {
    setisLoading(true);
    setError(false);
    console.log("working");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/auth/verify-login/${email}?token=${otp}`
      );
      console.log(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch({ type: "LOGIN", payload: response.data });
      setisSucess(true);
      setisLoading(false);
      router.push(`/`);
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
      setisSucess(false);
      setTimeout(() => {
        setisLoading(false);
      }, 3000);
    }
  };
  return { verify, error, isLoading, isSucess };
};
