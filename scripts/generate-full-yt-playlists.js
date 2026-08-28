import fs from 'fs';

const auditData = JSON.parse(fs.readFileSync('scripts/audit-results.json', 'utf8'));

const playlistOrder = [
  'saraswatiPuja',
  'shivaratri',
  'dolPurnima',
  'rathYatra',
  'janmashtami',
  'ganeshChaturthi',
  'vishwakarmaPuja',
  'mahalaya',
  'durgaPuja',
  'lakshmiPuja',
  'kaliPuja',
  'jagaddhatriPuja',
];

const playlistMeta = {
  saraswatiPuja: {
    title: 'সরস্বতী পূজার সুর',
    subtitle: 'Saraswati Puja Devotional Collection',
    festivalEmoji: '📿',
    accentColor: '#d4a017',
    numComment: '1. SARASWATI PUJA (সরস্বতী পূজা)'
  },
  shivaratri: {
    title: 'মহাশিবরাত্রির সুর',
    subtitle: 'Maha Shivaratri Devotional Collection',
    festivalEmoji: '🔱',
    accentColor: '#6b46c1',
    numComment: '2. MAHA SHIVARATRI (মহাশিবরাত্রি)'
  },
  dolPurnima: {
    title: 'দোল পূর্ণিমার সুর',
    subtitle: 'Dol Purnima & Holi Devotional Collection',
    festivalEmoji: '🌸',
    accentColor: '#e84393',
    numComment: '3. DOL PURNIMA (দোল পূর্ণিমা)'
  },
  rathYatra: {
    title: 'রথযাত্রার সুর',
    subtitle: 'Rath Yatra Devotional Collection',
    festivalEmoji: '🏛️',
    accentColor: '#e67e22',
    numComment: '4. RATH YATRA (রথযাত্রা)'
  },
  janmashtami: {
    title: 'জন্মাষ্টমীর সুর',
    subtitle: 'Krishna Janmashtami Devotional Collection',
    festivalEmoji: '🦚',
    accentColor: '#4a90d9',
    numComment: '5. KRISHNA JANMASHTAMI (জন্মাষ্টমী)'
  },
  ganeshChaturthi: {
    title: 'গণেশ চতুর্থীর সুর',
    subtitle: 'Ganesh Chaturthi Devotional Collection',
    festivalEmoji: '🐘',
    accentColor: '#e67e22',
    numComment: '6. GANESH CHATURTHI (গণেশ চতুর্থী)'
  },
  vishwakarmaPuja: {
    title: 'বিশ্বকর্মা পূজার সুর',
    subtitle: 'Vishwakarma Puja Devotional Collection',
    festivalEmoji: '🔨',
    accentColor: '#4a90d9',
    numComment: '7. VISHWAKARMA PUJA (বিশ্বকর্মা পূজা)'
  },
  mahalaya: {
    title: 'মহালয়ার সুর',
    subtitle: 'Mahalaya Devotional Collection',
    festivalEmoji: '🌑',
    accentColor: '#c9a84c',
    numComment: '8. MAHALAYA (মহালয়া)'
  },
  durgaPuja: {
    title: 'দুর্গাপূজার সুর',
    subtitle: 'Durga Puja Collection (Shasthi — Dashami)',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    numComment: '9. DURGA PUJA (দুর্গাপূজা)'
  },
  lakshmiPuja: {
    title: 'লক্ষ্মী পূজার সুর',
    subtitle: 'Kojagari Lakshmi Puja Devotional Collection',
    festivalEmoji: '🪷',
    accentColor: '#27ae60',
    numComment: '10. LAKSHMI PUJA (লক্ষ্মী পূজা)'
  },
  kaliPuja: {
    title: 'কালী পূজার সুর',
    subtitle: 'Kali Puja Devotional Collection',
    festivalEmoji: '🕉️',
    accentColor: '#8b0000',
    numComment: '11. KALI PUJA (কালী পূজা)'
  },
  jagaddhatriPuja: {
    title: 'জগদ্ধাত্রী পূজার সুর',
    subtitle: 'Jagaddhatri Puja Devotional Collection',
    festivalEmoji: '🌸',
    accentColor: '#d4700a',
    numComment: '12. JAGADDHATRI PUJA (জগদ্ধাত্রী পূজা)'
  },
};

let output = `/**
 * PUJA JOURNEY — Central Festival Music Playlists & Mapping
 *
 * Official YouTube IFrame Player API tracks for each festival.
 * For EVERY YouTube track, the EXACT FULL TITLE from YouTube is preserved.
 * Only verified embeddable & playable tracks are included.
 */

const getThumb = (id) => \`https://img.youtube.com/vi/\${id}/hqdefault.jpg\`;

export const musicPlaylists = {
`;

for (const key of playlistOrder) {
  const meta = playlistMeta[key];
  const list = auditData[key];
  if (!list || !list.tracks) continue;

  output += `
  // ── ${meta.numComment} — ${list.tracks.length} Verified Tracks ───────────
  ${key}: {
    playlistId: '${key}',
    title: '${meta.title}',
    subtitle: '${meta.subtitle}',
    festivalEmoji: '${meta.festivalEmoji}',
    accentColor: '${meta.accentColor}',
    tracks: [`;

  for (const track of list.tracks) {
    const escapedTitle = JSON.stringify(track.title);
    const escapedArtist = JSON.stringify(track.artist || 'Devotional Music');

    output += `
      {
        id: '${track.id}',
        youtubeId: '${track.id}',
        youtubeUrl: '${track.youtubeUrl}',
        title: ${escapedTitle},
        titleBn: ${escapedTitle},
        artist: ${escapedArtist},
        thumbnail: getThumb('${track.id}'),
      },`;
  }

  output += `
    ],
  },
`;
}

output += `};

/**
 * Explicit Festival ID to Playlist Mapping
 * Only mapped festivals will have music.
 */
export const festivalPlaylistMap = {
  // Saraswati Puja
  'saraswati-puja': 'saraswatiPuja',

  // Maha Shivaratri
  'shivaratri': 'shivaratri',

  // Dol Purnima / Dol Jatra
  'dol-purnima': 'dolPurnima',

  // Rath Yatra
  'rath-yatra': 'rathYatra',

  // Krishna Janmashtami
  'janmashtami': 'janmashtami',

  // Ganesh Chaturthi / Ganesh Puja
  'ganesh-chaturthi': 'ganeshChaturthi',

  // Vishwakarma Puja
  'vishwakarma-puja': 'vishwakarmaPuja',

  // Mahalaya -> Mahalaya Playlist ONLY
  'mahalaya': 'mahalaya',

  // Durga Puja 5 Days -> Shared Durga Puja Playlist
  'durga-puja': 'durgaPuja',
  'durga-puja-shasthi': 'durgaPuja',
  'durga-puja-saptami': 'durgaPuja',
  'durga-puja-ashtami': 'durgaPuja',
  'durga-puja-navami': 'durgaPuja',
  'durga-puja-dashami': 'durgaPuja',

  // Kojagari Lakshmi Puja
  'lakshmi-puja': 'lakshmiPuja',

  // Kali Puja
  'kali-puja': 'kaliPuja',

  // Jagaddhatri Puja
  'jagaddhatri-puja': 'jagaddhatriPuja',
};

// Map each festival to its custom title when playing
const festivalDisplayTitles = {
  'saraswati-puja': { title: 'সরস্বতী পূজার সুর', subtitle: 'Saraswati Puja Devotional Collection', emoji: '📿' },
  'shivaratri': { title: 'মহাশিবরাত্রির সুর', subtitle: 'Maha Shivaratri Devotional Collection', emoji: '🔱' },
  'dol-purnima': { title: 'দোল পূর্ণিমার সুর', subtitle: 'Dol Purnima & Holi Devotional Collection', emoji: '🌸' },
  'rath-yatra': { title: 'রথযাত্রার সুর', subtitle: 'Rath Yatra Devotional Collection', emoji: '🏛️' },
  'janmashtami': { title: 'জন্মাষ্টমীর সুর', subtitle: 'Krishna Janmashtami Devotional Collection', emoji: '🦚' },
  'ganesh-chaturthi': { title: 'গণেশ চতুর্থীর সুর', subtitle: 'Ganesh Chaturthi Devotional Collection', emoji: '🐘' },
  'vishwakarma-puja': { title: 'বিশ্বকর্মা পূজার সুর', subtitle: 'Vishwakarma Puja Devotional Collection', emoji: '🔨' },
  'mahalaya': { title: 'মহালয়ার সুর', subtitle: 'Mahalaya Devotional Collection', emoji: '🌑' },
  'durga-puja': { title: 'দুর্গাপূজার সুর', subtitle: 'Durga Puja Collection', emoji: '🪔' },
  'durga-puja-shasthi': { title: 'মহা ষষ্ঠীর সুর', subtitle: 'Maha Shasthi — Durga Puja Collection', emoji: '🪔' },
  'durga-puja-saptami': { title: 'মহা সপ্তমীর সুর', subtitle: 'Maha Saptami — Durga Puja Collection', emoji: '🪔' },
  'durga-puja-ashtami': { title: 'মহা অষ্টমীর সুর', subtitle: 'Maha Ashtami — Durga Puja Collection', emoji: '🪔' },
  'durga-puja-navami': { title: 'মহা নবমীর সুর', subtitle: 'Maha Navami — Durga Puja Collection', emoji: '🪔' },
  'durga-puja-dashami': { title: 'বিজয়া দশমীর সুর', subtitle: 'Maha Dashami — Durga Puja Collection', emoji: '🏵️' },
  'lakshmi-puja': { title: 'লক্ষ্মী পূজার সুর', subtitle: 'Kojagari Lakshmi Puja Collection', emoji: '🪷' },
  'kali-puja': { title: 'কালী পূজার সুর', subtitle: 'Kali Puja Devotional Collection', emoji: '🕉️' },
  'jagaddhatri-puja': { title: 'জগদ্ধাত্রী পূজার সুর', subtitle: 'Jagaddhatri Puja Devotional Collection', emoji: '🌸' },
};

/**
 * Get playlist by festival ID.
 * Returns the playlist object if configured, or null if no music is assigned.
 */
export function getPlaylistForFestival(festivalId) {
  if (!festivalId) return null;

  const targetPlaylistId = festivalPlaylistMap[festivalId];
  if (!targetPlaylistId) return null;

  const playlist = musicPlaylists[targetPlaylistId];
  if (!playlist) return null;

  const display = festivalDisplayTitles[festivalId] || {};

  return {
    ...playlist,
    festivalId,
    targetPlaylistId,
    title: display.title || playlist.title,
    subtitle: display.subtitle || playlist.subtitle,
    festivalEmoji: display.emoji || playlist.festivalEmoji,
    key: festivalId,
  };
}

/**
 * Check if a festival has an assigned playlist
 */
export function hasPlaylistForFestival(festivalId) {
  return Boolean(festivalPlaylistMap[festivalId]);
}

export const festivalPlaylists = musicPlaylists;
export default musicPlaylists;
`;

fs.writeFileSync('src/data/festivalPlaylists.js', output.trim() + '\n');
console.log('✅ Generated festivalPlaylists.js with EXACT FULL YouTube titles.');
