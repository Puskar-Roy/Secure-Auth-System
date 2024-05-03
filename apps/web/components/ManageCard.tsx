import React from "react";
import { CgBrowser } from "react-icons/cg";
import { MdDevices, MdOutlineAccessTimeFilled } from "react-icons/md";

const ManageCard = ({ os, timestamp }: { os: string; timestamp: string }) => {
  return (
    <div className="flex justify-center items-center gap-5 hover:bg-slate-100 cursor-pointer">
      <div className="w-[22rem] h-[10rem]  p-[50px] shadow-lg justify-center flex items-center flex-col rounded-xl gap-2">
        <div className="flex justify-center items-center gap-12">
          {/* <div className="flex justify-center gap-2 items-center ">
            <CgBrowser className="text-3xl" />{" "}
            <span className="text-lg text-rose-500 font-semibold">Opera</span>
          </div> */}

          <div className="flex justify-center items-center gap-2">
            <MdDevices className="text-3xl" />
            <span className="text-lg text-rose-500 font-semibold">{os}</span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <MdOutlineAccessTimeFilled className="text-3xl" />
          <span className="text-sm text-rose-500 font-semibold">
            {timestamp}
          </span>
        </div>
        <div className="text-sm px-3 py-2 bg-rose-500 rounded-xl text-white hover:bg-rose-400 cursor-pointer">
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default ManageCard;
