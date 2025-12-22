const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const RSS_FEED_URL = 'https://feeds.buzzsprout.com/2415328.rss';
const OUTPUT_DIR = path.join(__dirname, 'output');
const EPISODES_DIR = path.join(OUTPUT_DIR, 'episodes');
const WEBSITE_EPISODES_DIR = path.join(__dirname, '..', 'rarefied-website', 'src', 'content', 'episodes');

// Spotify episode IDs mapped by title (collected from search)
const SPOTIFY_EPISODE_IDS = {
  'Caribou: Deep Snow, Deep Impact': '1vFdXb6tZRlry8lBM47tTB',
  'Snuffbox: More than a filter': '2j1ZgkOCvnUczSS4IzS3pv',
  'Basking Shark: Disappeared or at Depth?': '2YEzDnPZaWOOgx9RU7oI9p',
  'Northern Spotted Owl: Messengers of the Old Growth Forests': '3q9uuR4CDSe45Vyk3fj1zH',
  'Southwest Spring Firefly: The Gateway Bug': '261hvMzLSHECY4tnKl2WyU',
  'Jefferson Salamander: Do a little dance': '12TQD8excH0JpjL9IobWP2',
  'Vancouver Island Marmot: Space Travel, Plague, and Nose Boops': '0W1jQVnlbhk89ndJW7l4nR',
  'Chimney Swift: Your Good Neighbor': '0t79ZfCAjV47rqUcK6XE3B',
  'American Eel: Ambassador of the River Part 2': '1P3te2XKHMyhVKxKa1SIAz',
  'American Eel: Ambassadors of the River part 1': '0egLEMoD2agPDqIQ1e61vs',
  'Midseason Recap - Reflecting on Rare Species': '0OZqkXnEmqGB2nzi6Kn8Qp',
  'Bogbean Buckmoth: Bold and Beautiful': '697AHPAO6Z8mTGM3r2yoQc',
  // Will need to fetch remaining IDs
};

// Helper to fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Parse XML RSS feed (simple regex-based for this specific format)
function parseRSSFeed(xml) {
  const episodes = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const getTag = (tag) => {
      const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([^<]*)<\\/${tag}>`);
      const m = itemXml.match(regex);
      return m ? (m[1] || m[2] || '').trim() : '';
    };

    const getAttr = (tag, attr) => {
      const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"[^>]*>`);
      const m = itemXml.match(regex);
      return m ? m[1] : '';
    };

    const title = getTag('title');
    const description = getTag('description');
    const contentEncoded = getTag('content:encoded');
    const pubDate = getTag('pubDate');
    const duration = parseInt(getTag('itunes:duration')) || 0;
    const season = parseInt(getTag('itunes:season')) || 1;
    const episodeNum = parseInt(getTag('itunes:episode')) || 0;
    const audioUrl = getAttr('enclosure', 'url');
    const imageUrl = getAttr('itunes:image', 'href');

    // Parse chapters from description (timestamps like "00:00 Title")
    const chapters = [];
    const chapterRegex = /(\d{1,2}:\d{2}(?::\d{2})?)\s+([^\n<]+)/g;
    let chMatch;
    const content = contentEncoded || description;
    while ((chMatch = chapterRegex.exec(content)) !== null) {
      const time = chMatch[1];
      const chTitle = chMatch[2].trim();
      // Convert time to seconds
      const parts = time.split(':').map(Number);
      let seconds = 0;
      if (parts.length === 2) {
        seconds = parts[0] * 60 + parts[1];
      } else if (parts.length === 3) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
      chapters.push({
        time,
        timeInSeconds: seconds,
        title: chTitle
      });
    }

    // Parse resources (URLs in content)
    const resources = [];
    const urlRegex = /https?:\/\/[^\s<>"]+/g;
    let urlMatch;
    while ((urlMatch = urlRegex.exec(content)) !== null) {
      const url = urlMatch[0].replace(/[,.)]+$/, ''); // Remove trailing punctuation
      if (!url.includes('buzzsprout.com') &&
          !url.includes('spotify.com') &&
          !url.includes('apple.com/podcast') &&
          !resources.find(r => r.url === url)) {
        resources.push({
          title: url.split('/').pop() || url,
          url
        });
      }
    }

    // Parse guest from description
    let guest = null;
    const guestPatterns = [
      /(?:Joined by|joined by|with|featuring|interview(?:s|ing)?)\s+(?:Dr\.\s+)?([A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+)(?:,|\s+(?:a|an|the|from|who))/i,
      /(?:talks? with|speaks? with)\s+(?:Dr\.\s+)?([A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+)/i
    ];
    for (const pattern of guestPatterns) {
      const gMatch = content.match(pattern);
      if (gMatch) {
        guest = { name: gMatch[1].trim(), title: '', organization: '' };
        break;
      }
    }

    episodes.push({
      title,
      description: description.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 1000),
      pubDate,
      duration,
      season,
      episodeNumber: episodeNum,
      audioUrl,
      imageUrl,
      chapters,
      resources: resources.slice(0, 5),
      guest
    });
  }

  return episodes;
}

// Generate slug from title (with special case handling)
function slugify(text) {
  // Normalize the text first (trim, collapse spaces, decode entities)
  const normalized = text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/&#39;/g, "'");

  // Special cases for multi-part episodes and tricky names
  // Keys are patterns that the normalized title should contain
  if (normalized.includes('American Eel') && normalized.toLowerCase().includes('part 2')) {
    return 'american-eel-pt2';
  }
  if (normalized.includes('American Eel') && normalized.toLowerCase().includes('part 1')) {
    return 'american-eel-pt1';
  }
  if (normalized.toLowerCase().includes("blanding")) {
    return 'blandings-turtle';
  }
  if (normalized.toLowerCase().includes('midseason recap')) {
    return 'midseason-recap';
  }

  // Extract species name (before the colon usually)
  const colonIndex = normalized.indexOf(':');
  const baseName = colonIndex > 0 ? normalized.substring(0, colonIndex) : normalized;

  return baseName
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Parse publish date
function parseDate(dateStr) {
  const d = new Date(dateStr);
  return d.toISOString().split('T')[0];
}

// Get subtitle from title
function parseTitle(fullTitle) {
  const colonIndex = fullTitle.indexOf(':');
  if (colonIndex > 0) {
    return {
      title: fullTitle.substring(0, colonIndex).trim(),
      subtitle: fullTitle.substring(colonIndex + 1).trim()
    };
  }
  const dashIndex = fullTitle.indexOf(' - ');
  if (dashIndex > 0) {
    return {
      title: fullTitle.substring(0, dashIndex).trim(),
      subtitle: fullTitle.substring(dashIndex + 3).trim()
    };
  }
  return { title: fullTitle, subtitle: '' };
}

async function main() {
  console.log('Fetching RSS feed...');
  const rssXml = await fetchUrl(RSS_FEED_URL);

  console.log('Parsing episodes...');
  const rssEpisodes = parseRSSFeed(rssXml);
  console.log(`Found ${rssEpisodes.length} episodes in RSS feed`);

  // Ensure directories exist
  [OUTPUT_DIR, EPISODES_DIR, WEBSITE_EPISODES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const allEpisodes = [];

  for (const ep of rssEpisodes) {
    // Skip trailer
    if (ep.title.toLowerCase().includes('trailer')) {
      console.log(`Skipping trailer: ${ep.title}`);
      continue;
    }

    const { title, subtitle } = parseTitle(ep.title);
    const slug = slugify(ep.title);

    // Look up Spotify ID
    let spotifyEmbedId = SPOTIFY_EPISODE_IDS[ep.title] || '';

    // Try to find existing file to preserve any manual data
    let existingData = {};
    const existingPath = path.join(WEBSITE_EPISODES_DIR, `${slug}.json`);
    if (fs.existsSync(existingPath)) {
      try {
        existingData = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
        console.log(`  Found existing data for ${slug}`);
      } catch (e) {
        console.error(`  Error reading existing file: ${e.message}`);
      }
    }

    const episode = {
      id: `ep-${ep.episodeNumber}`,
      slug,
      title,
      subtitle,
      episodeNumber: ep.episodeNumber,
      season: ep.season,
      publishedAt: parseDate(ep.pubDate),
      duration: ep.duration,
      description: ep.description,

      species: {
        commonName: title,
        scientificName: existingData.species?.scientificName || '',
        status: existingData.species?.status || 'Unknown',
        weight: existingData.species?.weight || '',
        length: existingData.species?.length || '',
        diet: existingData.species?.diet || '',
        habitat: existingData.species?.habitat || '',
        specialPower: existingData.species?.specialPower || '',
        image: existingData.species?.image || `${slug}.jpg`,
        imageAlt: `${title} featured in episode ${ep.episodeNumber}`
      },

      audioUrl: ep.audioUrl,
      spotifyUrl: spotifyEmbedId ? `https://open.spotify.com/episode/${spotifyEmbedId}` : '',
      spotifyEmbedId,
      applePodcastsUrl: '',

      guest: ep.guest || existingData.guest || null,
      chapters: ep.chapters.length > 0 ? ep.chapters : (existingData.chapters || []),
      resources: ep.resources.length > 0 ? ep.resources : (existingData.resources || []),
      tags: existingData.tags || [`season ${ep.season}`],

      _sourceUrl: existingData._sourceUrl || '',
      _rssGuid: `Buzzsprout-${ep.audioUrl.match(/episodes\/(\d+)/)?.[1] || ''}`
    };

    allEpisodes.push(episode);

    // Save individual episode JSON
    const episodePath = path.join(WEBSITE_EPISODES_DIR, `${slug}.json`);
    fs.writeFileSync(episodePath, JSON.stringify(episode, null, 2));
    console.log(`Saved: ${slug}.json (Ep ${ep.episodeNumber})`);
  }

  // Sort by episode number descending
  allEpisodes.sort((a, b) => b.episodeNumber - a.episodeNumber);

  // Save all episodes
  const allEpisodesPath = path.join(OUTPUT_DIR, 'all-episodes-enriched.json');
  fs.writeFileSync(allEpisodesPath, JSON.stringify(allEpisodes, null, 2));
  console.log(`\nSaved ${allEpisodes.length} episodes to all-episodes-enriched.json`);

  // Summary
  console.log('\n=== ENRICHMENT SUMMARY ===');
  console.log(`Total episodes: ${allEpisodes.length}`);
  console.log(`With Spotify IDs: ${allEpisodes.filter(e => e.spotifyEmbedId).length}`);
  console.log(`With chapters: ${allEpisodes.filter(e => e.chapters.length > 0).length}`);
  console.log(`With audio URLs: ${allEpisodes.filter(e => e.audioUrl).length}`);

  // List missing Spotify IDs
  const missingSpotify = allEpisodes.filter(e => !e.spotifyEmbedId);
  if (missingSpotify.length > 0) {
    console.log('\nMissing Spotify IDs for:');
    missingSpotify.forEach(e => console.log(`  - ${e.title} (Ep ${e.episodeNumber})`));
  }
}

main().catch(console.error);
