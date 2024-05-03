"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
import socketIOClient, { Socket } from "socket.io-client";
export default function Page(): JSX.Element {
  const [activeUsers, setActiveUsers] = useState(0);
  useEffect(() => {
    const socket: Socket = socketIOClient(
      `${process.env.NEXT_PUBLIC_BACKENDURL}`
    );

    socket.on("activeUsers", (count) => {
      setActiveUsers(count);
    });

    socket.on("duplicateLogin", (message) => {
      console.log(message);
      alert(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const { state } = useAuthContext();
  const router = useRouter();
  if (!state.user) {
    router.push("/login");
  }

  return (
    <main className="w-[80%] mx-auto h-screen flex justify-center items-center">
      Hello {state.user?.name} 👋
      <div>Total Active User - {activeUsers}</div>
    </main>
  );
}
