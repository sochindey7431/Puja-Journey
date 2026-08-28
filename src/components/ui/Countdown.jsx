import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import { toBengaliDigits } from '../../utils/dateUtils.js';

/**
 * Modern, Compact & Minimal Devotional Countdown Component
 *
 * Designed with a subtle dark translucent glass backdrop, thin gold border,
 * clean typography, and balanced spacing.
 */
export default function Countdown({ targetDate, festivalName, festivalNameBn }) {
  const { isBn } = useLanguage();
  const timeLeft = useCountdown(targetDate);

  if (!targetDate || timeLeft === null) return null;

  // ── Festival has arrived ───────────────────────────────────────
  if (timeLeft.isDone || timeLeft.days < 0) {
    return (
      <div
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border border-puja-gold/25 bg-black/40 backdrop-blur-md shadow-lg shadow-black/40"
        role="status"
        aria-live="polite"
        aria-label={`${festivalName} is today`}
      >
        <span className="text-lg animate-pulse">🪔</span>
        <div>
          <div className="text-[9px] tracking-[0.2em] uppercase text-puja-gold/80 font-medium">
            {isBn ? 'আজকের উৎসব' : 'FESTIVAL IS TODAY'}
          </div>
          <div className={`font-display text-sm md:text-base text-puja-ivory ${isBn ? 'bn-text' : ''}`}>
            {isBn
              ? `${festivalNameBn || festivalName} এসে গেছে ✨`
              : `${festivalName} is here ✨`}
          </div>
        </div>
      </div>
    );
  }

  // ── Digit Formatters ──────────────────────────────────────────
  const fmt = (n) => {
    const s = Math.max(0, n).toString().padStart(2, '0');
    return isBn ? toBengaliDigits(s) : s;
  };

  const units = [
    { value: fmt(timeLeft.days),    labelBn: 'দিন',      labelEn: 'DAYS' },
    { value: fmt(timeLeft.hours),   labelBn: 'ঘণ্টা',    labelEn: 'HOURS' },
    { value: fmt(timeLeft.minutes), labelBn: 'মিনিট',   labelEn: 'MINS' },
    { value: fmt(timeLeft.seconds), labelBn: 'সেকেন্ড', labelEn: 'SECS' },
  ];

  return (
    <div
      className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-black/45 border border-puja-gold/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
      role="timer"
      aria-label={`Countdown to ${festivalName}: ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}
      aria-live="off"
    >
      {units.map((unit, i) => (
        <div key={i} className="flex items-center gap-1.5 sm:gap-2">
          {/* Compact Minimal Digit Box */}
          <div className="flex flex-col items-center justify-center w-12 sm:w-14 md:w-16 py-1.5 sm:py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-puja-gold/30 transition-colors">
            <span
              className={`font-display text-base sm:text-lg md:text-xl text-puja-gold font-semibold tabular-nums leading-tight ${isBn ? 'bn-text text-lg sm:text-xl md:text-2xl' : ''}`}
            >
              {unit.value}
            </span>
            <span
              className={`text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-puja-ivory/40 mt-0.5 font-medium ${isBn ? 'bn-text tracking-normal text-[10px] text-puja-gold/60' : ''}`}
            >
              {isBn ? unit.labelBn : unit.labelEn}
            </span>
          </div>

          {/* Subtle Colon Separator */}
          {i < units.length - 1 && (
            <span className="text-puja-gold/30 text-xs font-light select-none -mt-3.5">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
