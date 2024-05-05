"use client";
import { useVerifyUserDevice } from "../../hooks/useVerifyUser";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loder from "../../components/Loder";
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

  if (!state.user) {
    router.push("/login");
  }

  if (state.user?.role === "Admin") {
    router.push("/admin");
  }
  if (isDeviceVerified === null) {
    return (
      <div className="flex justify-center items-center gap-3 min-h-[70vh]">
        <Loder />
      </div>
    );
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
