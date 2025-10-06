import { Reactions as TReaction } from "@/app/types";

export function Reactions({ reactions }: { reactions: TReaction }) {
  return (
    <div className="flex gap-4 items-center">
      <h3 className="font-semibold">Reactions:</h3>
      <ul className="flex gap-4 flex-wrap">
        {Object.entries(reactions)
          .filter(
            ([key, value]) =>
              key !== "url" && key !== "total_count" && value > 0
          )
          .map(([key, value]) => (
            <li
              key={key}
              className="flex items-center gap-1 px-2 py-0.5 dark:bg-gray-700 bg-gray-300 rounded-xl"
            >
              <span>
                {key === "+1"
                  ? "👍"
                  : key === "-1"
                  ? "👎"
                  : key === "laugh"
                  ? "😄"
                  : key === "hooray"
                  ? "🎉"
                  : key === "confused"
                  ? "😕"
                  : key === "heart"
                  ? "❤️"
                  : key === "rocket"
                  ? "🚀"
                  : key === "eyes"
                  ? "👀"
                  : ""}
              </span>
              <span>{value}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
