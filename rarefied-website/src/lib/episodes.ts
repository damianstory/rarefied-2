import type { Episode } from "./types";
import { EPISODES_PER_PAGE } from "./constants";

// Import all episode JSON files
import caribou from "@/content/episodes/caribou.json";
import snuffbox from "@/content/episodes/snuffbox.json";
import baskingShark from "@/content/episodes/basking-shark.json";
import northernSpottedOwl from "@/content/episodes/northern-spotted-owl.json";
import southwestSpringFirefly from "@/content/episodes/southwest-spring-firefly.json";
import jeffersonSalamander from "@/content/episodes/jefferson-salamander.json";
import vancouverIslandMarmot from "@/content/episodes/vancouver-island-marmot.json";
import chimneySwift from "@/content/episodes/chimney-swift.json";
import americanEelPt2 from "@/content/episodes/american-eel-pt2.json";
import americanEelPt1 from "@/content/episodes/american-eel-pt1.json";
import midseasonRecap from "@/content/episodes/midseason-recap.json";
import bogbeanBuckmoth from "@/content/episodes/bogbean-buckmoth.json";
import littleBrownBat from "@/content/episodes/little-brown-bat.json";
import oregonSpottedFrog from "@/content/episodes/oregon-spotted-frog.json";
import rustyPatchedBumbleBee from "@/content/episodes/rusty-patched-bumble-bee.json";
import belugaWhale from "@/content/episodes/beluga-whale.json";
import blackAsh from "@/content/episodes/black-ash.json";
import redsideDace from "@/content/episodes/redside-dace.json";
import pipingPlover from "@/content/episodes/piping-plover.json";
import blandingsTurtle from "@/content/episodes/blandings-turtle.json";
import wolverine from "@/content/episodes/wolverine.json";
import woodPoppy from "@/content/episodes/wood-poppy.json";
import spottedGar from "@/content/episodes/spotted-gar.json";
import mottledDuskywing from "@/content/episodes/mottled-duskywing.json";
import loggerheadShrike from "@/content/episodes/loggerhead-shrike.json";

// All episodes sorted by episode number (newest first)
export const episodes: Episode[] = [
  caribou,
  snuffbox,
  baskingShark,
  northernSpottedOwl,
  southwestSpringFirefly,
  jeffersonSalamander,
  vancouverIslandMarmot,
  chimneySwift,
  americanEelPt2,
  americanEelPt1,
  midseasonRecap,
  bogbeanBuckmoth,
  littleBrownBat,
  oregonSpottedFrog,
  rustyPatchedBumbleBee,
  belugaWhale,
  blackAsh,
  redsideDace,
  pipingPlover,
  blandingsTurtle,
  wolverine,
  woodPoppy,
  spottedGar,
  mottledDuskywing,
  loggerheadShrike,
].sort((a, b) => b.episodeNumber - a.episodeNumber) as Episode[];

/**
 * Get a single episode by slug
 */
export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((ep) => ep.slug === slug);
}

/**
 * Get all episode slugs (for static generation)
 */
export function getAllEpisodeSlugs(): string[] {
  return episodes.map((ep) => ep.slug);
}

/**
 * Get the most recent episodes
 */
export function getRecentEpisodes(count: number = 3): Episode[] {
  return episodes.slice(0, count);
}

/**
 * Get the latest episode
 */
export function getLatestEpisode(): Episode {
  return episodes[0];
}

/**
 * Get paginated episodes
 */
export function getEpisodesPaginated(
  page: number = 1,
  perPage: number = EPISODES_PER_PAGE
): {
  episodes: Episode[];
  totalPages: number;
  currentPage: number;
  totalEpisodes: number;
} {
  const start = (page - 1) * perPage;
  const paginatedEpisodes = episodes.slice(start, start + perPage);

  return {
    episodes: paginatedEpisodes,
    totalPages: Math.ceil(episodes.length / perPage),
    currentPage: page,
    totalEpisodes: episodes.length,
  };
}

/**
 * Get related episodes based on shared tags
 */
export function getRelatedEpisodes(
  currentSlug: string,
  count: number = 4
): Episode[] {
  const current = getEpisodeBySlug(currentSlug);
  if (!current) return [];

  return episodes
    .filter((ep) => ep.slug !== currentSlug)
    .map((ep) => ({
      episode: ep,
      score: ep.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ episode }) => episode);
}

/**
 * Get episodes by tag
 */
export function getEpisodesByTag(tag: string): Episode[] {
  const tagLower = tag.toLowerCase();
  return episodes.filter((ep) =>
    ep.tags.some((t) => t.toLowerCase() === tagLower)
  );
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  episodes.forEach((ep) => {
    ep.tags.forEach((tag) => tagSet.add(tag.toLowerCase()));
  });
  return Array.from(tagSet).sort();
}

/**
 * Get curated starter episodes for new listeners
 * Hand-picked episodes that showcase the podcast's range and appeal
 */
export function getStarterEpisodes(): Episode[] {
  const starterSlugs = [
    "spotted-gar", // Fish - unique ancient species
    "american-eel-pt1", // River ecosystem story
    "vancouver-island-marmot", // Conservation success story
  ];

  return starterSlugs
    .map((slug) => getEpisodeBySlug(slug))
    .filter((ep): ep is Episode => ep !== undefined);
}
