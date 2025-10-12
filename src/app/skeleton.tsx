export const Skeleton = () => {
  return (
    <ul className="flex flex-col gap-10">
      {Array.from({ length: 3 }).map((_, index) => (
        <li
          key={index}
          className="border-b border-zinc-300/40 pb-10 animate-pulse"
        >
          <article className="flex flex-col gap-4">
            <header className="flex">
              <div className="h-8 w-1/3 bg-zinc-300/40 rounded-md" />
            </header>
            <div className="flex flex-col gap-1">
              <p className="h-4 w-1/4 bg-zinc-300/40 rounded-md" />
              <p className="h-4 w-1/2 bg-zinc-300/40 rounded-md" />
            </div>
            <div className="mt-4 space-y-2">
              <p className="h-4 w-full bg-zinc-300/40 rounded-md" />
              <p className="h-4 w-full bg-zinc-300/40 rounded-md" />
              <p className="h-4 w-5/6 bg-zinc-300/40 rounded-md" />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
};
