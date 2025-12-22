export interface Episode {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  episodeNumber: number;
  season: number;
  publishedAt: string;
  duration: number;
  description: string;

  species: Species;

  audioUrl: string;
  spotifyUrl?: string;
  spotifyEmbedId?: string;
  applePodcastsUrl?: string;

  guest?: Guest | null;
  chapters: Chapter[];
  resources?: Resource[];
  tags: string[];

  transcript?: string;
  transcriptUrl?: string;

  _sourceUrl?: string;
}

export interface Species {
  commonName: string;
  scientificName: string;
  status: ConservationStatus | string;
  weight?: string;
  length?: string;
  diet?: string;
  habitat?: string;
  specialPower: string;
  image: string;
  imageAlt?: string;
}

export type ConservationStatus =
  | "Endangered"
  | "Threatened"
  | "Special Concern"
  | "Extinct"
  | "Vulnerable"
  | "Near Threatened"
  | "Data Deficient"
  | "Unknown";

export interface Guest {
  name: string;
  title: string;
  organization?: string;
  website?: string;
}

export interface Chapter {
  time: string;
  timeInSeconds: number;
  title: string;
}

export interface Resource {
  title: string;
  url: string;
  type?: "article" | "video" | "podcast" | "website" | "paper";
}

export interface PlatformLink {
  name: string;
  url: string;
  icon: string;
  description?: string;
}

export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  host: {
    name: string;
    bio: string;
    image: string;
  };
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  platformLinks: {
    spotify: string;
    applePodcasts: string;
    amazonMusic?: string;
    youtube?: string;
    rss?: string;
  };
}
