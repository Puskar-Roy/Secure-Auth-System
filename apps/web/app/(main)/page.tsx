"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
import socketIOClient, { Socket } from "socket.io-client";
import { LoginHistory } from "../../interfaces";
import axios from "axios";
import { CgBrowser } from "react-icons/cg";
import { MdDevices, MdOutlineAccessTimeFilled } from "react-icons/md";
import { Alata } from "next/font/google";
import { GoDotFill } from "react-icons/go";
const alata = Alata({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Page(): JSX.Element {
  const { state } = useAuthContext();
  const router = useRouter();
  const [activeUsers, setActiveUsers] = useState(0);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket: Socket = socketIOClient(
      `${process.env.NEXT_PUBLIC_BACKENDURL}`
    );

    socket.on("activeUsers", (count) => {
      setActiveUsers(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/auth/login-history/${state.user?.id}`
        );
        setLoginHistory(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (state.user) {
      fetchLoginHistory();
    }
  }, [state.user]);

  if (!state.user) {
    router.push("/login");
  }

  return (
    <main className="w-[80%] mx-auto min-h-screen flex  items-center flex-col">
      <div>
        <div className="text-3xl">
          Hello{" "}
          <span className="text-rose-500 font-semibold">
            {state.user?.name}
          </span>{" "}
          🖐️
        </div>
      </div>

      <div className="flex bg-green-100 p-3 rounded-xl justify-center items-center gap-1 flex-row absolute right-4 sm:right-8 bottom-10 sm:bottom-auto sm:top-5 z-20">
        <GoDotFill className="text-green-500 text-xl" />
        Active Users -
        <span className="text-rose-500 font-semibold text-xl">
          {activeUsers}
        </span>
      </div>
      <div className="w-[80%] mx-auto flex justify-center items-center flex-col gap-6">
        <div
          className={`font-semibold text-4xl text-center ${alata.className}`}
        >
          Login <span className="text-rose-500">History</span>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="w-[80%] flex justify-center items-center flex-wrap gap-3">
            {loginHistory.map((history) => (
              <li
                className="w-[15rem] h-[7rem]  p-[50px] shadow-2xl justify-center flex items-center flex-col rounded-xl"
                key={history._id}
              >
                <div className="flex justify-between items-center min-w-[13rem]">
                  <CgBrowser className="text-3xl" />{" "}
                  <span className="text-lg text-rose-500 font-semibold">
                    {history.deviceInfo}
                  </span>
                </div>
                <div className="flex justify-between items-center min-w-[13rem]">
                  <MdDevices className="text-3xl" />
                  <span className="text-lg text-rose-500 font-semibold">
                    {history.os}
                  </span>
                </div>
                <div className="flex justify-between items-center min-w-[13rem]">
                  <MdOutlineAccessTimeFilled className="text-3xl" />
                  <span className="text-sm text-rose-500 font-semibold">
                    {new Date(history.timestamp).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
