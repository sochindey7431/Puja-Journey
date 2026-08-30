/**
 * PUJA JOURNEY — Local Music Manifest Helper
 *
 * Generated automatically by scripts/generate-music-manifest.js.
 * Provides instant, zero-latency checks for whether a festival has
 * local audio tracks available.
 */
import manifestData from './localMusicManifest.json';

/**
 * Check whether a festival has at least one local audio track.
 * @param {string} festivalId
 * @returns {boolean}
 */
export function hasLocalMusicForFestival(festivalId) {
  if (!festivalId || !manifestData) return false;
  return Boolean(manifestData[festivalId]?.hasMusic);
}

/**
 * Get track count for a festival.
 * @param {string} festivalId
 * @returns {number}
 */
export function getLocalTrackCountForFestival(festivalId) {
  if (!festivalId || !manifestData) return 0;
  return manifestData[festivalId]?.trackCount || 0;
}

/**
 * Get full overview data.
 */
export function getLocalMusicManifest() {
  return manifestData || {};
}

export default manifestData;
