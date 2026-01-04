"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayButton } from "@/components/ui";
import { formatDuration } from "@/lib/utils";
import type { Episode } from "@/lib/types";

interface HeroCarouselProps {
  episodes: Episode[];
  autoPlayInterval?: number;
}

export function HeroCarousel({
  episodes,
  autoPlayInterval = 5000,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  // Touch handling for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // Auto-rotation
  useEffect(() => {
    if (isPaused || episodes.length <= 1) return;

    const timer = setInterval(() => {
      goToSlide((currentIndex + 1) % episodes.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, episodes.length, autoPlayInterval, currentIndex]);

  // Navigation with slide animation
  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isSliding) return;
      setIsSliding(true);
      setCurrentIndex(index);
      setTimeout(() => setIsSliding(false), 500);
    },
    [currentIndex, isSliding]
  );

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % episodes.length);
  }, [currentIndex, episodes.length, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + episodes.length) % episodes.length);
  }, [currentIndex, episodes.length, goToSlide]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goNext();
    if (isRightSwipe) goPrev();
  };

  // Get card position relative to current index
  const getCardPosition = (index: number): "left" | "center" | "right" => {
    const diff = index - currentIndex;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(episodes.length - 1)) return "right";
    if (diff === -1 || diff === episodes.length - 1) return "left";
    return "center";
  };

  const currentEpisode = episodes[currentIndex];

  if (!currentEpisode) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Starter episodes carousel"
    >
      {/* "Start Here" label */}
      <div className="text-center mb-6">
        <p className="text-sm text-[var(--olive)] uppercase tracking-wide font-mono font-semibold">
          <span className="hand-drawn-circle px-3 py-1">
            Start Here:
            <svg
              width="160"
              height="56"
              viewBox="0 0 140 48"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "translate(-50%, -58%) rotate(-2deg)" }}
            >
              <path
                d="M 110 10
                   C 85 5, 50 4, 30 10
                   C 10 16, 3 24, 5 32
                   C 8 40, 22 46, 55 46
                   C 90 46, 120 42, 130 32
                   C 138 24, 135 14, 122 8
                   C 110 3, 90 6, 95 12"
              />
            </svg>
          </span>
        </p>
      </div>

      {/* Card Carousel Container */}
      <div className="relative overflow-hidden py-4">
        <div className="flex items-center justify-center">
          {/* Cards Track */}
          <div className="relative w-full max-w-5xl h-[400px] md:h-[480px]">
            {episodes.map((episode, index) => {
              const position = getCardPosition(index);

              return (
                <div
                  key={episode.slug}
                  className={`
                    absolute top-0 left-1/2
                    w-[280px] md:w-[340px] h-full
                    transition-all duration-500 ease-out
                    ${position === "center" ? "z-20" : "z-10"}
                  `}
                  style={{
                    transform: `
                      translateX(${
                        position === "center"
                          ? "-50%"
                          : position === "left"
                          ? "calc(-50% - 300px)"
                          : "calc(-50% + 300px)"
                      })
                      scale(${position === "center" ? 1 : 0.85})
                    `,
                    opacity: position === "center" ? 1 : 0.6,
                    filter: position === "center" ? "none" : "brightness(0.8)",
                  }}
                  onClick={() => position !== "center" && goToSlide(index)}
                  role={position !== "center" ? "button" : undefined}
                  tabIndex={position !== "center" ? 0 : undefined}
                  aria-label={
                    position !== "center"
                      ? `Go to ${episode.species.commonName}`
                      : undefined
                  }
                >
                  {/* Card */}
                  <div
                    className={`
                      relative h-full rounded-2xl overflow-hidden
                      bg-white shadow-xl
                      ${position === "center" ? "shadow-2xl" : "shadow-lg"}
                      ${position !== "center" ? "cursor-pointer" : ""}
                      transition-shadow duration-500
                    `}
                  >
                    {/* Image */}
                    <div className="relative h-[65%] overflow-hidden">
                      {episode.species.image ? (
                        <Image
                          src={`/images/species/${episode.species.image}`}
                          alt={
                            episode.species.imageAlt ||
                            episode.species.commonName
                          }
                          fill
                          className={`
                            object-cover transition-transform duration-500
                            ${position === "center" ? "carousel-image" : ""}
                          `}
                          priority={index === 0}
                          sizes="(max-width: 768px) 280px, 340px"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--sage)] flex items-center justify-center">
                          <span className="text-[var(--olive)]">No image</span>
                        </div>
                      )}

                      {/* Play overlay for center card */}
                      {position === "center" && (
                        <Link
                          href={`/episodes/${episode.slug}?autoplay=true`}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        >
                          <PlayButton
                            size="lg"
                            aria-label={`Play ${episode.species.commonName}`}
                          />
                        </Link>
                      )}

                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white text-xs font-mono">
                        {formatDuration(episode.duration)}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 h-[35%] flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-[var(--olive)] font-mono uppercase tracking-wide">
                          S{episode.season} E{episode.episodeNumber}
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-black leading-tight line-clamp-2">
                          {episode.species.commonName || episode.title}
                        </h3>
                        {episode.species.scientificName && (
                          <p className="mt-1 text-sm text-gray-500 font-mono italic">
                            {episode.species.scientificName}
                          </p>
                        )}
                      </div>

                      {/* Listen Now link for center card */}
                      {position === "center" && (
                        <Link
                          href={`/episodes/${episode.slug}?autoplay=true`}
                          className="inline-flex items-center gap-2 text-[var(--sky)] hover:text-[var(--sky-dark)] font-medium transition-colors"
                        >
                          <span>Listen Now</span>
                          <svg
                            className="w-4 h-4"
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
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label="Previous episode"
        >
          <svg
            className="w-6 h-6 text-[var(--olive)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label="Next episode"
        >
          <svg
            className="w-6 h-6 text-[var(--olive)]"
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
        </button>
      </div>

      {/* Navigation Dots */}
      <div
        className="flex justify-center gap-3 mt-6"
        role="tablist"
        aria-label="Choose episode"
      >
        {episodes.map((episode, index) => (
          <button
            key={episode.slug}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${
              index === currentIndex ? "carousel-dot-active" : ""
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to ${episode.species.commonName}`}
          />
        ))}
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {currentEpisode.species.commonName}, episode {currentIndex + 1}{" "}
        of {episodes.length}
      </div>
    </div>
  );
}
