import { EpisodeGrid } from "./EpisodeGrid";
import type { Episode } from "@/lib/types";

interface RelatedEpisodesProps {
  episodes: Episode[];
  className?: string;
}

export function RelatedEpisodes({ episodes, className }: RelatedEpisodesProps) {
  if (!episodes || episodes.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold text-black mb-6">You Might Also Enjoy</h2>
      <EpisodeGrid episodes={episodes} columns={4} />
    </section>
  );
}
