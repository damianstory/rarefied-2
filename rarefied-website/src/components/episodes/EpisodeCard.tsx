import Image from "next/image";
import Link from "next/link";
import { Card, CardImage, CardContent, Badge } from "@/components/ui";
import { EpisodePlayButton } from "@/components/audio";
import { formatDuration } from "@/lib/utils";
import type { Episode } from "@/lib/types";

interface EpisodeCardProps {
  episode: Episode;
  showPlayButton?: boolean;
}

export function EpisodeCard({ episode, showPlayButton = true }: EpisodeCardProps) {
  return (
    <Card hover className="flex flex-col h-full group">
      <Link href={`/episodes/${episode.slug}`}>
        <CardImage aspectRatio="1/1">
          {episode.species.image ? (
            <Image
              src={`/images/species/${episode.species.image}`}
              alt={episode.species.imageAlt || episode.species.commonName}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-[var(--sage-light)] flex items-center justify-center">
              <span className="text-[var(--olive)] text-sm">No image</span>
            </div>
          )}

          {/* Duration badge */}
          {episode.duration > 0 && (
            <div className="absolute top-3 right-3">
              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                {formatDuration(episode.duration)}
              </span>
            </div>
          )}

          {/* Play button overlay */}
          {showPlayButton && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <EpisodePlayButton episode={episode} size="lg" />
            </div>
          )}
        </CardImage>
      </Link>

      <CardContent className="flex-1 flex flex-col">
        {/* Species name */}
        <Link href={`/episodes/${episode.slug}`}>
          <h3 className="font-semibold text-lg text-black hover:text-[var(--sky)] transition-colors line-clamp-1">
            {episode.species.commonName || episode.title}
          </h3>
        </Link>

        {/* Scientific name */}
        {episode.species.scientificName && (
          <p className="scientific-name text-sm mt-0.5 line-clamp-1">
            {episode.species.scientificName}
          </p>
        )}

        {/* Episode metadata */}
        <p className="text-sm text-gray-500 mt-2">
          Season {episode.season} &middot; Episode {episode.episodeNumber}
        </p>

        {/* Subtitle */}
        {episode.subtitle && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {episode.subtitle}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
          {episode.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
