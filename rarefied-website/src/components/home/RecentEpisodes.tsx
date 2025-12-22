import Link from "next/link";
import { EpisodeGrid } from "@/components/episodes";
import { Button } from "@/components/ui";
import type { Episode } from "@/lib/types";

interface RecentEpisodesProps {
  episodes: Episode[];
  className?: string;
}

export function RecentEpisodes({ episodes, className }: RecentEpisodesProps) {
  return (
    <section className={className}>
      <div className="container-wide py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-black">
            Recent Episodes
          </h2>
          <Link href="/episodes">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <EpisodeGrid episodes={episodes} columns={3} />
      </div>
    </section>
  );
}
