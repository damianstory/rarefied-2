"use client";

import { useEffect, useCallback } from "react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function MiniPlayer() {
  const {
    state,
    togglePlay,
    skipForward,
    skipBackward,
    seekTo,
    setPlaybackSpeed,
    closePlayer,
  } = useAudioPlayer();

  const { currentEpisode, isPlaying, currentTime, duration, playbackSpeed, isLoading, isVisible } =
    state;

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipBackward(e.shiftKey ? 30 : 15);
          break;
        case "ArrowRight":
          e.preventDefault();
          skipForward(e.shiftKey ? 30 : 15);
          break;
        case "Escape":
          closePlayer();
          break;
      }
    },
    [togglePlay, skipBackward, skipForward, closePlayer]
  );

  useEffect(() => {
    if (!isVisible || !currentEpisode) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, currentEpisode, handleKeyDown]);

  if (!isVisible || !currentEpisode) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seekTo(percent * duration);
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      {/* Progress bar - clickable */}
      <div
        className="h-1 bg-gray-200 cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-[var(--sky)] transition-all duration-100 group-hover:bg-[var(--olive)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container-wide py-3">
        <div className="flex items-center gap-4 md:justify-between">
          {/* Left Group - Episode Image & Info */}
          <div className="flex items-center gap-4 md:flex-1 min-w-0">
            {/* Episode Image */}
            <Link
              href={`/episodes/${currentEpisode.slug}`}
              className="flex-shrink-0 hidden sm:block"
            >
              <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                {currentEpisode.species?.image ? (
                  <Image
                    src={`/images/species/${currentEpisode.species.image}`}
                    alt={currentEpisode.species.commonName || currentEpisode.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--sage-light)] flex items-center justify-center">
                    <span className="text-xs text-[var(--olive)]">
                      {currentEpisode.episodeNumber}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Episode Info */}
            <Link
              href={`/episodes/${currentEpisode.slug}`}
              className="min-w-0"
            >
              <p className="font-medium text-sm text-black truncate">
                {currentEpisode.species?.commonName || currentEpisode.title}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentEpisode.subtitle || `Episode ${currentEpisode.episodeNumber}`}
              </p>
            </Link>
          </div>

          {/* Center Group - Playback Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Skip Backward */}
            <button
              onClick={() => skipBackward(15)}
              className="p-2 text-gray-600 hover:text-[var(--sky)] transition-colors"
              aria-label="Skip backward 15 seconds"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className={cn(
                "p-2 rounded-full text-white transition-colors",
                isLoading
                  ? "bg-gray-300 cursor-wait"
                  : "bg-[var(--sky)] hover:bg-[var(--olive)]"
              )}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isLoading ? (
                <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => skipForward(15)}
              className="p-2 text-gray-600 hover:text-[var(--sky)] transition-colors"
              aria-label="Skip forward 15 seconds"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>
          </div>

          {/* Right Group - Time, Speed, Close */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            {/* Time Display */}
            <div className="flex items-center gap-2 text-sm font-mono text-gray-600 min-w-[100px]">
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>/</span>
              <span>{formatDuration(Math.floor(duration))}</span>
            </div>

            {/* Speed Control */}
            <div className="relative">
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="appearance-none bg-gray-100 text-gray-700 text-sm px-2 py-1 pr-6 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                aria-label="Playback speed"
              >
                {speedOptions.map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}x
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Close Button */}
            <button
              onClick={closePlayer}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close player"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Close Button - Mobile only */}
          <button
            onClick={closePlayer}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close player"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Time Display */}
        <div className="md:hidden flex justify-between text-xs font-mono text-gray-500 mt-2">
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <span>{formatDuration(Math.floor(duration))}</span>
        </div>
      </div>
    </div>
  );
}
