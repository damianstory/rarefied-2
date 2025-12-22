import type { Metadata } from "next";
import { PlatformGrid } from "@/components/listen";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `How to Listen | ${SITE_CONFIG.title}`,
  description: "Subscribe to Rarefied on your favorite podcast platform. Available on Spotify, Apple Podcasts, YouTube, Amazon Music, Pocket Casts, and RSS.",
};

export default function ListenPage() {
  return (
    <main className="min-h-screen">
      <PlatformGrid />
    </main>
  );
}
