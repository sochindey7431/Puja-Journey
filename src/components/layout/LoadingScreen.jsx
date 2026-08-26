import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function LoadingScreen({ onDone }) {
  const { t } = useLanguage();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(onDone, 1800);
    return () => clearTimeout(timerRef.current);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        aria-label="Loading Puja Journey"
        role="status"
      >
        {/* Radial ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,160,23,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Lotus icon */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl mb-8"
          aria-hidden="true"
        >
          🌺
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl tracking-[0.3em] text-puja-ivory uppercase mb-3"
        >
          PUJA JOURNEY
        </motion.h1>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs tracking-[0.25em] uppercase text-puja-gold font-light"
        >
          {t('loadingText')}
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-puja-gold"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'linear' }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
