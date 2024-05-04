import axios from "axios";
import { useRouter } from "next/navigation";

export const useOtherLogout = () => {
  const router = useRouter();
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
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return { otherLogout };
};
