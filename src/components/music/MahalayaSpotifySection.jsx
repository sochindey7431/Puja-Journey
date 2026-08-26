/**
 * PUJA JOURNEY — MahalayaSpotifySection
 *
 * Official Spotify Embed Player section for the Mahalaya festival page.
 * Contains the exact official Spotify embed iframe with all permissions:
 * allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
 */
import { motion } from 'framer-motion';

const SPOTIFY_IFRAME_HTML = `<iframe data-testid="embed-iframe" style="border-radius:12px; width:100%; height:352px; border:none;" src="https://open.spotify.com/embed/album/2yU7DO6QLIgHallIfJe1gk?utm_source=generator&si=e0d9ce4eef144eca" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Mahalayar Gaan — Supriti Ghosh"></iframe>`;

export default function MahalayaSpotifySection() {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mt-8 px-4"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Beautiful Mahalaya-Themed Card Container ── */}
      <div
        className="relative rounded-2xl overflow-hidden backdrop-blur-xl border border-[#c9a84c]/25 bg-gradient-to-b from-[#0a0812]/90 via-[#030408]/95 to-[#020306]/95 p-5 md:p-6"
        style={{
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(201, 168, 76, 0.15)',
        }}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.18) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* ── Section Header ── */}
        <div className="relative z-10 mb-4 pb-3 border-b border-[#c9a84c]/15">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base" aria-hidden="true">🎵</span>
            <h3 className="font-display text-xl md:text-2xl text-puja-ivory font-medium tracking-wide">
              Mahalaya Music
            </h3>
          </div>
          <p className="text-xs md:text-sm text-puja-ivory/60 leading-relaxed font-body">
            Listen to the timeless devotional songs of Mahalaya
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1DB954]/10 border border-[#1DB954]/25 text-[#1DB954] text-[11px] font-medium">
              <span>💡</span>
              <span>Tip: Click <strong>"Log In"</strong> inside the Spotify player to play <strong>Full Songs</strong></span>
            </span>
          </div>
        </div>

        {/* ── Official Spotify Embed IFrame Container ── */}
        <div
          className="relative z-10 w-full rounded-xl overflow-hidden shadow-inner"
          dangerouslySetInnerHTML={{ __html: SPOTIFY_IFRAME_HTML }}
        />
      </div>
    </motion.div>
  );
}
