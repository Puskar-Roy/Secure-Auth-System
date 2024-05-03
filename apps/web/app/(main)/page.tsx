"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
import socketIOClient, { Socket } from "socket.io-client";
export default function Page(): JSX.Element {
  const [activeUsers, setActiveUsers] = useState(0);
  // let browserInfo;
  // let browserLanguage;
  // let platform;
  let browserName;
  let os;
  if (typeof window !== "undefined") {
    // browserInfo = window.navigator.userAgent;
    // browserLanguage = window.navigator.language;
    // platform = window.navigator.platform;
    const ua = navigator.userAgent;
    browserName = ua.match(/Chrome|Firefox|Safari|Edge/i)?.[0];
    os = ua.match(/Macintosh|Windows|Linux/i)?.[0];
  }

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
  const { state } = useAuthContext();
  const router = useRouter();
  if (!state.user) {
    router.push("/login");
  }

  return (
    <main className="w-[80%] mx-auto h-screen flex justify-center items-center flex-col">
      Hello {state.user?.name} 👋
      <div>Total Active User - {activeUsers}</div>
      <div className="flex flex-col">
        <div>{browserName}</div>
        <div>{os}</div>
      </div>
    </main>
  );
}
