import { motion } from 'framer-motion';
import { festivals } from '../../data/festivals.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { formatDateShort, isPast } from '../../utils/dateUtils.js';

export default function FestivalProgress({ activeFestivalId, onScrollTo }) {
  const { lang, isBn } = useLanguage();

  // Deduplicate: show only first occurrence of durga-puja group
  const navFestivals = festivals.filter((f, idx) => {
    if (f.isDurgaPujaSubday) {
      return festivals.findIndex(x => x.isDurgaPujaSubday) === idx;
    }
    return true;
  });

  return (
    <nav
      className="progress-nav"
      aria-label="Festival navigation"
      role="navigation"
    >
      {/* Year label */}
      <div className="mb-4 text-right">
        <span className="text-xs tracking-[0.2em] text-puja-ivory/20 uppercase">
          {new Date().getFullYear()}
        </span>
      </div>

      {navFestivals.map((festival) => {
        const isActive = activeFestivalId === festival.id ||
          (festival.isDurgaPujaSubday && activeFestivalId?.startsWith('durga-puja'));
        const date = festival.date?.BD;
        const past = date ? isPast(date) : false;

        return (
          <button
            key={festival.id}
            onClick={() => onScrollTo(festival.isDurgaPujaSubday ? 'durga-puja-shasthi' : festival.id)}
            className="group flex items-center gap-2 justify-end w-full py-0.5"
            aria-label={`Navigate to ${festival.nameEn}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Label (shown on hover) */}
            <motion.span
              className={`text-xs transition-all duration-200 whitespace-nowrap ${
                isActive ? 'text-puja-gold opacity-100' : 'text-puja-ivory/30 opacity-0 group-hover:opacity-100'
              } ${isBn ? 'bn-text' : ''}`}
              animate={{ x: isActive ? 0 : 4 }}
            >
              {isBn ? festival.nameBn : festival.nameEn}
            </motion.span>

            {/* Dot */}
            <div className={`relative flex items-center justify-center transition-all duration-300`}>
              <motion.div
                className="rounded-full transition-all duration-300"
                animate={{
                  width:  isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  backgroundColor: isActive
                    ? (festival.theme?.accent || '#d4a017')
                    : past
                      ? 'rgba(212,160,23,0.3)'
                      : 'rgba(245,230,200,0.15)',
                }}
              />
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: festival.theme?.accent || '#d4a017', opacity: 0.3 }}
                  animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
