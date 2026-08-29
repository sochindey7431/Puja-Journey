/**
 * PUJA JOURNEY — YouTubePlayer
 *
 * FIX #2  — No full-screen black backdrop
 * FIX #3  — Stable DOM node: #puja-journey-yt-player-container never unmounted
 *           and permanently isolated in its own wrapper so React never diffs
 *           the replaced iframe against dynamic sibling nodes.
 * FIX #11 — No dynamic key= on this component or its children
 * FIX #12 — Player hidden with opacity/pointer-events, never destroyed
 *
 * isVideoExpanded ONLY changes via explicit toggleVideo() (expand/minimize button).
 * Seek / Next / Prev / currentTrack / isPlaying do NOT touch isVideoExpanded.
 */
import { memo } from 'react';
import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { useYouTubePlayer } from '../../hooks/useMusicPlayer.js';
import { Maximize2, Minimize2, ExternalLink, Sparkles } from 'lucide-react';

function YouTubePlayer() {
  const {
    isPlayerOpen,
    isVideoExpanded,
    toggleVideo,
    currentTrack,
    isLoading,
    isBuffering,
  } = useMusicContext();

  // Mount official YT.Player instance on the persistent container div.
  // useYouTubePlayer creates ONE YT.Player instance and keeps it alive.
  useYouTubePlayer('puja-journey-yt-player-container');

  const videoId = currentTrack?.youtubeId || currentTrack?.id;

  return (
    <div
      className={`fixed z-[495] ${
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
      {/*
        FIX #3, #4, #12:
        Permanent Isolated IFrame Container.
        This parent div contains ONLY the target element and NEVER has dynamic siblings.
        When YouTube replaces the inner div with an iframe, React's reconciliation of
        sibling elements (toolbars/badges) will not touch or clash with this container.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <div id="puja-journey-yt-player-container" className="w-full h-full" />
      </div>

      {/* Overlays & Toolbars Layer — Completely isolated from the iframe DOM container */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Top Mini Toolbar: Direct YouTube link & Expand/Collapse button */}
        {isPlayerOpen && (
          <div className="pointer-events-auto absolute top-1.5 right-1.5 flex items-center gap-1.5 bg-black/80 backdrop-blur-md rounded px-2 py-0.5 border border-puja-gold/25">
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
                // FIX #1: isVideoExpanded ONLY changes here — from explicit user click
                console.log('[YT]', isVideoExpanded ? 'MINIMIZED' : 'EXPANDED', '— explicit user toggle');
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

        {/* Buffering/Loading badge — does NOT affect isVideoExpanded */}
        {isPlayerOpen && (isLoading || isBuffering) && (
          <div className="pointer-events-auto absolute top-1.5 left-1.5 flex items-center gap-1 bg-puja-gold/20 backdrop-blur-md rounded px-2 py-0.5 border border-puja-gold/40 text-[10px] text-puja-gold font-medium">
            <Sparkles size={10} className="animate-spin" />
            <span>Loading…</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(YouTubePlayer);


