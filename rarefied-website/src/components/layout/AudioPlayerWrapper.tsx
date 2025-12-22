"use client";

import { AudioPlayerProvider, useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { MiniPlayer } from "@/components/audio";
import { type ReactNode } from "react";

function PlayerSpacing({ children }: { children: ReactNode }) {
  const { state } = useAudioPlayer();

  return (
    <div className={state.isVisible ? "pb-24" : ""}>
      {children}
    </div>
  );
}

export function AudioPlayerWrapper({ children }: { children: ReactNode }) {
  return (
    <AudioPlayerProvider>
      <PlayerSpacing>{children}</PlayerSpacing>
      <MiniPlayer />
    </AudioPlayerProvider>
  );
}
