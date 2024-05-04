import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { browserName, os, browserVersion } from "../utils/getDeviceInfo";
export const useLogout = ({ userId }: { userId: string | undefined }) => {
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const logout = async () => {
    try {
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
      router.push(`/`);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return { logout };
};
