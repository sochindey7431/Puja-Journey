import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/hero/Hero.jsx';
import FestivalSection from '../components/festival/FestivalSection.jsx';
import FestivalProgress from '../components/festival/FestivalProgress.jsx';
import FestivalDetails from '../components/festival/FestivalDetails.jsx';
import NextPujaWidget from '../components/widgets/NextPujaWidget.jsx';
import CalendarPanel from '../components/ui/CalendarPanel.jsx';
import SearchBar from '../components/ui/SearchBar.jsx';
import CategoryFilter from '../components/ui/CategoryFilter.jsx';
import FloatingMusicPlayer from '../components/music/FloatingMusicPlayer.jsx';
import YouTubePlayer from '../components/music/YouTubePlayer.jsx';
import { ENABLE_YOUTUBE_MUSIC } from '../config/musicConfig.js';
import { festivals, getFestivalById } from '../data/festivals.js';
import { useFestivalProgress } from '../hooks/useFestivalProgress.js';
import { useLanguage } from '../hooks/useLanguage.jsx';

export default function Home() {
  const { t, isBn } = useLanguage();
  const { activeFestivalId, scrollToFestival } = useFestivalProgress();

  const [selectedFestival, setSelectedFestival] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  // No tick needed — Countdown manages its own 1-second interval via useCountdown()

  // Keyboard shortcut: Cmd/Ctrl+K to open search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleExplore = useCallback((festival) => {
    setSelectedFestival(festival);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedFestival(null);
  }, []);

  const handleSelectFromCalendar = useCallback((id) => {
    scrollToFestival(id);
  }, [scrollToFestival]);

  const handleSelectFromSearch = useCallback((id) => {
    scrollToFestival(id);
  }, [scrollToFestival]);

  // Filter festivals for the journey list
  const visibleFestivals = categoryFilter === 'all'
    ? festivals
    : festivals.filter(f => f.category === categoryFilter);

  return (
    <div className="min-h-screen bg-puja-black text-puja-ivory" id="page-top">
      {/* Navigation */}
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* Fixed progress nav (desktop only) */}
      <FestivalProgress
        activeFestivalId={activeFestivalId}
        onScrollTo={scrollToFestival}
      />

      {/* Calendar panel (desktop sticky / mobile bottom sheet) */}
      <CalendarPanel onSelectFestival={handleSelectFromCalendar} />

      {/* Next Puja live widget */}
      <NextPujaWidget />

      {/* ── HERO ── */}
      <Hero />

      {/* ── YEAR OVERVIEW ── */}
      <section
        className="relative py-20 md:py-28 px-6 md:px-16 bg-puja-black"
        id="journey"
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section heading */}
          <div className="mb-12 md:mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-puja-gold/40 mb-4">
              {isBn ? `বর্ষ ${new Date().getFullYear()}` : `THE YEAR ${new Date().getFullYear()}`}
            </p>
            <h2 className={`font-display text-3xl md:text-5xl text-puja-ivory mb-6 ${isBn ? 'bn-text' : ''}`}>
              {isBn ? 'উৎসবের যাত্রা' : 'The Festival Journey'}
            </h2>
            <div className="h-px max-w-24 bg-gradient-to-r from-puja-gold/40 to-transparent" />
          </div>

          {/* Category filter */}
          <div className="mb-8">
            <CategoryFilter selected={categoryFilter} onChange={setCategoryFilter} />
          </div>

          {/* Scrollable festival list (compact view for overview) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {visibleFestivals.map(festival => {
              const isActive = activeFestivalId === festival.id;
              return (
                <button
                  key={festival.id}
                  onClick={() => scrollToFestival(festival.id)}
                  className={`group text-left p-4 border transition-all duration-300 ${
                    isActive
                      ? 'border-puja-gold/40 bg-puja-gold/6'
                      : 'border-puja-gold/8 hover:border-puja-gold/25 hover:bg-puja-gold/3'
                  }`}
                  aria-label={`Go to ${festival.nameEn}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">{festival.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="bn-text text-xs text-puja-ivory/30 mb-0.5">{festival.nameBn}</p>
                      <p className={`text-sm font-display text-puja-ivory/70 group-hover:text-puja-ivory transition-colors leading-tight`}>
                        {festival.nameEn}
                      </p>
                      {festival.date?.BD && (
                        <p className="text-xs text-puja-ivory/20 mt-1.5">
                          {new Date(festival.date.BD + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FESTIVAL JOURNEY — Full-screen sections ── */}
      <main id="festivals" aria-label="Festival Journey">
        {festivals.map((festival, index) => (
          <FestivalSection
            key={festival.id}
            festival={festival}
            nextFestival={festivals[index + 1] || null}
            onExplore={handleExplore}
          />
        ))}
      </main>

      {/* ── CALENDAR SECTION ── */}
      <section
        className="py-20 md:py-28 px-6 md:px-16 bg-puja-black border-t border-puja-gold/8"
        id="calendar"
        aria-label="Festival calendar"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.35em] uppercase text-puja-gold/40 mb-4">
              {isBn ? 'সম্পূর্ণ তালিকা' : 'COMPLETE LISTING'}
            </p>
            <h2 className={`font-display text-3xl md:text-5xl text-puja-ivory mb-4 ${isBn ? 'bn-text' : ''}`}>
              {t('calendarTitle')}
            </h2>
            <div className="h-px max-w-24 bg-gradient-to-r from-puja-gold/40 to-transparent" />
          </div>

          {/* Full list */}
          <div className="space-y-0">
            {festivals.map((festival, i) => {
              const d = festival.date?.BD;
              const now = new Date();
              const fDate = d ? new Date(d + 'T12:00:00') : null;
              const isPastF = fDate ? fDate < now : false;

              return (
                <div
                  key={festival.id}
                  className={`flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-puja-gold/8 group ${
                    isPastF ? 'opacity-40' : ''
                  }`}
                >
                  {/* Order number */}
                  <span className="text-xs text-puja-ivory/15 w-6 shrink-0 font-body tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Emoji */}
                  <span className="text-2xl shrink-0" aria-hidden="true">{festival.emoji}</span>

                  {/* Names */}
                  <div className="flex-1 min-w-0">
                    <p className="bn-text text-xs text-puja-ivory/30 mb-0.5">{festival.nameBn}</p>
                    <p className={`font-display text-xl text-puja-ivory/70 group-hover:text-puja-ivory transition-colors ${isBn ? 'text-base' : ''}`}>
                      {festival.nameEn}
                    </p>
                  </div>

                  {/* Date */}
                  {d && (
                    <div className="sm:text-right shrink-0">
                      <p className={`text-sm text-puja-ivory/40 ${isBn ? 'bn-text' : ''}`}>
                        {isBn
                          ? festival.bengaliDate || new Date(d + 'T12:00:00').toLocaleDateString('bn-BD')
                          : new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  )}

                  {/* Navigate button */}
                  <button
                    onClick={() => scrollToFestival(festival.id)}
                    className="shrink-0 text-xs text-puja-ivory/20 hover:text-puja-gold transition-colors opacity-0 group-hover:opacity-100 tracking-widest uppercase"
                    aria-label={`Go to ${festival.nameEn}`}
                  >
                    View →
                  </button>
                </div>
              );
            })}
          </div>

          {/* Date note */}
          <p className={`mt-8 text-xs text-puja-ivory/20 leading-relaxed ${isBn ? 'bn-text' : ''}`}>
            {t('dateNote')}
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── MODALS / OVERLAYS ── */}

      {/* Festival detail slide panel */}
      <AnimatePresence>
        {selectedFestival && (
          <FestivalDetails
            festival={selectedFestival}
            onClose={handleCloseDetails}
          />
        )}
      </AnimatePresence>

      {/* Full-screen search */}
      <AnimatePresence>
        {searchOpen && (
          <SearchBar
            onClose={() => setSearchOpen(false)}
            onSelectFestival={(id) => {
              handleSelectFromSearch(id);
              setSearchOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      {/* YouTube music player bar + video window (when enabled) */}
      {ENABLE_YOUTUBE_MUSIC && <FloatingMusicPlayer />}
      {ENABLE_YOUTUBE_MUSIC && <YouTubePlayer />}
    </div>
  );
}
