import { Reactions as TReaction } from "@/app/types";

export function Reactions({ reactions }: { reactions: TReaction }) {
  return (
    <div>
      <h3 className="font-bold mt-4">Reactions:</h3>
      <ul className="flex gap-4 mt-2">
        {Object.entries(reactions)
          .filter(
            ([key, value]) =>
              key !== "url" && key !== "total_count" && value > 0
          )
          .map(([key, value]) => (
            <li key={key} className="flex items-center gap-1">
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
