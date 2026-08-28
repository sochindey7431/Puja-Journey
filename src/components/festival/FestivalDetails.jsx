import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { formatDate } from '../../utils/dateUtils.js';
import { getAssetUrl } from '../../utils/assetUtils.js';

export default function FestivalDetails({ festival, onClose }) {
  const { t, lang, isBn } = useLanguage();
  const [tab, setTab] = useState('about');

  if (!festival) return null;

  const tabs = [
    { key: 'about',        label: isBn ? 'পরিচিতি' : 'About' },
    { key: 'rituals',      label: t('rituals') },
    { key: 'significance', label: t('significance') },
    { key: 'food',         label: t('food') },
  ];

  const name    = isBn ? festival.nameBn    : festival.nameEn;
  const desc    = isBn ? festival.descriptionBn : festival.descriptionEn;
  const sig     = festival.significance?.[lang] || festival.significance?.en;
  const date    = festival.date?.BD;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className="detail-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={`${name} — Details`}
        className="fixed right-0 top-0 bottom-0 z-[201] w-full max-w-xl bg-[#0d0a06] border-l border-puja-gold/10 flex flex-col overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Header */}
        <div
          className="relative px-8 pt-12 pb-8 border-b border-puja-gold/10"
          style={{ background: `linear-gradient(135deg, ${festival.theme?.bg || '#0d0a06'} 0%, #0d0a06 100%)` }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-puja-ivory/30 hover:text-puja-ivory transition-colors"
            aria-label={t('close')}
          >
            <X size={20} />
          </button>

          {/* Emoji / Icon */}
          {festival.icon ? (
            <img
              src={getAssetUrl(festival.icon)}
              alt={festival.nameEn}
              className="w-14 h-14 object-contain object-center drop-shadow-[0_0_12px_rgba(212,160,23,0.4)] mb-4"
              loading="lazy"
            />
          ) : (
            <div className="text-4xl mb-4" aria-hidden="true">{festival.emoji}</div>
          )}

          {/* Names */}
          <p className={`bn-text text-sm text-puja-gold/60 mb-1`}>{festival.nameBn}</p>
          <h2 className="font-display text-3xl text-puja-ivory mb-2">{festival.nameEn}</h2>

          {/* Date */}
          {date && (
            <p className="text-xs tracking-[0.15em] text-puja-ivory/30 uppercase">
              {formatDate(date, lang)}
              {festival.bengaliDate && (
                <span className="ml-3 bn-text normal-case tracking-normal">
                  · {festival.bengaliDate}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-puja-gold/10 px-2">
          {tabs.map(tab_ => (
            <button
              key={tab_.key}
              onClick={() => setTab(tab_.key)}
              className={`px-4 py-3 text-xs tracking-[0.1em] uppercase transition-colors duration-200 border-b-2 -mb-px ${
                tab === tab_.key
                  ? 'border-puja-gold text-puja-gold'
                  : 'border-transparent text-puja-ivory/30 hover:text-puja-ivory/60'
              } ${isBn ? 'bn-text normal-case tracking-normal text-sm' : ''}`}
            >
              {tab_.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
          {tab === 'about' && (
            <div className="space-y-4">
              {festival.image && (
                <div className="relative w-full rounded-lg overflow-hidden border border-puja-gold/20 shadow-xl bg-black/40">
                  <img
                    src={getAssetUrl(festival.image)}
                    alt={festival.nameEn}
                    className="w-full h-auto max-h-72 object-contain object-center"
                    style={{
                      display: 'block',
                      filter: 'brightness(1.10) contrast(1.05) saturate(1.08)',
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              <p className={`text-sm text-puja-ivory/70 leading-relaxed ${isBn ? 'bn-text text-base' : ''}`}>
                {desc}
              </p>
            </div>
          )}

          {tab === 'rituals' && (
            <ul className="space-y-4">
              {(festival.rituals || []).map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-puja-gold/50 shrink-0" />
                  <span className={`text-sm text-puja-ivory/60 leading-relaxed ${isBn ? 'bn-text text-base' : ''}`}>
                    {isBn ? r.bn : r.en}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tab === 'significance' && (
            <p className={`text-sm text-puja-ivory/60 leading-relaxed ${isBn ? 'bn-text text-base' : ''}`}>
              {sig}
            </p>
          )}

          {tab === 'food' && (
            <ul className="flex flex-wrap gap-2">
              {(festival.food || []).map((f, i) => (
                <li
                  key={i}
                  className="px-3 py-1.5 border border-puja-gold/20 text-xs text-puja-ivory/50 tracking-wide"
                >
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* Date note */}
          <p className={`text-xs text-puja-ivory/20 leading-relaxed pt-4 border-t border-puja-gold/8 ${isBn ? 'bn-text' : ''}`}>
            {t('dateNote')}
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-puja-gold/10">
          <button
            onClick={onClose}
            className="btn-primary w-full justify-center"
          >
            {t('backToJourney')}
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
