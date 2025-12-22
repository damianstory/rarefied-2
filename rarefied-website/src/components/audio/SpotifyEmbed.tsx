import { cn } from "@/lib/utils";

interface SpotifyEmbedProps {
  episodeId: string;
  className?: string;
}

export function SpotifyEmbed({ episodeId, className }: SpotifyEmbedProps) {
  if (!episodeId) {
    return (
      <div
        className={cn(
          "bg-gray-100 rounded-lg p-8 text-center text-gray-500",
          className
        )}
      >
        <p>Audio player not available</p>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <iframe
        src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
        title="Spotify Episode Player"
      />
    </div>
  );
}
