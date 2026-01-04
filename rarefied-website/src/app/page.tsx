import { HeroSection, RecentEpisodes, NewsletterSignup } from "@/components/home";
import { getRecentEpisodes } from "@/lib/episodes";

export default function HomePage() {
  const recentEpisodes = getRecentEpisodes(4);

  return (
    <>
      <HeroSection />
      <RecentEpisodes episodes={recentEpisodes} />
      <NewsletterSignup />
    </>
  );
}
