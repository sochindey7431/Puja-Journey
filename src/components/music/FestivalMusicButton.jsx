import { Music2 } from 'lucide-react';
import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

/**
 * Per-section button that loads a festival's playlist into the global player.
 * Used inside FestivalSection via the updated MusicPlayer.jsx wrapper.
 */
export default function FestivalMusicButton({ festivalId, festivalNameEn, festivalNameBn }) {
  const { loadPlaylist, currentPlaylistKey, isPlayerOpen, isPlaying } = useMusicContext();
  const { isBn } = useLanguage();

  const isThisActive = isPlayerOpen && currentPlaylistKey === festivalId;

  const handleClick = () => {
    loadPlaylist(festivalId, true);
  };

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center gap-2 px-4 py-2.5 text-xs border transition-all duration-300
        ${isThisActive
          ? 'border-puja-gold/60 bg-puja-gold/10 text-puja-gold'
          : 'border-puja-gold/20 hover:border-puja-gold/50 hover:bg-puja-gold/5 text-puja-ivory/50 hover:text-puja-gold'
        }`}
      aria-label={`Listen to ${festivalNameEn} music`}
      aria-pressed={isThisActive}
    >
      <Music2
        size={13}
        className={`transition-colors flex-shrink-0 ${isThisActive ? 'text-puja-gold' : 'text-puja-ivory/30 group-hover:text-puja-gold'}`}
      />
      <span className={isBn && festivalNameBn ? 'bn-text' : 'tracking-wider uppercase'}>
        {isThisActive
          ? (isBn ? 'চলছে…' : 'Playing…')
          : (isBn && festivalNameBn
              ? `শুনুন — ${festivalNameBn}`
              : `Listen — ${festivalNameEn}`
            )
        }
      </span>
      {isThisActive && isPlaying && (
        <span className="flex items-end gap-[2px] h-3 ml-1" aria-hidden="true">
          {[2,4,3,5,2].map((h, i) => (
            <span key={i} className="block w-[2px] bg-puja-gold rounded-full music-eq-bar"
              style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </span>
      )}
    </button>
  );
}
