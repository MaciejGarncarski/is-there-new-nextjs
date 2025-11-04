import Image from "next/image";

export function Contributors({ contributors }: { contributors: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-4">
      <h3 className="font-semibold flex-shrink-0">Contributors:</h3>
      <ul className="flex flex-wrap gap-2">
        {contributors.map((contributor, idx) => {
          const contributorGithubPage = `https://github.com/${contributor.slice(
            1
          )}`;

          return (
            <li key={contributor + idx} className="shrink-0">
              <a
                href={contributorGithubPage}
                target="_blank"
                rel="noopener noreferrer"
                title={contributor}
              >
                <Image
                  src={`https://github.com/${contributor.slice(1)}.png`}
                  width={28}
                  height={28}
                  alt={`Avatar of ${contributor}`}
                  className="rounded-full border border-stone-600/70 overflow-hidden"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
