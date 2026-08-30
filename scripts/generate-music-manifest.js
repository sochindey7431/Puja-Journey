#!/usr/bin/env node
/**
 * PUJA JOURNEY — Music Manifest Generator
 *
 * Run this script after adding MP3 files to any festival folder:
 *   node scripts/generate-music-manifest.js
 *
 * It scans every public/music/<festival-id>/ folder and writes:
 * 1. public/music/<festival-id>/manifest.json
 * 2. public/music/festivals-manifest.json
 * 3. src/data/localMusicManifest.json
 *
 * Track URLs are properly URL-encoded per RFC 3986 so that
 * strict mobile WebViews (Instagram, Facebook Lite) can fetch
 * audio files without failing on raw spaces, parentheses, or Unicode.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MUSIC_ROOT = path.resolve(__dirname, '../public/music');
const SRC_DATA_DIR = path.resolve(__dirname, '../src/data');
const SUPPORTED = ['.mp3', '.m4a', '.wav', '.ogg', '.aac', '.flac', '.webm', '.mp4'];

/**
 * URL-encode filename per RFC 3986 while keeping the path segment clean.
 */
function encodePathSegment(filename) {
  return encodeURIComponent(filename)
    .replace(/['()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

/**
 * Generate a clean URL-safe slug recommendation for a filename.
 */
function recommendCleanSlug(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, ext);
  const cleanBase = base
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s*\[[^\]]*\]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${cleanBase || 'track'}${ext}`;
}

/**
 * Convert a filename into a readable display title.
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
let warningsCount = 0;
const festivalOverview = {};

const festivalDirs = fs.readdirSync(MUSIC_ROOT, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const festivalId of festivalDirs) {
  const dir = path.join(MUSIC_ROOT, festivalId);
  const allFiles = fs.readdirSync(dir);

  const audioFiles = allFiles
    .filter(f => SUPPORTED.includes(path.extname(f).toLowerCase()))
    .sort();

  const tracks = audioFiles.map((filename, index) => {
    const fullFilePath = path.join(dir, filename);
    const fileStat = fs.statSync(fullFilePath);
    const fileSizeMb = fileStat.size / 1024 / 1024;

    // Check if filename contains non-ASCII or special characters that benefit from a cleaner slug
    const hasSpecialChars = /[^a-zA-Z0-9._-]/.test(filename);
    if (hasSpecialChars) {
      const recommendation = recommendCleanSlug(filename);
      console.log(`   ⚠️  [Tip] "${filename}" has special characters. Suggested rename: "${recommendation}"`);
      warningsCount++;
    }

    // Flag large audio files (> 8 MB)
    if (fileSizeMb > 8.0) {
      console.log(`   📦  [Size Warning] "${filename}" is ${fileSizeMb.toFixed(1)} MB (> 8 MB). Consider running "node scripts/optimize-audio.js ${festivalId}" to optimize for low-bandwidth users.`);
    }

    const encodedFilename = encodePathSegment(filename);
    return {
      filename,
      title: fileToTitle(filename),
      url: `/music/${festivalId}/${encodedFilename}`,
      index,
    };
  });

  const manifest = {
    festival: festivalId,
    generated: new Date().toISOString(),
    tracks,
  };

  const outPath = path.join(dir, 'manifest.json');
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));

  festivalOverview[festivalId] = {
    trackCount: tracks.length,
    hasMusic: tracks.length > 0,
    tracks,
  };

  console.log(`✅  ${festivalId}: ${tracks.length} track(s)`);
  total += tracks.length;
}

// Write public/music/festivals-manifest.json
const publicOverviewPath = path.join(MUSIC_ROOT, 'festivals-manifest.json');
fs.writeFileSync(publicOverviewPath, JSON.stringify(festivalOverview, null, 2));

// Write src/data/localMusicManifest.json
if (!fs.existsSync(SRC_DATA_DIR)) {
  fs.mkdirSync(SRC_DATA_DIR, { recursive: true });
}
const srcOverviewPath = path.join(SRC_DATA_DIR, 'localMusicManifest.json');
fs.writeFileSync(srcOverviewPath, JSON.stringify(festivalOverview, null, 2));

console.log(`\n🎵  Done — ${festivalDirs.length} festival folders, ${total} total tracks.`);
if (warningsCount > 0) {
  console.log(`     (${warningsCount} filename recommendations printed for future optimization)`);
}
console.log(`     Updated public/music/festivals-manifest.json and src/data/localMusicManifest.json\n`);
