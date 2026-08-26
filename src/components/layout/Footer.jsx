import { useLanguage } from '../../hooks/useLanguage.jsx';

const navGroups = [
  {
    title: { en: 'Journey', bn: 'যাত্রা' },
    links: [
      { en: 'Festivals', bn: 'উৎসবসমূহ', href: '#journey' },
      { en: 'Mahalaya', bn: 'মহালয়া', href: '#mahalaya' },
      { en: 'Durga Puja', bn: 'দুর্গাপূজা', href: '#durga-puja-shasthi' },
    ],
  },
  {
    title: { en: 'Explore', bn: 'অন্বেষণ' },
    links: [
      { en: 'Calendar', bn: 'ক্যালেন্ডার', href: '#calendar' },
      { en: 'Music', bn: 'সঙ্গীত', href: '#journey' },
      { en: 'About', bn: 'পরিচিতি', href: '#about' },
    ],
  },
];

export default function Footer() {
  const { t, lang, isBn } = useLanguage();

  const handleClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative bg-puja-black border-t border-puja-gold/10 pt-20 pb-10 px-6 md:px-16" id="about">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-puja-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌺</span>
              <span className="font-display text-2xl tracking-[0.2em] text-puja-ivory uppercase">
                PUJA JOURNEY
              </span>
            </div>
            <p className={`text-sm text-puja-ivory/50 leading-relaxed max-w-xs ${isBn ? 'bn-text' : ''}`}>
              {t('footerTagline')}
            </p>
            <div className="mt-6">
              <p className={`text-xs text-puja-ivory/30 leading-relaxed ${isBn ? 'bn-text' : ''}`}>
                {t('footerNote')}
              </p>
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group, gi) => (
            <div key={gi}>
              <h3 className="text-xs tracking-[0.2em] uppercase text-puja-gold/60 mb-5 font-body">
                {group.title[lang] || group.title.en}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link, li) => (
                  <li key={li}>
                    <button
                      onClick={() => handleClick(link.href)}
                      className={`text-sm text-puja-ivory/40 hover:text-puja-gold transition-colors duration-300 ${isBn ? 'bn-text' : ''}`}
                    >
                      {link[lang] || link.en}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* About section */}
        <div className="border-t border-puja-gold/8 pt-10 mb-10">
          <h2 className={`font-display text-2xl text-puja-ivory/80 mb-4 ${isBn ? 'bn-text' : ''}`}>
            {t('aboutTitle')}
          </h2>
          <p className={`text-sm text-puja-ivory/40 leading-relaxed max-w-2xl ${isBn ? 'bn-text' : ''}`}>
            {t('aboutDescription')}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-puja-gold/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-xs text-puja-ivory/25 ${isBn ? 'bn-text' : ''}`}>
            {t('footerCopyright')}
          </p>
          <div className="flex items-center gap-1 text-puja-ivory/20">
            <span className="text-xs">Made with</span>
            <span className="text-puja-gold">♥</span>
            <span className="text-xs">for the festivals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
