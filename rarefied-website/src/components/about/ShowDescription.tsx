import { SITE_CONFIG } from "@/lib/constants";

export function ShowDescription() {
  return (
    <section className="py-12 md:py-16 bg-[var(--sage-light)]">
      <div className="container-narrow">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            About the Show
          </h2>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-gray-700 leading-relaxed text-center">
            {SITE_CONFIG.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700">
                To educate and inspire audiences about biodiversity, fostering a deeper connection with the natural world and motivating action for wildlife conservation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3">
                What to Expect
              </h3>
              <p className="text-gray-700">
                Each episode features in-depth conversations with expert conservationists, fascinating species facts, and inspiring stories of recovery and hope.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
            <h3 className="text-xl font-bold text-black mb-3">
              Why Rarefied?
            </h3>
            <p className="text-gray-700 mb-3">
              In a world facing a biodiversity crisis, Rarefied shines a light on the remarkable creatures that are disappearing from our planet. We believe that every species has a story worth telling, and that understanding these stories can inspire meaningful action for conservation.
            </p>
            <p className="text-gray-700">
              Through expert interviews, field recordings, and engaging storytelling, we make complex ecological topics accessible and compelling. Whether you're a conservation enthusiast or simply curious about the natural world, Rarefied offers a unique window into the lives of rare and endangered species.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
