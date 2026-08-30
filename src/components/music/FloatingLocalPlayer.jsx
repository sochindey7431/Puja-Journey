/**
 * PUJA JOURNEY — FloatingLocalPlayer
 *
 * A compact floating player that appears at bottom-right once a local
 * MP3 track has been loaded and is playing. It uses a shared
 * LocalMusicContext so the FestivalMusicPlayer and this mini-player
 * always stay in sync.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, X, ChevronUp, ChevronDown, Music } from 'lucide-react';
import { useState } from 'react';
import { useLocalMusicContext } from '../../contexts/LocalMusicContext.jsx';
import { fileToTitle } from '../../hooks/useLocalMusic.js';

/** Format seconds as M:SS */
function fmt(s) {
  if (!s || isNaN(s) || !isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function FloatingLocalPlayer() {
  const ctx = useLocalMusicContext();
  const [minimized, setMinimized] = useState(false);

  // Only show when player is open and there is an active festival / track
  if (!ctx.isPlayerOpen || (!ctx.currentTrack && !ctx.isPlaying && !ctx.isLoading)) return null;

  const {
    currentTrack, isPlaying, isLoading, currentTime, duration,
    festivalName, festivalNameBn, festivalEmoji, accentColor, festivalImage,
    togglePlay, prevTrack, nextTrack, seek, dismiss,
  } = ctx;

  const accent = accentColor || '#d4a017';
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const title = currentTrack?.title || fileToTitle(currentTrack?.filename) || (isLoading ? 'Loading track…' : '—');

  return (
    <AnimatePresence>
      <motion.div
        key="floating-local-player"
        className="flp-wrap"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        role="region"
        aria-label="Mini music player"
      >
        <div
          className="flp-card"
          style={{ '--flp-accent': accent, borderColor: `${accent}30` }}
        >
          {/* ── Top bar ─────────────────────────────────────────── */}
          <div className="flp-topbar">
            <div className="flp-festival-tag" style={{ color: `${accent}90` }}>
              <span>{festivalEmoji || '🎵'}</span>
              <span className="flp-festival-name">{festivalName}</span>
            </div>
            <div className="flp-topbar-actions">
              <button
                className="flp-icon-btn"
                onClick={() => setMinimized(m => !m)}
                aria-label={minimized ? 'Expand player' : 'Minimize player'}
              >
                {minimized ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
              <button
                className="flp-icon-btn"
                onClick={dismiss}
                aria-label="Close player"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {!minimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}
              >
                {/* ── Track info ──────────────────────────────────── */}
                <div className="flp-track-row">
                  {/* Tiny artwork */}
                  <div
                    className="flp-mini-art"
                    style={{
                      background: festivalImage
                        ? `url(${festivalImage}) center/cover`
                        : `linear-gradient(135deg, ${accent}33, ${accent}11)`,
                      borderColor: `${accent}40`,
                    }}
                  >
                    {!festivalImage && <Music size={12} style={{ color: `${accent}60` }} />}
                  </div>
                  <div className="flp-track-text">
                    <p className="flp-track-title" title={title}>{title}</p>
                    <p className="flp-track-time">{fmt(currentTime)} / {fmt(duration)}</p>
                  </div>
                </div>

                {/* ── Progress ────────────────────────────────────── */}
                <div
                  className="flp-progress"
                  style={{ '--flp-prog': `${progressPct}%`, '--flp-accent': accent }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    seek(Math.max(0, Math.min(ratio * duration, duration)));
                  }}
                  role="slider"
                  aria-label="Seek"
                  aria-valuenow={Math.round(currentTime)}
                  aria-valuemin={0}
                  aria-valuemax={Math.round(duration)}
                >
                  <div className="flp-progress-fill" />
                </div>

                {/* ── Controls ────────────────────────────────────── */}
                <div className="flp-controls">
                  <button
                    className="flp-ctrl"
                    onClick={prevTrack}
                    aria-label="Previous track"
                  >
                    <SkipBack size={16} />
                  </button>
                  <button
                    className="flp-play-btn"
                    style={{ background: accent, boxShadow: `0 0 12px ${accent}55` }}
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying
                      ? <Pause size={15} fill="currentColor" />
                      : <Play size={15} fill="currentColor" style={{ marginLeft: 1 }} />
                    }
                  </button>
                  <button
                    className="flp-ctrl"
                    onClick={nextTrack}
                    aria-label="Next track"
                  >
                    <SkipForward size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
