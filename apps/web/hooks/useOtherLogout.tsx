import axios from "axios";
import { Socket } from "socket.io-client";

export const useOtherLogout = (socket?: Socket) => {
  const otherLogout = async ({
    userId,
    os,
    browserVersion,
    browserName,
  }: {
    userId: string | undefined;
    os: string | null | undefined;
    browserVersion: string | null | undefined;
    browserName: string | null | undefined;
  }) => {
    try {
      if (userId)
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/auth/logout/${userId}`,
          {
            os,
            deviceInfo: `${browserName} ${browserVersion}`,
            action: "Logout",
          }
        );
      socket?.emit("logout");
      window.location.reload();
    } catch (error) {
      alert(`Error Here ${browserName} ${browserVersion}`);
      console.error("Login error:", error);
    }
  };
  return { otherLogout };
};
