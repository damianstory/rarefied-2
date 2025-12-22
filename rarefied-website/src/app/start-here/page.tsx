import type { Metadata } from "next";
import { WelcomeMessage, WhatToExpect, StarterEpisodes } from "@/components/start-here";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Start Here | ${SITE_CONFIG.title}`,
  description: "New to Rarefied? Start your auditory safari with these curated episodes showcasing diverse endangered species and conservation stories.",
};

export default function StartHerePage() {
  return (
    <main className="min-h-screen">
      <WelcomeMessage />
      <WhatToExpect />
      <StarterEpisodes />
    </main>
  );
}
