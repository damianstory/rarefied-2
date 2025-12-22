const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const slugify = require('slugify');

const BASE_URL = 'https://www.rarefiedpod.com';
const OUTPUT_DIR = path.join(__dirname, 'output');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const EPISODES_DIR = path.join(OUTPUT_DIR, 'episodes');

// Create output directories
function ensureDirectories() {
  [OUTPUT_DIR, IMAGES_DIR, EPISODES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Download an image from URL
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    if (!url || url.startsWith('data:')) {
      resolve(null);
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    const filePath = path.join(IMAGES_DIR, filename);

    // Skip if already downloaded
    if (fs.existsSync(filePath)) {
      console.log(`  Image already exists: ${filename}`);
      resolve(filename);
      return;
    }

    const file = fs.createWriteStream(filePath);

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`  Downloaded: ${filename}`);
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`  Failed to download ${url}: ${err.message}`);
      resolve(null);
    });
  });
}

// Parse timestamp to seconds
function parseTimestamp(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
}

// Extract Spotify embed ID from URL or embed code
function extractSpotifyId(text) {
  if (!text) return null;
  // Match patterns like: open.spotify.com/episode/XXXXX or spotify:episode:XXXXX
  const match = text.match(/episode[\/:]([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

async function getEpisodeLinks(page) {
  console.log('Navigating to episodes page...');
  await page.goto(`${BASE_URL}/episodes`, { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait for content to load
  await page.waitForSelector('a[href*="/episodes/"]', { timeout: 10000 });

  // Get all episode links - only actual interview episodes, not tag pages
  const links = await page.evaluate(() => {
    const anchors = document.querySelectorAll('a[href*="/episodes/interview"]');
    const episodeLinks = new Set();

    anchors.forEach(a => {
      const href = a.href;
      // Only include actual episode interview pages
      if (href.includes('/episodes/interview')) {
        // Normalize URL
        const url = new URL(href);
        episodeLinks.add(url.origin + url.pathname);
      }
    });

    return Array.from(episodeLinks);
  });

  console.log(`Found ${links.length} episode links`);
  return links;
}

async function scrapeEpisode(page, url) {
  console.log(`\nScraping: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('h1', { timeout: 10000 });

    // Extract episode data
    const data = await page.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent.trim() : '';
      };

      const getTexts = (selector) => {
        return Array.from(document.querySelectorAll(selector)).map(el => el.textContent.trim());
      };

      // Get page title/heading
      const h1 = document.querySelector('h1');
      const fullTitle = h1 ? h1.textContent.trim() : '';

      // Try to find species card or main content sections
      const pageText = document.body.innerText;

      // Find description - usually in the main content area
      let description = '';
      const descriptionEl = document.querySelector('[data-testid="description"]') ||
                           document.querySelector('.sqs-block-html p') ||
                           document.querySelector('.blog-item-content p');
      if (descriptionEl) {
        description = descriptionEl.textContent.trim();
      }

      // Find all text blocks that might contain episode info
      const textBlocks = Array.from(document.querySelectorAll('p, div')).map(el => el.textContent.trim());

      // Find scientific name (usually in italics)
      let scientificName = '';
      const italicEls = document.querySelectorAll('em, i');
      italicEls.forEach(el => {
        const text = el.textContent.trim();
        // Scientific names typically have two words
        if (text.match(/^[A-Z][a-z]+ [a-z]+$/)) {
          scientificName = text;
        }
      });

      // Find conservation status
      let conservationStatus = '';
      const statusKeywords = ['Endangered', 'Threatened', 'Vulnerable', 'Special Concern', 'Critically Endangered', 'Extinct'];
      statusKeywords.forEach(status => {
        if (pageText.includes(status)) {
          conservationStatus = status;
        }
      });

      // Find timestamps/chapters - look for time patterns like "00:00" or "1:23"
      const chapters = [];
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.children.length === 0) { // leaf nodes only
          const text = el.textContent.trim();
          const timeMatch = text.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–:]\s*(.+)$/);
          if (timeMatch) {
            chapters.push({
              time: timeMatch[1],
              title: timeMatch[2].trim()
            });
          }
        }
      });

      // Find Spotify embed
      let spotifyEmbedId = null;
      const spotifyIframe = document.querySelector('iframe[src*="spotify"]');
      if (spotifyIframe) {
        const src = spotifyIframe.src;
        const match = src.match(/episode\/([a-zA-Z0-9]+)/);
        if (match) {
          spotifyEmbedId = match[1];
        }
      }

      // Find main image
      let mainImage = '';
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const src = img.src || img.dataset.src || '';
        // Look for the main species image (usually larger, not icons)
        if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar')) {
          const width = img.naturalWidth || parseInt(img.width) || 0;
          if (width > 200 || !mainImage) {
            mainImage = src;
          }
        }
      });

      // Find tags - usually in a tags section or as links
      const tags = [];
      const tagLinks = document.querySelectorAll('a[href*="/tag/"], a[href*="/category/"], .tag, .category');
      tagLinks.forEach(tag => {
        const text = tag.textContent.trim().toLowerCase();
        if (text && !tags.includes(text)) {
          tags.push(text);
        }
      });

      // Try to find guest information
      let guestName = '';
      let guestTitle = '';
      const guestPatterns = [
        /with\s+([A-Z][a-zA-Z\s\.]+?)(?:,|\.|$)/,
        /featuring\s+([A-Z][a-zA-Z\s\.]+?)(?:,|\.|$)/,
        /guest[:\s]+([A-Z][a-zA-Z\s\.]+?)(?:,|\.|$)/i
      ];

      // Find external resource links
      const resources = [];
      const links = document.querySelectorAll('a[href^="http"]');
      links.forEach(link => {
        const href = link.href;
        const text = link.textContent.trim();
        // Filter out social and navigation links
        if (href && text &&
            !href.includes('spotify') &&
            !href.includes('apple.com/podcast') &&
            !href.includes('rarefiedpod.com') &&
            !href.includes('facebook') &&
            !href.includes('twitter') &&
            !href.includes('instagram') &&
            text.length > 3) {
          resources.push({ title: text, url: href });
        }
      });

      return {
        fullTitle,
        description,
        scientificName,
        conservationStatus,
        chapters,
        spotifyEmbedId,
        mainImage,
        tags,
        guestName,
        guestTitle,
        resources: resources.slice(0, 10) // Limit to first 10
      };
    });

    return { url, ...data };

  } catch (error) {
    console.error(`Error scraping ${url}: ${error.message}`);
    return { url, error: error.message };
  }
}

async function scrapeSpeciesCard(page, url) {
  // Navigate again if needed and look specifically for species card data
  try {
    const cardData = await page.evaluate(() => {
      const data = {
        weight: '',
        length: '',
        diet: '',
        habitat: '',
        specialPower: ''
      };

      const pageText = document.body.innerText;

      // Look for stat patterns
      const patterns = {
        weight: /weight[:\s]+([^\n]+)/i,
        length: /length[:\s]+([^\n]+)/i,
        diet: /diet[:\s]+([^\n]+)/i,
        habitat: /habitat[:\s]+([^\n]+)/i,
        specialPower: /special\s*power[:\s]+([^\n]+)/i
      };

      Object.keys(patterns).forEach(key => {
        const match = pageText.match(patterns[key]);
        if (match) {
          data[key] = match[1].trim();
        }
      });

      return data;
    });

    return cardData;
  } catch (error) {
    return {};
  }
}

function parseEpisodeTitle(fullTitle) {
  // Try to parse episode number and title from various formats
  // Examples:
  // "Season 1: Basking Shark - Disappeared or at Depth?"
  // "Ep. 23: Basking Shark"
  // "Basking Shark: Disappeared or at Depth?"

  let episodeNumber = null;
  let season = 1;
  let speciesName = '';
  let subtitle = '';

  // Try to find episode number
  const epMatch = fullTitle.match(/(?:episode|ep\.?)\s*(\d+)/i);
  if (epMatch) {
    episodeNumber = parseInt(epMatch[1]);
  }

  // Try to find season
  const seasonMatch = fullTitle.match(/season\s*(\d+)/i);
  if (seasonMatch) {
    season = parseInt(seasonMatch[1]);
  }

  // Split by colon or hyphen to get species name and subtitle
  const parts = fullTitle.split(/[:\-–—]/).map(p => p.trim());

  if (parts.length >= 2) {
    // If first part is "Season X" or "Ep. X", skip it
    let startIdx = 0;
    if (parts[0].match(/^(season|ep\.?)\s*\d+$/i)) {
      startIdx = 1;
    }

    if (parts.length > startIdx + 1) {
      speciesName = parts[startIdx];
      subtitle = parts.slice(startIdx + 1).join(': ');
    } else if (parts.length > startIdx) {
      speciesName = parts[startIdx];
    }
  } else {
    speciesName = fullTitle;
  }

  // Clean up species name
  speciesName = speciesName.replace(/^\d+\s*\.?\s*/, ''); // Remove leading numbers

  return { episodeNumber, season, speciesName, subtitle };
}

async function main() {
  ensureDirectories();

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });

    // Get all episode links
    const episodeLinks = await getEpisodeLinks(page);

    if (episodeLinks.length === 0) {
      console.error('No episodes found!');
      return;
    }

    const episodes = [];
    let episodeCounter = episodeLinks.length; // Count backwards if no episode numbers found

    for (const link of episodeLinks) {
      const episodeData = await scrapeEpisode(page, link);

      if (episodeData.error) {
        console.error(`Skipping ${link} due to error`);
        continue;
      }

      // Get additional species card data
      const cardData = await scrapeSpeciesCard(page, link);

      // Parse the title
      const { episodeNumber, season, speciesName, subtitle } = parseEpisodeTitle(episodeData.fullTitle);

      // Generate slug
      const slug = slugify(speciesName || episodeData.fullTitle, { lower: true, strict: true });

      // Download species image
      let imageFilename = null;
      if (episodeData.mainImage) {
        const ext = path.extname(new URL(episodeData.mainImage).pathname) || '.jpg';
        imageFilename = `${slug}${ext}`;
        await downloadImage(episodeData.mainImage, imageFilename);
      }

      // Determine episode number
      const epNum = episodeNumber || episodeCounter;
      episodeCounter--;

      // Build episode object
      const episode = {
        id: `ep-${epNum}`,
        slug: slug,
        title: speciesName || episodeData.fullTitle,
        subtitle: subtitle || '',
        episodeNumber: epNum,
        season: season,
        publishedAt: new Date().toISOString().split('T')[0], // Placeholder - would need to scrape actual date
        duration: 0, // Would need Spotify API to get actual duration
        description: episodeData.description,

        species: {
          commonName: speciesName || episodeData.fullTitle,
          scientificName: episodeData.scientificName || '',
          status: episodeData.conservationStatus || 'Unknown',
          weight: cardData.weight || '',
          length: cardData.length || '',
          diet: cardData.diet || '',
          habitat: cardData.habitat || '',
          specialPower: cardData.specialPower || '',
          image: imageFilename || '',
          imageAlt: `${speciesName || 'Species'} featured in episode ${epNum}`
        },

        audioUrl: '', // Would need to find actual audio URL
        spotifyUrl: episodeData.spotifyEmbedId ? `https://open.spotify.com/episode/${episodeData.spotifyEmbedId}` : '',
        spotifyEmbedId: episodeData.spotifyEmbedId || '',
        applePodcastsUrl: '', // Would need to find

        guest: episodeData.guestName ? {
          name: episodeData.guestName,
          title: episodeData.guestTitle,
          organization: ''
        } : null,

        chapters: episodeData.chapters.map(ch => ({
          time: ch.time,
          timeInSeconds: parseTimestamp(ch.time),
          title: ch.title
        })),

        resources: episodeData.resources || [],
        tags: episodeData.tags.length > 0 ? episodeData.tags : ['season 1'],

        _sourceUrl: episodeData.url
      };

      episodes.push(episode);

      // Save individual episode JSON
      const episodePath = path.join(EPISODES_DIR, `${slug}.json`);
      fs.writeFileSync(episodePath, JSON.stringify(episode, null, 2));
      console.log(`  Saved: ${slug}.json`);

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Save all episodes to a single file
    const allEpisodesPath = path.join(OUTPUT_DIR, 'all-episodes.json');
    fs.writeFileSync(allEpisodesPath, JSON.stringify(episodes, null, 2));
    console.log(`\nSaved ${episodes.length} episodes to all-episodes.json`);

    // Generate summary
    console.log('\n=== SCRAPING COMPLETE ===');
    console.log(`Total episodes: ${episodes.length}`);
    console.log(`Images downloaded: ${fs.readdirSync(IMAGES_DIR).length}`);
    console.log(`\nOutput location: ${OUTPUT_DIR}`);

  } catch (error) {
    console.error('Scraping failed:', error);
  } finally {
    await browser.close();
  }
}

main();
