"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { EpisodeList } from "./EpisodeList";
import { CategoryFilter } from "./CategoryFilter";
import type { Episode } from "@/lib/types";

interface FilteredEpisodesProps {
  episodes: Episode[];
}

export function FilteredEpisodes({ episodes }: FilteredEpisodesProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filteredEpisodes = useMemo(() => {
    if (!activeTag) return episodes;
    return episodes.filter((ep) =>
      ep.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
    );
  }, [episodes, activeTag]);

  return (
    <div className="grid lg:grid-cols-4 gap-8 items-start">
      {/* Sidebar with filters */}
      <aside className="lg:col-span-1 w-full max-w-full lg:sticky lg:top-20 lg:self-start">
        <CategoryFilter episodes={episodes} />
      </aside>

      {/* Episode grid */}
      <div className="lg:col-span-3 w-full max-w-full">
        {activeTag && (
          <p className="text-sm text-gray-600 mb-4">
            Showing {filteredEpisodes.length} episode
            {filteredEpisodes.length !== 1 ? "s" : ""} tagged &ldquo;
            {activeTag}&rdquo;
          </p>
        )}
        <EpisodeList episodes={filteredEpisodes} />
      </div>
    </div>
  );
}
