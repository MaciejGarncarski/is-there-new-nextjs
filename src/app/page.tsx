import { Root } from "@/app/types";
import Image from "next/image";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { parseContributors } from "@/app/parse-contributors.utils";
import { Contributors } from "@/app/contributors";
import { Reactions } from "@/app/reactions";

export default async function Home() {
  "use cache";
  cacheLife("minutes");
  const repoData: Root[] = await fetch(process.env.API_URL).then((res) =>
    res.json()
  );

  console.log(repoData[0].tag_name);

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
          className="block text-blue-600"
        >
          All releases
        </a>
        <ul className=" flex flex-col gap-10">
          {repoData.map((release) => {
            const contributors = parseContributors(release.body);

            return (
              <li key={release.id} className=" border-b border-zinc-300 pb-10">
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="text-2xl font-bold">{release.name}</h2>
                </a>
                <p className="text-sm text-zinc-500">
                  Published at:{" "}
                  {new Date(release.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  by {release.author.login}
                </p>
                <Image
                  src={release.author.avatar_url}
                  alt={release.author.login}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <p className="mt-4 whitespace-pre-wrap">{release.body}</p>

                {contributors && contributors.length > 0 && (
                  <Contributors contributors={contributors} />
                )}

                {release?.reactions?.total_count > 0 && (
                  <Reactions reactions={release.reactions} />
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
