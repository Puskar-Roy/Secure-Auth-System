"use client";
import { useVerifyUserDevice } from "../../hooks/useVerifyUser";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { state } = useAuthContext();
  const { isDeviceVerified, verifyUserDevice } = useVerifyUserDevice({
    userId: state.user?.id,
  });

  useEffect(() => {
    verifyUserDevice();
  });
  console.log("Device Status - ", isDeviceVerified);

  return (
    <div>
      {isDeviceVerified}
      {children}
    </div>
  );
}
