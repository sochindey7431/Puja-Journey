import { useLanguage } from '../../hooks/useLanguage.jsx';
import { getCategories } from '../../data/festivals.js';

const CATEGORY_LABELS = {
  all:         { en: 'All',       bn: 'সব' },
  puja:        { en: 'Puja',      bn: 'পূজা' },
  festival:    { en: 'Festival',  bn: 'উৎসব' },
  mahalaya:    { en: 'Mahalaya',  bn: 'মহালয়া' },
  'durga-puja':{ en: 'Durga Puja',bn: 'দুর্গাপূজা' },
  regional:    { en: 'Regional',  bn: 'আঞ্চলিক' },
};

export default function CategoryFilter({ selected, onChange }) {
  const { lang, isBn } = useLanguage();
  const categories = getCategories();

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {categories.map(cat => {
        const label = CATEGORY_LABELS[cat]?.[lang] || CATEGORY_LABELS[cat]?.en || cat;
        const isSelected = selected === cat;

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 py-1.5 text-xs transition-all duration-200 border ${
              isSelected
                ? 'border-puja-gold text-puja-gold bg-puja-gold/8'
                : 'border-puja-gold/15 text-puja-ivory/35 hover:border-puja-gold/35 hover:text-puja-ivory/60'
            } ${isBn ? 'bn-text' : 'tracking-[0.1em] uppercase'}`}
            aria-pressed={isSelected}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
