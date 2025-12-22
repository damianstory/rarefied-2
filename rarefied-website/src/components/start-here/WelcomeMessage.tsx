import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export function WelcomeMessage() {
  return (
    <section className="py-12 md:py-16 bg-[var(--sage-light)]">
      <div className="container-narrow">
        <div className="grid md:grid-cols-[200px,1fr] gap-8 items-start">
          {/* Host Photo (smaller version) */}
          <div className="relative w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden bg-white shadow-lg">
            <Image
              src="/images/host/meredith-start-here.jpg"
              alt={SITE_CONFIG.host.name}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>

          {/* Welcome Text */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                New to Rarefied?
              </h1>
              <p className="text-lg text-[var(--olive)] font-semibold">
                Welcome! I'm {SITE_CONFIG.host.name}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Ready to go on an auditory safari? I'm thrilled you're here. Rarefied is all about taking you on immersive journeys into the world of rare and endangered species. Each episode introduces you to a remarkable creature on the brink of extinction and the dedicated conservationists working to save them.
              </p>

              <p className="text-gray-700 leading-relaxed">
                As a field biologist, I've spent years studying these incredible animals in their natural habitats. Now, through this podcast, I get to share their stories with you. Whether it's a fierce wolverine surviving in harsh mountain terrain, a gentle basking shark navigating ocean depths, or a tiny bumble bee working to pollinate our ecosystems, every species has a fascinating story to tell.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Not sure where to start? I've curated a collection of diverse episodes below that showcase the breadth of what Rarefied offers. From mammals to marine life, insects to birds, these episodes will give you a great introduction to the show.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
