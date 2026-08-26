/**
 * PUJA JOURNEY — Music System Configuration
 *
 * Use this file to toggle Spotify or the Local/Cloud music player,
 * and to update the Spotify playlist URL for Mahalaya.
 */

// ── 1. ON/OFF FEATURE FLAGS ─────────────────────────────────────────

// Set to true to show the Spotify player on the Mahalaya page
export const ENABLE_SPOTIFY_MAHALAYA = true;

// Set to true to enable your custom local MP3 / cloud music player system
// Set to false to temporarily hide it without deleting any files/code
export const ENABLE_LOCAL_MUSIC = false;


// ── 2. SPOTIFY ALBUM / PLAYLIST URL FOR MAHALAYA ───────────────────

/**
 * PASTE YOUR SPOTIFY ALBUM OR PLAYLIST URL HERE.
 * Currently set to: "Mahalayar Gaan — Supriti Ghosh"
 */
export const MAHALAYA_SPOTIFY_URL = "https://open.spotify.com/album/2yU7DO6QLIgHallIfJe1gk?si=MADGNpI5RSivk3XYTZvpiw";

// Alias for convenience
export const MAHALAYA_SPOTIFY_PLAYLIST_URL = MAHALAYA_SPOTIFY_URL;


// ── 3. EMBED URL CONVERTER HELPER ───────────────────────────────────

/**
 * Converts any standard Spotify web link or URI into an official Spotify embed URL.
 */
export function getSpotifyEmbedUrl(urlOrUri) {
  if (!urlOrUri || urlOrUri === 'YOUR_MAHALAYA_SPOTIFY_PLAYLIST_URL') {
    return '';
  }

  // Already an embed URL
  if (urlOrUri.includes('open.spotify.com/embed/')) {
    return urlOrUri.includes('theme=0') ? urlOrUri : `${urlOrUri}${urlOrUri.includes('?') ? '&' : '?'}theme=0`;
  }

  // Spotify URI format: spotify:playlist:ID
  if (urlOrUri.startsWith('spotify:')) {
    const parts = urlOrUri.split(':');
    if (parts.length >= 3) {
      return `https://open.spotify.com/embed/${parts[1]}/${parts[2]}?utm_source=generator&theme=0`;
    }
  }

  // Standard open.spotify.com URL
  try {
    const url = new URL(urlOrUri);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const typeIdx = pathParts.findIndex(p =>
      ['playlist', 'track', 'album', 'artist', 'episode', 'show'].includes(p)
    );
    if (typeIdx !== -1 && pathParts[typeIdx + 1]) {
      const type = pathParts[typeIdx];
      const id = pathParts[typeIdx + 1].split('?')[0];
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
    }
  } catch (e) {
    const match = urlOrUri.match(/(playlist|track|album|artist|episode|show)[\/:]([a-zA-Z0-9]+)/);
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
    }
  }

  return urlOrUri;
}
