import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function Hero() {
  const { t, isBn } = useLanguage();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Particle ambient background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.2,
      dy: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.pulse += 0.015;
        p.alpha = 0.15 + Math.sin(p.pulse) * 0.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });
      tl.fromTo(titleRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
      .fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(scrollRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.4'
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToFestivals = () => {
    document.querySelector('#festivals')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-between min-h-screen min-h-[100dvh] pt-20 pb-8 sm:pb-10 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #050402 0%, #0a0805 50%, #0d0b06 100%)' }}
      aria-label="Puja Journey — Hero"
      id="top"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(212,160,23,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #050402, transparent)' }}
        aria-hidden="true"
      />

      {/* Spacer for top balance */}
      <div className="w-full h-2 pointer-events-none" aria-hidden="true" />

      {/* Main hero center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 my-auto max-w-4xl">
        {/* 1. Main Title & 2. 2026 */}
        <div ref={titleRef} style={{ opacity: 0 }} className="flex flex-col items-center mb-3 sm:mb-4 md:mb-5 overflow-visible">
          <h1 className="font-display text-[clamp(2.8rem,9vw,9rem)] leading-[1.04] tracking-[0.05em] text-puja-ivory uppercase overflow-visible">
            <span className="block text-gradient-gold pb-1">PUJA</span>
            <span className="block">JOURNEY</span>
          </h1>

          {/* 2026 directly underneath */}
          <div className="flex items-center gap-3 mt-2 sm:mt-3 md:mt-4" aria-label="Year 2026">
            <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-puja-gold/50" />
            <span className="font-display text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.35em] text-puja-gold/90 uppercase font-medium">
              {new Date().getFullYear()}
            </span>
            <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-puja-gold/50" />
          </div>
        </div>

        {/* 3. Bengali subtitle & 4. Tagline */}
        <div ref={subtitleRef} style={{ opacity: 0 }} className="flex flex-col items-center gap-1.5 sm:gap-2">
          <p className="bn-text text-lg sm:text-xl md:text-2xl text-puja-ivory/60 font-light tracking-wide">
            পূজা যাত্রা
          </p>
          <p className={`text-xs sm:text-sm md:text-base text-puja-ivory/50 tracking-[0.1em] max-w-md leading-relaxed ${isBn ? 'bn-text' : 'font-light'}`}>
            {t('heroTagline')}
          </p>
        </div>
      </div>

      {/* 5. Scroll CTA (positioned at the bottom of the viewport) */}
      <div ref={scrollRef} style={{ opacity: 0 }} className="relative z-10 flex flex-col items-center mt-auto">
        <button
          onClick={scrollToFestivals}
          className="group flex flex-col items-center gap-2 text-puja-ivory/40 hover:text-puja-gold transition-colors duration-500"
          aria-label="Scroll to festivals"
        >
          <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase font-body">
            {t('heroScroll')}
          </span>
          {/* Animated scroll indicator */}
          <div className="relative w-px h-8 sm:h-10 bg-puja-ivory/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-puja-gold"
              animate={{ height: ['0%', '100%', '100%'], opacity: [1, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </button>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to top, #0a0805, transparent)' }}
      />
    </section>
  );
}
