import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { formatDate, isPast } from '../../utils/dateUtils.js';
import { getAssetUrl } from '../../utils/assetUtils.js';
import Countdown from '../ui/Countdown.jsx';
import FestivalMusicButton from '../music/FestivalMusicButton.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function FestivalSection({ festival, nextFestival, onExplore }) {
  const { lang, t, isBn } = useLanguage();
  const sectionRef  = useRef(null);
  const bgRef       = useRef(null);
  const imgRef      = useRef(null);
  const contentRef  = useRef(null);
  const [imgError, setImgError] = useState(false);

  const name     = isBn ? festival.nameBn    : festival.nameEn;
  const subtitle = isBn ? festival.subtitleBn : festival.subtitleEn;
  const date     = festival.date?.BD;
  const past     = date ? isPast(date) : false;

  // GSAP parallax + content reveal on scroll
  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Parallax on the image
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          }
        );
      }

      // Content stagger reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll('.reveal-item'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [festival.id]);

  // Mahalaya gets a special layout
  if (festival.specialType === 'mahalaya') {
    return (
      <MahalayaSection
        festival={festival} nextFestival={nextFestival}
        onExplore={onExplore}
        lang={lang} isBn={isBn} t={t} date={date} past={past}
      />
    );
  }

  return (
    <section
      ref={sectionRef}
      data-festival-id={festival.id}
      className="festival-section relative flex items-center min-h-screen"
      style={{ background: festival.theme?.bg || '#0a0805' }}
      aria-labelledby={`festival-title-${festival.id}`}
    >
      {/* ── Background image with parallax & subtle zoom ── */}
      {festival.image && !imgError && (
        <div className="festival-hero-img-container" aria-hidden="true">
          <img
            ref={imgRef}
            src={getAssetUrl(festival.image)}
            alt={festival.imageAlt || festival.nameEn}
            data-festival={festival.id}
            className="festival-hero-img"
            style={{
              backgroundColor: festival.theme?.bg || '#0a0805',
              filter: 'brightness(1.10) contrast(1.05) saturate(1.08)',
            }}
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {/* ── Deity subject highlight — desktop: right side; mobile: top-center ── */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 42% 58% at 62% 42%, rgba(255,248,230,0.13) 0%, rgba(255,248,230,0.05) 50%, transparent 72%)',
              mixBlendMode: 'soft-light',
            }}
          />
          <div
            aria-hidden="true"
            className="md:hidden absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 50% at 50% 28%, rgba(255,248,230,0.16) 0%, rgba(255,248,230,0.05) 48%, transparent 70%)',
              mixBlendMode: 'soft-light',
            }}
          />
          {/* Desktop Multi-stage horizontal dark gradient */}
          <div
            className="hidden md:block absolute inset-0"
            style={{
              background: `linear-gradient(
                to right,
                ${festival.theme?.bg}f8 0%,
                ${festival.theme?.bg}ea 35%,
                ${festival.theme?.bg}99 65%,
                ${festival.theme?.bg}33 100%
              )`,
            }}
          />
          {/* Mobile vertical gradient: clear at the top, smoothly blending into solid theme background */}
          <div
            className="md:hidden absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                ${festival.theme?.bg}15 0%,
                ${festival.theme?.bg}40 25%,
                ${festival.theme?.bg}cc 65%,
                ${festival.theme?.bg} 100%
              )`,
            }}
          />
          {/* Subtle vertical vignette */}
          <div
            className="hidden md:block absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                ${festival.theme?.bg}80 0%,
                transparent 25%,
                transparent 75%,
                ${festival.theme?.bg}cc 100%
              )`,
            }}
          />
        </div>
      )}

      {/* ── Colour gradient fallback / ambient overlay ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 75% 50%, ${festival.theme?.accent}22 0%, transparent 65%)`,
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* ── Main Content ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-16 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center"
      >
        {/* Left: text column */}
        <div className="flex flex-col gap-5">
          {/* Emoji / Icon + category tag */}
          <div className="reveal-item flex items-center gap-3">
            {festival.icon ? (
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center">
                <img
                  src={getAssetUrl(festival.icon)}
                  alt={festival.nameEn}
                  className="w-full h-full object-contain object-center drop-shadow-[0_0_10px_rgba(212,160,23,0.35)]"
                  loading="lazy"
                />
              </div>
            ) : (
              <span className="text-4xl" aria-hidden="true">{festival.emoji}</span>
            )}
            <span className="text-xs tracking-[0.25em] uppercase text-puja-ivory/30 font-body">
              {festival.category.replace('-', ' ')}
            </span>
          </div>

          {/* Bengali name */}
          <p
            className="reveal-item bn-text text-xl md:text-2xl font-light"
            style={{ color: festival.theme?.accentLight || '#f0c040' }}
          >
            {festival.nameBn}
          </p>

          {/* English title */}
          <h2
            id={`festival-title-${festival.id}`}
            className="reveal-item font-display leading-none text-puja-ivory"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)' }}
          >
            {festival.nameEn}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className={`reveal-item text-sm text-puja-ivory/40 tracking-wide ${isBn ? 'bn-text' : ''}`}>
              {subtitle}
            </p>
          )}

          {/* Accent rule */}
          <div
            className="reveal-item h-px max-w-[60px]"
            style={{ background: `linear-gradient(to right, ${festival.theme?.accent || '#d4a017'}, transparent)` }}
          />

          {/* Date */}
          <div className="reveal-item">
            <p className={`text-sm tracking-[0.1em] text-puja-ivory/60 ${isBn ? 'bn-text' : ''}`}>
              {formatDate(date, lang)}
              {festival.dayBn && (
                <span className="bn-text ml-2 text-puja-ivory/35">· {festival.dayBn}</span>
              )}
            </p>
            {festival.bengaliDate && (
              <p className="bn-text text-xs text-puja-ivory/30 mt-0.5">{festival.bengaliDate}</p>
            )}
          </div>

          {/* Short description */}
          <p className={`reveal-item text-sm text-puja-ivory/50 leading-relaxed max-w-sm ${isBn ? 'bn-text text-base' : ''}`}>
            {isBn ? festival.shortDescriptionBn : festival.shortDescriptionEn}
          </p>

          {/* Action Explore & Music Buttons */}
          <div className="reveal-item flex flex-wrap items-center gap-3 mt-1">
            <button
              type="button"
              onClick={() => onExplore(festival)}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs tracking-wider uppercase transition-all duration-300 backdrop-blur-sm shadow-md active:scale-95 border-puja-gold/30 bg-puja-gold/10 hover:bg-puja-gold/20 text-puja-gold hover:border-puja-gold/60"
              aria-label={`Explore ${festival.nameEn}`}
            >
              {t('explore')}
            </button>
            <FestivalMusicButton
              festivalId={festival.id}
              festivalNameEn={festival.nameEn}
              festivalNameBn={festival.nameBn}
            />
          </div>
        </div>


        {/* Right: countdown */}
        {!past && date && (
          <div className="flex flex-col items-start md:items-end justify-end md:self-end md:pb-4 md:translate-y-6 lg:translate-y-8 pt-6 md:pt-0">
            <div className="reveal-item flex flex-col items-start md:items-end gap-2">
              <p className="text-xs tracking-[0.2em] uppercase text-puja-ivory/30 mb-1">
                {isBn ? 'আর কতদিন' : 'COUNTING DOWN'}
              </p>
              <Countdown targetDate={date} festivalName={festival.nameEn} festivalNameBn={festival.nameBn} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${festival.theme?.bg || '#0a0805'}, transparent)` }}
        aria-hidden="true"
      />
    </section>
  );
}

// ── MAHALAYA SPECIAL SECTION ─────────────────────────────────────
function MahalayaSection({ festival, nextFestival, onExplore, lang, isBn, t, date, past }) {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const imgRef     = useRef(null);
  const [imgError, setImgError] = useState(false);

  // Starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    let raf;
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.3 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.pulse += 0.007;
        const a = 0.15 + Math.abs(Math.sin(s.pulse)) * 0.55;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,180,120,${a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Parallax on bg image
  useEffect(() => {
    if (!sectionRef.current || !imgRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { yPercent: -8 },
        { yPercent: 8, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-festival-id={festival.id}
      className="festival-section relative flex flex-col items-center justify-center text-center overflow-hidden min-h-screen"
      style={{ background: '#020408' }}
      aria-labelledby="mahalaya-title"
    >
      {/* Background image */}
      {festival.image && !imgError && (
        <div className="festival-hero-img-container" aria-hidden="true">
          <img
            ref={imgRef}
            src={getAssetUrl(festival.image)}
            alt={festival.imageAlt || 'Mahalaya night sky'}
            data-festival="mahalaya"
            className="festival-hero-img opacity-45"
            style={{
              backgroundColor: '#020408',
              filter: 'brightness(1.10) contrast(1.05) saturate(1.08)',
            }}
            loading="lazy"
            onError={() => setImgError(true)}
          />
          {/* ── Deity subject highlight — centred soft-light bloom for Mahalaya ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 38% 52% at 50% 35%, rgba(255,248,230,0.14) 0%, rgba(255,248,230,0.04) 50%, transparent 70%)',
              mixBlendMode: 'soft-light',
              pointerEvents: 'none',
            }}
          />
          <div className="hidden md:block absolute inset-0" style={{ background: 'linear-gradient(to bottom, #020408d9 0%, #02040888 50%, #020408f0 100%)' }} />
          <div className="md:hidden absolute inset-0" style={{ background: 'linear-gradient(to bottom, #02040815 0%, #02040855 35%, #020408d9 70%, #020408 100%)' }} />
        </div>
      )}

      {/* Star canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{ width: '100%', height: '100%' }} />

      {/* Moonlight glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 35% 25% at 68% 18%, rgba(200,180,120,0.07) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 60%, rgba(124,109,58,0.07) 0%, transparent 65%)' }} />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-5 px-6 py-24 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {festival.icon ? (
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center mb-2">
            <img
              src={getAssetUrl(festival.icon)}
              alt={festival.nameEn}
              className="w-full h-full object-contain object-center drop-shadow-[0_0_15px_rgba(212,160,23,0.4)]"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="text-5xl mb-2" aria-hidden="true">🌑</div>
        )}
        <p className="text-xs tracking-[0.45em] uppercase text-puja-gold/30">দেবীপক্ষ · Devi Paksha</p>

        <h2 className="bn-text font-bold mahalaya-glow"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', color: '#c9a84c', textShadow: '0 0 60px rgba(201,168,76,0.4), 0 0 120px rgba(201,168,76,0.2)' }}>
          মা আসছেন…
        </h2>
        <p className="font-display text-2xl md:text-4xl text-puja-ivory/35 italic tracking-wide">She is coming…</p>

        <div className="mt-4">
          <p className="bn-text text-base text-puja-gold/45 mb-2">{festival.nameBn}</p>
          <h3 id="mahalaya-title" className="font-display text-5xl md:text-7xl text-puja-ivory tracking-widest uppercase">
            MAHALAYA
          </h3>
        </div>

        {date && (
          <p className={`text-sm tracking-[0.15em] text-puja-ivory/30 ${isBn ? 'bn-text' : ''}`}>
            {formatDate(date, lang)}
            {festival.bengaliDate && <span className="ml-3 bn-text">· {festival.bengaliDate}</span>}
          </p>
        )}

        {!past && date && (
          <div className="mt-4">
            <Countdown targetDate={date} festivalName="Mahalaya" festivalNameBn="মহালয়া" />
          </div>
        )}

        <p className={`max-w-xl text-sm text-puja-ivory/40 leading-relaxed mt-3 ${isBn ? 'bn-text text-base' : ''}`}>
          {isBn ? festival.shortDescriptionBn : festival.shortDescriptionEn}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-3 justify-center">
          <button
            type="button"
            onClick={() => onExplore(festival)}
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm rounded-lg border tracking-wider uppercase transition-all duration-300 backdrop-blur-sm shadow-md active:scale-95 border-puja-gold/30 bg-puja-gold/10 hover:bg-puja-gold/20 text-puja-gold hover:border-puja-gold/60 shadow-[0_0_25px_rgba(201,168,76,0.25)]"
          >
            {t('explore')}
          </button>
          <FestivalMusicButton
            festivalId="mahalaya"
            festivalNameEn="Mahalaya"
            festivalNameBn="মহালয়া"
            className="px-6 py-3 text-sm shadow-[0_0_25px_rgba(201,168,76,0.25)]"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #020408, transparent)' }} aria-hidden="true" />
    </section>
  );
}
