import { Github, Linkedin, Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { getAssetUrl } from '../../utils/assetUtils.js';

export default function Footer() {
  const { isBn } = useLanguage();

  return (
    <footer
      className="relative bg-puja-black border-t border-puja-gold/10 pt-16 md:pt-20 pb-10 px-6 sm:px-10 md:px-16 overflow-hidden"
      id="about"
      aria-label="Footer"
    >
      {/* Top ambient gold glow divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-puja-gold/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Main 2-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pb-12 border-b border-puja-gold/8">
          
          {/* LEFT SIDE — ABOUT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-xs tracking-[0.25em] uppercase text-puja-gold/70 font-body mb-3 flex items-center gap-2">
              <span className="text-sm" aria-hidden="true">🌺</span>
              <span>{isBn ? 'পূজা যাত্রা সম্পর্কে' : 'ABOUT PUJA JOURNEY'}</span>
            </h2>
            <p className={`text-sm md:text-base text-puja-ivory/60 leading-relaxed max-w-lg ${isBn ? 'bn-text' : 'font-light'}`}>
              {isBn
                ? 'পূজা যাত্রা হলো আমাদের প্রিয় উৎসবগুলোর ভক্তি, সংস্কৃতি, সঙ্গীত ও ঐতিহ্য উদযাপনের একটি ডিজিটাল স্থান।'
                : 'Puja Journey is a digital space dedicated to celebrating the devotion, culture, music and traditions behind the festivals we love.'}
            </p>
          </div>

          {/* RIGHT SIDE — CREATOR */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Profile photo + Creator details side-by-side */}
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-7 group">
              {/* Large circular photo with subtle golden border and hover glow */}
              <div className="relative flex-shrink-0">
                <img
                  src={getAssetUrl('/images/creator.jpg')}
                  alt="Sochin Dey"
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-[150px] lg:h-[150px] rounded-full object-cover object-top border border-puja-gold/30 ring-2 ring-puja-gold/10 shadow-xl transition-all duration-300 group-hover:scale-[1.03] group-hover:border-puja-gold/60 group-hover:shadow-[0_0_24px_rgba(212,160,23,0.25)]"
                  loading="lazy"
                />
              </div>

              {/* Exact text hierarchy: Created By -> Sochin Dey -> Designer & Developer -> Social Icons */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-puja-ivory/50 font-body mb-1">
                  {isBn ? 'সযত্নে নির্মিত' : 'Created By'}
                </p>
                <p className="font-display text-2xl sm:text-3xl md:text-[1.85rem] text-puja-ivory tracking-wide font-medium leading-tight mb-1">
                  Sochin Dey
                </p>
                <p className="text-xs sm:text-sm text-puja-gold/80 tracking-wider font-body mb-3">
                  {isBn ? 'ডিজাইনার ও ডেভেলপার' : 'Designer & Developer'}
                </p>

                {/* Social Icons row */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/sochindey7431"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-puja-ivory/50 hover:text-puja-gold hover:scale-110 transition-all duration-300 p-1"
                    aria-label="GitHub — Sochin Dey"
                  >
                    <Github size={19} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sochin-dey-1456133a5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-puja-ivory/50 hover:text-puja-gold hover:scale-110 transition-all duration-300 p-1"
                    aria-label="LinkedIn — Sochin Dey"
                  >
                    <Linkedin size={19} />
                  </a>
                  <a
                    href="https://sochindey7431.github.io/sochin_portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-puja-ivory/50 hover:text-puja-gold hover:scale-110 transition-all duration-300 p-1"
                    aria-label="Portfolio Website — Sochin Dey"
                  >
                    <Globe size={19} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-xs text-puja-ivory/30 tracking-wider font-body">
            © {new Date().getFullYear()} Puja Journey. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-puja-ivory/25">
            <span>Made with</span>
            <span className="text-puja-gold/70" aria-label="love">♥</span>
            <span>for culture & tradition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
