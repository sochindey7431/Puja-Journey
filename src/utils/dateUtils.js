/**
 * Bengali digit conversion
 */
const bengaliDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

export const toBengaliDigits = (num) =>
  String(num).split('').map(d => bengaliDigits[parseInt(d)] ?? d).join('');

/**
 * Format a date string for display
 * @param {string} dateStr - ISO date string
 * @param {string} lang - 'en' or 'bn'
 */
export const formatDate = (dateStr, lang = 'en') => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr + 'T12:00:00');
    if (lang === 'bn') {
      const bnMonths = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
      return `${toBengaliDigits(date.getDate())} ${bnMonths[date.getMonth()]} ${toBengaliDigits(date.getFullYear())}`;
    }
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  } catch {
    return dateStr;
  }
};

/**
 * Format a date string to short form (e.g., "17 Sep")
 */
export const formatDateShort = (dateStr, lang = 'en') => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr + 'T12:00:00');
    if (lang === 'bn') {
      const bnMonths = ['জান','ফেব','মার্চ','এপ্রি','মে','জুন','জুলা','আগ','সেপ','অক্টো','নভে','ডিসে'];
      return `${toBengaliDigits(date.getDate())} ${bnMonths[date.getMonth()]}`;
    }
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-GB', options);
  } catch {
    return dateStr;
  }
};

/**
 * Check if a date is today
 */
export const isToday = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  const d = new Date(dateStr + 'T12:00:00');
  return d.toDateString() === today.toDateString();
};

/**
 * Check if a date is in the past
 */
export const isPast = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0,0,0,0);
  const d = new Date(dateStr + 'T00:00:00');
  return d < today;
};

/**
 * Get days until a date (negative if past)
 */
export const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0,0,0,0);
  const d = new Date(dateStr + 'T00:00:00');
  return Math.ceil((d - today) / (1000 * 60 * 60 * 24));
};

/**
 * Bengali calendar month names
 */
export const bengaliMonths = [
  'বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন',
  'কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'
];

/**
 * Convert Gregorian year-month to approximate Bengali year-month
 * (Simplified approximation — use a proper panchang library for accuracy)
 */
export const toBengaliYearMonth = (year, month) => {
  // Bengali year starts ~mid April
  // month: 0-indexed
  const bnYear = month >= 3 ? year - 593 : year - 594;
  // Bengali months roughly map (offset by ~2.5 months from Gregorian)
  const bnMonthIndex = (month + 9) % 12;
  return { year: bnYear, monthIndex: bnMonthIndex, monthName: bengaliMonths[bnMonthIndex] };
};
