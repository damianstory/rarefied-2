import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export function HostBio() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Host Photo */}
          <div className="rounded-2xl overflow-hidden bg-white">
            <Image
              src={SITE_CONFIG.host.image}
              alt={SITE_CONFIG.host.name}
              width={1092}
              height={1350}
              className="w-full h-auto block"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Host Bio Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
                Meet Your Host
              </h2>
              <h3 className="text-xl md:text-2xl text-[var(--olive)] font-semibold">
                {SITE_CONFIG.host.name}
              </h3>
            </div>

            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-gray-700 leading-relaxed">
                {SITE_CONFIG.host.bio}
              </p>

              <p className="text-gray-700 leading-relaxed">
                As a field biologist with years of experience studying endangered species in their natural habitats, Meredith brings a unique perspective to conservation storytelling. Her passion for wildlife and dedication to making complex ecological topics accessible has made Rarefied a trusted voice in conservation education.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Through Rarefied, Meredith takes listeners on an auditory safari, introducing them to remarkable creatures on the brink of extinction and the dedicated conservationists working tirelessly to save them. Each episode is carefully researched and crafted to inspire wonder, educate audiences, and motivate action for biodiversity conservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
