# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rarefied is a podcast website for an endangered species conservation podcast ("auditory safari"). The site is being built from scratch using Next.js to replace an existing Squarespace site.

**Status:** Pre-development (documentation phase). See `Rarefied Docs/` for planning documents.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Audio:** Custom HTML5 player (no third-party dependencies)
- **Hosting:** Vercel
- **Newsletter:** Beehiiv API integration

- **Analytics:** Vercel Analytics + Plausible

## Brand Guidelines

### Colors
```
Sage Green:   #a2d9a2  (primary - backgrounds, cards)
Sky Blue:     #79b2e3  (CTAs, buttons, highlights)
Olive Green:  #587c49  (secondary - footer, accents)
```

### Typography
- **Headings:** Gopher (serif display)
- **Scientific names/metadata:** Space Mono (monospace)
- **Body text:** System sans-serif or Inter

### Voice
Informative, passionate, inspiring, engaging. Lead with curiosity. Avoid doom-and-gloom messaging.

## Key Data Model

The Episode interface is central to this project:
```typescript
interface Episode {
  slug: string;
  title: string;
  episodeNumber: number;
  season: number;
  duration: number;  // seconds
  species: {
    commonName: string;
    scientificName: string;
    status: string;  // "Endangered", "Threatened", etc.
    specialPower: string;
    image: string;
  };
  audioUrl: string;
  chapters: { time: string; title: string; }[];
  tags: string[];
}
```

## Project Structure (Planned)

```
rarefied-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Homepage
│   ├── episodes/
│   │   ├── page.tsx          # Episode listing
│   │   └── [slug]/page.tsx   # Episode detail
│   ├── listen/page.tsx       # How to Listen
│   ├── about/page.tsx
│   └── start-here/page.tsx
├── components/
│   ├── ui/                   # Buttons, cards, inputs
│   ├── layout/               # Header, Footer, Navigation
│   ├── episodes/             # Episode-specific components
│   ├── audio/                # AudioPlayer, MiniPlayer
│   └── home/                 # Homepage sections
├── lib/
│   ├── episodes.ts           # Episode data fetching
│   ├── types.ts              # TypeScript interfaces
│   └── utils.ts
├── content/episodes/         # Episode data (JSON)
└── public/images/            # Species photos
```

## Key Features

1. **Species Trading Cards** - Each episode features a species card with stats and a "Special Power" (unique engagement element)
2. **Persistent Audio Player** - Audio continues playing during navigation (uses React Context or Zustand)
3. **Chapter Navigation** - Clickable timestamps to jump in audio
4. **Start Here Section** - Curated starter episodes for new listeners

## Audio Player Requirements

Custom HTML5 player with:
- Play/pause, progress bar with scrubbing
- Skip forward/back (15/30 sec)
- Playback speed (0.5x, 1x, 1.5x, 2x)
- Volume control
- Chapter navigation

## Environment Variables

```
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

## Reference Documents

- `Rarefied Docs/prd.md` - Full product requirements and technical specifications
- `Rarefied Docs/design-spec.md` - UX/UI research and component specifications
- `Rarefied Docs/brand-guidelines.md` - Colors, typography, voice guidelines
- `rarefied_pod_images 2/` - Logo and reference images
