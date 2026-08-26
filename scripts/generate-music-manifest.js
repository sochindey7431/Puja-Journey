#!/usr/bin/env node
/**
 * PUJA JOURNEY — Music Manifest Generator
 *
 * Run this script after adding MP3 files to any festival folder:
 *   node scripts/generate-music-manifest.js
 *
 * It scans every public/music/<festival-id>/ folder and writes a
 * manifest.json listing all audio files. The React music player
 * fetches this manifest at runtime.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MUSIC_ROOT = path.resolve(__dirname, '../public/music');
const SUPPORTED = ['.mp3', '.m4a', '.wav', '.ogg', '.aac', '.flac', '.webm', '.mp4'];

/**
 * Convert a filename into a readable title.
 * e.g. "Ahang Rudre _ Sourendro-Soumyojit _ Durga Puja Song(M4A_128K).m4a"
 * → "Ahang Rudre - Sourendro Soumyojit - Durga Puja Song"
 */
function fileToTitle(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/\s*\([^)]*(?:128k|320k|kbps|m4a|mp3|official|audio|video|lyrics)[^)]*\)/gi, '') // strip (M4A_128K) etc
    .replace(/\s*\[[^\]]*(?:128k|320k|kbps|m4a|mp3|official|audio|video|lyrics)[^\]]*\]/gi, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/\s*-\s*/g, ' - ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

let total = 0;

const festivalDirs = fs.readdirSync(MUSIC_ROOT, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const festivalId of festivalDirs) {
  const dir = path.join(MUSIC_ROOT, festivalId);
  const allFiles = fs.readdirSync(dir);

  const audioFiles = allFiles
    .filter(f => SUPPORTED.includes(path.extname(f).toLowerCase()))
    .sort();

  const tracks = audioFiles.map((filename, index) => ({
    filename,
    title: fileToTitle(filename),
    url: `/music/${festivalId}/${filename}`,
    index,
  }));

  const manifest = {
    festival: festivalId,
    generated: new Date().toISOString(),
    tracks,
  };

  const outPath = path.join(dir, 'manifest.json');
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
  console.log(`✅  ${festivalId}: ${tracks.length} track(s)`);
  total += tracks.length;
}

console.log(`\n🎵  Done — ${festivalDirs.length} festival folders, ${total} total tracks.`);
console.log(`     Reload your browser to see the updated playlists.\n`);
