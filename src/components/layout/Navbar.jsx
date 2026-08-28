import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useScrollState } from '../../hooks/useScrollState.js';
import LanguageToggle from '../widgets/LanguageToggle.jsx';

export default function Navbar({ onSearchOpen }) {
  const { t } = useLanguage();
  const { scrolled } = useScrollState();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop / main navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[90] flex items-center justify-between px-4 sm:px-8 md:px-10 py-2.5 sm:py-3 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10, 8, 5, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,160,23,0.12)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.4)' : 'none',
        }}
        aria-label="Main navigation"
      >
        {/* Left: Brand / Logo */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group flex-shrink-0"
          aria-label="Puja Journey Home"
        >
          <span className="text-xl" aria-hidden="true">🌺</span>
          <span className="font-display text-base md:text-lg tracking-[0.2em] text-puja-ivory uppercase group-hover:text-puja-gold transition-colors duration-300">
            PUJA JOURNEY
          </span>
        </a>

        {/* Center: Search & Language Switcher (Desktop / Tablet) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Centered Search Pill Button */}
          <button
            type="button"
            onClick={onSearchOpen}
            className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-puja-gold/20 bg-puja-gold/5 hover:bg-puja-gold/10 hover:border-puja-gold/40 text-puja-ivory/60 hover:text-puja-ivory transition-all duration-300 shadow-sm backdrop-blur-sm"
            aria-label="Search festivals"
          >
            <Search size={13} className="text-puja-gold/70 group-hover:text-puja-gold transition-colors" />
            <span className="text-xs text-puja-ivory/50 group-hover:text-puja-ivory/80 font-body">
              {t('searchPlaceholder') || 'Search festivals...'}
            </span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] text-puja-ivory/30 group-hover:text-puja-ivory/50 bg-black/40 border border-puja-gold/15 rounded font-mono">
              <span className="text-[8px]">⌘</span>K
            </kbd>
          </button>

          {/* Centered Language Toggle */}
          <div className="px-3 py-1.5 rounded-full border border-puja-gold/20 bg-puja-gold/5 backdrop-blur-sm hover:border-puja-gold/40 transition-colors">
            <LanguageToggle />
          </div>
        </div>

        {/* Right: About Link (Desktop) & Mobile Controls (Mobile) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* About Navigation Link (Desktop) */}
          <button
            type="button"
            onClick={() => handleNavClick('#about')}
            className="hidden md:inline-flex items-center text-xs tracking-[0.18em] uppercase text-puja-ivory/70 hover:text-puja-gold font-body transition-all duration-300 px-4 py-1.5 rounded-full border border-puja-gold/20 hover:border-puja-gold/40 hover:bg-puja-gold/5"
            role="link"
          >
            {t('navAbout')}
          </button>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onSearchOpen}
              className="p-2 text-puja-ivory/70 hover:text-puja-gold transition-colors rounded-full border border-puja-gold/20 bg-puja-gold/5 active:scale-95"
              aria-label="Open search"
            >
              <Search size={15} />
            </button>
            <div className="px-2.5 py-1.5 rounded-full border border-puja-gold/20 bg-puja-gold/5">
              <LanguageToggle />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-1.5 text-puja-ivory/80 hover:text-puja-gold transition-colors ml-0.5"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,160,23,0.05) 0%, transparent 70%)',
            }} />

            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-puja-ivory/60 hover:text-puja-gold transition-colors p-2"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>

            {/* Logo */}
            <div className="text-4xl mb-6">🌺</div>
            <p className="font-display text-lg tracking-[0.2em] text-puja-ivory uppercase mb-8">
              PUJA JOURNEY
            </p>

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-6">
              <motion.button
                onClick={() => handleNavClick('#about')}
                className="font-display text-2xl text-puja-ivory/80 hover:text-puja-gold transition-colors duration-300 tracking-wider uppercase"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {t('navAbout')}
              </motion.button>
            </nav>

            {/* Language + search */}
            <div className="mt-10 flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => { onSearchOpen(); setMenuOpen(false); }}
                className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-puja-gold/25 bg-puja-gold/10 text-puja-ivory/80 hover:text-puja-gold transition-colors text-sm"
                aria-label="Search festivals"
              >
                <Search size={15} className="text-puja-gold" />
                <span>{t('searchPlaceholder') || 'Search festivals...'}</span>
              </button>
              <div className="px-4 py-1.5 rounded-full border border-puja-gold/25 bg-puja-gold/10">
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
