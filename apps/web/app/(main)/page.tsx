"use client"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRouter } from "next/navigation";
export default function Page(): JSX.Element {
  const router = useRouter();
  const { state } = useAuthContext();
  if (!state.user) {
    router.push("/login");
  }
  return (
    <main className="w-[80%] mx-auto h-screen flex justify-center items-center">
      Hello User 👋
    </main>
  );
}
