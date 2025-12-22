import type { SiteConfig, PlatformLink } from "./types";

export const SITE_CONFIG: SiteConfig = {
  title: "Rarefied Podcast",
  tagline: "A podcast about rare species on the brink of extinction and the amazing people working to save them.",
  description:
    "Rarefied is an auditory safari - a podcast that takes listeners on immersive journeys into the world of rare and endangered species.",
  host: {
    name: "Meredith Meeker",
    bio: "Field biologist and host of Rarefied, exploring the fascinating world of endangered species and conservation.",
    image: "/images/host/meredith.jpg",
  },
  socialLinks: {
    instagram: "https://www.instagram.com/rarefiedpod",
    twitter: "https://twitter.com/rarefiedpod",
  },
  platformLinks: {
    spotify: "https://open.spotify.com/show/1n1iycgY3aEgEn5cWM982Y",
    applePodcasts: "https://podcasts.apple.com/us/podcast/rarefied-podcast/id1777451405",
    amazonMusic: "https://music.amazon.com/podcasts/rarefied",
    youtube: "https://www.youtube.com/@rarefiedpod",
  },
};

export const PLATFORM_LINKS: PlatformLink[] = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/1n1iycgY3aEgEn5cWM982Y",
    icon: "spotify",
    description: "Listen and subscribe on Spotify for easy streaming on all your devices.",
  },
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/rarefied-podcast/id1777451405",
    icon: "apple",
    description: "Subscribe on Apple Podcasts for automatic downloads and notifications.",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@rarefiedpod",
    icon: "youtube",
    description: "Watch and listen on YouTube with subtitles and visual content.",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/start-here", label: "Start Here" },
  { href: "/about", label: "About" },
  { href: "/listen", label: "How to Listen" },
];

export const EPISODES_PER_PAGE = 12;
