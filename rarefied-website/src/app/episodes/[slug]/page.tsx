import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SpeciesCard,
  ResourceLinks,
  RelatedEpisodes,
  EpisodePlayerSection,
} from "@/components/episodes";
import { Badge } from "@/components/ui";
import { formatDuration } from "@/lib/utils";
import { cleanDescription } from "@/lib/cleanDescription";
import {
  getEpisodeBySlug,
  getAllEpisodeSlugs,
  getRelatedEpisodes,
} from "@/lib/episodes";

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllEpisodeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    return { title: "Episode Not Found" };
  }

  return {
    title: `${episode.species.commonName}: ${episode.subtitle || episode.title}`,
    description: episode.description,
    openGraph: {
      title: `${episode.species.commonName}: ${episode.subtitle || episode.title}`,
      description: episode.description,
      images: episode.species.image
        ? [`/images/species/${episode.species.image}`]
        : [],
    },
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const relatedEpisodes = getRelatedEpisodes(slug, 4);

  return (
    <div className="py-12">
      <div className="container-wide">
        {/* Episode Header */}
        <div className="mb-8">
          <p className="text-sm text-[var(--olive)] font-mono">
            Season {episode.season} &middot; Episode {episode.episodeNumber}
            {episode.duration > 0 && (
              <> &middot; {formatDuration(episode.duration)}</>
            )}
          </p>
          <h1 className="mt-2 text-3xl lg:text-4xl font-bold text-black">
            {episode.species.commonName || episode.title}
          </h1>
          {episode.subtitle && (
            <p className="mt-2 text-xl text-gray-600">{episode.subtitle}</p>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Species Card */}
          <div className="lg:col-span-1">
            <SpeciesCard
              species={episode.species}
              episodeNumber={episode.episodeNumber}
            />
          </div>

          {/* Right Column: Description + Player */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {episode.description && (
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {cleanDescription(episode.description)}
                </p>

                {episode.guest && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-black">
                      Featuring: {episode.guest.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {episode.guest.title}
                      {episode.guest.organization &&
                        `, ${episode.guest.organization}`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Audio Player Section with Chapters */}
            <EpisodePlayerSection
              episode={episode}
              chapters={episode.chapters || []}
            />

            {/* Resources */}
            {episode.resources && episode.resources.length > 0 && (
              <ResourceLinks resources={episode.resources} />
            )}

            {/* Tags */}
            {episode.tags && episode.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {episode.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Episodes */}
        {relatedEpisodes.length > 0 && (
          <div className="mt-16">
            <RelatedEpisodes episodes={relatedEpisodes} />
          </div>
        )}
      </div>
    </div>
  );
}
