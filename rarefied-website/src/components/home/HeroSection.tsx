import Image from "next/image";
import Link from "next/link";
import { PlayButton, Badge } from "@/components/ui";
import { formatDuration, truncateAtSentence } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import type { Episode } from "@/lib/types";

interface HeroSectionProps {
  latestEpisode: Episode;
}

export function HeroSection({ latestEpisode }: HeroSectionProps) {
  return (
    <section className="bg-[var(--sage-light)] pt-12 pb-8 lg:pt-20 lg:pb-12">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm text-[var(--olive)] uppercase tracking-wide font-mono font-semibold">
              Latest Episode
            </p>

            <h1 className="mt-3 text-4xl lg:text-5xl font-bold text-black leading-tight">
              {latestEpisode.species.commonName || latestEpisode.title}
            </h1>

            {latestEpisode.subtitle && (
              <p className="mt-2 text-xl lg:text-2xl text-gray-700">
                {latestEpisode.subtitle}
              </p>
            )}

            <p className="mt-4 text-sm text-[var(--olive)] font-mono">
              Season {latestEpisode.season} &middot; Episode{" "}
              {latestEpisode.episodeNumber}
              {latestEpisode.duration > 0 && (
                <> &middot; {formatDuration(latestEpisode.duration)}</>
              )}
            </p>

            {latestEpisode.description && (
              <p className="mt-4 text-gray-600">
                {truncateAtSentence(latestEpisode.description, 350).text}
              </p>
            )}

            <div className="mt-6 flex items-center gap-4">
              <Link href={`/episodes/${latestEpisode.slug}?autoplay=true`}>
                <PlayButton size="lg" aria-label="Play latest episode" />
              </Link>
              <Link
                href={`/episodes/${latestEpisode.slug}?autoplay=true`}
                className="font-medium text-[var(--sky)] hover:text-[var(--sky-dark)] transition-colors"
              >
                Listen Now
              </Link>
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {latestEpisode.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl w-[75%]">
              {latestEpisode.species.image ? (
                <Image
                  src={`/images/species/${latestEpisode.species.image}`}
                  alt={
                    latestEpisode.species.imageAlt ||
                    latestEpisode.species.commonName
                  }
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-[var(--sage)] flex items-center justify-center">
                  <span className="text-[var(--olive)]">No image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {SITE_CONFIG.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
