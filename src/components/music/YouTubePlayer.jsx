import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { useYouTubePlayer } from '../../hooks/useMusicPlayer.js';
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
    <div
      className={`fixed z-[495] transition-all duration-300 ease-out ${
        !isPlayerOpen
          ? 'opacity-0 pointer-events-none -z-10 bottom-[92px] left-3 w-48 h-28'
          : isVideoExpanded
            ? 'bottom-[92px] left-3 sm:left-6 w-[90vw] sm:w-[480px] aspect-video rounded-xl border-2 border-puja-gold/60 bg-black overflow-hidden shadow-2xl'
            : 'bottom-[92px] left-3 md:left-6 w-48 h-28 md:w-60 md:h-34 rounded-lg border border-puja-gold/30 bg-black overflow-hidden shadow-xl'
      }`}
      style={{
        boxShadow: isPlayerOpen
          ? isVideoExpanded
            ? '0 0 35px rgba(212,160,23,0.3), 0 10px 40px rgba(0,0,0,0.85)'
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

      {/* The YouTube IFrame API Target Element (persistent in DOM) */}
      <div id="puja-journey-yt-player-container" className="w-full h-full" />
    </div>
  );
}
