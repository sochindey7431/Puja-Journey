import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { festivals } from '../../data/festivals.js';
import { getPlaylistForFestival, hasPlaylistForFestival } from '../../data/festivalPlaylists.js';
import {
  Play, Pause, SkipBack, SkipForward,
  ListMusic, X, ChevronDown, Music2,
  Volume2, VolumeX, Video, AlertCircle, Sparkles,
} from 'lucide-react';

// Format seconds into MM:SS
function formatTime(s) {
  if (!s || isNaN(s) || !isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

// Animated equalizer bars
function Equalizer({ isPlaying }) {
  const heights = [4, 12, 8, 14, 6, 10];
  return (
    <div className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`block w-[2.5px] rounded-full bg-puja-gold ${isPlaying ? 'music-eq-bar' : ''}`}
          style={{
            height: isPlaying ? undefined : `${h}px`,
            animationDelay: isPlaying ? `${i * 0.12}s` : '0s',
          }}
        />
      ))}
    </div>
  );
}

// Single track row in playlist drawer
function TrackRow({ track, index, isActive, isPlaying, onSelect }) {
  const title = track.titleBn || track.title;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(index);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group
        ${isActive
          ? 'bg-puja-gold/15 border-l-2 border-puja-gold text-puja-gold'
          : 'border-l-2 border-transparent hover:bg-white/5 text-puja-ivory/70 hover:text-puja-ivory'
        }`}
      aria-label={`Play ${track.title}`}
      aria-current={isActive ? 'true' : undefined}
    >
      {/* Index or Equalizer */}
      <span className="w-6 flex-shrink-0 flex items-center justify-center">
        {isActive
          ? <Equalizer isPlaying={isPlaying} />
          : <span className="text-[11px] text-puja-ivory/30 tabular-nums font-mono">{String(index + 1).padStart(2, '0')}</span>
        }
      </span>

      {/* Thumbnail */}
      <img
        src={track.thumbnail || `https://img.youtube.com/vi/${track.youtubeId || track.id}/hqdefault.jpg`}
        alt={track.title}
        className="w-10 h-10 object-cover rounded border border-puja-gold/15 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; }}
      />

      {/* Title & Artist */}
      <div className="flex-1 min-w-0">
        <p
          title={title}
          className={`text-sm leading-tight truncate bn-text ${isActive ? 'text-puja-gold font-medium' : 'text-puja-ivory/80 group-hover:text-puja-ivory'}`}
        >
          {title}
        </p>
        <p title={track.artist} className="text-[11px] text-puja-ivory/35 truncate mt-0.5">{track.artist}</p>
      </div>

      {/* Play indicator */}
      {!isActive && (
        <Play size={13} className="flex-shrink-0 text-puja-gold/0 group-hover:text-puja-gold/70 transition-colors" />
      )}
    </button>
  );
}

export default function FloatingMusicPlayer() {
  const {
    currentPlaylistKey,
    currentPlaylist,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    isBuffering,
    isLoading,
    currentTime,
    duration,
    isPlayerOpen,
    isPlaylistOpen,
    exploringFestivalId,
    loadFestivalMusic,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    seek,
    closePlayer,
    togglePlaylist,
    toggleVideo,
    isVideoExpanded,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
    errorMessage,
    dismissError,
  } = useMusicContext();

  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const progressBarRef = useRef(null);
  const durationRef = useRef(duration);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  // Window-level move and up handlers for smooth seeking without page reload or dropped events
  const calculateSeekTime = useCallback((clientX) => {
    if (!progressBarRef.current || !durationRef.current || durationRef.current <= 0 || isNaN(durationRef.current)) return 0;
    const rect = progressBarRef.current.getBoundingClientRect();
    if (!rect.width || rect.width <= 0) return 0;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const time = ratio * durationRef.current;
    return (typeof time === 'number' && isFinite(time) && !isNaN(time) && time >= 0) ? time : 0;
  }, []);

  const handleSeekStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!durationRef.current || durationRef.current <= 0) return;

    setIsSeeking(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const target = calculateSeekTime(clientX);
    setSeekValue(target);

    const onMove = (moveEvent) => {
      moveEvent.preventDefault();
      const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const newTarget = calculateSeekTime(currentX);
      setSeekValue(newTarget);
    };

    const onEnd = (endEvent) => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);

      const endX = endEvent.changedTouches ? endEvent.changedTouches[0].clientX : endEvent.clientX;
      const finalTarget = typeof endX === 'number' ? calculateSeekTime(endX) : target;
      if (typeof finalTarget === 'number' && !isNaN(finalTarget) && isFinite(finalTarget)) {
        seek(finalTarget);
      }
      setIsSeeking(false);
    };

    window.addEventListener('mousemove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }, [calculateSeekTime, seek]);

  if (!isPlayerOpen || !currentPlaylist) return null;

  // Track exploration helper
  const exploringFestival = exploringFestivalId
    ? festivals.find(f => f.id === exploringFestivalId)
    : null;

  const exploringHasMusic = exploringFestivalId ? hasPlaylistForFestival(exploringFestivalId) : false;
  const exploringPlaylist = exploringFestivalId ? getPlaylistForFestival(exploringFestivalId) : null;

  const isDifferentFromExploring =
    exploringFestivalId &&
    exploringHasMusic &&
    exploringPlaylist &&
    currentPlaylist &&
    currentPlaylist.targetPlaylistId !== exploringPlaylist.targetPlaylistId;

  const activeTime = isSeeking ? seekValue : currentTime;
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (activeTime / duration) * 100)) : 0;

  const trackTitle = currentTrack?.titleBn || currentTrack?.title || 'Predefined Festival Track';
  const festivalTitle = currentPlaylist.title || 'Devotional Music';

  // Configured festival keys for switching in drawer
  const availablePlaylists = [
    { key: 'saraswati-puja', label: 'সরস্বতী পূজা', emoji: '📿' },
    { key: 'shivaratri', label: 'মহাশিবরাত্রি', emoji: '🔱' },
    { key: 'dol-purnima', label: 'দোল পূর্ণিমা', emoji: '🌸' },
    { key: 'rath-yatra', label: 'রথযাত্রা', emoji: '🏛️' },
    { key: 'janmashtami', label: 'জন্মাষ্টমী', emoji: '🦚' },
    { key: 'ganesh-chaturthi', label: 'গণেশ চতুর্থী', emoji: '🐘' },
    { key: 'vishwakarma-puja', label: 'বিশ্বকর্মা পূজা', emoji: '🔨' },
    { key: 'mahalaya', label: 'মহালয়া', emoji: '🌑' },
    { key: 'durga-puja-shasthi', label: 'দুর্গাপূজা', emoji: '🪔' },
    { key: 'lakshmi-puja', label: 'লক্ষ্মী পূজা', emoji: '🪷' },
    { key: 'kali-puja', label: 'কালী পূজা', emoji: '🕉️' },
    { key: 'jagaddhatri-puja', label: 'জগদ্ধাত্রী পূজা', emoji: '🌸' },
  ];

  return (
    <>
      {/* ── Error Banner Toast ──────────────────────────────────── */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[94px] left-1/2 -translate-x-1/2 z-[520] max-w-md w-[92vw] px-4 py-3 rounded-lg bg-red-950/90 border border-red-500/40 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-3 text-red-200 text-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              <p className="truncate font-medium">{errorMessage}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  nextTrack();
                }}
                className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded text-[11px] font-semibold tracking-wider uppercase transition-colors"
              >
                Next
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  dismissError();
                }}
                className="p-1 hover:text-white transition-colors"
                aria-label="Dismiss error"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Playlist Drawer (Bottom Sheet) ────────────────────────── */}
      <AnimatePresence>
        {isPlaylistOpen && (
          <motion.div
            key="playlist-panel"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed bottom-[84px] left-1/2 -translate-x-1/2 z-[490]
              w-[94vw] max-w-lg max-h-[62vh] overflow-hidden
              flex flex-col
              bg-[rgba(12,9,5,0.98)] border border-puja-gold/25
              backdrop-blur-2xl rounded-t-xl"
            style={{ boxShadow: '0 -10px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212,160,23,0.15)' }}
            aria-label="Festival playlist panel"
            role="region"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-puja-gold/15 bg-puja-gold/5 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl" aria-hidden="true">{currentPlaylist.festivalEmoji || '🪔'}</span>
                <div className="min-w-0">
                  <p className="bn-text text-base text-puja-gold leading-tight truncate font-semibold">
                    {currentPlaylist.title}
                  </p>
                  <p className="text-xs text-puja-ivory/40 truncate">
                    {currentPlaylist.subtitle} · {currentPlaylist.tracks?.length || 0} tracks
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  togglePlaylist();
                }}
                className="text-puja-ivory/40 hover:text-puja-gold p-1.5 rounded transition-colors"
                aria-label="Close playlist"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Festival Switcher Bar inside Playlist Drawer */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-black/40 overflow-x-auto scrollbar-thin border-b border-puja-gold/10 flex-shrink-0">
              {availablePlaylists.map(item => {
                const targetPl = getPlaylistForFestival(item.key);
                const isCur = currentPlaylist?.targetPlaylistId === targetPl?.targetPlaylistId;
                return (
                  <button
                    type="button"
                    key={item.key}
                    onClick={(e) => {
                      e.preventDefault();
                      loadFestivalMusic(item.key, true);
                    }}
                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                      isCur
                        ? 'bg-puja-gold text-puja-black font-semibold shadow-sm'
                        : 'bg-white/5 text-puja-ivory/50 hover:text-puja-gold hover:bg-white/10'
                    }`}
                  >
                    {item.emoji} {item.label}
                  </button>
                );
              })}
            </div>

            {/* Track List */}
            <div className="overflow-y-auto flex-1 divide-y divide-puja-gold/8 scrollbar-thin py-1">
              {currentPlaylist.tracks?.map((track, i) => (
                <TrackRow
                  key={(track.youtubeId || track.id) + '-' + i}
                  track={track}
                  index={i}
                  isActive={i === currentTrackIndex}
                  isPlaying={isPlaying && i === currentTrackIndex}
                  onSelect={(idx) => selectTrack(idx)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Floating Music Player Bar ────────────────────────── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="fixed bottom-0 left-0 right-0 z-[500]
          bg-[rgba(10,8,5,0.97)] border-t border-puja-gold/30
          backdrop-blur-2xl"
        style={{ boxShadow: '0 -4px 35px rgba(0,0,0,0.85), 0 0 25px rgba(212,160,23,0.15)' }}
        aria-label="Puja Journey custom music player"
        role="region"
      >
        {/* Top Progress Scrub Bar (Clickable & Draggable with window listeners) */}
        <div
          ref={progressBarRef}
          onMouseDown={handleSeekStart}
          onTouchStart={handleSeekStart}
          className="group relative w-full h-1.5 bg-puja-gold/15 hover:h-2.5 transition-all duration-200 cursor-pointer select-none"
          role="slider"
          aria-label="Music progress seek bar"
          aria-valuenow={Math.round(activeTime)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration || 100)}
        >
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-puja-gold-light via-puja-gold to-amber-400 relative transition-[width] duration-75 pointer-events-none"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Scrubber Knob */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-puja-gold border border-black opacity-0 group-hover:opacity-100 shadow-md transition-opacity" />
          </div>
        </div>

        {/* Contextual "Now exploring" Banner */}
        {exploringFestival && isDifferentFromExploring && (
          <div className="px-4 py-1 bg-puja-gold/10 border-b border-puja-gold/10 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-puja-ivory/40">Now exploring:</span>
              <span className="bn-text text-xs text-puja-gold truncate font-medium">{exploringFestival.nameBn}</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                loadFestivalMusic(exploringFestivalId, true);
              }}
              className="text-[11px] text-puja-gold hover:text-puja-gold-light tracking-wider font-medium uppercase transition-colors px-2 py-0.5 rounded bg-puja-gold/15 hover:bg-puja-gold/25"
              aria-label={`Play ${exploringFestival.nameEn} music`}
            >
              ▶ Play {exploringFestival.nameEn}
            </button>
          </div>
        )}

        {/* Controls Container */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-2.5">
          
          {/* Left: Thumbnail, Track & Festival Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 max-w-[48%] sm:max-w-xs md:max-w-sm">
            <div className="relative flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded border border-puja-gold/30 overflow-hidden bg-black shadow-md">
              {currentTrack?.thumbnail ? (
                <img
                  src={currentTrack.thumbnail}
                  alt={trackTitle}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-puja-gold/10">
                  <Music2 size={18} className="text-puja-gold" />
                </div>
              )}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/45 flex items-end justify-center pb-1">
                  <Equalizer isPlaying={isPlaying} />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs" aria-hidden="true">{currentPlaylist.festivalEmoji || '🪔'}</span>
                <p className="text-[10px] sm:text-xs text-puja-gold/80 truncate font-semibold uppercase tracking-wider">
                  {festivalTitle}
                </p>
              </div>
              <p
                title={trackTitle}
                className="bn-text text-xs sm:text-sm text-puja-ivory font-medium leading-tight truncate mt-0.5"
              >
                {trackTitle}
              </p>
              <p className="text-[10px] text-puja-ivory/40 truncate hidden xs:block">
                {currentTrack?.artist || currentPlaylist.subtitle}
              </p>
            </div>
          </div>

          {/* Center: Playback Controls & Time Display */}
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Previous */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  prevTrack();
                }}
                className="p-2 text-puja-ivory/60 hover:text-puja-gold transition-colors rounded active:scale-95"
                title="Previous Track"
                aria-label="Previous track"
              >
                <SkipBack size={18} />
              </button>

              {/* Play / Pause with Glow */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  togglePlay();
                }}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full
                  bg-gradient-to-br from-puja-gold-light to-puja-gold text-puja-black font-bold
                  transition-transform active:scale-95 shadow-[0_0_18px_rgba(212,160,23,0.45)] hover:shadow-[0_0_24px_rgba(212,160,23,0.6)]"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isLoading || isBuffering ? (
                  <Sparkles size={18} className="animate-spin text-puja-black" />
                ) : isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  nextTrack();
                }}
                className="p-2 text-puja-ivory/60 hover:text-puja-gold transition-colors rounded active:scale-95"
                title="Next Track"
                aria-label="Next track"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Time Indicator */}
            <div className="flex items-center gap-1 text-[10px] text-puja-ivory/40 font-mono tracking-tight tabular-nums">
              <span>{formatTime(activeTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Extra Controls (Volume, Video toggle, Playlist, Close) */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            
            {/* Volume Control (Desktop / Tablet) */}
            <div className="relative hidden md:flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMute();
                }}
                className="p-1.5 text-puja-ivory/60 hover:text-puja-gold transition-colors rounded"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-16 md:w-20 accent-puja-gold h-1 bg-puja-gold/20 rounded cursor-pointer"
                aria-label="Volume slider"
              />
            </div>

            {/* Video View Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleVideo();
              }}
              className={`p-2 rounded transition-colors hidden sm:flex ${
                isVideoExpanded
                  ? 'text-puja-gold bg-puja-gold/15'
                  : 'text-puja-ivory/60 hover:text-puja-gold'
              }`}
              title="Toggle Video Screen"
              aria-label="Toggle video screen"
            >
              <Video size={17} />
            </button>

            {/* Playlist Drawer Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                togglePlaylist();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all ${
                isPlaylistOpen
                  ? 'bg-puja-gold/25 text-puja-gold border border-puja-gold/50'
                  : 'bg-white/5 text-puja-ivory/70 hover:text-puja-gold hover:bg-white/10 border border-puja-gold/20'
              }`}
              title="Open Playlist"
              aria-label="Open playlist"
              aria-expanded={isPlaylistOpen}
            >
              <ListMusic size={17} />
              <span className="text-xs hidden sm:inline font-medium">
                {currentPlaylist.tracks?.length || 0}
              </span>
            </button>

            {/* Close Player */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                closePlayer();
              }}
              className="p-2 text-puja-ivory/40 hover:text-puja-ivory transition-colors rounded ml-0.5"
              title="Close Player"
              aria-label="Close music player"
            >
              <X size={17} />
            </button>
          </div>

        </div>
      </motion.div>
    </>
  );
}
