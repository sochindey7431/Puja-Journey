import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2 } from 'lucide-react';
import { useMusicContext } from '../../contexts/MusicContext.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

const SESSION_KEY = 'puja-journey-music-welcome-shown';

export default function MusicWelcomePrompt() {
  const { isBn } = useLanguage();
  const { loadPlaylist, setWelcomeShown, welcomeShown, setIsPlayerOpen } = useMusicContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (!alreadyShown) {
      // Small delay so it appears after loading screen fades
      const timer = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, '1');
    setWelcomeShown(true);
  };

  const enterWithMusic = () => {
    dismiss();
    // Load the first upcoming/special festival playlist — Mahalaya is a great default
    loadPlaylist('mahalaya', true);
    // Small delay to let the player mount
    setTimeout(() => {
      setIsPlayerOpen(true);
    }, 300);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[600] flex items-end justify-center pb-16 px-4"
          style={{ background: 'rgba(2,1,0,0.75)', backdropFilter: 'blur(6px)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Music welcome prompt"
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260, delay: 0.1 }}
            className="w-full max-w-sm bg-[rgba(10,8,5,0.97)] border border-puja-gold/25
              p-7 flex flex-col items-center text-center gap-5"
            style={{ boxShadow: '0 0 60px rgba(212,160,23,0.15), 0 20px 60px rgba(0,0,0,0.8)' }}
          >
            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center
              border border-puja-gold/30 bg-puja-gold/8 rounded-full">
              <Music2 size={24} className="text-puja-gold" />
            </div>

            {/* Bengali headline */}
            <div>
              <p className="bn-text text-lg text-puja-gold leading-snug mb-2">
                সুরের সাথে শুরু হোক পূজার পথচলা
              </p>
              <p className="text-sm text-puja-ivory/45 font-display italic">
                Begin your Puja Journey with music?
              </p>
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-puja-gold/40 to-transparent" />

            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={enterWithMusic}
                className="btn-primary w-full justify-center text-center gap-2"
                aria-label="Enter website with music"
                autoFocus
              >
                🎵 {isBn ? 'সুরে প্রবেশ করুন' : 'Enter with Music'}
              </button>
              <button
                onClick={dismiss}
                className="text-xs text-puja-ivory/25 hover:text-puja-ivory/50 transition-colors
                  tracking-[0.2em] uppercase py-2"
                aria-label="Continue without music"
              >
                {isBn ? 'নিঃশব্দে চলুন' : 'Continue Silent'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
