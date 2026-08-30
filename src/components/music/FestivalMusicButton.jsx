import { memo } from 'react';
import { useLocalMusicContext } from '../../contexts/LocalMusicContext.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { hasLocalMusicForFestival } from '../../data/localMusicManifest.js';
import { getPlaylistForFestival } from '../../data/festivalPlaylists.js';

/**
 * Per-section "🎵 Play Music" button that connects festival cards
 * directly to the native HTMLAudioElement local music player.
 * Only renders for festivals that have local music tracks available.
 */
function FestivalMusicButton({ festivalId, festivalNameEn, festivalNameBn, className = '' }) {
  // If this festival has no local audio tracks, do not render button
  if (!hasLocalMusicForFestival(festivalId)) {
    return null;
  }

  const {
    loadFestivalMusic,
    currentFestivalId,
    isPlaying,
    isLoading,
    togglePlay,
    isPlayerOpen,
  } = useLocalMusicContext();
  const { isBn } = useLanguage();

  const thisPlaylist = getPlaylistForFestival(festivalId);

  // Active if player is open and matching this festivalId
  const isThisActive = Boolean(isPlayerOpen && currentFestivalId === festivalId);
  const isThisPlaying = isThisActive && isPlaying;
  const isThisLoading = isThisActive && isLoading;

  const handleClick = () => {
    if (isThisActive) {
      togglePlay();
    } else {
      loadFestivalMusic(festivalId, true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs tracking-wider uppercase transition-all duration-300 backdrop-blur-sm shadow-md active:scale-95 ${
        isThisPlaying || isThisLoading
          ? 'border-puja-gold bg-puja-gold/25 text-puja-gold shadow-[0_0_20px_rgba(212,160,23,0.35)]'
          : isThisActive
            ? 'border-puja-gold/60 bg-puja-gold/15 text-puja-gold'
            : 'border-puja-gold/30 bg-puja-gold/10 hover:bg-puja-gold/20 text-puja-gold hover:border-puja-gold/60'
      } ${className}`}
      aria-label={`Listen to ${festivalNameEn || thisPlaylist?.title} predefined devotional music`}
      aria-pressed={isThisActive}
    >
      <span className="text-sm" aria-hidden="true">🎵</span>
      <span className={isBn ? 'bn-text tracking-normal text-sm font-medium' : 'font-medium tracking-wider'}>
        {isThisPlaying
          ? (isBn ? 'চলছে…' : 'Playing…')
          : isThisLoading
            ? (isBn ? 'লোড হচ্ছে…' : 'Loading…')
            : (isBn ? `${festivalNameBn || thisPlaylist?.title || ''} সঙ্গীত` : `Play Music`)}
      </span>

      {isThisPlaying && (
        <span className="flex items-end gap-[2px] h-3 ml-1" aria-hidden="true">
          {[2, 4, 3, 5, 2].map((h, i) => (
            <span
              key={i}
              className="block w-[2px] bg-puja-gold rounded-full music-eq-bar"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </span>
      )}
    </button>
  );
}

export default memo(FestivalMusicButton);
