#!/usr/bin/env node
/**
 * PUJA JOURNEY — Audio Optimizer Script
 *
 * Optimizes audio files for fast web streaming (low bandwidth / mobile data / Facebook Lite).
 * - Converts/re-encodes to AAC (m4a) at web-friendly bitrate (~96kbps)
 * - Strips embedded cover artwork and unnecessary bloat (-vn -map_metadata -1)
 * - Applies faststart (-movflags +faststart) for immediate web playback
 * - Validates track duration to ensure zero loss or corruption
 *
 * Usage:
 *   node scripts/optimize-audio.js [festivalId]
 * Example:
 *   node scripts/optimize-audio.js mahalaya
 */

import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MUSIC_ROOT = path.resolve(__dirname, '../public/music');

function findFFmpeg() {
  if (ffmpegInstaller && ffmpegInstaller.path && fs.existsSync(ffmpegInstaller.path)) {
    return ffmpegInstaller.path;
  }
  // Try PATH
  try {
    const res = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
    if (res.status === 0) return 'ffmpeg';
  } catch (e) {}

  return null;
}

function getAudioDuration(ffmpegBin, filePath) {
  try {
    const res = spawnSync(ffmpegBin, ['-i', filePath], { encoding: 'utf8' });
    const output = (res.stderr || '') + (res.stdout || '');
    const match = output.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (match) {
      const hours = parseInt(match[1], 10);
      const mins = parseInt(match[2], 10);
      const secs = parseFloat(match[3]);
      return hours * 3600 + mins * 60 + secs;
    }
  } catch (e) {}
  return 0;
}

async function optimizeFolder(festivalId) {
  const targetDir = path.join(MUSIC_ROOT, festivalId);
  if (!fs.existsSync(targetDir)) {
    console.error(`❌ Folder not found: ${targetDir}`);
    return;
  }

  const ffmpegBin = findFFmpeg();
  if (!ffmpegBin) {
    console.error('❌ FFmpeg not found.');
    process.exit(1);
  }

  console.log(`Using FFmpeg: ${ffmpegBin}`);
  console.log(`Optimizing festival audio in: ${targetDir}\n`);

  const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.m4a') || f.endsWith('.mp3') || f.endsWith('.wav'));
  if (!files.length) {
    console.log(`No audio files found in ${festivalId}`);
    return;
  }

  const results = [];

  for (const filename of files) {
    const originalPath = path.join(targetDir, filename);
    const originalSize = fs.statSync(originalPath).size;
    const originalDuration = getAudioDuration(ffmpegBin, originalPath);

    const tempOutPath = path.join(targetDir, `__temp_opt_${filename}`);

    console.log(`🔄 Optimizing: "${filename}"`);
    console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB | Duration: ${(originalDuration / 60).toFixed(2)} min`);

    // Target 96kbps AAC with faststart & metadata clean
    const args = [
      '-y',
      '-i', originalPath,
      '-vn',                      // strip video/cover art
      '-c:a', 'aac',              // AAC codec
      '-b:a', '96k',              // 96 kbps
      '-ar', '44100',             // 44.1 kHz sample rate
      '-map_metadata', '-1',      // strip bloated tags
      '-movflags', '+faststart',  // web streaming faststart
      tempOutPath,
    ];

    const proc = spawnSync(ffmpegBin, args, { encoding: 'utf8' });
    if (proc.status !== 0) {
      console.error(`❌ Error optimizing ${filename}:`, proc.stderr);
      if (fs.existsSync(tempOutPath)) fs.unlinkSync(tempOutPath);
      continue;
    }

    const newSize = fs.statSync(tempOutPath).size;
    const newDuration = getAudioDuration(ffmpegBin, tempOutPath);

    // Validate that duration is within 1.5s of original
    const durationDiff = Math.abs(newDuration - originalDuration);
    if (originalDuration > 0 && durationDiff > 1.5) {
      console.error(`❌ Validation failed: Duration mismatch (orig: ${originalDuration}s vs new: ${newDuration}s)`);
      if (fs.existsSync(tempOutPath)) fs.unlinkSync(tempOutPath);
      continue;
    }

    // Replace original file
    fs.unlinkSync(originalPath);
    fs.renameSync(tempOutPath, originalPath);

    const reductionPct = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`   ✅ Optimized: ${(newSize / 1024 / 1024).toFixed(2)} MB (${reductionPct}% reduction)\n`);

    results.push({
      Filename: filename.length > 35 ? filename.slice(0, 32) + '...' : filename,
      'Original Size': `${(originalSize / 1024 / 1024).toFixed(2)} MB`,
      'Optimized Size': `${(newSize / 1024 / 1024).toFixed(2)} MB`,
      Reduction: `${reductionPct}%`,
      Duration: `${(newDuration / 60).toFixed(2)} min`,
    });
  }

  console.log('\n📊 OPTIMIZATION SUMMARY:\n');
  console.table(results);

  // Regenerate manifests
  console.log('\nRegenerating manifests...');
  execSync('node scripts/generate-music-manifest.js', { stdio: 'inherit' });
}

const targetFestival = process.argv[2] || 'mahalaya';
optimizeFolder(targetFestival);
