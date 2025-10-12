import { Suspense } from "react";
import { ReleaseList } from "@/app/release-list";
import { Skeleton } from "@/app/skeleton";

export const metadata = {
  title: "Is there new Next.js?",
  description: "Track the latest releases of Next.js",
};

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-6">
      <main className="flex w-full flex-col gap-10 max-w-prose mx-auto">
        <h1 className="text-2xl font-bold text-center">
          Unofficial Next.js releases tracker.
        </h1>
        <a
          href="https://github.com/vercel/next.js/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-500"
        >
          All releases
        </a>
        <Suspense fallback={<Skeleton />}>
          <ReleaseList />
        </Suspense>
      </main>
    </div>
  );
}
