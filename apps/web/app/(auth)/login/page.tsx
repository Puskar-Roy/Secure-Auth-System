"use client";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Alata } from "next/font/google";
import Link from "next/link";

const alata = Alata({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export default function Page(): JSX.Element {
  return (
    <main className="w-[80%] mx-auto h-screen flex justify-center items-center">
      <div className=" bg-white shadow-xl mx-auto w-full sm:w-[90%] rounded-2xl flex justify-center items-center h-[70%]">
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
              />
              <Input
                type="text"
                placeholder="Enter Password"
                className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
              />
            </div>
            <p className="text-end text-sm font-medium">
              Forgot{" "}
              <span className="text-rose-500 cursor-pointer ">Password ?</span>
            </p>
            <Button
              appName="web"
              className=" bg-rose-500 hover:bg-rose-400 text-white text-base font-semibold  rounded-xl px-3 py-4"
              key="1"
            >
              Login
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
