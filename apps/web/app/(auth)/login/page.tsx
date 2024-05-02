import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";

export default function Page(): JSX.Element {
  return (
    <main className="w-[80%] mx-auto h-screen flex justify-center items-center">
      <div className="w-[90%] sm:w-[35%] mx-auto">
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter Email"
            className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none"
          />
          <Input
            type="text"
            placeholder="Enter Password"
            className="bg-slate-200  p-3 border-2 rounded-xl text-black focus:outline-none"
          />
          <Button
            appName="web"
            className=" bg-rose-500 hover:bg-rose-400 text-white font-medium  rounded-xl px-3 py-3"
            key="1"
          >
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}
