"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { EpisodePlayButton } from "@/components/audio";
import { ChapterList } from "./ChapterList";
import type { Episode, Chapter } from "@/lib/types";

interface EpisodePlayerSectionProps {
  episode: Episode;
  chapters: Chapter[];
}

export function EpisodePlayerSection({
  episode,
  chapters,
}: EpisodePlayerSectionProps) {
  const { state, seekTo, playEpisode } = useAudioPlayer();
  const searchParams = useSearchParams();
  const hasAutoPlayed = useRef(false);

  // Auto-play when navigating with ?autoplay=true
  useEffect(() => {
    const shouldAutoPlay = searchParams.get("autoplay") === "true";
    if (shouldAutoPlay && !hasAutoPlayed.current && episode.audioUrl) {
      hasAutoPlayed.current = true;
      playEpisode(episode);
    }
  }, [searchParams, episode, playEpisode]);

  const isCurrentEpisode = state.currentEpisode?.id === episode.id;
  const isPlaying = isCurrentEpisode && state.isPlaying;

  const handleChapterClick = (timeInSeconds: number) => {
    // If this episode isn't currently loaded, load it first then seek
    if (!isCurrentEpisode) {
      playEpisode(episode);
      // Small delay to let the audio element load before seeking
      setTimeout(() => seekTo(timeInSeconds), 100);
    } else {
      seekTo(timeInSeconds);
    }
  };

  return (
    <div className="space-y-6">
      {/* Play Button */}
      <div className="flex items-center gap-4">
        <EpisodePlayButton episode={episode} size="lg" />
        <div>
          <p className="text-sm text-gray-500">
            {isPlaying ? "Now playing" : "Listen to this episode"}
          </p>
          {isCurrentEpisode && state.currentTime > 0 && (
            <p className="text-xs text-gray-400">
              Continue from where you left off
            </p>
          )}
        </div>
      </div>

      {/* Chapters */}
      {chapters && chapters.length > 0 && (
        <ChapterList
          chapters={chapters}
          onChapterClick={handleChapterClick}
        />
      )}
    </div>
  );
}
