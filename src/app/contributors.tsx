import Image from "next/image";

export function Contributors({ contributors }: { contributors: string[] }) {
  return (
    <div className="mt-4">
      <h3 className="font-bold">Contributors:</h3>
      <ul className="list-disc list-inside">
        {contributors.map((contributor) => {
          const contributorGithubPage = `https://github.com/${contributor.slice(
            1
          )}`;

          return (
            <li key={contributor}>
              <a
                href={contributorGithubPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                <Image
                  src={`https://github.com/${contributor.slice(1)}.png`}
                  alt={contributor}
                  width={35}
                  height={35}
                  className="rounded-full inline-block mr-1"
                />
                {contributor}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
