"use client";
import React from "react";
import { MdDevices } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { useOtherLogout } from "../hooks/useOtherLogout";
import { Socket } from "socket.io-client";
const AdminCard = ({
  userId,
  os,
  timestamp,
  socket
}: {
  userId: string;
  os: string;
  timestamp: string;
  socket: Socket | undefined;
}) => {
  const { otherLogout } = useOtherLogout(socket);
  const handleClick1 = () => {
    let info = os.split(" ");
    otherLogout({
      userId: userId,
      browserName: info[0],
      browserVersion: info[1],
      os: `${info[2]} ${info[3]}`,
    });
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
          onClick={handleClick1}
          className="mt-2 relative inline-block px-4 py-3 font-bold text-sm border-none rounded-lg bg-rose-400 hover:bg-rose-300 text-white transition-transform transform-gpu hover:translate-y-[-0.33em] active:translate-y-0"
        >
          <span className="absolute inset-0 z-[-1] border-2 border-black rounded-lg"></span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
