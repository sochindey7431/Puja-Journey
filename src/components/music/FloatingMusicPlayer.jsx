import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { festivals } from '../../data/festivals.js';
import { getPlaylistForFestival, festivalPlaylists } from '../../data/festivalPlaylists.js';
import {
  Play, Pause, SkipBack, SkipForward,
  ListMusic, X, ChevronDown, Music2,
  Volume2, VolumeX, Video, ChevronUp
} from 'lucide-react';

// Animated equalizer bars
function Equalizer({ isPlaying }) {
  const heights = [4, 12, 8, 14, 6, 10];
  return (
    <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`block w-[3px] rounded-full bg-puja-gold ${isPlaying ? 'music-eq-bar' : ''}`}
          style={{
            height: isPlaying ? undefined : `${h}px`,
            animationDelay: isPlaying ? `${i * 0.12}s` : '0s',
          }}
        />
      ))}
    </div>
  );
}

// Single track item in playlist drawer
function TrackRow({ track, index, isActive, isPlaying, onSelect }) {
  return (
    <button
      onClick={() => onSelect(index)}
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
          : <span className="text-[11px] text-puja-ivory/30 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        }
      </span>

      {/* Thumbnail */}
      <img
        src={track.thumbnail}
        alt={track.title}
        className="w-10 h-10 object-cover rounded border border-puja-gold/15 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; }}
      />

      {/* Title & Artist */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-tight truncate ${isActive ? 'text-puja-gold font-medium' : 'text-puja-ivory/80 group-hover:text-puja-ivory'}`}>
          {track.title}
        </p>
        <p className="text-[11px] text-puja-ivory/35 truncate mt-0.5">{track.artist}</p>
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
    isPlayerOpen,
    isPlaylistOpen,
    exploringFestivalId,
    loadPlaylist,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    closePlayer,
    togglePlaylist,
    toggleVideo,
    isVideoExpanded,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
  } = useMusicContext();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  if (!isPlayerOpen || !currentPlaylist) return null;

  // Contextual exploration hint
  const exploringFestival = exploringFestivalId
    ? festivals.find(f => f.id === exploringFestivalId)
    : null;

  const exploringHasPlaylist = exploringFestivalId
    ? !!getPlaylistForFestival(exploringFestivalId)
    : false;

  const isDifferentFromExploring =
    exploringFestivalId &&
    exploringHasPlaylist &&
    currentPlaylistKey !== exploringFestivalId &&
    !exploringFestivalId.startsWith(currentPlaylistKey);

  return (
    <>
      {/* Playlist Drawer (Bottom Sheet) */}
      <AnimatePresence>
        {isPlaylistOpen && (
          <motion.div
            key="playlist-panel"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed bottom-[74px] left-1/2 -translate-x-1/2 z-[490]
              w-[94vw] max-w-lg max-h-[65vh] overflow-hidden
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
                onClick={togglePlaylist}
                className="text-puja-ivory/40 hover:text-puja-gold p-1.5 rounded transition-colors"
                aria-label="Close playlist"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Festival Switcher Bar inside Playlist Drawer */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-black/40 overflow-x-auto scrollbar-thin border-b border-puja-gold/10 flex-shrink-0">
              {Object.keys(festivalPlaylists).slice(0, 8).map(key => {
                const p = festivalPlaylists[key];
                const isCur = currentPlaylistKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => loadPlaylist(key, true)}
                    className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-all ${
                      isCur
                        ? 'bg-puja-gold text-puja-black font-semibold'
                        : 'bg-white/5 text-puja-ivory/50 hover:text-puja-gold hover:bg-white/10'
                    }`}
                  >
                    {p.festivalEmoji} {p.title?.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Track List */}
            <div className="overflow-y-auto flex-1 divide-y divide-puja-gold/8 scrollbar-thin py-1">
              {currentPlaylist.tracks?.map((track, i) => (
                <TrackRow
                  key={track.id + '-' + i}
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

      {/* Floating Player Main Bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="fixed bottom-0 left-0 right-0 z-[500]
          bg-[rgba(10,8,5,0.96)] border-t border-puja-gold/25
          backdrop-blur-xl"
        style={{ boxShadow: '0 -4px 35px rgba(0,0,0,0.8), 0 0 20px rgba(212,160,23,0.1)' }}
        aria-label="Floating music player"
        role="region"
      >
        {/* Contextual "Now exploring" Banner */}
        {exploringFestival && isDifferentFromExploring && (
          <div className="px-4 py-1 bg-puja-gold/8 border-b border-puja-gold/10 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-puja-ivory/30">Now exploring:</span>
              <span className="bn-text text-xs text-puja-gold truncate font-medium">{exploringFestival.nameBn}</span>
            </div>
            <button
              onClick={() => loadPlaylist(exploringFestivalId, true)}
              className="text-[11px] text-puja-gold hover:text-puja-gold-light tracking-wider font-medium uppercase transition-colors px-2 py-0.5 rounded bg-puja-gold/10 hover:bg-puja-gold/20"
              aria-label={`Play ${exploringFestival.nameEn} music`}
            >
              ▶ Play {exploringFestival.nameEn}
            </button>
          </div>
        )}

        {/* Player Controls Bar */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-3 md:px-6 py-2.5">
          
          {/* Left: Thumbnail, Track Info & Equalizer */}
          <div className="flex items-center gap-3 min-w-0 max-w-[45%] md:max-w-sm">
            <div className="relative flex-shrink-0 w-11 h-11 rounded border border-puja-gold/25 overflow-hidden bg-black/60 shadow-md">
              {currentTrack?.thumbnail ? (
                <img
                  src={currentTrack.thumbnail}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-puja-gold/10">
                  <Music2 size={18} className="text-puja-gold" />
                </div>
              )}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1">
                  <Equalizer isPlaying={isPlaying} />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="bn-text text-xs md:text-sm text-puja-ivory font-medium leading-tight truncate">
                {currentTrack?.title || 'Selected Track'}
              </p>
              <p className="text-[10px] md:text-xs text-puja-ivory/40 truncate mt-0.5">
                {currentTrack?.artist || currentPlaylist.subtitle}
              </p>
            </div>
          </div>

          {/* Center: Playback Controls */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* Previous */}
            <button
              onClick={prevTrack}
              className="p-2 text-puja-ivory/50 hover:text-puja-gold transition-colors rounded"
              title="Previous Track"
              aria-label="Previous track"
            >
              <SkipBack size={18} />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full
                bg-puja-gold hover:bg-puja-gold-light text-puja-black font-bold
                transition-transform active:scale-95 shadow-[0_0_15px_rgba(212,160,23,0.4)]"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>

            {/* Next */}
            <button
              onClick={nextTrack}
              className="p-2 text-puja-ivory/50 hover:text-puja-gold transition-colors rounded"
              title="Next Track"
              aria-label="Next track"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Right: Extra Controls (Volume, Video, Playlist, Close) */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            
            {/* Volume Control (Desktop) */}
            <div className="relative hidden sm:flex items-center">
              <button
                onClick={toggleMute}
                className="p-2 text-puja-ivory/50 hover:text-puja-gold transition-colors rounded"
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
              onClick={toggleVideo}
              className={`p-2 rounded transition-colors hidden xs:flex ${
                isVideoExpanded
                  ? 'text-puja-gold bg-puja-gold/15'
                  : 'text-puja-ivory/50 hover:text-puja-gold'
              }`}
              title="Toggle Video Screen"
              aria-label="Toggle video screen"
            >
              <Video size={17} />
            </button>

            {/* Playlist Drawer Button */}
            <button
              onClick={togglePlaylist}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded transition-all ${
                isPlaylistOpen
                  ? 'bg-puja-gold/20 text-puja-gold border border-puja-gold/40'
                  : 'bg-white/5 text-puja-ivory/60 hover:text-puja-gold hover:bg-white/10 border border-puja-gold/15'
              }`}
              title="Open Playlist"
              aria-label="Open playlist"
              aria-expanded={isPlaylistOpen}
            >
              <ListMusic size={17} />
              <span className="text-xs hidden md:inline font-medium">
                {currentPlaylist.tracks?.length || 0}
              </span>
            </button>

            {/* Close Player */}
            <button
              onClick={closePlayer}
              className="p-2 text-puja-ivory/30 hover:text-puja-ivory transition-colors rounded ml-1"
              title="Close Player"
              aria-label="Close music player"
            >
              <X size={16} />
            </button>
          </div>

        </div>
      </motion.div>
    </>
  );
}
