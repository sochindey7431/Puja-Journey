import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2 } from 'lucide-react';
import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function MusicAutoplayFallback() {
  const { isPlaying, isPlayerOpen, play, loadFestivalMusic, currentPlaylistKey, toggleMute, isMuted } = useMusicContext();
  const { isBn } = useLanguage();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // If music is already playing or player is already open, hide the fallback
    if (isPlaying || isPlayerOpen) {
      setShowFallback(false);
      return;
    }

    // Wait ~2 seconds after page load. If music is still not playing, show the fallback trigger
    const timer = setTimeout(() => {
      if (!isPlaying && !isPlayerOpen) {
        setShowFallback(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isPlaying, isPlayerOpen]);

  const handleStartMusic = () => {
    setShowFallback(false);
    if (isMuted) {
      toggleMute();
    }
    if (currentPlaylistKey) {
      play();
    } else {
      loadFestivalMusic('durga-puja-shasthi', true);
    }
  };

  return (
    <AnimatePresence>
      {showFallback && !isPlaying && !isPlayerOpen && (
        <motion.aside
          role="complementary"
          aria-label="Play background music prompt"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-5 z-[450] flex items-center"
        >
          <button
            type="button"
            onClick={handleStartMusic}
            className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full
              bg-[rgba(15,12,7,0.92)] hover:bg-[rgba(25,20,12,0.98)]
              border border-puja-gold/50 hover:border-puja-gold
              backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(212,160,23,0.35)]
              text-puja-gold transition-all duration-300 active:scale-95"
            aria-label={isBn ? 'উৎসবের সঙ্গীত শুনুন' : 'Play festival background music'}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-puja-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-puja-gold" />
            </span>

            <Music size={16} className="text-puja-gold group-hover:scale-110 transition-transform" />

            <span className="text-xs font-medium tracking-wide text-puja-ivory">
              {isBn ? 'সঙ্গীত বাজান' : 'Play Music'}
            </span>

            <Volume2 size={14} className="text-puja-gold/70" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
