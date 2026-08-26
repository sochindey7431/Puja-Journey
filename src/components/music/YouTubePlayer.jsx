import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, ExternalLink, Music2 } from 'lucide-react';

export default function YouTubePlayer() {
  const {
    isPlayerOpen,
    isVideoExpanded,
    toggleVideo,
    currentTrack,
    currentPlaylist,
    isPlaying,
  } = useMusicContext();

  if (!isPlayerOpen || !currentTrack?.id) return null;

  return (
    <>
      {/* 
        Official YouTube Video Player Container:
        - When collapsed: Renders as a mini docked video card (220x124px) in the bottom-left corner with gold border & glow.
        - When expanded: Renders as a cinematic full video modal with dark backdrop.
      */}
      <div
        className={`fixed z-[495] transition-all duration-300 ease-out ${
          isVideoExpanded
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-3xl aspect-video rounded-xl border-2 border-puja-gold/60 bg-black overflow-hidden'
            : 'bottom-[76px] left-3 md:left-6 w-44 h-24 md:w-56 md:h-32 rounded-lg border border-puja-gold/30 bg-black overflow-hidden'
        }`}
        style={{
          boxShadow: isVideoExpanded
            ? '0 0 60px rgba(212,160,23,0.35), 0 25px 80px rgba(0,0,0,0.95)'
            : '0 4px 20px rgba(0,0,0,0.8), 0 0 15px rgba(212,160,23,0.12)',
        }}
        aria-label="YouTube Music Player"
      >
        {/* Top Mini Header with Expand / Fullscreen & YouTube link */}
        <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md rounded px-1.5 py-0.5 border border-puja-gold/25">
          <a
            href={`https://www.youtube.com/watch?v=${currentTrack.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-puja-ivory/60 hover:text-puja-gold p-0.5 transition-colors"
            title="Open on YouTube"
            aria-label="Open on YouTube"
          >
            <ExternalLink size={12} />
          </a>
          <button
            onClick={toggleVideo}
            className="text-puja-ivory/70 hover:text-puja-gold p-0.5 transition-colors"
            title={isVideoExpanded ? 'Minimize video' : 'Expand video'}
            aria-label={isVideoExpanded ? 'Minimize video' : 'Expand video'}
          >
            {isVideoExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>

        {/* The Direct YouTube Video Embed */}
        <iframe
          key={currentTrack.id}
          src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
          title={currentTrack.title || 'Puja Devotional Music'}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
        />

        {/* Video Info when expanded */}
        {isVideoExpanded && (
          <div className="absolute -bottom-14 left-0 right-0 flex items-center justify-between px-2 text-puja-ivory">
            <div className="min-w-0 flex-1">
              <p className="bn-text text-sm md:text-base text-puja-gold truncate font-semibold">
                {currentTrack.title}
              </p>
              <p className="text-xs text-puja-ivory/50 truncate">{currentTrack.artist}</p>
            </div>
            <button
              onClick={toggleVideo}
              className="ml-4 px-3 py-1 text-xs border border-puja-gold/40 text-puja-gold hover:bg-puja-gold/15 transition-colors rounded"
            >
              Minimize
            </button>
          </div>
        )}
      </div>

      {/* Dim overlay when video is expanded */}
      <AnimatePresence>
        {isVideoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleVideo}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[494]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
