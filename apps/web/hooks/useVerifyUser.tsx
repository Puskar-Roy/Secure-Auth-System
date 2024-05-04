import { useState } from "react";
import axios from "axios";
import { browserName, os, browserVersion } from "../utils/getDeviceInfo";

export const useVerifyUserDevice = ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const [isDeviceVerified, setIsDeviceVerified] = useState<boolean | null>(
    null
  );

  const verifyUserDevice = async () => {
    try {
      if (userId) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKENDURL}/api/v0.1/auth/verify-user/${userId}`,
          {
            os,
            deviceInfo: `${browserName} ${browserVersion}`,
          }
        );
        response.data.message === "User is logged in from the specified device"
          ? setIsDeviceVerified(true)
          : setIsDeviceVerified(false);
      }
    } catch (error) {
      console.error("Verify user device error:", error);
      setIsDeviceVerified(false);
    }
  };

  return { isDeviceVerified, verifyUserDevice };
};
