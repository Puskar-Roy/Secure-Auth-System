"use client";
import React from "react";
import { MdDevices } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { browserName, os as oss, browserVersion } from "../utils/getDeviceInfo";
const Card = ({ os, timestamp }: { os: string; timestamp: string }) => {
  let userBrowser = `${browserName} ${browserVersion} ${oss}`;
  const handleClick = () => {
    alert("Current Brwoser");
  };
  const handleClick1 = () => {
    alert("Normal Brwoser");
  };
  return (
    <div>
      <div className="service-card w-[300px] shadow-xl cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-start gap-1 transition-all duration-300 group hover:bg-slate-200 rounded-2xl">
        <div className="flex justify-between w-full">
          {os.includes("Android") ? (
            <FaMobileAlt className="text-4xl" />
          ) : (
            <MdDevices className="text-4xl" />
          )}

          {os === userBrowser ? (
            <p className="text-green-600 font-bold text-sm p-2 bg-green-100 rounded-lg flex gap-1">
              Current Device
            </p>
          ) : (
            <p className="text-gray-400 text-sm"></p>
          )}
        </div>

        <div>
          <p className="font-semibold text-lg text-rose-500">Device Info</p>
          <p className="font-bold text-sm text-black/80">{os}</p>
        </div>

        <div>
          <p className="font-semibold text-lg text-rose-500">Last Login</p>
          <p className="text-[0.7rem] font-bold self-start">{timestamp}</p>
        </div>
        <button
          onClick={os === userBrowser ? handleClick : handleClick1}
          className="mt-2 relative inline-block px-4 py-3 font-bold text-sm border-none rounded-lg bg-rose-400 hover:bg-rose-300 text-white transition-transform transform-gpu hover:translate-y-[-0.33em] active:translate-y-0"
        >
          <span className="absolute inset-0 z-[-1] border-2 border-black rounded-lg"></span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Card;
