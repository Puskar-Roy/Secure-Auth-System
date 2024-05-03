"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
import socketIOClient, { Socket } from "socket.io-client";
import { LoginHistory } from "../../interfaces";
import axios from "axios";

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
    <main className="w-[80%] mx-auto h-screen flex justify-center items-center flex-col">
      <div>Hello {state.user?.name} </div>
      <div>Total Active User - {activeUsers}</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {loginHistory.map((history) => (
            <li key={history._id}>
              {new Date(history.timestamp).toLocaleString()} -{" "}
              {history.deviceInfo} ({history.os})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
