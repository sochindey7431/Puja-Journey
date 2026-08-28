import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import { toBengaliDigits } from '../../utils/dateUtils.js';

/**
 * Devotional Countdown Component
 *
 * Displays 4 distinct digit boxes [ DD ] [ HH ] [ MM ] [ SS ] with
 * labels underneath and elegant Cormorant Garamond typography.
 */
export default function Countdown({ targetDate, festivalName, festivalNameBn }) {
  const { isBn } = useLanguage();
  const timeLeft = useCountdown(targetDate);

  if (!targetDate || timeLeft === null) return null;

  // ── Festival has arrived ───────────────────────────────────────
  if (timeLeft.isDone || timeLeft.days < 0) {
    return (
      <div
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-puja-gold/30 bg-[#0d0a07]/90 shadow-md shadow-black/50"
        role="status"
        aria-live="polite"
        aria-label={`${festivalName} is today`}
      >
        <span className="text-lg animate-pulse">🪔</span>
        <div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-puja-gold/80 font-medium">
            {isBn ? 'আজকের উৎসব' : 'FESTIVAL IS TODAY'}
          </div>
          <div className={`font-display text-base text-puja-ivory ${isBn ? 'bn-text' : ''}`}>
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
    { value: fmt(timeLeft.minutes), labelBn: 'মিনিট',   labelEn: 'MINUTES' },
    { value: fmt(timeLeft.seconds), labelBn: 'সেকেন্ড', labelEn: 'SECONDS' },
  ];

  return (
    <div
      className="flex items-center gap-2 sm:gap-2.5 md:gap-3"
      role="timer"
      aria-label={`Countdown to ${festivalName}: ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}
      aria-live="off"
    >
      {units.map((unit, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Digit Box */}
          <div className="flex items-center justify-center min-w-[48px] sm:min-w-[56px] md:min-w-[62px] h-12 sm:h-13 md:h-14 px-2 rounded-lg bg-[#0d0a07]/85 border border-puja-gold/25 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <span
              className={`font-display text-xl sm:text-2xl md:text-3xl text-puja-gold font-medium tracking-normal tabular-nums leading-none ${isBn ? 'bn-text text-xl sm:text-2xl md:text-3xl font-normal' : ''}`}
            >
              {unit.value}
            </span>
          </div>

          {/* Label below box */}
          <span
            className={`text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-puja-ivory/50 mt-1.5 font-medium ${isBn ? 'bn-text tracking-normal text-xs text-puja-gold/70' : ''}`}
          >
            {isBn ? unit.labelBn : unit.labelEn}
          </span>
        </div>
      ))}
    </div>
  );
}
