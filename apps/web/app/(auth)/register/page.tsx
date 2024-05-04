"use client";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRegister } from "../../../hooks/useRegister";
import { alata } from "../../../utils/utli";
import ButtonLoder from "../../../components/ButtonLoder";
export default function Page(): JSX.Element {
  const { register, error, isLoading, isSucess } = useRegister();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const registerData = {
      email,
      password,
      name,
    };
    await register(registerData);
  };
  return (
    <main className="w-[80%] mx-auto h-[70vh] flex justify-center items-center">
      <div className=" bg-white mx-auto w-full sm:w-[90%] rounded-2xl flex justify-center items-center h-[70%]">
        <div className="w-[90%] sm:w-[35%] mx-auto flex gap-8 flex-col">
          <div
            className={`font-semibold text-4xl text-center ${alata.className}`}
          >
            Register with <span className="text-rose-500">Email</span>
          </div>
          <form className="flex flex-col gap-4 rounded-xl">
            <div className="flex flex-col gap-4 ">
              <Input
                type="text"
                placeholder="Enter Name"
                className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
                value={name}
                onChange={handleNameChange}
              />
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

            <Button
              appName="web"
              className=" bg-rose-500 hover:bg-rose-400 text-white text-base font-semibold  rounded-xl px-3 py-4"
              key="1"
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoder /> : <p>Create Account</p>}
            </Button>

            <p className="text-center text-sm font-medium">
              Already have an account?{" "}
              <span className="text-rose-500 cursor-pointer">
                <Link href="/login">Login</Link>
              </span>
            </p>
            {error && (
              <div className="bg-rose-200 text-rose-500 p-5 rounded-lg mt-4">
                Invalid credentials.
              </div>
            )}
            {isSucess && (
              <div className="bg-green-200 text-green-500 p-5 rounded-lg mt-4">
                Register Done!, A Verification link send to your Gmail.
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
