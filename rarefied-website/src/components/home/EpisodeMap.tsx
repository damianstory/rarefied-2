"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapPopup,
  MapControls,
} from "@/components/ui/map";
import {
  episodeLocations,
  type EpisodeLocation,
} from "@/lib/episode-locations";
import { getEpisodeBySlug } from "@/lib/episodes";
import type { Episode } from "@/lib/types";

// Get episode data for a location
function getEpisodesForLocation(location: EpisodeLocation): Episode[] {
  return location.episodeSlugs
    .map((slug) => getEpisodeBySlug(slug))
    .filter((ep): ep is Episode => ep !== undefined);
}

// Format duration for display
function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
}

// Custom olive pin component
function OlivePin({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`
        relative transition-transform duration-200
        ${isActive ? "scale-125 z-10" : "hover:scale-110"}
      `}
    >
      {/* Pin body */}
      <svg
        width="28"
        height="40"
        viewBox="0 0 28 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Pin shape */}
        <path
          d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 40 14 40C14 40 28 24.5 28 14C28 6.268 21.732 0 14 0Z"
          fill="var(--olive)"
        />
        {/* Circular head area */}
        <circle cx="14" cy="14" r="10" fill="white" />
        {/* Inner circle for image placeholder */}
        <circle
          cx="14"
          cy="14"
          r="8"
          fill="var(--sage-light)"
          stroke="var(--olive)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// Episode popup content
function EpisodePopupContent({
  location,
  onClose,
}: {
  location: EpisodeLocation;
  onClose?: () => void;
}) {
  const episodes = getEpisodesForLocation(location);
  const firstEpisode = episodes[0];

  if (!firstEpisode) return null;

  return (
    <div className="w-[320px] p-0">
      {/* Close button - only show for mobile tap popup */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          aria-label="Close"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L11 11M1 11L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      <div className="flex gap-4">
        {/* Species image - left side */}
        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-[var(--sage-light)]">
          {firstEpisode.species.image && (
            <Image
              src={`/images/species/${firstEpisode.species.image}`}
              alt={firstEpisode.species.commonName}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Content - right side */}
        <div className="flex-1 min-w-0 py-1">
          {/* Animal name */}
          <h3 className="font-heading text-lg font-bold text-black leading-tight mb-1">
            {location.animal}
          </h3>

          {/* Location */}
          <p className="text-xs text-gray-500 mb-2">{location.location}</p>

          {/* Episode links */}
          <div className="space-y-1.5">
            {episodes.map((episode) => (
              <Link
                key={episode.slug}
                href={`/episodes/${episode.slug}`}
                className="flex items-center justify-between group"
              >
                <span className="text-sm text-gray-700 group-hover:text-[var(--olive)] transition-colors">
                  S{episode.season} E{episode.episodeNumber}
                  {episodes.length > 1 && (
                    <span className="ml-1 text-xs text-gray-400">
                      {episode.title.includes("Pt 1") ||
                      episode.title.includes("Part 1")
                        ? "(Part 1)"
                        : episode.title.includes("Pt 2") ||
                            episode.title.includes("Part 2")
                          ? "(Part 2)"
                          : ""}
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-1 text-[var(--olive)] font-medium text-sm group-hover:text-[var(--olive-dark)] transition-colors">
                  Listen Now
                  <svg
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EpisodeMap() {
  const [activeLocation, setActiveLocation] = useState<EpisodeLocation | null>(
    null
  );

  const handleMarkerClick = useCallback((location: EpisodeLocation) => {
    setActiveLocation((prev) =>
      prev?.episodeSlugs[0] === location.episodeSlugs[0] ? null : location
    );
  }, []);

  const handleClosePopup = useCallback(() => {
    setActiveLocation(null);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-wide">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Explore Episodes by Location
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the stories of endangered species from across North America
          </p>
        </div>

        {/* Map container */}
        <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
          <Map
            center={[-100, 55]}
            zoom={2.5}
            minZoom={2}
            maxZoom={10}
            styles={{
              light:
                "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
            }}
          >
            <MapControls position="bottom-right" showZoom={true} />

            {/* Episode markers */}
            {episodeLocations.map((location) => (
              <MapMarker
                key={location.episodeSlugs[0]}
                longitude={location.lng}
                latitude={location.lat}
                onClick={() => handleMarkerClick(location)}
              >
                <MarkerContent>
                  <OlivePin
                    isActive={
                      activeLocation?.episodeSlugs[0] ===
                      location.episodeSlugs[0]
                    }
                  />
                </MarkerContent>
                {/* Desktop hover tooltip */}
                <MarkerTooltip
                  className="!p-4 !bg-white !border-0 !shadow-xl rounded-xl"
                  offset={24}
                >
                  <EpisodePopupContent location={location} />
                </MarkerTooltip>
              </MapMarker>
            ))}

            {/* Active location popup */}
            {activeLocation && (
              <MapPopup
                longitude={activeLocation.lng}
                latitude={activeLocation.lat}
                onClose={handleClosePopup}
                offset={24}
                className="!p-4 !bg-white !border-0 !shadow-xl rounded-xl"
              >
                <EpisodePopupContent
                  location={activeLocation}
                  onClose={handleClosePopup}
                />
              </MapPopup>
            )}
          </Map>
        </div>

        {/* Mobile hint */}
        <p className="text-center text-sm text-gray-500 mt-4 md:hidden">
          Tap a pin to learn more about each episode
        </p>
      </div>
    </section>
  );
}
