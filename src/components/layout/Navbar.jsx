import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useScrollState } from '../../hooks/useScrollState.js';
import LanguageToggle from '../widgets/LanguageToggle.jsx';

const navLinks = [
  { key: 'navJourney',   href: '#journey' },
  { key: 'navCalendar',  href: '#calendar' },
  { key: 'navFestivals', href: '#festivals' },
  { key: 'navAbout',     href: '#about' },
];

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
        className="fixed top-0 left-0 right-0 z-[90] flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10, 8, 5, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,160,23,0.1)' : 'none',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group"
          aria-label="Puja Journey Home"
        >
          <span className="text-xl" aria-hidden="true">🌺</span>
          <span className="font-display text-base md:text-lg tracking-[0.2em] text-puja-ivory uppercase group-hover:text-puja-gold transition-colors duration-300">
            PUJA JOURNEY
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map(link => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.href)}
              className="text-xs tracking-[0.15em] uppercase text-puja-ivory/60 hover:text-puja-gold transition-colors duration-300 font-body"
              role="listitem"
            >
              {t(link.key)}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Search button */}
          <button
            onClick={onSearchOpen}
            className="hidden md:flex text-puja-ivory/50 hover:text-puja-gold transition-colors duration-300"
            aria-label="Open search"
          >
            <Search size={16} />
          </button>

          {/* Language toggle */}
          <LanguageToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-puja-ivory/70 hover:text-puja-gold transition-colors duration-300"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} />
          </button>
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
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
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
              className="absolute top-6 right-6 text-puja-ivory/60 hover:text-puja-gold transition-colors"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {/* Logo */}
            <div className="text-4xl mb-8">🌺</div>

            {/* Nav links */}
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display text-3xl text-puja-ivory/80 hover:text-puja-gold transition-colors duration-300 tracking-wide"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  {t(link.key)}
                </motion.button>
              ))}
            </nav>

            {/* Language + search */}
            <div className="mt-12 flex items-center gap-6">
              <button
                onClick={() => { onSearchOpen(); setMenuOpen(false); }}
                className="text-puja-ivory/50 hover:text-puja-gold transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
