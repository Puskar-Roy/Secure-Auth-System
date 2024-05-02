import { Button } from "@repo/ui/button";
export default function Page(): JSX.Element {
  return (
    <main className="text-4xl text-rose-500">
      Hello
      <Button className="text-2xl p-3 bg-rose-500 text-white rounded-xl" appName="web">
        Hello
      </Button>
    </main>
  );
}
