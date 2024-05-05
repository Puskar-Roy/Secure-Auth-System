import axios from "axios";

export const useOtherLogout = () => {

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
      alert(`Error Here ${browserName} ${browserVersion}`)
      console.error("Login error:", error);
    }
  };
  return { otherLogout };
};
