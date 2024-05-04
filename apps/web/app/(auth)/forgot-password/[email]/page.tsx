"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@repo/ui/input";

const page = () => {
  const params = useParams<{ email: string }>();
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

     const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setPassword(event.target.value);
     };
     const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setConfirmPassword(event.target.value);
     };



  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, otp.length);
  }, [otp]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value === "" && index > 0 && refs.current[index - 1]) {
      refs.current[index - 1]?.focus();
    } else if (
      index < otp.length - 1 &&
      value.length > 0 &&
      refs.current[index + 1]
    ) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("OTP:", otpValue);
  };
  return (
    <div className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Reset Your Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {params.email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-6">
                <div className="flex justify-center items-center flex-col gap-5">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-[27rem]">
                    {otp.map((value, index) => (
                      <div className="w-16 h-16" key={index}>
                        <input
                          ref={(el) => {
                            if (el && refs.current[index] !== el) {
                              refs.current[index] = el;
                            }
                          }}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-600 text-lg bg-white focus:bg-gray-50 focus:ring-1 focus:border-none ring-rose-700"
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(index, e.target.value)}
                          maxLength={1}
                        />
                      </div>
                    ))}
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter New Password"
                    className="bg-slate-200  w-full border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <Input
                    type="text"
                    placeholder="Confirm New Password"
                    className="bg-slate-200  w-full border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl hover:bg-rose-400 outline-none py-5 bg-rose-500 border-none text-white shadow-sm text-base font-semibold">
                      Change Password
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-rose-600"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
