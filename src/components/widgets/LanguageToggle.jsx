import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-xs tracking-wider font-body transition-colors duration-300"
      aria-label={lang === 'en' ? 'Switch to Bengali' : 'Switch to English'}
    >
      <span className={lang === 'bn' ? 'text-puja-gold font-medium' : 'text-puja-ivory/40'}>
        বাংলা
      </span>
      <span className="text-puja-ivory/20">/</span>
      <span className={lang === 'en' ? 'text-puja-gold font-medium' : 'text-puja-ivory/40'}>
        EN
      </span>
    </button>
  );
}
