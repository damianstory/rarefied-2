import { HeroCarousel } from "./HeroCarousel";
import { getStarterEpisodes } from "@/lib/episodes";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  const starterEpisodes = getStarterEpisodes();

  return (
    <section className="bg-[var(--sage-light)] pt-8 pb-8 lg:pt-12 lg:pb-12">
      <div className="container-wide">
        <HeroCarousel episodes={starterEpisodes} />

        {/* Tagline */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {SITE_CONFIG.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
