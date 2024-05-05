import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import socketIOClient, { Socket } from "socket.io-client";

// export const useLogout = () => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const { dispatch } = useAuthContext();
//   const router = useRouter();

//   useEffect(() => {
//     const newSocket: Socket = socketIOClient(
//       `${process.env.NEXT_PUBLIC_BACKENDURL}`
//     );
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);
//   const logout = async ({
//     userId,
//     os,
//     browserVersion,
//     browserName,
//   }: {
//     userId: string | undefined;
//     os: string | null | undefined;
//     browserVersion: string | null | undefined;
//     browserName: string | null | undefined;
//   }) => {
//     try {
//       if (userId)
//         await axios.post(
//           `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/auth/logout/${userId}`,
//           {
//             os,
//             deviceInfo: `${browserName} ${browserVersion}`,
//             action: "Logout",
//           }
//         );
//       localStorage.removeItem("user");
//       dispatch({ type: "LOGOUT" });
//       socket?.emit("logout");
//       router.push(`/login`);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };
//   return { logout };
// };



export const useLogout = (socket?: Socket) => {
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const logout = async ({
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
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      socket?.emit("logout");
      router.push(`/login`);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { logout };
};
