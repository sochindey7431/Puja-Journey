import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useCountdown } from '../../hooks/useCountdown.js';
import { toBengaliDigits } from '../../utils/dateUtils.js';

/**
 * Premium Devotional Countdown Component
 *
 * Displays a cinematic, glassmorphism countdown timer with gold accents,
 * glowing digit cards, colon separators, and bilingual unit indicators.
 */
export default function Countdown({ targetDate, festivalName, festivalNameBn, variant = 'default' }) {
  const { t, isBn } = useLanguage();
  const timeLeft = useCountdown(targetDate);

  if (!targetDate || timeLeft === null) return null;

  // ── Festival has arrived ───────────────────────────────────────
  if (timeLeft.isDone || timeLeft.days < 0) {
    return (
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-lg border border-puja-gold/30 bg-puja-gold/10 backdrop-blur-md shadow-[0_0_25px_rgba(212,160,23,0.2)]"
        role="status"
        aria-live="polite"
        aria-label={`${festivalName} is here`}
      >
        <span className="text-2xl animate-pulse">🪔</span>
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-puja-gold/70 font-medium">
            {isBn ? 'উৎসব চলছে' : 'FESTIVAL IS TODAY'}
          </div>
          <div className={`font-display text-lg md:text-xl text-puja-gold ${isBn ? 'bn-text' : ''}`}>
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

  const fmtDays = (n) => {
    const s = Math.max(0, n).toString().padStart(2, '0');
    return isBn ? toBengaliDigits(s) : s;
  };

  const units = [
    { value: fmtDays(timeLeft.days), labelBn: 'দিন',      labelEn: 'DAYS' },
    { value: fmt(timeLeft.hours),    labelBn: 'ঘণ্টা',    labelEn: 'HOURS' },
    { value: fmt(timeLeft.minutes),  labelBn: 'মিনিট',   labelEn: 'MINUTES' },
    { value: fmt(timeLeft.seconds),  labelBn: 'সেকেন্ড', labelEn: 'SECONDS' },
  ];

  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5"
      role="timer"
      aria-label={`Countdown to ${festivalName}: ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}
      aria-live="off"
    >
      {units.map((unit, i) => (
        <div key={i} className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5">
          
          {/* Digit Box Card */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center min-w-[48px] sm:min-w-[56px] md:min-w-[68px] h-12 sm:h-14 md:h-16 px-2 sm:px-3 rounded-lg bg-[rgba(15,12,7,0.75)] border border-puja-gold/25 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(212,160,23,0.08)] group hover:border-puja-gold/50 transition-colors">
              
              {/* Subtle top highlight */}
              <div className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-puja-gold/40 to-transparent" />
              
              {/* Digit */}
              <span
                className={`font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-puja-gold tracking-tight font-semibold tabular-nums leading-none drop-shadow-[0_0_12px_rgba(212,160,23,0.3)] ${isBn ? 'bn-text' : ''}`}
              >
                {unit.value}
              </span>
            </div>

            {/* Label below box */}
            <span className={`text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-puja-ivory/45 mt-1.5 font-medium ${isBn ? 'bn-text tracking-normal text-xs text-puja-gold/60' : ''}`}>
              {isBn ? unit.labelBn : unit.labelEn}
            </span>
          </div>

          {/* Glowing Colon Separator (between boxes) */}
          {i < units.length - 1 && (
            <div className="flex flex-col gap-1 sm:gap-1.5 -mt-4 sm:-mt-5 text-puja-gold/60 select-none">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-puja-gold/70 shadow-[0_0_8px_rgba(212,160,23,0.6)] animate-pulse" />
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-puja-gold/70 shadow-[0_0_8px_rgba(212,160,23,0.6)] animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          )}

        </div>
      ))}
    </div>
  );
}
