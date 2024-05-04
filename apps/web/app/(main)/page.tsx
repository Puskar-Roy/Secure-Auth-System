"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
import socketIOClient, { Socket } from "socket.io-client";
import { LoginHistory, LoginDevice } from "../../interfaces";
import axios from "axios";
import { Alata } from "next/font/google";
import { GoDotFill } from "react-icons/go";
import Card from "../../components/Card";
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
  const [loginDevice, setLoginDevice] = useState<LoginDevice[]>([]);
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
        setLoginHistory(response.data.loginhistory);
        setLoginDevice(response.data.loggedInDevices);
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
    <main className="w-[80%] mx-auto min-h-[80vh] flex  items-center flex-col ">
      <div className="flex flex-col gap-6 justify-center items-center mt-[50px]">
        <div className="text-3xl">
          Hello{" "}
          <span className="text-rose-500 font-semibold">
            {state.user?.name}
          </span>{" "}
          🖐️
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-8">
        <div className={`text-4xl font-semibold ${alata.className}`}>
          Manage Access and <span className="text-rose-400 ">Devices</span>
        </div>
        <div className="w-[80%] mx-auto flex items-center justify-center flex-wrap gap-5">
          {loginDevice.map((device) => (
            <Card
              key={device.deviceId}
              os={device.deviceName}
              timestamp={new Date(device.lastLogin || "").toLocaleString()}
            />
          ))}
        </div>
      </div>

      <div className="flex bg-green-100 p-3 rounded-xl justify-center items-center gap-1 flex-row fixed right-4 sm:right-8 bottom-10 sm:bottom-auto sm:top-20 z-20">
        <GoDotFill className="text-green-500 text-xl" />
        Active Users -
        <span className="text-rose-500 font-semibold text-xl">
          {activeUsers}
        </span>
      </div>
      <div className="w-[80%] mx-auto flex justify-center items-center flex-col gap-10 mt-10">
        <div
          className={`font-semibold text-4xl text-center ${alata.className}`}
        >
          Login <span className="text-rose-500">History</span>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="relative overflow-x-auto max-h-[400px] w-[100%] mx-auto mb-[100px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Browser Info
                  </th>
                  <th scope="col" className="px-6 py-3">
                    OS
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date and Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((attendance) => (
                  <tr key={attendance._id} className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {attendance.deviceInfo}
                    </th>

                    <td className="px-6 py-4">{attendance.os}</td>
                    <td className="px-6 py-4">{attendance.action}</td>
                    <td className="px-6 py-4">
                      {new Date(attendance.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loginHistory.length === 0 ? (
              <div className="text-2xl text-center text-rose-500 mt-[50px]">
                No Data Available
              </div>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
