"use client";
import { useState } from "react";
import axios from "axios";
import { ChnagePassowrdData } from "../interfaces";
import { useRouter } from "next/navigation";

export const useChangePassword = () => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isSucess, setisSucess] = useState<boolean>(false);
  const changePassword = async ({
    currentPassword,
    newPassword,
    userId,
  }: ChnagePassowrdData) => {
    setisLoading(true);
    setError(false);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/auth/change-password/${userId}`,
        {
          currentPassword,
          newPassword,
        }
      );

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
  return { changePassword, error, isLoading, isSucess };
};
