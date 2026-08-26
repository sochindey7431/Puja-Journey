/**
 * PUJA JOURNEY — FestivalMusicPlayer (with LocalMusicContext sync)
 *
 * A premium, embedded music player inside each FestivalSection.
 * Reads local MP3s from /public/music/<festivalId>/manifest.json
 * and pushes state to LocalMusicContext for the FloatingLocalPlayer.
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Shuffle, Repeat,
  ListMusic, ChevronDown, Music, AlertCircle,
} from 'lucide-react';
import { useLocalMusic, fileToTitle } from '../../hooks/useLocalMusic.js';
import { useLocalMusicContext } from '../../contexts/LocalMusicContext.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

function fmt(s) {
  if (!s || isNaN(s) || !isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function FestivalMusicPlayer({ festival }) {
  const { isBn } = useLanguage();
  const player = useLocalMusic(festival.id);
  const ctx = useLocalMusicContext();
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const accent      = festival.theme?.accent || '#d4a017';
  const accentLight = festival.theme?.accentLight || '#f0c040';
  const bg          = festival.theme?.bg || '#0a0805';

  const playlistTitle = isBn
    ? `${festival.nameBn} প্লেলিস্ট`
    : `${festival.nameEn} Playlist`;

  // ── Register controls with context & push state ─────────────────
  useEffect(() => {
    ctx.registerPlayer({
      togglePlay: player.togglePlay,
      prevTrack:  player.prevTrack,
      nextTrack:  player.nextTrack,
      seek:       player.seek,
    });
  }, [player.togglePlay, player.prevTrack, player.nextTrack, player.seek, ctx]);

  useEffect(() => {
    ctx.pushState({
      currentTrack:  player.currentTrack,
      isPlaying:     player.isPlaying,
      currentTime:   player.currentTime,
      duration:      player.duration,
      festivalName:  festival.nameEn,
      festivalEmoji: festival.emoji,
      accentColor:   accent,
      festivalImage: festival.image || null,
    });
  }, [
    player.currentTrack, player.isPlaying,
    player.currentTime, player.duration,
    festival.nameEn, festival.emoji, accent, festival.image, ctx,
  ]);

  // ── Empty / loading states ───────────────────────────────────────
  if (player.loading) {
    return (
      <div className="festival-music-player-wrap">
        <div className="fmp-skeleton" style={{ borderColor: `${accent}22` }}>
          <Music size={16} style={{ color: accent, opacity: 0.4 }} />
          <span style={{ color: `${accentLight}60`, fontSize: '0.75rem' }}>
            {isBn ? 'সঙ্গীত লোড হচ্ছে…' : 'Loading music…'}
          </span>
        </div>
      </div>
    );
  }

  if (!player.tracks.length) {
    return (
      <div className="festival-music-player-wrap">
        <div className="fmp-empty" style={{ borderColor: `${accent}20` }}>
          <div className="fmp-empty-icon" style={{ color: `${accent}50` }}>
            <Music size={22} />
          </div>
          <div>
            <p className="fmp-empty-title" style={{ color: `${accentLight}70` }}>
              {isBn ? '🎵 কোনো সঙ্গীত যোগ করা হয়নি' : '🎵 No music added yet'}
            </p>
            <p className="fmp-empty-hint">
              {isBn
                ? `MP3 ফাইল রাখুন: public/music/${festival.id}/`
                : `Add MP3 files to: public/music/${festival.id}/`}
            </p>
            <p className="fmp-empty-hint2">
              {isBn
                ? 'তারপর চালান: node scripts/generate-music-manifest.js'
                : 'Then run: node scripts/generate-music-manifest.js'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const ct = player.currentTrack;
  const progressPct = player.duration > 0
    ? (player.currentTime / player.duration) * 100
    : 0;

  return (
    <div className="festival-music-player-wrap">
      <motion.div
        className="fmp-card"
        style={{
          '--fmp-accent': accent,
          '--fmp-accent-light': accentLight,
          '--fmp-bg': bg,
          borderColor: `${accent}28`,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="fmp-header">
          <div className="fmp-header-left">
            <span className="fmp-icon" style={{ color: accent }}>{festival.emoji}</span>
            <div>
              <p className="fmp-playlist-label">
                {isBn ? 'সঙ্গীত · ' : 'Music · '}
                <span style={{ color: accentLight }}>
                  {player.tracks.length} {isBn ? 'গান' : 'tracks'}
                </span>
              </p>
              <p className="fmp-playlist-title">{playlistTitle}</p>
            </div>
          </div>
          <button
            className="fmp-minimize-btn"
            onClick={() => setMinimized(m => !m)}
            aria-label={minimized ? 'Expand player' : 'Minimize player'}
            style={{ color: `${accent}80` }}
          >
            <motion.div animate={{ rotate: minimized ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={16} />
            </motion.div>
          </button>
        </div>

        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              {/* ── Artwork + track info ──────────────────────────── */}
              <div className="fmp-track-area">
                <div
                  className="fmp-artwork"
                  style={{
                    background: festival.image
                      ? `url(${festival.image}) center/cover`
                      : `linear-gradient(135deg, ${accent}33, ${accentLight}11)`,
                    borderColor: `${accent}30`,
                  }}
                >
                  {!festival.image && (
                    <Music size={28} style={{ color: `${accent}60` }} />
                  )}
                  {player.isPlaying && (
                    <motion.div
                      className="fmp-artwork-ring"
                      style={{ borderColor: accent }}
                      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    />
                  )}
                </div>

                <div className="fmp-track-info">
                  {player.trackError ? (
                    <div className="fmp-track-error">
                      <AlertCircle size={14} style={{ color: '#e74c3c' }} />
                      <span>{isBn ? 'ফাইল লোড হয়নি' : 'File failed to load'}</span>
                    </div>
                  ) : (
                    <>
                      <p className="fmp-track-num" style={{ color: `${accent}60` }}>
                        {isBn ? 'গান' : 'Track'} {player.trackIndex + 1} / {player.tracks.length}
                      </p>
                      <p className="fmp-track-title" title={ct?.title}>
                        {ct?.title || fileToTitle(ct?.filename) || '—'}
                      </p>
                      {ct?.artist && (
                        <p className="fmp-track-artist">{ct.artist}</p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* ── Progress bar ─────────────────────────────────── */}
              <div className="fmp-progress-area">
                <span className="fmp-time">{fmt(player.currentTime)}</span>
                <div
                  className="fmp-progress-track"
                  style={{ '--fmp-prog': `${progressPct}%`, '--fmp-accent': accent }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    player.seek(Math.max(0, Math.min(ratio * player.duration, player.duration)));
                  }}
                  role="slider"
                  aria-label="Seek"
                  aria-valuenow={Math.round(player.currentTime)}
                  aria-valuemin={0}
                  aria-valuemax={Math.round(player.duration)}
                >
                  <div className="fmp-progress-fill" />
                  <div className="fmp-progress-thumb" />
                </div>
                <span className="fmp-time">{fmt(player.duration)}</span>
              </div>

              {/* ── Controls ────────────────────────────────────── */}
              <div className="fmp-controls">
                <button
                  className={`fmp-ctrl-btn fmp-ctrl-sm ${player.isShuffle ? 'fmp-active' : ''}`}
                  onClick={player.toggleShuffle}
                  aria-label="Shuffle"
                  title="Shuffle"
                  style={player.isShuffle ? { color: accentLight } : {}}
                >
                  <Shuffle size={14} />
                </button>

                <button
                  className="fmp-ctrl-btn fmp-ctrl-md"
                  onClick={player.prevTrack}
                  aria-label="Previous track"
                  title="Previous"
                >
                  <SkipBack size={18} />
                </button>

                <button
                  className="fmp-play-btn"
                  style={{ background: accent, boxShadow: `0 0 20px ${accent}44` }}
                  onClick={player.togglePlay}
                  aria-label={player.isPlaying ? 'Pause' : 'Play'}
                >
                  <AnimatePresence mode="wait">
                    {player.isPlaying ? (
                      <motion.span key="pause"
                        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Pause size={20} fill="currentColor" />
                      </motion.span>
                    ) : (
                      <motion.span key="play"
                        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Play size={20} fill="currentColor" style={{ marginLeft: 2 }} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <button
                  className="fmp-ctrl-btn fmp-ctrl-md"
                  onClick={player.nextTrack}
                  aria-label="Next track"
                  title="Next"
                >
                  <SkipForward size={18} />
                </button>

                <button
                  className={`fmp-ctrl-btn fmp-ctrl-sm ${player.isRepeat ? 'fmp-active' : ''}`}
                  onClick={player.toggleRepeat}
                  aria-label="Repeat"
                  title="Repeat"
                  style={player.isRepeat ? { color: accentLight } : {}}
                >
                  <Repeat size={14} />
                </button>
              </div>

              {/* ── Bottom: volume + playlist toggle ─────────────── */}
              <div className="fmp-bottom-row">
                <div className="fmp-volume-row">
                  <button
                    className="fmp-ctrl-btn"
                    onClick={player.toggleMute}
                    aria-label={player.isMuted ? 'Unmute' : 'Mute'}
                    style={{ color: `${accent}80` }}
                  >
                    {player.isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <input
                    type="range"
                    min="0" max="1" step="0.02"
                    value={player.isMuted ? 0 : player.volume}
                    onChange={e => player.changeVolume(parseFloat(e.target.value))}
                    className="fmp-volume-slider"
                    style={{ '--fmp-accent': accent }}
                    aria-label="Volume"
                  />
                </div>

                <button
                  className="fmp-playlist-btn"
                  onClick={() => setPlaylistOpen(o => !o)}
                  aria-label="Toggle playlist"
                  style={{ color: playlistOpen ? accentLight : `${accent}70` }}
                >
                  <ListMusic size={14} />
                  <span>{isBn ? 'প্লেলিস্ট' : 'Playlist'}</span>
                </button>
              </div>

              {/* ── Playlist panel ──────────────────────────────── */}
              <AnimatePresence>
                {playlistOpen && (
                  <motion.div
                    className="fmp-playlist-panel"
                    style={{ borderColor: `${accent}18` }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="fmp-playlist-header" style={{ color: `${accent}70` }}>
                      {playlistTitle}
                    </p>
                    <ul className="fmp-playlist-list">
                      {player.tracks.map((track, i) => {
                        const isActive = i === player.trackIndex;
                        return (
                          <li key={track.filename || i}>
                            <button
                              className={`fmp-playlist-item ${isActive ? 'fmp-playlist-active' : ''}`}
                              style={isActive
                                ? { borderLeft: `2px solid ${accent}`, color: accentLight }
                                : { borderLeft: '2px solid transparent' }
                              }
                              onClick={() => player.selectTrack(i)}
                              aria-label={`Play ${track.title}`}
                              aria-current={isActive}
                            >
                              <span className="fmp-playlist-num" style={{ color: `${accent}50` }}>
                                {isActive && player.isPlaying
                                  ? <span className="fmp-now-playing-dot" style={{ background: accent }} />
                                  : String(i + 1).padStart(2, '0')
                                }
                              </span>
                              <span className="fmp-playlist-name" title={track.title}>
                                {track.title || fileToTitle(track.filename)}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
