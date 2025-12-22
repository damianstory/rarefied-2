import { PlatformCard } from "./PlatformCard";
import { PLATFORM_LINKS } from "@/lib/constants";

export function PlatformGrid() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            How to Listen
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Subscribe to get new episodes every Thursday. Choose your favorite platform below.
          </p>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PLATFORM_LINKS.map((platform) => (
            <PlatformCard key={platform.name} platform={platform} />
          ))}
        </div>

        {/* Website Listening Section */}
        <div className="bg-[var(--sage-light)] rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Listen on Our Website
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            All episodes are available to stream directly on our website. Browse the full archive and listen without leaving your browser.
          </p>
          <a
            href="/episodes"
            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--sky)] text-white font-medium rounded-lg hover:bg-[var(--sky-dark)] transition-colors"
          >
            Browse All Episodes
          </a>
        </div>
      </div>
    </section>
  );
}
