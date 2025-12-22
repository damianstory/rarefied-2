import Link from "next/link";
import type { PlatformLink } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/Card";

interface PlatformCardProps {
  platform: PlatformLink;
}

const platformIcons: Record<string, React.ReactElement> = {
  spotify: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  apple: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  youtube: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  amazon: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.544.406-3.045.61-4.516.61-3.382 0-6.624-.776-9.726-2.325-.59-.3-1.153-.62-1.693-.96-.54-.34-1.004-.7-1.39-1.08-.384-.38-.576-.627-.576-.74 0-.07.016-.12.046-.15zm7.084-2.42c-.562-.195-.844-.59-.844-1.185 0-.39.14-.72.42-.99.282-.27.652-.405 1.11-.405.448 0 .832.135 1.152.405.318.27.478.6.478.99 0 .6-.282.995-.844 1.185-.563.195-1.024.195-1.472 0zm7.757-9.963c-.877-.877-1.316-2.063-1.316-3.555 0-1.49.44-2.677 1.316-3.554.876-.878 2.062-1.316 3.554-1.316 1.492 0 2.678.438 3.555 1.316.876.877 1.315 2.063 1.315 3.554s-.44 2.678-1.315 3.555c-.877.877-2.063 1.316-3.555 1.316-1.492 0-2.678-.44-3.554-1.316z"/>
    </svg>
  ),
  pocketcasts: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,0C5.372,0,0,5.372,0,12c0,6.628,5.372,12,12,12c6.628,0,12-5.372,12-12C24,5.372,18.628,0,12,0z M15.564,12c0-1.968-1.596-3.564-3.564-3.564c-1.968,0-3.564,1.596-3.564,3.564c0,1.968,1.596,3.564,3.564,3.564V18c-3.308,0-6-2.692-6-6s2.692-6,6-6s6,2.692,6,6H15.564z"/>
    </svg>
  ),
  rss: (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
    </svg>
  ),
};

export function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Link href={platform.url} target="_blank" rel="noopener noreferrer">
      <Card hover className="h-full group">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className="text-[var(--olive)] group-hover:text-[var(--sky)] transition-colors">
            {platformIcons[platform.icon] || platformIcons.rss}
          </div>

          {/* Platform Name */}
          <h3 className="text-xl font-bold text-black group-hover:text-[var(--sky)] transition-colors">
            {platform.name}
          </h3>

          {/* Description */}
          {platform.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {platform.description}
            </p>
          )}

          {/* Link Arrow */}
          <div className="text-[var(--sky)] opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
