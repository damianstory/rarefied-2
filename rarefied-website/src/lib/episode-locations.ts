/**
 * Episode location data for the interactive map
 * Each location maps to one or more episodes (e.g., American Eel has 2 parts)
 */

export interface EpisodeLocation {
  /** Episode slugs - array for multi-episode locations */
  episodeSlugs: string[];
  /** Common name of the species */
  animal: string;
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** Human-readable location name */
  location: string;
}

/**
 * All episode locations with coordinates
 * Ontario pins are slightly spread out to avoid overlap
 */
export const episodeLocations: EpisodeLocation[] = [
  // Episode 1
  {
    episodeSlugs: ["loggerhead-shrike"],
    animal: "Loggerhead Shrike",
    lat: 44.65,
    lng: -79.05,
    location: "Carden Alvar, ON",
  },
  // Episode 2
  {
    episodeSlugs: ["mottled-duskywing"],
    animal: "Mottled Duskywing",
    lat: 43.25,
    lng: -81.85,
    location: "Pinery Provincial Park, ON",
  },
  // Episode 3
  {
    episodeSlugs: ["wood-poppy"],
    animal: "Wood Poppy",
    lat: 43.29,
    lng: -79.88,
    location: "Royal Botanical Gardens, ON",
  },
  // Episode 4
  {
    episodeSlugs: ["wolverine"],
    animal: "Wolverine",
    lat: 48.38,
    lng: -89.25,
    location: "Thunder Bay, ON",
  },
  // Episode 5
  {
    episodeSlugs: ["spotted-gar"],
    animal: "Spotted Gar",
    lat: 42.58,
    lng: -80.4,
    location: "Long Point Provincial Park, ON",
  },
  // Episode 6
  {
    episodeSlugs: ["blandings-turtle"],
    animal: "Blanding's Turtle",
    lat: 43.82,
    lng: -79.15,
    location: "Rouge Urban National Park, ON",
  },
  // Episode 7
  {
    episodeSlugs: ["piping-plover"],
    animal: "Piping Plover",
    lat: 43.87,
    lng: -78.78,
    location: "Darlington Provincial Park, ON",
  },
  // Episode 8
  {
    episodeSlugs: ["redside-dace"],
    animal: "Redside Dace",
    lat: 43.72,
    lng: -79.55,
    location: "Humber River, ON",
  },
  // Episode 9
  {
    episodeSlugs: ["black-ash"],
    animal: "Black Ash",
    lat: 43.55,
    lng: -80.25,
    location: "Guelph, ON",
  },
  // Episode 10
  {
    episodeSlugs: ["beluga-whale"],
    animal: "Beluga",
    lat: 69.5,
    lng: -137.0,
    location: "Beaufort Sea, Yukon",
  },
  // Episode 11
  {
    episodeSlugs: ["rusty-patched-bumble-bee"],
    animal: "Rusty Patched Bumble Bee",
    lat: 44.97,
    lng: -93.23,
    location: "University of Minnesota",
  },
  // Episode 12
  {
    episodeSlugs: ["little-brown-bat"],
    animal: "Little Brown Myotis",
    lat: 45.38,
    lng: -75.7,
    location: "Carleton University, Ottawa, ON",
  },
  // Episode 13
  {
    episodeSlugs: ["bogbean-buckmoth"],
    animal: "Bogbean Buck Moth",
    lat: 45.05,
    lng: -75.85,
    location: "Marlborough Forest, ON",
  },
  // Episode 14
  {
    episodeSlugs: ["oregon-spotted-frog"],
    animal: "Oregon Spotted Frog",
    lat: 49.1,
    lng: -122.3,
    location: "Lower Fraser Valley, BC",
  },
  // Episodes 16 & 17 - Two parts at same location
  {
    episodeSlugs: ["american-eel-pt1", "american-eel-pt2"],
    animal: "American Eel",
    lat: 41.2,
    lng: -73.95,
    location: "Hudson River Estuary, NY",
  },
  // Episode 18
  {
    episodeSlugs: ["chimney-swift"],
    animal: "Chimney Swift",
    lat: 43.65,
    lng: -79.38,
    location: "Toronto, ON",
  },
  // Episode 19
  {
    episodeSlugs: ["vancouver-island-marmot"],
    animal: "Vancouver Island Marmot",
    lat: 49.6,
    lng: -125.7,
    location: "Strathcona Provincial Park, BC",
  },
  // Episode 20
  {
    episodeSlugs: ["jefferson-salamander"],
    animal: "Jefferson Salamander",
    lat: 43.4,
    lng: -79.95,
    location: "Niagara Escarpment, ON",
  },
  // Episode 21
  {
    episodeSlugs: ["southwest-spring-firefly"],
    animal: "Southwest Spring Firefly",
    lat: 32.25,
    lng: -110.95,
    location: "Arizona, US",
  },
  // Episode 22
  {
    episodeSlugs: ["northern-spotted-owl"],
    animal: "Northern Spotted Owl",
    lat: 49.28,
    lng: -123.12,
    location: "Vancouver, BC",
  },
  // Episode 23
  {
    episodeSlugs: ["basking-shark"],
    animal: "Basking Shark",
    lat: 36.6,
    lng: -121.9,
    location: "Monterey, CA",
  },
  // Episode 24
  {
    episodeSlugs: ["snuffbox"],
    animal: "Snuffbox Mussel",
    lat: 42.3,
    lng: -83.03,
    location: "Windsor, ON",
  },
  // Episode 25
  {
    episodeSlugs: ["caribou"],
    animal: "Caribou",
    lat: 49.67,
    lng: -116.0,
    location: "Kimberley, BC",
  },
];

/**
 * Get all episode locations
 */
export function getAllEpisodeLocations(): EpisodeLocation[] {
  return episodeLocations;
}
