import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/hero/Hero.jsx';
import FestivalSection from '../components/festival/FestivalSection.jsx';
import FestivalProgress from '../components/festival/FestivalProgress.jsx';
import FestivalDetails from '../components/festival/FestivalDetails.jsx';
import SearchBar from '../components/ui/SearchBar.jsx';
import FloatingMusicPlayer from '../components/music/FloatingMusicPlayer.jsx';
import YouTubePlayer from '../components/music/YouTubePlayer.jsx';
import MusicAutoplayFallback from '../components/music/MusicAutoplayFallback.jsx';
import { ENABLE_YOUTUBE_MUSIC } from '../config/musicConfig.js';
import { festivals } from '../data/festivals.js';
import { useFestivalProgress } from '../hooks/useFestivalProgress.js';
import { useLanguage } from '../hooks/useLanguage.jsx';
import ErrorBoundary from '../components/ui/ErrorBoundary.jsx';

export default function Home() {
  const { t, isBn } = useLanguage();
  const { activeFestivalId, scrollToFestival } = useFestivalProgress();

  const [selectedFestival, setSelectedFestival] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const handleSelectFromSearch = useCallback((id) => {
    scrollToFestival(id);
  }, [scrollToFestival]);

  return (
    <div className="min-h-screen bg-puja-black text-puja-ivory" id="page-top">
      {/* Navigation */}
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* Fixed progress nav (desktop only) */}
      <FestivalProgress
        activeFestivalId={activeFestivalId}
        onScrollTo={scrollToFestival}
      />

      {/* ── HERO ── */}
      <Hero />

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
      {/* YouTube music player bar + video window + fallback trigger (when enabled) */}
      {ENABLE_YOUTUBE_MUSIC && (
        <ErrorBoundary>
          <FloatingMusicPlayer />
          <YouTubePlayer />
          <MusicAutoplayFallback />
        </ErrorBoundary>
      )}
    </div>
  );
}

