import type { Metadata } from "next";
import { Suspense } from "react";
import { FilteredEpisodes } from "@/components/episodes";
import { episodes } from "@/lib/episodes";

export const metadata: Metadata = {
  title: "Episodes",
  description:
    "Browse all episodes of Rarefied - an auditory safari into the world of endangered species and the amazing people working to save them.",
};

export default function EpisodesPage() {
  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-black">
            All Episodes
          </h1>
          <p className="mt-3 text-gray-600">
            Explore our collection of episodes featuring endangered species and
            the conservationists working to save them.
          </p>
        </div>

        <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
          <FilteredEpisodes episodes={episodes} />
        </Suspense>
      </div>
    </div>
  );
}
