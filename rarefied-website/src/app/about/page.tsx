import type { Metadata } from "next";
import { HostBio, ShowDescription, ContactSection } from "@/components/about";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About | ${SITE_CONFIG.title}`,
  description: `Learn about ${SITE_CONFIG.host.name}, the host of Rarefied, and discover the mission behind this conservation podcast.`,
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <HostBio />
      <ShowDescription />
      <ContactSection />
    </main>
  );
}
