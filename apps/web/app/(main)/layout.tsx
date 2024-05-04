"use client";
import { useVerifyUserDevice } from "../../hooks/useVerifyUser";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const router = useRouter();
  const { state, dispatch } = useAuthContext();
  const { isDeviceVerified, verifyUserDevice } = useVerifyUserDevice({
    userId: state.user?.id,
  });

  useEffect(() => {
    verifyUserDevice();
  });
  console.log("Device Status - ", isDeviceVerified);
  if (isDeviceVerified === null) {
    return <div>Loading...</div>;
  }

  if (!isDeviceVerified) {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  }

  return (
    <div>
      {isDeviceVerified}
      {children}
    </div>
  );
}
