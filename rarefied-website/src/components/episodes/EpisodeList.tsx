import { EpisodeListItem } from "./EpisodeListItem";
import type { Episode } from "@/lib/types";

interface EpisodeListProps {
  episodes: Episode[];
}

export function EpisodeList({ episodes }: EpisodeListProps) {
  if (episodes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No episodes found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {episodes.map((episode, index) => (
        <EpisodeListItem
          key={episode.id}
          episode={episode}
          showDivider={index < episodes.length - 1}
        />
      ))}
    </div>
  );
}
