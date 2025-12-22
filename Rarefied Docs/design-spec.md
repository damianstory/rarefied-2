# Rarefied Podcast Website Design Specification

## 1. Executive Summary

### Project Overview
This design specification outlines recommendations for improving the Rarefied podcast website (rarefiedpod.com) based on comprehensive UX/UI research of best-in-class podcast websites. The goal is to enhance the listening experience, improve content discovery, and increase subscriber conversion while preserving the podcast's strong brand identity.

### Research Methodology
Three leading podcast websites were analyzed for best practices:
- **99% Invisible** (99percentinvisible.org) - Design/architecture podcast
- **Radiolab** (radiolab.org) - Science/philosophy podcast
- **This American Life** (thisamericanlife.org) - Storytelling/journalism podcast

Each site was evaluated for:
- Visual design and brand identity
- Homepage structure and content hierarchy
- Episode page design and listening experience
- Audio player implementation
- Content discovery and navigation
- Membership/monetization approach

### Key Findings Summary
1. **Play button prominence** - All three reference sites feature large, prominent play buttons; Rarefied's "Listen Now" text link is easy to miss
2. **Platform accessibility** - Reference sites provide multiple touchpoints for subscribing; Rarefied limits this to footer
3. **New listener onboarding** - "Start Here" sections help convert visitors to subscribers
4. **Transcript support** - Accessibility and SEO benefit that Rarefied currently lacks
5. **Episode metadata** - Duration and episode numbers should be more visible

---

## 2. Current State Analysis

### Brand Identity

**Color Palette:**
- Primary: Mint/Seafoam Green (#98D4BB approximate)
- Secondary: Teal/Green text
- Accent: Blue (buttons, newsletter section)
- Background: White

**Typography:**
- Headlines: Modern sans-serif, rounded letterforms
- Body: Clean sans-serif

**Logo:**
- "RAREFIED" text with animal silhouettes (deer, birds, bear, whale, fish, butterfly, etc.)
- Effectively communicates the endangered species/conservation theme
- Works well at various sizes

**Brand Voice:**
- "Auditory safari" tagline
- Educational yet approachable
- Conservation-focused with scientific credibility

### Site Structure

**Current Navigation:**
- Home
- Episodes
- About the Show
- Merch
- Subscribe (button)

**Homepage Sections:**
1. Hero with "Season 1 - new episodes every Thursday!"
2. Tagline banner (blue background)
3. Recent Episodes (3 cards)
4. Full-width nature photography
5. "Meet your Host" section
6. Newsletter signup with nature photo background
7. Footer with platform links

**Episode Archive:**
- Grid layout with species cards
- Tags/categories sidebar
- Pagination

### Episode Page Structure

**Current Components:**
1. Episode title (Season + Species name + subtitle)
2. Species "trading card" with:
   - Photo
   - Common name
   - Scientific name
   - Conservation status
   - Weight, Length, Diet
   - "Special Power" (unique engagement element)
   - Episode number
3. Episode description with guest info
4. External resource links
5. Timestamps/chapters (15+ per episode)
6. Embedded Spotify player
7. Tags

### What's Working Well

1. **Species trading card format** - Unique, educational, shareable, gamified with "Special Power"
2. **Detailed timestamps** - Excellent chapter navigation for listeners
3. **Tag/category system** - Good for content discovery
4. **Beautiful photography** - High-quality wildlife and nature imagery
5. **Clear brand identity** - Mint green palette and animal silhouettes are distinctive
6. **Guest credentials** - Expert guests add credibility
7. **Newsletter integration** - Beehiiv embed is clean

### Areas for Improvement

1. Play button not prominent in hero
2. No "How to Listen" / Subscribe page
3. No "Start Here" section for new listeners
4. Platform links only in footer
5. Episode duration not visible until player loads
6. "Click Here" CTAs are generic
7. Audio player buried below long content
8. No transcript support
9. No download option
10. Basic prev/next navigation vs. related episodes

---

## 3. Best Practices Research Summary

### 99% Invisible - Key Patterns

**Strengths:**
- Persistent bottom audio player (stays while browsing)
- Queue system for building playlists
- On-page transcripts
- Download button on each episode
- Robust category/tag filtering
- Comments section for community

**Visual:**
- Yellow/gold primary color
- Grid-based episode layout
- Clean sans-serif typography

**Listening Experience:**
- Play button visible on every episode card
- Episode duration clearly shown
- Multiple platform buttons per episode

### Radiolab - Key Patterns

**Strengths:**
- Custom artistic illustrations per episode
- "The Lab" membership with exclusive content
- Comprehensive "How to Listen" page (12+ platforms)
- Clean episode cards with minimal info

**Visual:**
- Blue primary color
- Artistic/illustrated aesthetic
- Modern, airy design

**Listening Experience:**
- Simple play button approach
- Relies more on external platforms
- Less on-site playback features

### This American Life - Key Patterns

**Strengths:**
- Segment-based playback (individual play buttons per act)
- "New to This American Life?" onboarding section
- Ira Glass personal recommendations
- Download + Transcript + Subscribe buttons prominently placed
- Content versions (beeped/un-beeped)
- 800+ episode archive well-organized

**Visual:**
- Navy blue + red color scheme
- Classic editorial/serif typography
- Mix of photography and illustration

**Listening Experience:**
- Large play button in hero
- Action bar: Download | Subscribe | Transcript | Share
- Chapter/act navigation
- Duration per segment shown

### Feature Comparison Matrix

| Feature | 99% Invisible | Radiolab | This American Life |
|---------|--------------|----------|-------------------|
| Persistent Player | Yes | No | No |
| On-page Transcript | Yes | No | Button |
| Download Option | Yes | Yes | Yes |
| Episode Duration | Visible | Visible | Visible |
| Play Button Style | Card + Queue | Simple | Hero + Per-segment |
| How to Listen Page | Yes | Yes (12+ platforms) | Yes (simple) |
| New Listener Section | No | Yes (The Lab) | Yes (Ira's picks) |
| Comments | Yes | No | No |
| Membership | Plus+ | The Lab | Life Partners |
| Platform Links per Episode | Yes | No | Yes |

---

## 4. Gap Analysis

### Feature Comparison: Rarefied vs. Best Practices

| Feature | Best Practice | Rarefied Current | Gap | Priority |
|---------|--------------|------------------|-----|----------|
| Prominent play button in hero | Large circular button | Text link "Listen Now" | Missing | **High** |
| How to Listen page | Dedicated page with platforms | Footer links only | Missing | **High** |
| New listener section | Curated starter episodes | None | Missing | **High** |
| Platform links on episode | Buttons near player | Footer only | Missing | **High** |
| Transcript support | On-page or download | None | Missing | **High** |
| Episode duration visible | In card/title | In player only | Partial | Medium |
| Download option | Button on episode | None | Missing | Medium |
| Descriptive CTAs | "Listen Now", "Play Episode" | "Click Here" | Weak | Medium |
| Related episodes | 3-4 similar episodes | Prev/next only | Weak | Medium |
| Audio player position | Near top of episode | Below long content | Suboptimal | Medium |
| Persistent player | Bottom-fixed player | None | Missing | Low |
| Episode numbers in title | Visible in list view | On card only | Minor | Low |
| Comments/community | Discussion section | None | Missing | Low |
| Share buttons | Social share options | In player only | Minor | Low |

---

## 5. Design Recommendations

### High Priority

#### 1. Add Prominent Play Button to Homepage Hero
**Current:** "Listen Now" text link with underline
**Recommended:** Large circular play button (60-80px) next to or below the latest episode title

**Rationale:** All three reference sites use prominent play buttons. This is the primary action visitors should take.

**Specification:**
- Circular button with play icon
- On-brand color (mint green or teal)
- Hover state with slight scale/color change
- Links to latest episode or triggers in-page player

#### 2. Create "How to Listen" / Subscribe Page
**Current:** Subscribe button leads to a page, but no dedicated listening guide
**Recommended:** Dedicated page explaining all ways to listen

**Content to include:**
- Section header: "How to Listen"
- Subhead: "Subscribe to get new episodes every Thursday"
- Platform grid with icons:
  - Spotify (primary)
  - Apple Podcasts (primary)
  - YouTube (if available)
  - Amazon Music
  - Pocket Casts
  - RSS feed
- Brief description of each platform
- "Listen on our website" section

#### 3. Add "Start Here" Section for New Listeners
**Current:** None
**Recommended:** Curated section on homepage or dedicated page

**Content:**
- Header: "New to Rarefied?" or "Start Your Safari"
- Meredith's personal intro/recommendation
- 3-5 best episodes for newcomers (diverse species)
- Brief explanation of the show format

**Suggested starter episodes (based on variety):**
- A mammal episode (Wolverine or Vancouver Island Marmot)
- A marine episode (Basking Shark or Beluga Whale)
- An insect episode (Rusty-Patched Bumble Bee)
- A bird episode (Piping Plover or Chimney Swift)

#### 4. Add Platform Links on Episode Pages
**Current:** Embedded Spotify player only
**Recommended:** Platform buttons near audio player

**Specification:**
- Row of buttons: "Spotify" | "Apple Podcasts" | "Download"
- Position above or beside the embedded player
- Use platform brand colors or keep on-brand

#### 5. Consider Transcript Support
**Current:** None
**Recommended:** Transcript available per episode

**Options:**
- Full on-page transcript (like 99% Invisible)
- Download link for transcript PDF
- Collapsible/expandable transcript section

**Benefits:**
- Accessibility (deaf/hard-of-hearing audiences)
- SEO (searchable text content)
- Educational audience may want to reference quotes

### Medium Priority

#### 6. Show Episode Duration Prominently
**Current:** Only visible in Spotify player
**Recommended:** Duration in episode card and page header

**Format:** "55 min" or "55:07" next to episode title

#### 7. Improve Episode Card CTAs
**Current:** "Click Here" buttons
**Recommended:** "Listen Now" or "Play Episode"

**Additional options:**
- "Explore Episode"
- "Meet the [Species Name]"

#### 8. Add Download Option
**Recommended:** Download button on episode page

**Position:** Near platform links or in audio player area

#### 9. Enhance Related Episodes
**Current:** Basic prev/next navigation
**Recommended:** "You might also like" section with 3-4 related episodes

**Logic for suggestions:**
- Same tags (e.g., other "fish" or "Ontario" episodes)
- Same category (mammals, birds, insects)
- Random selection from same season

#### 10. Reposition Audio Player
**Current:** Below species card, description, and timestamps
**Recommended:** Higher on page, before or alongside timestamps

**Options:**
- Sticky player that scrolls with user
- Player immediately below species card
- Sidebar layout with player fixed

### Nice to Have

#### 11. Persistent Audio Player
Like 99% Invisible's bottom-bar player that persists during navigation.

**Benefits:**
- Listeners can browse while listening
- Encourages binge-listening
- Professional feel

**Complexity:** Higher - requires JavaScript state management

#### 12. Episode Numbers in Titles
Make episode numbers more visible in episode list view.

**Format:** "Ep. 23: Basking Shark - Disappeared or at Depth?"

#### 13. Social Share Buttons
Dedicated share buttons outside the embedded player.

**Platforms:** Twitter/X, Facebook, Copy Link, Email

---

## 6. Proposed Site Architecture

### Navigation Structure

**Primary Navigation:**
- Home
- Episodes
- **Start Here** (new)
- About the Show
- **How to Listen** (new or rename Subscribe)
- Merch

**Footer Navigation:**
- Where to Listen (Spotify, Apple Podcasts, etc.)
- Follow Us (Instagram, etc.)
- Newsletter signup
- Contact

### Page Hierarchy

```
Home
├── Hero (Latest episode + Play button)
├── "Start Here" section (new listeners)
├── Recent Episodes
├── About the Host (condensed)
└── Newsletter signup

Episodes
├── Filter by tag/category
├── Episode grid
└── Pagination

Episode Detail
├── Title + Episode number + Duration
├── Species trading card
├── Platform buttons (Spotify, Apple, Download)
├── Audio player
├── Episode description + Guest info
├── Timestamps/Chapters
├── Transcript (collapsible)
├── Tags
└── Related episodes

Start Here (new page)
├── Welcome message from Meredith
├── What to expect from the show
└── Recommended starter episodes

How to Listen (new page)
├── Platform grid with icons
├── RSS feed info
└── Website listening option

About the Show
├── Host bio
├── Show description
├── Contact info
└── Press/media inquiries
```

### User Flows

**New Visitor Flow:**
1. Land on homepage → See hero with play button
2. See "Start Here" section → Click recommended episode
3. Listen to episode → See related episodes
4. Subscribe via platform buttons

**Returning Listener Flow:**
1. Land on homepage → See latest episode
2. Click play or navigate to Episodes
3. Browse by tag or scroll archive
4. Listen to episode → Navigate to next

---

## 7. Component Specifications

### Homepage Hero

**Desktop Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Season 1 - new episodes every Thursday!                    │
│                                                             │
│  ┌──────────────┐                                          │
│  │     ▶        │  Latest Episode:                         │
│  │   (play)     │  [Species Name]: [Episode Subtitle]      │
│  └──────────────┘                                          │
│                                                             │
│  [Listen Now →]                    [RAREFIED LOGO]         │
└─────────────────────────────────────────────────────────────┘
```

**Play Button Spec:**
- Size: 64px diameter
- Background: White or mint green
- Icon: Play triangle, teal/green
- Hover: Scale 1.05, subtle shadow

### Episode Card (Homepage)

**Current structure - enhance with:**
- Duration badge (top right of image)
- Episode number visible
- "Listen Now" instead of "Click Here"

```
┌────────────────────────┐
│ ┌──────────────────┐   │
│ │   [55 min]       │   │  ← Duration badge
│ │                  │   │
│ │  [SPECIES PHOTO] │   │
│ │                  │   │
│ └──────────────────┘   │
│ BASKING SHARK          │
│ Cetorhinus maximus     │
│ Endangered             │
├────────────────────────┤
│ Ep. 23 • May 15, 2025  │  ← Episode number + date
│ Disappeared or at      │
│ Depth?                 │
│                        │
│ [▶ Listen Now]         │  ← Better CTA
└────────────────────────┘
```

### Episode Page Layout

**Recommended structure:**
```
┌─────────────────────────────────────────────────────────────┐
│ Episode 23 • Season 1 • 55 min                              │
│                                                             │
│ Basking Shark: Disappeared or at Depth?                     │
│                                                             │
│ ┌──────────────────┐  ┌─────────────────────────────────┐  │
│ │                  │  │ Exploring the Ocean's Gentle    │  │
│ │  [SPECIES CARD]  │  │ Giants with Dr. Dave Ebert      │  │
│ │                  │  │                                 │  │
│ │                  │  │ [Description text...]           │  │
│ └──────────────────┘  │                                 │  │
│                       │ ┌─────────────────────────────┐ │  │
│                       │ │ [▶] ════════════════ 55:07  │ │  │
│                       │ └─────────────────────────────┘ │  │
│                       │                                 │  │
│                       │ [Spotify] [Apple] [Download]    │  │
│                       └─────────────────────────────────┘  │
│                                                             │
│ Chapters:                     Related Resources:            │
│ 00:00 Introduction            • Lost Sharks (YouTube)       │
│ 00:34 Meet the Basking Shark  • Beyond Jaws Podcast        │
│ 01:17 Interview begins        ...                           │
│ ...                                                         │
│                                                             │
│ ▼ Transcript (click to expand)                              │
│                                                             │
│ Tags: season 1 • ocean • fish • shark • data gaps           │
│                                                             │
│ ────────────────────────────────────────────────────────── │
│ Related Episodes:                                           │
│ [Card] [Card] [Card]                                        │
└─────────────────────────────────────────────────────────────┘
```

### Audio Player Requirements

**Minimum features:**
- Play/pause button
- Progress bar with scrubbing
- Current time / Total duration
- Skip forward/back (15/30 sec)
- Speed control (1x, 1.5x, 2x)
- Volume control

**Platform buttons nearby:**
- Spotify badge/link
- Apple Podcasts badge/link
- Download button

### "How to Listen" Page

```
┌─────────────────────────────────────────────────────────────┐
│                     How to Listen                           │
│                                                             │
│   Subscribe to get new episodes every Thursday              │
│                                                             │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│   │ Spotify │  │ Apple   │  │ YouTube │  │ Amazon  │      │
│   │  [icon] │  │ [icon]  │  │ [icon]  │  │ [icon]  │      │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘      │
│                                                             │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐                   │
│   │ Pocket  │  │  RSS    │  │ Website │                   │
│   │ Casts   │  │  Feed   │  │         │                   │
│   └─────────┘  └─────────┘  └─────────┘                   │
│                                                             │
│   ─────────────────────────────────────────────────────── │
│                                                             │
│   Listen on our website                                     │
│   All 23 episodes are available to stream directly at       │
│   rarefiedpod.com/episodes                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### "Start Here" Section

```
┌─────────────────────────────────────────────────────────────┐
│                  New to Rarefied?                           │
│                                                             │
│   Ready to go on an auditory safari? Here are some great    │
│   episodes to start your journey into the world of rare     │
│   and endangered species.                                   │
│                                                             │
│   ┌───────────┐  ┌───────────┐  ┌───────────┐             │
│   │ Wolverine │  │  Basking  │  │  Piping   │             │
│   │           │  │   Shark   │  │  Plover   │             │
│   │  [image]  │  │  [image]  │  │  [image]  │             │
│   │           │  │           │  │           │             │
│   │ A fierce  │  │ Ocean's   │  │ Tiny bird │             │
│   │ survivor  │  │ gentle    │  │ with big  │             │
│   │           │  │ giant     │  │ confidence│             │
│   └───────────┘  └───────────┘  └───────────┘             │
│                                                             │
│                    [View All Episodes →]                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Next Steps

### Recommended Implementation Order

**Phase 1: Quick Wins (High Impact, Lower Effort)**
1. Update "Click Here" buttons to "Listen Now"
2. Add episode duration to episode cards
3. Add prominent play button to homepage hero
4. Add platform buttons (Spotify, Apple) to episode pages

**Phase 2: New Pages (High Impact, Medium Effort)**
5. Create "How to Listen" page
6. Create "Start Here" section (homepage or page)
7. Add related episodes section to episode pages

**Phase 3: Content Enhancements (Medium Impact, Higher Effort)**
8. Add transcript support
9. Add download option
10. Reposition audio player higher on episode pages

**Phase 4: Advanced Features (Nice to Have)**
11. Persistent audio player
12. Enhanced episode filtering
13. Community features

### Technical Considerations

**Platform:**
- Building NEW site from scratch (not updating current Squarespace)
- Tech stack: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Hosting: Vercel
- Current rarefiedpod.com serves as content/brand reference only

**Audio Player:**
- Custom HTML5 audio player component for full control
- Features: play/pause, progress scrubbing, skip, speed control, chapter navigation
- Consider self-hosted audio or continue with podcast host (Spotify/Transistor)

**Episode Data:**
- Start with static JSON files (version controlled, simple)
- Can migrate to headless CMS (Sanity, Contentful) if non-dev editing needed later
- Episode data model defined in PRD

**Transcripts:**
- Generate via AI transcription (Descript, Otter.ai)
- Store as text content in episode data or separate files
- Collapsible section on episode page

**Analytics to Track:**
- Play button clicks
- Subscribe button clicks (by platform)
- Episode completion rates
- Time on episode pages
- Newsletter signups

**See Also:** `prd.md` for detailed technical specifications and implementation phases.

---

## Appendix: Reference Site URLs

- 99% Invisible: https://99percentinvisible.org
- Radiolab: https://radiolab.org
- This American Life: https://thisamericanlife.org
- Rarefied (current): https://rarefiedpod.com
