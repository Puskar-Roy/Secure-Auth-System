"use client";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { alata } from "../../../utils/utli";
import ButtonLoder from "../../../components/ButtonLoder";
import { useAuthContext } from "../../../hooks/useAuthContext";
export default function Page(): JSX.Element {
    const {state} = useAuthContext();
  const { changePassword, error, isLoading, isSucess } = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleClick = async () => {
    const passwordData = {
      currentPassword,
      newPassword,
      userId : state.user?.id
    };

    await changePassword(passwordData);
  };
  return (
    <main className="w-[80%] mx-auto h-[70vh] flex justify-center items-center">
      <div className=" bg-white mx-auto w-full sm:w-[90%] rounded-2xl flex justify-center items-center h-[70%]">
        <div className="w-[90%] sm:w-[35%] mx-auto flex gap-8 flex-col">
          <div
            className={`font-semibold text-4xl text-center ${alata.className}`}
          >
            Change <span className="text-rose-500">Password</span>
          </div>
          <form className="flex flex-col gap-6 rounded-xl">
            <div className="flex flex-col gap-6 ">
              <Input
                type="text"
                placeholder="Enter Current Password"
                className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
                value={currentPassword}
                onChange={handleEmailChange}
              />
              <Input
                type="text"
                placeholder="Enter New Password"
                className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none focus:ring-2 ring-rose-500"
                value={newPassword}
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
              {isLoading ? (
                <ButtonLoder />
              ) : (
                <p className="text-white text-base font-semibold">
                  Change Password
                </p>
              )}
            </Button>

            {error && (
              <div className="bg-rose-200 text-rose-500 p-5 rounded-lg mt-4">
                Invalid credentials.
              </div>
            )}
            {isSucess && (
              <div className="bg-green-200 text-green-500 p-5 rounded-lg mt-4">
                Password Change Successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
