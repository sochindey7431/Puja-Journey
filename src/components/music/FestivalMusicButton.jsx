import { memo } from 'react';
import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { getPlaylistForFestival, hasPlaylistForFestival } from '../../data/festivalPlaylists.js';

/**
 * Per-section "🎵 Play Music" button that connects festival cards
 * directly to their predefined YouTube playlist.
 */
function FestivalMusicButton({ festivalId, festivalNameEn, festivalNameBn, className = '' }) {
  const { loadFestivalMusic, currentPlaylistKey, isPlayerOpen, isPlaying, isLoading, isBuffering, togglePlay } = useMusicContext();
  const { isBn } = useLanguage();

  // If this festival has no configured playlist, do not show music button
  if (!hasPlaylistForFestival(festivalId)) {
    return null;
  }

  const thisPlaylist = getPlaylistForFestival(festivalId);
  const activePlaylist = currentPlaylistKey ? getPlaylistForFestival(currentPlaylistKey) : null;

  // Active if player is open and either matching exact festivalId or sharing the same target playlist
  const isThisActive = Boolean(
    isPlayerOpen &&
    activePlaylist &&
    thisPlaylist &&
    activePlaylist.targetPlaylistId === thisPlaylist.targetPlaylistId
  );

  const isThisPlaying = isThisActive && isPlaying;
  const isThisLoading = isThisActive && (isLoading || isBuffering);

  const handleClick = () => {
    if (isThisActive && currentPlaylistKey === festivalId) {
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
