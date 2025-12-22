const fs = require('fs');
const path = require('path');

const episodesDir = path.join(__dirname, '../src/content/episodes');

// Image mapping: slug -> correct filename
const imageMapping = {
  'wolverine': 'wolverine.png',
  'blandings-turtle': 'blandings-turtle.png',
  'redside-dace': 'redside-dace.png',
  'beluga-whale': 'beluga-whale.png',
  'rusty-patched-bumble-bee': 'rusty-patched-bumble-bee.png',
  'piping-plover': 'piping-plover.jpg',
  'black-ash': 'black-ash.jpg',
  'oregon-spotted-frog': 'oregon-spotted-frog.png',
  'basking-shark': 'basking-shark.jpg',
  'little-brown-bat': 'little-brown-bat.png',
  'bogbean-buckmoth': 'bogbean-buckmoth.png',
  'american-eel-pt1': 'american-eel.png',
  'american-eel-pt2': 'american-eel.png',
  'chimney-swift': 'chimney-swift.png',
  'vancouver-island-marmot': 'vancouver-island-marmot.png',
  'jefferson-salamander': 'jefferson-salamander.png',
  'southwest-spring-firefly': 'southwest-spring-firefly.png',
  'northern-spotted-owl': 'northern-spotted-owl.png',
  'wood-poppy': 'wood-poppy.jpg',
  // Placeholder for episodes without images
  'caribou': 'placeholder.jpg',
  'loggerhead-shrike': 'placeholder.jpg',
  'mottled-duskywing': 'placeholder.jpg',
  'snuffbox': 'placeholder.jpg',
  'spotted-gar': 'placeholder.jpg',
  'midseason-recap': 'placeholder.jpg',
};

// Guest info corrections
const guestCorrections = {
  'basking-shark': {
    name: 'Dr. Dave Ebert',
    title: 'Shark Scientist',
    organization: 'Pacific Shark Research Center'
  }
};

function cleanDescription(description) {
  if (!description) return description;

  // 1. Remove "Send us a text" prefix (with optional trailing space/newline)
  let cleaned = description.replace(/^Send us a text\s*/i, '');

  // 2. Decode HTML entities
  cleaned = cleaned.replace(/&apos;/g, "'");
  cleaned = cleaned.replace(/&quot;/g, '"');
  cleaned = cleaned.replace(/&amp;/g, '&');
  cleaned = cleaned.replace(/&lt;/g, '<');
  cleaned = cleaned.replace(/&gt;/g, '>');

  return cleaned;
}

function cleanStatus(status) {
  if (!status) return status;

  // Remove parenthetical codes like (G3N1N3S1)
  let cleaned = status.replace(/\s*\([A-Z0-9]+\)\s*/g, '');

  // Remove question marks
  cleaned = cleaned.replace(/\?/g, '');

  // Normalize case
  cleaned = cleaned.trim();

  // Map to standard values
  const statusMap = {
    'endangered': 'Endangered',
    'threatened': 'Threatened',
    'special concern': 'Special Concern',
    'unknown': 'Unknown',
  };

  const lower = cleaned.toLowerCase();
  return statusMap[lower] || cleaned || 'Unknown';
}

function cleanResourceTitle(resource) {
  if (!resource || !resource.url) return resource;

  // If title is just a URL, try to make it friendlier
  if (resource.title && resource.title.startsWith('http')) {
    try {
      const url = new URL(resource.title);
      // Extract domain and path for a cleaner title
      let title = url.hostname.replace('www.', '');
      if (url.pathname && url.pathname !== '/') {
        const pathParts = url.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
          title = pathParts[pathParts.length - 1]
            .replace(/-/g, ' ')
            .replace(/\//g, '')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }
      return { ...resource, title };
    } catch {
      return resource;
    }
  }
  return resource;
}

// Process all JSON files
const files = fs.readdirSync(episodesDir).filter(f => f.endsWith('.json'));

console.log(`Processing ${files.length} episode files...\n`);

files.forEach(file => {
  const filePath = path.join(episodesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const slug = data.slug;

  let changes = [];

  // 1. Update image reference
  if (imageMapping[slug] && data.species) {
    const newImage = imageMapping[slug];
    if (data.species.image !== newImage) {
      changes.push(`image: ${data.species.image} -> ${newImage}`);
      data.species.image = newImage;
    }
  }

  // 2. Clean description
  const cleanedDesc = cleanDescription(data.description);
  if (cleanedDesc !== data.description) {
    changes.push('description: cleaned');
    data.description = cleanedDesc;
  }

  // 3. Clean species status
  if (data.species && data.species.status) {
    const cleanedStatus = cleanStatus(data.species.status);
    if (cleanedStatus !== data.species.status) {
      changes.push(`status: ${data.species.status} -> ${cleanedStatus}`);
      data.species.status = cleanedStatus;
    }
  }

  // 4. Fix guest info
  if (guestCorrections[slug]) {
    const correction = guestCorrections[slug];
    if (data.guest && data.guest.name !== correction.name) {
      changes.push(`guest: ${data.guest.name} -> ${correction.name}`);
      data.guest = { ...data.guest, ...correction };
    }
  }

  // 5. Clean resource titles
  if (data.resources && data.resources.length > 0) {
    data.resources = data.resources.map(r => cleanResourceTitle(r));
  }

  // Write back if changes were made
  if (changes.length > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`${file}:`);
    changes.forEach(c => console.log(`  - ${c}`));
  }
});

console.log('\nCleanup complete!');
