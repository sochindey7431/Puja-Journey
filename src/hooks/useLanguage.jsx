import { createContext, useContext, useState, useEffect } from 'react';
import en from '../data/translations/en.js';
import bn from '../data/translations/bn.js';

const LanguageContext = createContext(null);

const translations = { en, bn };

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('puja-lang') || 'en'; } catch { return 'en'; }
  });

  useEffect(() => {
    try { localStorage.setItem('puja-lang', lang); } catch {}
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  }, [lang]);

  const t = (key) => translations[lang]?.[key] ?? translations['en']?.[key] ?? key;
  const toggle = () => setLang(l => l === 'en' ? 'bn' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, isBn: lang === 'bn' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
};
