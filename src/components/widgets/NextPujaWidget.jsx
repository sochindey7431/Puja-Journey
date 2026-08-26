import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { getNextFestival } from '../../data/festivals.js';
import { toBengaliDigits } from '../../utils/dateUtils.js';

function pad(n) { return String(n).padStart(2, '0'); }

export default function NextPujaWidget() {
  const { t, lang, isBn } = useLanguage();
  const [minimized, setMinimized] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const nextFestival = getNextFestival('BD');

  useEffect(() => {
    if (!nextFestival) return;
    const calc = () => {
      const now = new Date();
      const target = new Date(nextFestival.date.BD + 'T00:00:00+06:00');
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        isToday: false,
      });
    };
    calc();
    const iv = setInterval(calc, 1000);
    return () => clearInterval(iv);
  }, [nextFestival]);

  if (!nextFestival || !timeLeft) return null;

  const fmt = (n) => isBn ? toBengaliDigits(pad(n)) : pad(n);

  const name = isBn ? nextFestival.nameBn : nextFestival.nameEn;

  return (
    <div className="next-puja-widget" aria-label="Next upcoming puja countdown">
      <AnimatePresence mode="wait">
        {minimized ? (
          <motion.button
            key="mini"
            onClick={() => setMinimized(false)}
            className="glass w-12 h-12 flex items-center justify-center text-xl hover:border-puja-gold/30 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label="Show next puja countdown"
          >
            {nextFestival.emoji}
          </motion.button>
        ) : (
          <motion.div
            key="full"
            className="glass border border-puja-gold/15 p-4 min-w-[200px] max-w-[220px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs tracking-[0.2em] uppercase text-puja-gold/50 ${isBn ? 'bn-text normal-case tracking-normal text-xs' : ''}`}>
                {t('nextPujaLabel')}
              </span>
              <button
                onClick={() => setMinimized(true)}
                className="text-puja-ivory/20 hover:text-puja-ivory/60 transition-colors"
                aria-label="Minimize widget"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Festival name */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg" aria-hidden="true">{nextFestival.emoji}</span>
              <p className={`text-sm text-puja-ivory/80 leading-tight ${isBn ? 'bn-text' : 'font-display'}`}>
                {name}
              </p>
            </div>

            {/* Today or countdown */}
            {timeLeft.isToday ? (
              <div className="text-center py-2">
                <span className={`text-puja-gold font-display text-lg ${isBn ? 'bn-text' : ''}`}>
                  {t('nextPujaToday')}
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {[
                  { v: fmt(timeLeft.days),    l: isBn ? 'দিন' : 'D' },
                  { v: fmt(timeLeft.hours),   l: isBn ? 'ঘণ্টা' : 'H' },
                  { v: fmt(timeLeft.minutes), l: isBn ? 'মিনিট' : 'M' },
                  { v: fmt(timeLeft.seconds), l: isBn ? 'সেকেন্ড' : 'S' },
                ].map(({ v, l }, i) => (
                  <div key={i} className="flex flex-col items-center p-1 rounded bg-puja-gold/8 border border-puja-gold/15">
                    <span className={`font-display text-base text-puja-gold font-semibold tabular-nums countdown-digit leading-tight ${isBn ? 'bn-text' : ''}`}>
                      {v}
                    </span>
                    <span className={`text-[8px] text-puja-ivory/40 leading-tight mt-0.5 ${isBn ? 'bn-text' : 'tracking-wider uppercase'}`}>
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="mt-3 pt-3 border-t border-puja-gold/8">
              <button
                onClick={() => {
                  document.querySelector(`[data-festival-id="${nextFestival.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`text-xs text-puja-ivory/20 hover:text-puja-gold transition-colors w-full text-center ${isBn ? 'bn-text' : 'tracking-widest uppercase'}`}
              >
                {isBn ? 'বিস্তারিত →' : 'Details →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
