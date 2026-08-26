import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { useYouTubePlayer } from '../../hooks/useMusicPlayer.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, ExternalLink, Sparkles } from 'lucide-react';

export default function YouTubePlayer() {
  const {
    isPlayerOpen,
    isVideoExpanded,
    toggleVideo,
    currentTrack,
    currentPlaylist,
    isLoading,
    isBuffering,
  } = useMusicContext();

  // Mount official YT.Player instance on the container div
  useYouTubePlayer('puja-journey-yt-player-container');

  const videoId = currentTrack?.youtubeId || currentTrack?.id;

  return (
    <>
      {/* 
        Official YouTube Video Player Container:
        - Complies with YouTube Terms of Service by remaining visible and interactive.
        - Compact Docked Mode: 220px x 124px in bottom-left corner with glowing puja-gold border.
        - Expanded Mode: Centered cinematic theater modal with dark backdrop.
      */}
      <div
        className={`fixed z-[495] transition-all duration-300 ease-out ${
          !isPlayerOpen
            ? 'opacity-0 pointer-events-none -left-[9999px] bottom-0 w-48 h-28'
            : isVideoExpanded
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-3xl aspect-video rounded-xl border-2 border-puja-gold/60 bg-black overflow-hidden'
              : 'bottom-[92px] left-3 md:left-6 w-48 h-28 md:w-60 md:h-34 rounded-lg border border-puja-gold/30 bg-black overflow-hidden'
        }`}
        style={{
          boxShadow: isPlayerOpen
            ? isVideoExpanded
              ? '0 0 60px rgba(212,160,23,0.35), 0 25px 80px rgba(0,0,0,0.95)'
              : '0 4px 20px rgba(0,0,0,0.8), 0 0 15px rgba(212,160,23,0.12)'
            : 'none',
        }}
        aria-label="YouTube Music Player"
      >
        {/* Top Mini Toolbar: Direct YouTube link & Expand/Collapse */}
        {isPlayerOpen && (
          <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md rounded px-2 py-0.5 border border-puja-gold/25">
            {videoId && (
              <a
                href={currentTrack?.youtubeUrl || `https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-puja-ivory/60 hover:text-puja-gold p-0.5 transition-colors"
                title="Open on YouTube"
                aria-label="Open on YouTube"
              >
                <ExternalLink size={12} />
              </a>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleVideo();
              }}
              className="text-puja-ivory/70 hover:text-puja-gold p-0.5 transition-colors"
              title={isVideoExpanded ? 'Minimize video' : 'Expand video'}
              aria-label={isVideoExpanded ? 'Minimize video' : 'Expand video'}
            >
              {isVideoExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
          </div>
        )}

        {/* Buffering/Loading subtle badge */}
        {isPlayerOpen && (isLoading || isBuffering) && (
          <div className="absolute top-1.5 left-1.5 z-20 flex items-center gap-1 bg-puja-gold/20 backdrop-blur-md rounded px-2 py-0.5 border border-puja-gold/40 text-[10px] text-puja-gold font-medium">
            <Sparkles size={10} className="animate-spin" />
            <span>Loading…</span>
          </div>
        )}

        {/* The YouTube IFrame API Target Element (persistent to prevent recreation) */}
        <div id="puja-journey-yt-player-container" className="w-full h-full" />

        {/* Video Info when expanded */}
        {isPlayerOpen && isVideoExpanded && currentTrack && (
          <div className="absolute -bottom-14 left-0 right-0 flex items-center justify-between px-2 text-puja-ivory">
            <div className="min-w-0 flex-1">
              <p className="bn-text text-sm md:text-base text-puja-gold truncate font-semibold">
                {currentTrack.titleBn || currentTrack.title}
              </p>
              <p className="text-xs text-puja-ivory/50 truncate">
                {currentTrack.artist} {currentPlaylist?.title ? `· ${currentPlaylist.title}` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleVideo();
              }}
              className="ml-4 px-3 py-1 text-xs border border-puja-gold/40 text-puja-gold hover:bg-puja-gold/15 transition-colors rounded"
            >
              Minimize
            </button>
          </div>
        )}
      </div>

      {/* Dim backdrop when video is expanded */}
      <AnimatePresence>
        {isPlayerOpen && isVideoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault();
              toggleVideo();
            }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[494]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
