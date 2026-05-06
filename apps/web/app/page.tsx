import { Button } from "@repo/ui/button";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-20 gap-16 bg-white dark:bg-black text-black dark:text-white">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold">ChatX</h1>
        <ol className="list-inside list-decimal font-mono text-sm space-y-2">
          <li>Get started by editing <code>apps/web/app/page.tsx</code></li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </div>

      <div className="flex gap-4">
        {/* Your UI Component Button */}
        <Button>
          Open Chat
        </Button>
      </div>
    </main>
  );
}