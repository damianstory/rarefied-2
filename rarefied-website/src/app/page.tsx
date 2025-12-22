import { HeroSection, RecentEpisodes, NewsletterSignup } from "@/components/home";
import { getLatestEpisode, getRecentEpisodes } from "@/lib/episodes";

export default function HomePage() {
  const latestEpisode = getLatestEpisode();
  const recentEpisodes = getRecentEpisodes(4).slice(1); // Skip the latest (shown in hero)

  return (
    <>
      <HeroSection latestEpisode={latestEpisode} />
      <RecentEpisodes episodes={recentEpisodes} />
      <NewsletterSignup />
    </>
  );
}
