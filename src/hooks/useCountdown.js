import { useState, useEffect, useRef } from 'react';

/**
 * useCountdown — timezone-aware, self-updating countdown hook.
 *
 * Target: midnight (00:00:00) Bangladesh time (Asia/Dhaka, always UTC+6, no DST).
 *
 * Strategy:
 *   - Bangladesh is permanently UTC+6.
 *   - Target timestamp = new Date(dateStr + 'T00:00:00+06:00')
 *     This is unambiguous: the ISO string includes the explicit +06:00 offset,
 *     so JavaScript's Date parser always interprets it as UTC+6 midnight,
 *     regardless of the browser's local timezone.
 *   - Current time = Date.now() — always UTC milliseconds, timezone-agnostic.
 *   - diff = target.getTime() - Date.now() — correct millisecond difference.
 *   - Interval fires every 1000ms to re-calculate.
 *
 * @param {string} dateStr  - 'YYYY-MM-DD' e.g. '2026-10-10'
 * @returns {{ days, hours, minutes, seconds, isToday, isDone } | null}
 */
export function useCountdown(dateStr) {
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!dateStr) return;

    // Build target: 00:00:00 Bangladesh time (UTC+6).
    // '+06:00' suffix forces correct interpretation regardless of browser timezone.
    const target = new Date(dateStr + 'T00:00:00+06:00');
    const targetMs = target.getTime();

    const calculate = () => {
      const nowMs = Date.now();                  // UTC milliseconds — timezone-safe
      const diff  = targetMs - nowMs;            // milliseconds remaining

      if (diff <= 0) {
        // Countdown reached zero — clamp to 0, stop interval
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isDone: true });
        clearInterval(intervalRef.current);
        return;
      }

      // Derive human-readable units from raw milliseconds
      const days    = Math.floor(diff / 86_400_000);
      const hours   = Math.floor((diff % 86_400_000) / 3_600_000);
      const minutes = Math.floor((diff % 3_600_000)  / 60_000);
      const seconds = Math.floor((diff % 60_000)     / 1_000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: days === 0 && hours === 0,
        isDone:  false,
      });
    };

    calculate();                                   // immediate first calculation
    intervalRef.current = setInterval(calculate, 1_000);

    return () => clearInterval(intervalRef.current); // cleanup on unmount or dateStr change
  }, [dateStr]);

  return timeLeft;
}
