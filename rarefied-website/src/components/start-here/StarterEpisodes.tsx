import Link from "next/link";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { getStarterEpisodes } from "@/lib/episodes";

export function StarterEpisodes() {
  const episodes = getStarterEpisodes();

  return (
    <section className="py-12 md:py-16">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Recommended Starter Episodes
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A diverse selection of episodes to introduce you to different species and conservation challenges. Each one offers a unique perspective on biodiversity and the people working to protect it.
          </p>
        </div>

        {/* Episode Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Ready to explore more? We have many more episodes waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/episodes"
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--sky)] text-white font-medium rounded-lg hover:bg-[var(--sky-dark)] transition-colors"
            >
              Browse All Episodes
            </Link>
            <Link
              href="/listen"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[var(--sky)] font-medium rounded-lg border-2 border-[var(--sky)] hover:bg-[var(--sky)] hover:text-white transition-colors"
            >
              Subscribe on Your Favorite Platform
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
