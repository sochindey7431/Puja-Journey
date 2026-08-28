/**
 * PUJA JOURNEY — Music System Configuration
 *
 * Official YouTube IFrame Player API music player configuration.
 */

// Global enable flag for the YouTube music player system
export const ENABLE_YOUTUBE_MUSIC = true;

// Default initial volume (0 to 100)
export const DEFAULT_MUSIC_VOLUME = 80;

// Auto-advance to next track when the current video ends
export const AUTO_ADVANCE_PLAYLIST = true;

// Privacy-Enhanced Mode is enabled via the 'host' option in useMusicPlayer.js.
// The player embed is served from https://www.youtube-nocookie.com instead of
// https://www.youtube.com. This is the official YouTube IFrame API approach.
// Advertisements are NOT blocked — they still function normally.
