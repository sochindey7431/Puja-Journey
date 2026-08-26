import { useState, useEffect } from 'react';
import { festivals } from '../data/festivals.js';

/**
 * Tracks which festival section is currently in view as user scrolls.
 * Returns the active festival ID and a function to set it manually.
 */
export function useFestivalProgress() {
  const [activeFestivalId, setActiveFestivalId] = useState(festivals[0]?.id || null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      // Find which section is currently most visible
      const sections = document.querySelectorAll('[data-festival-id]');
      let mostVisible = null;
      let maxVisibility = 0;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibility = Math.max(0, visibleHeight) / windowHeight;

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisible = section.dataset.festivalId;
        }
      });

      if (mostVisible) setActiveFestivalId(mostVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFestival = (id) => {
    const el = document.querySelector(`[data-festival-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveFestivalId(id);
    }
  };

  return { activeFestivalId, scrollProgress, scrollToFestival };
}
