import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { festivals } from '../../data/festivals.js';
import { formatDateShort, isToday, isPast, toBengaliYearMonth } from '../../utils/dateUtils.js';

const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_BN = ['জানু','ফেব্রু','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টে','অক্টো','নভে','ডিসে'];

export default function CalendarPanel({ onSelectFestival }) {
  const { lang, t, isBn } = useLanguage();
  const [calLang,  setCalLang]  = useState('en');
  const [open,     setOpen]     = useState(false);   // mobile sheet
  const [panelOpen,setPanelOpen]= useState(false);   // desktop hover panel
  const leaveTimer              = useRef(null);

  const currentYear = 2026;

  // Grouped months with festivals
  const months = Array.from({ length: 12 }, (_, mi) => {
    const mFests = festivals.filter(f => {
      const d = f.date?.BD;
      return d && new Date(d + 'T12:00:00').getMonth() === mi;
    });
    return { month: mi, festivals: mFests };
  }).filter(m => m.festivals.length > 0);

  // ── Hover handlers (desktop) ─────────────────────────────────────
  const handleEnter = useCallback(() => {
    clearTimeout(leaveTimer.current);
    setPanelOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    // Small delay so cursor can move from trigger → panel without flicker
    leaveTimer.current = setTimeout(() => setPanelOpen(false), 120);
  }, []);

  // Festival list renderer (shared between desktop and mobile)
  const FestivalList = () => (
    <div className="overflow-y-auto flex-1 py-2">
      {months.map(({ month, festivals: mFests }) => {
        const monthLabel = calLang === 'bn' ? MONTHS_BN[month] : MONTHS_EN[month];
        const bnInfo = toBengaliYearMonth(currentYear, month);

        return (
          <div key={month} className="mb-3">
            <div className="px-4 py-1.5 sticky top-0 bg-[#0d0a06]/90 backdrop-blur-sm z-10">
              <p className={`text-xs font-medium text-puja-ivory/25 ${calLang === 'bn' ? 'bn-text' : 'uppercase tracking-wider'}`}>
                {monthLabel}
                {calLang === 'bn' && (
                  <span className="ml-2 text-puja-ivory/15 text-xs">· {bnInfo.monthName}</span>
                )}
              </p>
            </div>

            {mFests.map(festival => {
              const d      = festival.date?.BD;
              const todayF = d ? isToday(d) : false;
              const pastF  = d ? isPast(d)  : false;

              return (
                <button
                  key={festival.id}
                  onClick={() => { onSelectFestival(festival.id); setOpen(false); setPanelOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors duration-200 group ${
                    todayF ? 'bg-puja-gold/8' : 'hover:bg-puja-gold/5'
                  }`}
                >
                  <span className="text-sm shrink-0" aria-hidden="true">{festival.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs truncate transition-colors leading-snug ${
                      todayF ? 'text-puja-gold' :
                      pastF  ? 'text-puja-ivory/20' :
                               'text-puja-ivory/55 group-hover:text-puja-ivory/90'
                    } ${calLang === 'bn' ? 'bn-text text-sm' : ''}`}>
                      {calLang === 'bn' ? festival.nameBn : festival.nameEn}
                    </p>
                    {d && (
                      <p className={`text-xs mt-0.5 ${pastF ? 'text-puja-ivory/12' : 'text-puja-ivory/22'} ${calLang === 'bn' ? 'bn-text' : ''}`}>
                        {calLang === 'bn' && festival.bengaliDate
                          ? festival.bengaliDate
                          : formatDateShort(d, calLang === 'bn' ? 'bn' : 'en')}
                      </p>
                    )}
                  </div>
                  {todayF && <div className="w-1.5 h-1.5 rounded-full bg-puja-gold animate-pulse shrink-0" />}
                </button>
              );
            })}
          </div>
        );
      })}

      {/* Date note */}
      <div className="px-4 py-3 mt-1 border-t border-puja-gold/8">
        <p className={`text-xs text-puja-ivory/15 leading-relaxed ${isBn ? 'bn-text' : ''}`}>
          {isBn ? '* তারিখ আনুমানিক, পঞ্জিকা অনুযায়ী ভিন্ন হতে পারে।' : '* Dates are indicative per panchang.'}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          DESKTOP — hover-triggered slide drawer
      ════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Invisible hover trigger strip on left edge */}
        <div
          className="fixed left-0 top-0 bottom-0 w-5 z-[45]"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          aria-hidden="true"
        />

        {/* Visible tab indicator (always visible, tiny) */}
        <motion.div
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[46] cursor-pointer"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          animate={{ opacity: panelOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-0 group">
            {/* Thin gold tab bar */}
            <div
              className="w-1 rounded-r-full transition-all duration-300 group-hover:bg-puja-gold"
              style={{
                height: '72px',
                background: 'linear-gradient(to bottom, transparent, rgba(212,160,23,0.5), transparent)',
              }}
            />
            {/* Calendar icon badge */}
            <div
              className="absolute left-1 flex items-center justify-center w-7 h-7 rounded-r-md"
              style={{ background: 'rgba(10,8,5,0.85)', border: '1px solid rgba(212,160,23,0.25)', borderLeft: 'none' }}
            >
              <Calendar size={12} className="text-puja-gold/60" />
            </div>
          </div>
        </motion.div>

        {/* Slide panel */}
        <motion.aside
          className="fixed left-0 top-0 bottom-0 z-[47] flex flex-col"
          style={{
            width: '220px',
            background: 'rgba(8, 6, 3, 0.94)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderRight: '1px solid rgba(212,160,23,0.12)',
            boxShadow: panelOpen ? '8px 0 40px rgba(0,0,0,0.6), 2px 0 0 rgba(212,160,23,0.08)' : 'none',
          }}
          initial={false}
          animate={{ x: panelOpen ? 0 : '-100%' }}
          transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          aria-label="Festival Calendar"
          role="complementary"
          aria-hidden={!panelOpen}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 pt-20 pb-3 border-b border-puja-gold/10 shrink-0">
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-puja-gold/50" />
              <span className={`text-xs tracking-[0.12em] uppercase text-puja-gold/50 ${isBn ? 'bn-text normal-case tracking-normal' : ''}`}>
                {t('calendarTitle')}
              </span>
            </div>
          </div>

          {/* EN / BN toggle */}
          <div className="flex shrink-0 border-b border-puja-gold/10">
            {['en','bn'].map(l => (
              <button
                key={l}
                onClick={() => setCalLang(l)}
                className={`flex-1 py-2 text-xs transition-colors duration-200 ${
                  calLang === l ? 'text-puja-gold bg-puja-gold/5' : 'text-puja-ivory/22 hover:text-puja-ivory/50'
                } ${l === 'bn' ? 'bn-text' : 'tracking-wider'}`}
              >
                {l === 'bn' ? 'বাংলা' : 'EN'}
              </button>
            ))}
          </div>

          <FestivalList />
        </motion.aside>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE — tap to open bottom sheet
      ════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        {/* Floating tab button */}
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 left-4 z-[45] flex items-center gap-2 px-3 py-2.5 text-xs"
          style={{
            background: 'rgba(10,8,5,0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212,160,23,0.2)',
            color: 'rgba(212,160,23,0.7)',
          }}
          aria-label="Open festival calendar"
          aria-expanded={open}
        >
          <Calendar size={14} />
          <span className={isBn ? 'bn-text text-sm' : 'tracking-wider uppercase'}>
            {isBn ? 'ক্যালেন্ডার' : 'Calendar'}
          </span>
        </button>

        {/* Bottom sheet */}
        <AnimatePresence>
          {open && (
            <>
              {/* Scrim */}
              <motion.div
                className="fixed inset-0 z-[110] bg-black/65"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />

              {/* Sheet */}
              <motion.div
                className="fixed bottom-0 left-0 right-0 z-[120] flex flex-col rounded-t-2xl overflow-hidden"
                style={{
                  maxHeight: '72vh',
                  background: 'rgba(8,6,3,0.97)',
                  backdropFilter: 'blur(16px)',
                  borderTop: '1px solid rgba(212,160,23,0.15)',
                }}
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                role="dialog"
                aria-modal="true"
                aria-label="Festival Calendar"
              >
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1 shrink-0">
                  <div className="w-10 h-1 rounded-full bg-puja-ivory/12" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-puja-gold/12 shrink-0">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-puja-gold/50" />
                    <span className={`text-sm text-puja-ivory/55 ${isBn ? 'bn-text' : 'tracking-wide'}`}>
                      {t('calendarTitle')}
                    </span>
                  </div>
                  <button onClick={() => setOpen(false)} className="text-puja-ivory/30 hover:text-puja-ivory/70 transition-colors" aria-label="Close">
                    <X size={18} />
                  </button>
                </div>

                {/* EN / BN toggle */}
                <div className="flex shrink-0 border-b border-puja-gold/10">
                  {['en','bn'].map(l => (
                    <button
                      key={l}
                      onClick={() => setCalLang(l)}
                      className={`flex-1 py-2.5 text-sm transition-colors ${
                        calLang === l ? 'text-puja-gold bg-puja-gold/5' : 'text-puja-ivory/25 hover:text-puja-ivory/55'
                      } ${l === 'bn' ? 'bn-text' : 'tracking-wider'}`}
                    >
                      {l === 'bn' ? 'বাংলা' : 'EN'}
                    </button>
                  ))}
                </div>

                <FestivalList />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
