import { cn } from "@/lib/utils";
import { EpisodeCard } from "./EpisodeCard";
import type { Episode } from "@/lib/types";

interface EpisodeGridProps {
  episodes: Episode[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function EpisodeGrid({
  episodes,
  className,
  columns = 3,
}: EpisodeGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (episodes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No episodes found.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}
