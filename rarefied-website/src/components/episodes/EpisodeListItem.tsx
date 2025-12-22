import Image from "next/image";
import Link from "next/link";
import { formatDuration } from "@/lib/utils";
import type { Episode } from "@/lib/types";

interface EpisodeListItemProps {
  episode: Episode;
  showDivider?: boolean;
}

export function EpisodeListItem({ episode, showDivider = true }: EpisodeListItemProps) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className={`flex gap-4 py-4 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2 ${
        showDivider ? "border-b border-gray-200" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
        {episode.species.image ? (
          <Image
            src={`/images/species/${episode.species.image}`}
            alt={episode.species.imageAlt || episode.species.commonName}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="w-full h-full bg-[var(--sage-light)] flex items-center justify-center">
            <span className="text-[var(--olive)] text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {/* Episode number */}
        <p className="text-sm text-gray-500 mb-1">
          Episode {episode.episodeNumber}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-base text-gray-900 leading-tight line-clamp-2">
          {episode.species.commonName || episode.title}
          {episode.subtitle && `: ${episode.subtitle}`}
        </h3>

        {/* Species info */}
        {episode.species.scientificName && (
          <p className="text-sm mt-1">
            <span className="italic text-[var(--olive)]">
              {episode.species.scientificName}
            </span>
            {episode.species.status && (
              <span className="text-gray-500"> · {episode.species.status}</span>
            )}
          </p>
        )}

        {/* Description */}
        {episode.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {episode.description}
          </p>
        )}
      </div>

      {/* Duration */}
      {episode.duration > 0 && (
        <div className="flex-shrink-0 self-start">
          <span className="text-sm text-gray-500">
            {formatDuration(episode.duration)}
          </span>
        </div>
      )}
    </Link>
  );
}
