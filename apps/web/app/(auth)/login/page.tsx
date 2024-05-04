"use client";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import Link from "next/link";
import { useLogin } from "../../../hooks/useLogin";
import { alata } from "../../../utils/utli";
import ButtonLoder from "../../../components/ButtonLoder";
export default function Page(): JSX.Element {
  const { login, error, isLoading, isSucess } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const loginData = {
      email,
      password,
    };

    await login(loginData);
  };
  return (
    <main className="w-[80%] mx-auto h-[70vh] flex justify-center items-center">
      <div className=" bg-white mx-auto w-full sm:w-[90%] rounded-2xl flex justify-center items-center h-[70%]">
        <div className="w-[90%] sm:w-[35%] mx-auto flex gap-8 flex-col">
          <div
            className={`font-semibold text-4xl text-center ${alata.className}`}
          >
            Login with <span className="text-rose-500">Email</span>
          </div>
          <form className="flex flex-col gap-2 rounded-xl">
            <div className="flex flex-col gap-6 ">
              <Input
                type="text"
                placeholder="Enter Email"
                className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
                value={email}
                onChange={handleEmailChange}
              />
              <Input
                type="text"
                placeholder="Enter Password"
                className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <p className="text-end text-sm font-medium">
              Forgot{" "}
              <span className="text-rose-500 cursor-pointer ">
                <Link href="forgot-password">Password ?</Link>
              </span>
            </p>
            <Button
              appName="web"
              className=" bg-rose-500 hover:bg-rose-400 text-white text-base font-semibold  rounded-xl px-3 py-4"
              key="1"
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <ButtonLoder />
              ) : (
                <p className="text-white text-base font-semibold">Login</p>
              )}
            </Button>

            <p className="text-center text-sm font-medium">
              Did not have an account?{" "}
              <span className="text-rose-500 cursor-pointer">
                <Link href="/register">Register</Link>
              </span>
            </p>
            {error && (
              <div className="bg-rose-200 text-rose-500 p-5 rounded-lg mt-4">
                Invalid credentials or Email is not verified.
              </div>
            )}
            {isSucess && (
              <div className="bg-green-200 text-green-500 p-5 rounded-lg mt-4">
                OTP Send Successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
