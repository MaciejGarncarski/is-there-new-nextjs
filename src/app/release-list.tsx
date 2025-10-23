import { Contributors } from "@/app/contributors";
import { parseContributors } from "@/app/parse-contributors.utils";
import { Reactions } from "@/app/reactions";
import { TimeRelativeClient } from "@/app/time-relative-client";
import { Release } from "@/app/types";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const ReleaseList = async () => {
  "use cache: remote";
  cacheLife({ expire: 60 * 5 });

  const [releases, latestRelease]: [Release[], Release] = await Promise.all([
    fetch("https://api.github.com/repos/vercel/next.js/releases").then((res) =>
      res.json()
    ),
    fetch("https://api.github.com/repos/vercel/next.js/releases/latest").then(
      (res) => res.json()
    ),
  ]);

  return (
    <ul className="flex flex-col gap-10">
      {releases.map((release) => {
        const contributors = parseContributors(release.body);
        const parsedBody = release.body.replace(
          /#(\d+)/g,
          "[#$1](https://github.com/vercel/next.js/pull/$1)"
        );
        const isLatest = release.id === latestRelease.id;

        return (
          <li key={release.id} className="border-b border-zinc-300/40 pb-10 ">
            <article className="flex flex-col gap-4">
              <header className="flex">
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Next.js release ${release.name} on GitHub`}
                >
                  <h2 className="text-2xl font-bold">{release.name}</h2>
                </a>
                {release.prerelease && (
                  <span className="ml-4 self-center bg-yellow-600/10 text-yellow-600 border border-yellow-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Pre-release
                  </span>
                )}
                {isLatest && (
                  <span className="ml-4 self-center bg-green-600/10 text-green-600 border border-green-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Latest
                  </span>
                )}
              </header>
              <div className="flex flex-col gap-1">
                <Suspense fallback={<p className="text-sm">Loading...</p>}>
                  <TimeRelativeClient date={new Date(release.published_at)} />
                </Suspense>
                <p className="text-sm text-zinc-500">
                  Published at:{" "}
                  <time dateTime={release.published_at}>
                    {new Date(release.published_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                </p>
              </div>
              <div className="prose-invert prose-base py-2 prose-ul:list-disc">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  components={{
                    h1: ({ ...props }) => (
                      <h1 className="text-4xl font-bold" {...props} />
                    ),
                    a: ({ ...props }) => (
                      <a
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        {...props}
                      />
                    ),
                    li: ({ ...props }) => (
                      <li className="break-words" {...props} />
                    ),
                    code: ({ ...props }) => (
                      <code
                        className="bg-zinc-400/40 rounded px-1 font-mono"
                        {...props}
                      />
                    ),
                    pre: ({ ...props }) => (
                      <pre
                        className="bg-zinc-900 text-zinc-100 rounded-lg p-4 overflow-x-auto"
                        {...props}
                      />
                    ),
                  }}
                >
                  {parsedBody}
                </ReactMarkdown>
              </div>
              {contributors && contributors.length > 0 && (
                <Contributors contributors={contributors} />
              )}
              {release?.reactions?.total_count > 0 && (
                <Reactions reactions={release.reactions} />
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
};
