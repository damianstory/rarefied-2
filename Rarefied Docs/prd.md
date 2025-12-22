# Rarefied Podcast Website - Product Requirements Document

## 1. Product Overview

### Vision
Build a custom podcast website for Rarefied that provides an exceptional listening experience while educating visitors about endangered species and the conservationists working to save them. The site should reflect the podcast's unique "auditory safari" brand and convert visitors into subscribers.

### Scope
- **New build from scratch** using Next.js/React
- Current Squarespace site (rarefiedpod.com) serves as content/brand reference only
- Custom implementation allows for features not possible on Squarespace (persistent player, optimized performance, full control)

### Target Users
1. **New visitors** - Discovering the podcast for the first time
2. **Regular listeners** - Returning to catch new episodes
3. **Conservation enthusiasts** - Interested in the species/science content
4. **Casual browsers** - May explore episodes by topic/species

### Success Metrics
| Metric | Description | Target |
|--------|-------------|--------|
| Play rate | % of episode page visitors who click play | >40% |
| Subscribe conversion | % of visitors who subscribe on a platform | >15% |
| Episode completion | % who listen to >75% of episode | >60% |
| Newsletter signups | Monthly new subscribers | Track growth |
| Time on site | Average session duration | >3 min |
| Pages per session | Content exploration | >2.5 |

---

## 2. Feature Requirements

### High Priority (MVP)

#### F1: Homepage
**User Story:** As a visitor, I want to see the latest episode and understand what the podcast is about so I can decide if I want to listen.

**Acceptance Criteria:**
- [ ] Hero section with latest episode title, species, and large play button
- [ ] Tagline: "A podcast about rare species on the brink of extinction and the amazing people working to save them"
- [ ] 3 recent episode cards with species images
- [ ] "Start Here" section for new listeners (can be on separate page)
- [ ] Newsletter signup section
- [ ] Responsive design (mobile-first)

**Components:**
- `HeroSection` - Latest episode with play button
- `EpisodeCard` - Reusable episode preview card
- `StartHereSection` - New listener onboarding
- `NewsletterSignup` - Email capture form

---

#### F2: Episode Listing Page (`/episodes`)
**User Story:** As a listener, I want to browse all episodes so I can find ones that interest me.

**Acceptance Criteria:**
- [ ] Grid of episode cards (species photo, title, episode number, duration)
- [ ] Episodes sorted by date (newest first)
- [ ] Pagination or infinite scroll (23+ episodes)
- [ ] Filter by tag/category (sidebar or dropdown)
- [ ] Clear visual hierarchy

**Components:**
- `EpisodeGrid` - Container for episode cards
- `EpisodeCard` - Thumbnail, title, episode #, duration, tags
- `TagFilter` - Filter by species type, region, etc.
- `Pagination` - Page navigation

---

#### F3: Episode Detail Page (`/episodes/[slug]`)
**User Story:** As a listener, I want to learn about an episode and play it directly on the site.

**Acceptance Criteria:**
- [ ] Episode title with season/episode number and duration
- [ ] Species "trading card" with photo, scientific name, stats, special power
- [ ] Episode description with guest information
- [ ] Audio player with play/pause, progress, skip, speed controls
- [ ] Platform buttons (Spotify, Apple Podcasts)
- [ ] Timestamps/chapters (clickable to jump in audio)
- [ ] External resource links
- [ ] Tags at bottom
- [ ] Related episodes section

**Components:**
- `EpisodeHeader` - Title, metadata, duration
- `SpeciesCard` - Trading card style component
- `AudioPlayer` - Custom HTML5 audio player
- `PlatformButtons` - Spotify, Apple, Download links
- `ChapterList` - Timestamped chapters
- `RelatedEpisodes` - 3-4 similar episodes

---

#### F4: How to Listen Page (`/listen`)
**User Story:** As a visitor, I want to know how to subscribe so I can get new episodes automatically.

**Acceptance Criteria:**
- [ ] Clear heading explaining subscription options
- [ ] Grid of platform icons with links (Spotify, Apple, YouTube, Amazon, Pocket Casts, RSS)
- [ ] Brief description of each platform
- [ ] "Listen on website" section linking to /episodes

**Components:**
- `PlatformGrid` - Grid of platform cards with icons
- `PlatformCard` - Icon, name, description, link

---

#### F5: Start Here Section/Page
**User Story:** As a new listener, I want recommendations on where to start so I don't feel overwhelmed.

**Acceptance Criteria:**
- [ ] Welcome message from Meredith (host)
- [ ] Explanation of what to expect from the show
- [ ] 3-5 curated "best starter" episodes
- [ ] Diverse selection (mammal, marine, insect, bird)

**Components:**
- `WelcomeMessage` - Host intro text/image
- `StarterEpisodes` - Curated episode selection

---

#### F6: About Page (`/about`)
**User Story:** As a visitor, I want to learn about the host and show to understand the credibility and perspective.

**Acceptance Criteria:**
- [ ] Host photo (field biologist image)
- [ ] Host bio (Meredith Meeker)
- [ ] Show description and mission
- [ ] Contact information or form
- [ ] Social links

**Components:**
- `HostBio` - Photo + bio text
- `ShowDescription` - About the podcast
- `ContactSection` - Contact info/form

---

#### F7: Navigation & Layout
**User Story:** As a user, I want consistent navigation so I can easily move around the site.

**Acceptance Criteria:**
- [ ] Header with logo, nav links, subscribe button
- [ ] Mobile hamburger menu
- [ ] Footer with platform links, social, newsletter
- [ ] Consistent branding (mint green, typography)
- [ ] Responsive at all breakpoints

**Components:**
- `Header` - Logo, nav, CTA button
- `MobileMenu` - Slide-out navigation
- `Footer` - Links, social, newsletter
- `Layout` - Wrapper component

---

### Medium Priority

#### F8: Transcript Support
**User Story:** As a listener (or someone with accessibility needs), I want to read the transcript.

**Acceptance Criteria:**
- [ ] Expandable/collapsible transcript section on episode page
- [ ] OR downloadable PDF link
- [ ] Properly formatted with speaker labels

**Components:**
- `TranscriptSection` - Expandable transcript

---

#### F9: Related Episodes
**User Story:** As a listener, I want to discover similar episodes after finishing one.

**Acceptance Criteria:**
- [ ] 3-4 related episodes shown on episode page
- [ ] Based on shared tags (e.g., other "ocean" or "mammal" episodes)
- [ ] Displays as episode cards

**Implementation:**
- Query episodes with matching tags
- Exclude current episode
- Limit to 4 results

---

#### F10: Download Option
**User Story:** As a listener, I want to download episodes for offline listening.

**Acceptance Criteria:**
- [ ] Download button on episode page
- [ ] Downloads MP3 file directly

**Implementation:**
- Link to audio file URL with `download` attribute
- Or proxy through API route for tracking

---

#### F11: Newsletter Integration (Beehiiv)
**User Story:** As a visitor, I want to sign up for the newsletter to stay updated.

**Acceptance Criteria:**
- [ ] Email input + submit button
- [ ] Submits to Beehiiv API
- [ ] Success/error feedback
- [ ] Appears on homepage and footer

**Implementation:**
- Beehiiv embed OR custom form to Beehiiv API

---

#### F12: Merch Page/Link
**User Story:** As a fan, I want to buy merchandise to support the show.

**Acceptance Criteria:**
- [ ] Link to external merch store (if hosted elsewhere)
- [ ] OR embedded product display

---

### Nice to Have

#### F13: Persistent Audio Player
**User Story:** As a listener, I want audio to keep playing while I browse other pages.

**Acceptance Criteria:**
- [ ] Fixed bottom bar player
- [ ] Persists across page navigation
- [ ] Mini player with play/pause, title, progress

**Implementation:**
- Global audio context (React Context or Zustand)
- Player state preserved across routes
- Requires App Router layout patterns

---

#### F14: Search Functionality
**User Story:** As a listener, I want to search for specific topics or species.

**Acceptance Criteria:**
- [ ] Search input in header
- [ ] Searches episode titles, descriptions, tags
- [ ] Results page with matching episodes

**Implementation:**
- Client-side search with Fuse.js
- OR Algolia for more robust search

---

#### F15: Tag/Category Filtering
**User Story:** As a listener, I want to filter episodes by category.

**Acceptance Criteria:**
- [ ] Filter by: species type, region, conservation status
- [ ] Tag pages (`/episodes/tag/[tag]`)

---

## 3. Technical Specifications

### Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js 14+ (App Router) | SSG/SSR, great DX, Vercel integration |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS | Rapid development, consistent design |
| Audio | Custom HTML5 player | Full control, no third-party dependencies |
| Hosting | Vercel | Seamless Next.js deployment, edge network |
| Analytics | Vercel Analytics + Plausible | Privacy-friendly, performance insights |
| Newsletter | Beehiiv API | Current provider, simple integration |
| Images | Next.js Image | Automatic optimization |

### Project Structure

```
rarefied-website/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage
│   ├── episodes/
│   │   ├── page.tsx        # Episode listing
│   │   └── [slug]/
│   │       └── page.tsx    # Episode detail
│   ├── listen/
│   │   └── page.tsx        # How to Listen
│   ├── about/
│   │   └── page.tsx        # About page
│   └── start-here/
│       └── page.tsx        # New listener page
├── components/
│   ├── ui/                 # Buttons, cards, inputs
│   ├── layout/             # Header, Footer, Navigation
│   ├── episodes/           # Episode-specific components
│   ├── audio/              # AudioPlayer, MiniPlayer
│   └── home/               # Homepage sections
├── lib/
│   ├── episodes.ts         # Episode data fetching
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Helper functions
├── content/
│   └── episodes/           # Episode data (JSON or MDX)
├── public/
│   ├── images/             # Species photos, host photo
│   └── audio/              # If self-hosting audio files
└── styles/
    └── globals.css         # Global styles, Tailwind config
```

### Data Model

#### Episode
```typescript
interface Episode {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  episodeNumber: number;
  season: number;
  publishedAt: string; // ISO date
  duration: number; // seconds
  description: string;

  // Species data (trading card)
  species: {
    commonName: string;
    scientificName: string;
    status: string; // "Endangered", "Threatened", etc.
    weight?: string;
    length?: string;
    diet?: string;
    specialPower: string;
    image: string; // URL or path
  };

  // Audio
  audioUrl: string;
  spotifyUrl?: string;
  applePodcastsUrl?: string;

  // Content
  guest?: {
    name: string;
    title: string;
    organization?: string;
  };
  chapters: {
    time: string; // "00:00"
    title: string;
  }[];
  resources?: {
    title: string;
    url: string;
  }[];
  transcript?: string;

  // Categorization
  tags: string[];
}
```

#### Site Content
```typescript
interface SiteContent {
  host: {
    name: string;
    bio: string;
    image: string;
  };
  tagline: string;
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
```

### Episode Data Source Options

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **Static JSON files** | Simple, version controlled, no external deps | Manual updates for new episodes | Good for MVP |
| **MDX files** | Rich content, version controlled | More setup | Good if transcript inline |
| **Headless CMS (Sanity, Contentful)** | Visual editing, non-dev friendly | Cost, complexity | Good for long-term |
| **RSS feed parsing** | Auto-sync with podcast host | Limited data, parsing needed | Supplement only |

**Recommendation:** Start with static JSON files in `/content/episodes/`. Can migrate to CMS later if needed.

### Audio Player Implementation

```typescript
// Simplified player interface
interface AudioPlayerProps {
  src: string;
  title: string;
  chapters?: Chapter[];
  onTimeUpdate?: (time: number) => void;
}

// Features needed:
// - Play/Pause toggle
// - Progress bar with scrubbing
// - Current time / Duration display
// - Skip forward/back (15s/30s)
// - Playback speed (0.5x, 1x, 1.5x, 2x)
// - Volume control
// - Chapter navigation (click to jump)
```

### API Routes (if needed)

```
/api/newsletter - POST: Subscribe to Beehiiv
/api/download/[episodeId] - GET: Track and redirect to audio file
```

### Environment Variables

```env
# Beehiiv
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=

# If using CMS
SANITY_PROJECT_ID=
SANITY_DATASET=
```

---

## 4. Implementation Phases

### Phase 1: Core Foundation (MVP)
**Goal:** Functional site with essential pages

**Tasks:**
1. Set up Next.js project with TypeScript, Tailwind
2. Create layout components (Header, Footer, Navigation)
3. Build Homepage with hero, recent episodes
4. Build Episode listing page
5. Build Episode detail page with audio player
6. Create episode data structure (JSON files for ~5 episodes to start)
7. Deploy to Vercel

**Deliverable:** Live site with core functionality

---

### Phase 2: Supporting Pages
**Goal:** Complete site content

**Tasks:**
1. Build About page
2. Build How to Listen page
3. Build Start Here page/section
4. Add newsletter signup (Beehiiv integration)
5. Migrate remaining episode data (all 23 episodes)
6. Add all species images

**Deliverable:** Complete content, all episodes available

---

### Phase 3: Enhancements
**Goal:** Improved UX features

**Tasks:**
1. Add transcript support
2. Implement related episodes logic
3. Add download functionality
4. Implement tag filtering on episodes page
5. Add analytics tracking
6. Performance optimization

**Deliverable:** Enhanced functionality, better discoverability

---

### Phase 4: Advanced Features
**Goal:** Premium features

**Tasks:**
1. Persistent audio player (if prioritized)
2. Search functionality
3. SEO optimization (meta tags, OG images)
4. Accessibility audit and fixes
5. PWA support (optional)

**Deliverable:** Polished, feature-rich site

---

## 5. Design Tokens

### Colors
```css
:root {
  --color-primary: #98D4BB;      /* Mint green */
  --color-primary-dark: #5BA88B; /* Darker green for text/buttons */
  --color-accent: #4A90A4;       /* Teal/blue accent */
  --color-text: #2D3748;         /* Dark gray text */
  --color-text-light: #718096;   /* Light gray text */
  --color-background: #FFFFFF;   /* White */
  --color-background-alt: #F7FAFC; /* Light gray background */
}
```

### Typography
```css
:root {
  --font-heading: 'Inter', sans-serif;  /* Or similar modern sans */
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace; /* For code/scientific names */
}
```

### Spacing
Using Tailwind defaults (4px base unit)

### Breakpoints
```css
/* Tailwind defaults */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 6. Open Questions / Decisions Needed

| Question | Options | Impact |
|----------|---------|--------|
| Audio hosting | Spotify embed vs. self-hosted vs. podcast host | Player features, cost |
| Episode data source | JSON files vs. CMS | Maintenance, editing workflow |
| Domain | Keep rarefiedpod.com or new domain? | SEO, migration |
| Analytics | Vercel Analytics, Plausible, Google Analytics? | Privacy, features |
| Merch | Link to external or embed? | Development effort |
| Launch strategy | Soft launch or replace Squarespace immediately? | Risk, SEO |

---

## 7. Success Criteria for Launch

### MVP Checklist
- [ ] All core pages functional (Home, Episodes, Episode Detail, About, Listen, Start Here)
- [ ] Audio player working with play/pause, progress, skip
- [ ] Mobile responsive design
- [ ] All 23 episodes migrated with data
- [ ] Newsletter signup working
- [ ] Platform links functional
- [ ] Deployed to production URL
- [ ] Basic analytics in place

### Quality Checklist
- [ ] Lighthouse score >90 (Performance, Accessibility, SEO)
- [ ] Works on Chrome, Safari, Firefox, Edge
- [ ] Works on iOS Safari and Android Chrome
- [ ] No console errors
- [ ] Images optimized
- [ ] Fast initial load (<3s on 3G)
