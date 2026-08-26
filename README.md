# 🌺 Puja Journey

> **A year of devotion, culture, music & celebration.**

An immersive, cinematic React website that takes you on a scroll-based journey through the major Hindu festivals of the year — with dates, countdowns, Bengali/English bilingual support, music, cultural stories, and an interactive calendar.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
  components/
    festival/     → FestivalSection, FestivalProgress, FestivalDetails
    hero/         → Hero (full-screen cinematic opener)
    layout/       → Navbar, Footer, LoadingScreen
    ui/           → Countdown, MusicPlayer, CalendarPanel, SearchBar, CategoryFilter
    widgets/      → NextPujaWidget, LanguageToggle
  data/
    festivals.js          ← Central festival data (ALL dates, descriptions, music)
    translations/
      en.js               ← English UI strings
      bn.js               ← Bengali UI strings
  hooks/
    useLanguage.jsx       ← Bilingual context
    useCountdown.js       ← Real-time countdown (Bangladesh timezone)
    useFestivalProgress.js← Scroll-based active festival detection
    useScrollState.js     ← Navbar scroll + reduced motion
  pages/
    Home.jsx              ← Main page orchestrator
  utils/
    dateUtils.js          ← Bengali digits, date formatting, calendar utils
  index.css               ← Global styles + Tailwind
  main.jsx                ← React entry point
```

---

## 📅 How to Update Festival Dates

All festival dates are stored in **one place only**:

```
src/data/festivals.js
```

Find the festival by `id` and update its `date` object:

```js
{
  id: 'durga-puja-shasthi',
  date: {
    BD: '2026-10-04',  // Bangladesh date (YYYY-MM-DD)
    IN: '2026-10-04',  // India date
  },
  bengaliDate: '১৮ আশ্বিন ১৪৩৩',
  ...
}
```

> ⚠️ Festival dates follow lunar/panchang calculations and may vary by year. Always verify with an authoritative panchang source before updating.

---

## ➕ How to Add a New Festival

In `src/data/festivals.js`, add a new entry to the `festivals` array:

```js
{
  id: 'new-festival-id',          // unique ID (kebab-case)
  order: 16,                      // display order
  nameEn: 'Festival Name',
  nameBn: 'উৎসবের নাম',
  subtitleEn: 'Subtitle',
  subtitleBn: 'উপশিরোনাম',
  date: { BD: '2026-11-15', IN: '2026-11-15' },
  bengaliDate: '৩০ কার্তিক ১৪৩৩',
  category: 'puja',               // puja | festival | mahalaya | durga-puja
  emoji: '🎆',
  theme: {
    bg: '#0a0805',
    accent: '#d4a017',
    accentLight: '#f0c040',
    text: '#f5e6c8',
    particle: '#f0e8d0',
    gradient: 'from-[#0a0805] via-[#1a1505] to-[#0a0900]',
  },
  descriptionEn: 'English description...',
  descriptionBn: 'বাংলা বিবরণ...',
  shortDescriptionEn: 'Short EN',
  shortDescriptionBn: 'সংক্ষিপ্ত বাংলা',
  rituals: [
    { en: 'Ritual name', bn: 'আচারের নাম' },
  ],
  significance: { en: '...', bn: '...' },
  food: ['Item 1', 'Item 2'],
  music: {
    provider: 'youtube',          // 'youtube' or 'spotify'
    embedUrl: 'https://www.youtube.com/embed/...',
    playlistName: 'Festival Songs',
  },
  image: null,
  isDurgaPujaSubday: false,
  isSpecial: false,
}
```

The festival will **automatically appear** in:
- The cinematic journey (scroll sections)
- The progress navigation
- The calendar panel
- The overview grid
- The search
- The calendar list view

---

## 🎵 How to Change Music / Playlists

In `src/data/festivals.js`, find the festival and update its `music` object:

**YouTube playlist embed:**
```js
music: {
  provider: 'youtube',
  embedUrl: 'https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID',
  playlistName: 'My Playlist Name',
}
```

**Spotify embed:**
```js
music: {
  provider: 'spotify',
  embedUrl: 'https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID',
  playlistName: 'My Spotify Playlist',
}
```

To get a YouTube embed URL:
1. Open a YouTube playlist
2. Share → Embed
3. Copy the `src` from the `<iframe>` tag

---

## 🌐 How to Change Bengali/English Content

**Festival names and descriptions:** `src/data/festivals.js`
- `nameEn` / `nameBn` — festival names
- `descriptionEn` / `descriptionBn` — long descriptions
- `shortDescriptionEn` / `shortDescriptionBn` — short card descriptions

**UI strings (buttons, labels, nav):**
- `src/data/translations/en.js` — English
- `src/data/translations/bn.js` — Bengali

---

## 🌍 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```
Or connect your GitHub repo at [vercel.com](https://vercel.com) and it auto-deploys.

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Set base in vite.config.js:
base: '/your-repo-name/'

# Deploy
npm run deploy
```

---

## 🔮 Future Architecture Notes

- **Year switching:** Festival data is ready for multi-year support. Add a `year` property to the data object and create `festivals2027.js`, etc.
- **API ready:** Replace `src/data/festivals.js` import with an API call — all components consume the same data shape.
- **Regional support:** Each festival already has `date.BD` and `date.IN` — add a location selector to switch.
- **Admin panel:** Data structure is flat JSON — easy to connect to PostgreSQL/MongoDB via FastAPI.

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| GSAP + ScrollTrigger | Scroll animations + parallax |
| Framer Motion | UI transitions + micro-interactions |
| Lucide React | Icons |

---

*Made with devotion. 🌺*
