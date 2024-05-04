"use client";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import Link from "next/link";
import { useState } from "react";
import { alata } from "../../../utils/utli";
export default function Page(): JSX.Element {
      const [email, setEmail] = useState<string>("");
        const handleEmailChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          setEmail(event.target.value);
        };
        const handleClick = () => {
          alert(`Email Is - ${email}`);
        };
  return (
    <main className="w-[80%] mx-auto h-[70vh] flex justify-center items-center">
      <div className=" bg-white mx-auto w-full sm:w-[90%] rounded-2xl flex justify-center items-center h-[70%]">
        <div className="w-[90%] sm:w-[35%] mx-auto flex gap-8 flex-col">
          <div
            className={`font-semibold text-4xl text-center ${alata.className}`}
          >
            Forgot <span className="text-rose-500">Password</span>
          </div>
          <form className="flex flex-col gap-4 rounded-xl">
            <div className="flex flex-col gap-6 ">
              <Input
                type="text"
                placeholder="Enter Email"
                className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <Button
              appName="web"
              className=" bg-rose-500 hover:bg-rose-400 text-white text-base font-semibold  rounded-xl px-3 py-4"
              key="1"
              onClick={handleClick}
            >
              Find Account
            </Button>

            <p className="text-center text-sm font-medium">
              Did not have an account?{" "}
              <span className="text-rose-500 cursor-pointer">
                <Link href="/register">Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
