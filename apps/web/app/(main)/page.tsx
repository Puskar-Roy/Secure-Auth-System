"use client";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
export default function Page(): JSX.Element {
  const { state } = useAuthContext();
  const router = useRouter();
  if (!state.user) {
    router.push("/login");
  }

  return (
    <main className="w-[80%] mx-auto h-screen flex justify-center items-center">
      Hello {state.user?.name} 👋
    </main>
  );
}
