"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
import socketIOClient, { Socket } from "socket.io-client";
import { detect } from "detect-browser";
export default function Page(): JSX.Element {
  const [activeUsers, setActiveUsers] = useState(0);
  const [browserName, setBrowserName] = useState<string | undefined>("");
  const [browserVersion, setBrowserVersion] = useState<string | null>("");
  const [os, setOs] = useState<string | null>("");
  const browser = detect();

  useEffect(() => {
    const socket: Socket = socketIOClient(
      `${process.env.NEXT_PUBLIC_BACKENDURL}`
    );

    socket.on("activeUsers", (count) => {
      setActiveUsers(count);
    });

    // Detect browser info on client-side
    if (typeof window !== "undefined") {
      if (browser) {
        setBrowserName(browser.name);
        setBrowserVersion(browser.version);
        setOs(browser.os)
      }
    }

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
      <div>Hello {state.user?.name} </div>
      <div>Total Active User - {activeUsers}</div>
      {/* {browserName ? <div>Browser: {browserName}</div> : null}{" "}
    
      {os ? <div>OS: {os}</div> : null}  */}
      <div>{browserName}</div>
      <div>{browserVersion}</div>
      <div>{os}</div>
    </main>
  );
}
