"use client";

import {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Episode } from "@/lib/types";

// State shape
interface AudioPlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  isVisible: boolean;
}

// Action types
type AudioAction =
  | { type: "PLAY_EPISODE"; payload: Episode }
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_SPEED"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "TOGGLE_MUTE" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLOSE_PLAYER" };

// Initial state
const initialState: AudioPlayerState = {
  currentEpisode: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  playbackSpeed: 1,
  volume: 1,
  isMuted: false,
  isLoading: false,
  error: null,
  isVisible: false,
};

// Reducer
function audioReducer(
  state: AudioPlayerState,
  action: AudioAction
): AudioPlayerState {
  switch (action.type) {
    case "PLAY_EPISODE":
      return {
        ...state,
        currentEpisode: action.payload,
        isPlaying: true,
        isVisible: true,
        currentTime: 0,
        duration: 0,
        isLoading: true,
        error: null,
      };
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_TIME":
      return { ...state, currentTime: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload, isLoading: false };
    case "SET_SPEED":
      return { ...state, playbackSpeed: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload, isMuted: action.payload === 0 };
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "CLOSE_PLAYER":
      return { ...state, isVisible: false, isPlaying: false };
    default:
      return state;
  }
}

// Context value type
interface AudioPlayerContextValue {
  state: AudioPlayerState;
  playEpisode: (episode: Episode) => void;
  togglePlay: () => void;
  pause: () => void;
  play: () => void;
  seekTo: (time: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
  closePlayer: () => void;
}

// Create context
const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

// Provider component
export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeUpdateThrottle = useRef<number>(0);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;

    // Event handlers
    const handleTimeUpdate = () => {
      const now = Date.now();
      // Throttle to ~4 updates per second
      if (now - timeUpdateThrottle.current > 250) {
        timeUpdateThrottle.current = now;
        dispatch({ type: "SET_TIME", payload: audio.currentTime });
      }
    };

    const handleLoadedMetadata = () => {
      dispatch({ type: "SET_DURATION", payload: audio.duration });
    };

    const handleEnded = () => {
      dispatch({ type: "SET_PLAYING", payload: false });
    };

    const handleError = () => {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to load audio. Please try again.",
      });
    };

    const handleCanPlay = () => {
      dispatch({ type: "SET_LOADING", payload: false });
    };

    const handleWaiting = () => {
      dispatch({ type: "SET_LOADING", payload: true });
    };

    // Attach listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
    };
  }, []);

  // Sync playback speed with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = state.playbackSpeed;
    }
  }, [state.playbackSpeed]);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.isMuted ? 0 : state.volume;
    }
  }, [state.volume, state.isMuted]);

  // Actions
  const playEpisode = useCallback((episode: Episode) => {
    const audio = audioRef.current;
    if (!audio || !episode.audioUrl) return;

    // If same episode, just toggle play
    if (state.currentEpisode?.id === episode.id) {
      if (state.isPlaying) {
        audio.pause();
        dispatch({ type: "SET_PLAYING", payload: false });
      } else {
        audio.play().catch(console.error);
        dispatch({ type: "SET_PLAYING", payload: true });
      }
      return;
    }

    // New episode
    dispatch({ type: "PLAY_EPISODE", payload: episode });
    audio.src = episode.audioUrl;
    audio.load();
    audio.play().catch((err) => {
      console.error("Playback failed:", err);
      dispatch({ type: "SET_ERROR", payload: "Playback failed. Please try again." });
    });
  }, [state.currentEpisode?.id, state.isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isPlaying) {
      audio.pause();
      dispatch({ type: "SET_PLAYING", payload: false });
    } else {
      audio.play().catch(console.error);
      dispatch({ type: "SET_PLAYING", payload: true });
    }
  }, [state.isPlaying]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(console.error);
    dispatch({ type: "SET_PLAYING", payload: true });
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    dispatch({ type: "SET_PLAYING", payload: false });
  }, []);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
    dispatch({ type: "SET_TIME", payload: audio.currentTime });
  }, []);

  const setPlaybackSpeed = useCallback((speed: number) => {
    dispatch({ type: "SET_SPEED", payload: speed });
  }, []);

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: "SET_VOLUME", payload: Math.max(0, Math.min(1, volume)) });
  }, []);

  const toggleMute = useCallback(() => {
    dispatch({ type: "TOGGLE_MUTE" });
  }, []);

  const skipForward = useCallback((seconds: number = 15) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + seconds, audio.duration || 0);
  }, []);

  const skipBackward = useCallback((seconds: number = 15) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - seconds, 0);
  }, []);

  const closePlayer = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    dispatch({ type: "CLOSE_PLAYER" });
  }, []);

  const value: AudioPlayerContextValue = {
    state,
    playEpisode,
    togglePlay,
    pause,
    play,
    seekTo,
    setPlaybackSpeed,
    setVolume,
    toggleMute,
    skipForward,
    skipBackward,
    closePlayer,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

// Hook to use audio player
export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
}
