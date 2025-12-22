"use client";

import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { PlayButton } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Episode } from "@/lib/types";

interface EpisodePlayButtonProps {
  episode: Episode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
  className?: string;
}

export function EpisodePlayButton({
  episode,
  size = "lg",
  variant = "primary",
  className,
}: EpisodePlayButtonProps) {
  const { state, playEpisode } = useAudioPlayer();

  const isCurrentEpisode = state.currentEpisode?.id === episode.id;
  const isPlaying = isCurrentEpisode && state.isPlaying;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playEpisode(episode);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" &&
          "bg-[var(--sky)] text-white hover:bg-[var(--sky-dark)] hover:scale-105 focus:ring-[var(--sky)] shadow-md hover:shadow-lg",
        variant === "outline" &&
          "border-2 border-[var(--sky)] text-[var(--sky)] bg-white hover:bg-[var(--sky)] hover:text-white",
        size === "sm" && "w-10 h-10",
        size === "md" && "w-14 h-14",
        size === "lg" && "w-16 h-16",
        className
      )}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? (
        <svg
          className={cn(
            size === "sm" && "w-4 h-4",
            size === "md" && "w-5 h-5",
            size === "lg" && "w-6 h-6"
          )}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg
          className={cn(
            "ml-0.5",
            size === "sm" && "w-4 h-4",
            size === "md" && "w-5 h-5",
            size === "lg" && "w-6 h-6 ml-1"
          )}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
      )}
    </button>
  );
}
