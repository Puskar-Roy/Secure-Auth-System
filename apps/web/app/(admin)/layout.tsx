"use client";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { state } = useAuthContext();
  const router = useRouter();
  if (state.user?.role !== "Admin") {
    router.push("/");
  }
  return <div>{children}</div>;
}
