import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";

export default function Page(): JSX.Element {
  return (
    <main className="w-[80%] mx-auto h-screen flex justify-center items-center">
      <div className="w-[90%] sm:w-[35%] mx-auto">
        <form className="flex flex-col gap-4">
          <Input type="text" placeholder="Enter Email" className="bg-slate-200" />
          <Input type="text" placeholder="Enter Password" className="bg-slate-200" />
          <Button
            appName="web"
            className=" bg-rose-500 hover:bg-rose-400 text-white font-medium"
            key="1"
          >
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}
