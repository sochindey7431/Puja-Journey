import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { festivals } from '../../data/festivals.js';
import { formatDateShort } from '../../utils/dateUtils.js';
import { getAssetUrl } from '../../utils/assetUtils.js';

export default function SearchBar({ onClose, onSelectFestival }) {
  const { t, lang, isBn } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const results = query.trim().length > 0
    ? festivals.filter(f => {
        const q = query.toLowerCase();
        return (
          f.nameEn.toLowerCase().includes(q) ||
          f.nameBn.includes(query) ||
          f.category.toLowerCase().includes(q) ||
          (f.descriptionEn || '').toLowerCase().includes(q) ||
          (f.descriptionBn || '').includes(query)
        );
      })
    : [];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[250] flex flex-col items-center justify-start pt-24 px-6"
        style={{ background: 'rgba(5,4,2,0.96)', backdropFilter: 'blur(16px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label="Search festivals"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-puja-ivory/30 hover:text-puja-ivory transition-colors"
          aria-label="Close search"
        >
          <X size={22} />
        </button>

        {/* Search input */}
        <motion.div
          className="w-full max-w-2xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <div className="flex items-center gap-4 border-b border-puja-gold/20 pb-4">
            <Search size={20} className="text-puja-gold/40 shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`flex-1 bg-transparent text-xl md:text-2xl text-puja-ivory placeholder-puja-ivory/20 outline-none font-display ${isBn ? 'bn-text' : ''}`}
              aria-label="Search festivals"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-puja-ivory/20 hover:text-puja-ivory/60 transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          className="w-full max-w-2xl mt-8 overflow-y-auto max-h-[60vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {query.trim() && results.length === 0 && (
            <p className={`text-sm text-puja-ivory/30 text-center py-8 ${isBn ? 'bn-text' : ''}`}>
              {t('searchNoResults')}
            </p>
          )}

          {!query.trim() && (
            <div className="text-center py-8">
              <p className="text-xs tracking-[0.25em] uppercase text-puja-ivory/20 mb-6">
                {isBn ? 'জনপ্রিয় উৎসব' : 'POPULAR FESTIVALS'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Durga Puja', 'Mahalaya', 'Kali Puja', 'Lakshmi Puja', 'দুর্গাপূজা'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 text-xs border border-puja-gold/15 text-puja-ivory/40 hover:text-puja-gold hover:border-puja-gold/40 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            {results.map((festival, i) => (
              <motion.button
                key={festival.id}
                onClick={() => { onSelectFestival(festival.id); onClose(); }}
                className="w-full flex items-center gap-4 p-4 border border-puja-gold/8 hover:border-puja-gold/30 hover:bg-puja-gold/4 transition-all duration-200 text-left group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                {festival.icon ? (
                  <img
                    src={getAssetUrl(festival.icon)}
                    alt={festival.nameEn}
                    className="w-8 h-8 object-contain object-center drop-shadow-[0_0_6px_rgba(212,160,23,0.3)] shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-2xl shrink-0">{festival.emoji}</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="bn-text text-sm text-puja-ivory/50 mb-0.5">{festival.nameBn}</p>
                  <p className="font-display text-lg text-puja-ivory group-hover:text-puja-gold transition-colors">
                    {festival.nameEn}
                  </p>
                  {festival.date?.BD && (
                    <p className={`text-xs text-puja-ivory/25 mt-1 ${isBn ? 'bn-text' : ''}`}>
                      {formatDateShort(festival.date.BD, lang)}
                    </p>
                  )}
                </div>
                <ArrowRight size={16} className="text-puja-ivory/20 group-hover:text-puja-gold transition-colors shrink-0" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
