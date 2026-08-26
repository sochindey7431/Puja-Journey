/**
 * PUJA JOURNEY — Central Festival Data
 *
 * Dates verified & updated per user-provided panjika (22 Aug 2026).
 * Dates use ISO format YYYY-MM-DD. Bengali dates per Bangla calendar 1433.
 *
 * To add a festival: copy an entry, give unique `id`, update all fields.
 * To change music:   update `music.embedUrl`.
 * To change photos:  update `image` URL.
 */

export const YEAR = 2026;

export const festivals = [

  // ─────────────────────────────────────────────────────────────────
  // 1. SARASWATI PUJA — ৯ মাঘ ১৪৩২ | 23 January 2026
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'saraswati-puja',
    order: 1,
    nameEn: 'Saraswati Puja',
    nameBn: 'সরস্বতী পূজা',
    subtitleEn: 'Goddess of Wisdom & Arts',
    subtitleBn: 'জ্ঞান ও শিল্পের দেবী',
    date: { BD: '2026-01-23', IN: '2026-01-23' },
    bengaliDate: '৯ মাঘ ১৪৩২',
    dayBn: 'শুক্রবার',
    category: 'puja',
    emoji: '📿',
    theme: {
      bg: '#0f0d08', accent: '#d4a017', accentLight: '#f0c040',
      text: '#faf3e0', particle: '#f0e8d0',
      gradient: 'from-[#0f0d08] via-[#1a1505] to-[#0a0900]',
    },
    image: '/images/festivals/Saraswati Puja.jpg',
    imageAlt: 'White flowers and sacred offerings for Saraswati Puja',
    descriptionEn: 'Saraswati Puja celebrates the Hindu goddess of knowledge, music, art, wisdom, and learning. Students worship the goddess seeking blessings for academic success and artistic excellence. The festival falls on Basant Panchami — the fifth day of the bright fortnight of Magh — heralding the arrival of spring.',
    descriptionBn: 'সরস্বতী পূজা হিন্দু জ্ঞান, সঙ্গীত, শিল্প ও বিদ্যার দেবী সরস্বতীকে উৎসর্গ করা হয়। শিক্ষার্থীরা পড়াশোনায় সাফল্য ও শিল্পীসত্তার বিকাশের জন্য দেবীর আশীর্বাদ প্রার্থনা করে। উৎসবটি বসন্ত পঞ্চমীতে পড়ে এবং বসন্তের আগমনকে স্বাগত জানায়।',
    shortDescriptionEn: 'Celebrate the goddess of knowledge and arts.',
    shortDescriptionBn: 'জ্ঞান ও শিল্পের দেবীকে পূজা।',
    rituals: [
      { en: 'Panchamrita Snan (ritual bathing of the idol)', bn: 'পঞ্চামৃত স্নান' },
      { en: 'Pushpanjali (flower offering ceremony)', bn: 'পুষ্পাঞ্জলি' },
      { en: 'Placing books and instruments before the goddess', bn: 'বই ও বাদ্যযন্ত্র দেবীর পায়ে রাখা' },
      { en: 'Kul bhakshan (tasting winter fruits)', bn: 'কুল ভক্ষণ' },
    ],
    significance: {
      en: 'Saraswati Puja marks the beginning of spring. Students traditionally refrain from studying as their books are placed before the goddess for her blessing.',
      bn: 'সরস্বতী পূজা বসন্তের সূচনা করে। এই দিন ছাত্রছাত্রীরা বই দেবীর সামনে রেখে পূজায় মগ্ন হয়।',
    },
    food: ['Khichuri', 'Bhoger khichuri', 'Labra', 'Payesh', 'Kul'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Saraswati Puja Bhajans' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. MAHA SHIVARATRI — ৩ ফাল্গুন ১৪৩২ | 15 February 2026
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'shivaratri',
    order: 2,
    nameEn: 'Maha Shivaratri',
    nameBn: 'মহাশিবরাত্রি',
    subtitleEn: 'The Great Night of Shiva',
    subtitleBn: 'মহাদেবের পবিত্র রাত',
    date: { BD: '2026-02-15', IN: '2026-02-15' },
    bengaliDate: '৩ ফাল্গুন ১৪৩২',
    dayBn: 'রবিবার',
    category: 'puja',
    emoji: '🔱',
    theme: {
      bg: '#08061a', accent: '#6b46c1', accentLight: '#9f7aea',
      text: '#e8e0ff', particle: '#c4b5fd',
      gradient: 'from-[#08061a] via-[#0d0a2e] to-[#050314]',
    },
    image: '/images/festivals/Maha Shivaratri Puja.jpg',
    imageAlt: 'Shiva lingam with offerings and incense',
    descriptionEn: 'Maha Shivaratri is one of the most significant Hindu festivals celebrating Lord Shiva. Devotees observe a night-long vigil, fast, and offer bilva leaves, milk, and water to the Shivalinga. It is believed that Lord Shiva performed the Tandava dance on this night.',
    descriptionBn: 'মহাশিবরাত্রি হিন্দুদের অন্যতম গুরুত্বপূর্ণ উৎসব যা শিবের স্মরণে পালিত হয়। ভক্তরা সারারাত জেগে থাকে, উপবাস করে এবং শিবলিঙ্গে বেলপাতা, দুধ ও জল ঢেলে পূজা করে।',
    shortDescriptionEn: 'The sacred night dedicated to Lord Shiva.',
    shortDescriptionBn: 'মহাদেবের পবিত্র রাতের উৎসব।',
    rituals: [
      { en: 'Rudrabhishek (ritual bathing of Shivalinga)', bn: 'রুদ্রাভিষেক' },
      { en: 'Offering bilva (bel) leaves', bn: 'বেলপাতা অর্পণ' },
      { en: 'Night-long vigil and jagaran', bn: 'রাতভর জাগরণ' },
      { en: 'Chanting Om Namah Shivaya', bn: 'ওঁ নমঃ শিবায় জপ' },
    ],
    significance: {
      en: 'Shivaratri commemorates the marriage of Lord Shiva and Parvati, and the night when Shiva performed the cosmic Tandava dance.',
      bn: 'শিবরাত্রি ভগবান শিব ও পার্বতীর বিবাহের স্মরণে পালিত হয়।',
    },
    food: ['Fruits', 'Thandai', 'Milk-based sweets', 'Sabudana khichdi'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Shiva Bhajans' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. DOL PURNIMA — ১৯ ফাল্গুন ১৪৩২ | 3 March 2026 | মঙ্গলবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'dol-purnima',
    order: 3,
    nameEn: 'Dol Purnima',
    nameBn: 'দোল পূর্ণিমা',
    subtitleEn: 'The Spring Festival of Colours & Love',
    subtitleBn: 'বসন্তোৎসব ও রঙের উৎসব',
    date: { BD: '2026-03-03', IN: '2026-03-03' },
    bengaliDate: '১৯ ফাল্গুন ১৪৩২',
    dayBn: 'মঙ্গলবার',
    category: 'festival',
    emoji: '🌸',
    theme: {
      bg: '#180512', accent: '#e84393', accentLight: '#fd79a8',
      text: '#fff0f5', particle: '#f8a5c2',
      gradient: 'from-[#180512] via-[#2d0a22] to-[#0c0209]',
    },
    image: '/images/festivals/Dol Jatra.jpg',
    imageAlt: 'Radha Krishna Dol festival with natural abir colors and palash flowers',
    descriptionEn: 'Dol Purnima, celebrated on the full moon of Phalguna, is Bengal\'s unique devotional festival of colours dedicated to Radha and Lord Krishna. Celebrated with abir, devotional kirtans, and palash flowers, it also marks the auspicious advent of Chaitanya Mahaprabhu.',
    descriptionBn: 'দোল পূর্ণিমা ফাল্গুন মাসের পূর্ণিমা তিথিতে রাধাকৃষ্ণের প্রেম ও রঙের মহাপবিত্র উৎসব। শান্তিনিকেতনের বসন্তোৎসব এবং বাংলার ঘরে ঘরে আবীর খেলা, সংকীর্তন ও পলাশ ফুলে উৎসব মুখরিত হয়। এই দিনে চৈতন্য মহাপ্রভুর শুভ আবির্ভাব ঘটেছিল।',
    shortDescriptionEn: 'The vibrant festival of colours and divine love.',
    shortDescriptionBn: 'রঙ ও প্রেমের মহামিলন বসন্তোৎসব।',
    rituals: [
      { en: 'Offering abir to Radha-Krishna deities', bn: 'রাধাকৃষ্ণের চরণে আবীর নিবেদন' },
      { en: 'Swinging the deities in decorated dol', bn: 'সজ্জিত দোলায় দোলাদান' },
      { en: 'Singing devotional kirtans and Rabindrasangeet', bn: 'সংকীর্তন ও বসন্তের গান' },
      { en: 'Playing with organic abir and gulal', bn: 'আবীর ও রঙ খেলা' },
    ],
    significance: {
      en: 'Dol Purnima celebrates divine love, renewal of life in spring, and the birth anniversary of Chaitanya Mahaprabhu.',
      bn: 'দোল পূর্ণিমা বসন্তের নবজীবন, রাধাকৃষ্ণের দিব্য প্রেম এবং চৈতন্য মহাপ্রভুর জন্মতিথির স্মারক।',
    },
    food: ['Malpua', 'Payesh', 'Sandesh', 'Laddoo', 'Thandai'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Dol Purnima & Holi Songs' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. RATH YATRA — ১ আষাঢ় ১৪৩৩ | 16 July 2026
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'rath-yatra',
    order: 4,
    nameEn: 'Rath Yatra',
    nameBn: 'রথযাত্রা',
    subtitleEn: 'The Chariot Festival of Lord Jagannath',
    subtitleBn: 'জগন্নাথের রথযাত্রা',
    date: { BD: '2026-07-16', IN: '2026-07-16' },
    bengaliDate: '১ আষাঢ় ১৪৩৩',
    dayBn: 'বৃহস্পতিবার',
    category: 'festival',
    emoji: '🏛️',
    theme: {
      bg: '#1a0d00', accent: '#e67e22', accentLight: '#f39c12',
      text: '#fdf3e3', particle: '#f5cba7',
      gradient: 'from-[#1a0d00] via-[#2d1500] to-[#0d0700]',
    },
    image: '/images/festivals/Jagannath Rath Yatra.jpg',
    imageAlt: 'Colorful temple chariot procession with devotees',
    descriptionEn: 'Rath Yatra is the grand chariot festival of Lord Jagannath celebrated with immense devotion. Huge chariots carry the deities Lord Jagannath, Balabhadra, and Subhadra through the streets. In Bengal, Rath Yatra holds special cultural significance and is celebrated with fairs (mela) and cultural programs.',
    descriptionBn: 'রথযাত্রা জগন্নাথদেবের বিশাল রথোৎসব যা অসীম ভক্তি ও শ্রদ্ধার সাথে পালিত হয়। বিশাল রথে করে জগন্নাথ, বলভদ্র ও সুভদ্রাকে রাস্তায় বের করা হয়।',
    shortDescriptionEn: 'The grand chariot procession of Lord Jagannath.',
    shortDescriptionBn: 'জগন্নাথদেবের মহা রথযাত্রা।',
    rituals: [
      { en: 'Pulling of the sacred chariot (rath)', bn: 'পবিত্র রথ টানা' },
      { en: 'Chhera Pahara (ritual sweeping)', bn: 'ছেরা পহরা' },
      { en: 'Grand procession through streets', bn: 'রাস্তায় মহামিছিল' },
      { en: 'Distribution of Mahaprasad', bn: 'মহাপ্রসাদ বিতরণ' },
    ],
    significance: {
      en: 'Rath Yatra symbolises the journey of Lord Jagannath to his aunt\'s home. Pulling the chariot is considered an act of great merit.',
      bn: 'রথযাত্রা জগন্নাথের মাসির বাড়ি যাওয়ার যাত্রাকে প্রতীকায়িত করে।',
    },
    food: ['Mahaprasad', 'Khichuri', 'Pitha', 'Local sweets'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Rath Yatra Songs' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. KRISHNA JANMASHTAMI — ২০ ভাদ্র ১৪৩৩ | 4 September 2026 | শুক্রবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'janmashtami',
    order: 5,
    nameEn: 'Krishna Janmashtami',
    nameBn: 'জন্মাষ্টমী',
    subtitleEn: 'Birth of Lord Krishna',
    subtitleBn: 'শ্রীকৃষ্ণের জন্মদিন',
    date: { BD: '2026-09-04', IN: '2026-09-04' },
    bengaliDate: '২০ ভাদ্র ১৪৩৩',
    dayBn: 'শুক্রবার',
    category: 'festival',
    emoji: '🦚',
    theme: {
      bg: '#050d1a', accent: '#4a90d9', accentLight: '#74b8f8',
      text: '#e8f4ff', particle: '#b3d9f7',
      gradient: 'from-[#050d1a] via-[#0a1530] to-[#020810]',
    },
    image: '/images/festivals/Janmashtami.jpg',
    imageAlt: 'Lord Krishna playing flute adorned with peacock feather crown in moonlight',
    descriptionEn: 'Krishna Janmashtami celebrates the divine birth of Lord Krishna, the eighth avatar of Lord Vishnu. Devotees observe a day-long fast and celebrate at midnight with joyous prayers, devotional songs, Dahi Handi, and temple festivities.',
    descriptionBn: 'জন্মাষ্টমী বিষ্ণুর অষ্টম অবতার পরমেশ্বর ভগবান শ্রীকৃষ্ণের শুভ আবির্ভাব তিথি। ভক্তরা দিনব্যাপী উপবাস পালন করে এবং মধ্যরাতে ভজন, কীর্তন, ভোগ নিবেদন ও মন্দিরে আনন্দোৎসবে মেতে ওঠেন।',
    shortDescriptionEn: 'May your heart be filled with the sacred joy of Lord Krishna\'s birth.',
    shortDescriptionBn: 'শ্রীকৃষ্ণের জন্মতিথির পবিত্র আনন্দে ভরে উঠুক হৃদয়।',
    rituals: [
      { en: 'Midnight Puja at exact birth time', bn: 'মধ্যরাতে পূজা' },
      { en: 'Dahi Handi (pot breaking ceremony)', bn: 'দহি হান্ডি ভাঙা' },
      { en: 'Raas Leela performance', bn: 'রাসলীলা অনুষ্ঠান' },
      { en: 'Recitation of Bhagavad Gita', bn: 'ভগবদ্গীতা পাঠ' },
    ],
    significance: {
      en: 'Janmashtami marks the advent of the divine to end evil and restore righteousness on earth.',
      bn: 'জন্মাষ্টমী পৃথিবীতে অধর্মের অবসান ঘটাতে ঈশ্বরের আগমনকে স্মরণ করে।',
    },
    food: ['Makhan (butter)', 'Panchamrit', 'Mathura peda', 'Fruit chaat'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Krishna Bhajans' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 6. GANESH CHATURTHI — ৩০ ভাদ্র ১৪৩৩ | 14 September 2026 | সোমবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'ganesh-chaturthi',
    order: 6,
    nameEn: 'Ganesh Chaturthi',
    nameBn: 'গণেশ চতুর্থী',
    subtitleEn: 'Festival of Lord Ganesha',
    subtitleBn: 'বিঘ্নহর্তা গণেশের উৎসব',
    date: { BD: '2026-09-14', IN: '2026-09-14' },
    bengaliDate: '৩০ ভাদ্র ১৪৩৩',
    dayBn: 'সোমবার',
    category: 'puja',
    emoji: '🐘',
    theme: {
      bg: '#1a0800', accent: '#e67e22', accentLight: '#f39c12',
      text: '#fdf3e3', particle: '#f5cba7',
      gradient: 'from-[#1a0800] via-[#2d1200] to-[#0d0600]',
    },
    image: '/images/festivals/Ganesh Chaturthi .jpg',
    imageAlt: 'Lord Ganesha idol with decorations for Ganesh Chaturthi',
    descriptionEn: 'Ganesh Chaturthi celebrates the birth of Lord Ganesha — the elephant-headed deity of wisdom, prosperity, and new beginnings. The festival spans 10 days with installation of Ganesha idols, followed by grand immersion (visarjan) on Anant Chaturdashi.',
    descriptionBn: 'গণেশ চতুর্থী হাতি-মাথার বিজ্ঞান, সমৃদ্ধি ও নতুন শুরুর দেবতা গণেশের জন্মদিন উপলক্ষে পালিত হয়। ১০ দিনব্যাপী উৎসবে বাড়ি ও সার্বজনীন প্যান্ডেলে গণেশের মূর্তি স্থাপন করা হয়।',
    shortDescriptionEn: 'Ten days of joy with Lord Ganesha.',
    shortDescriptionBn: 'গণেশের সাথে দশ দিনের আনন্দ।',
    rituals: [
      { en: 'Sthapana (installation of Ganesha idol)', bn: 'স্থাপনা' },
      { en: 'Daily aarti and modak offering', bn: 'দৈনিক আরতি ও মোদক নিবেদন' },
      { en: 'Visarjan (immersion in water)', bn: 'বিসর্জন' },
      { en: 'Ganesh Stotra recitation', bn: 'গণেশ স্তোত্র পাঠ' },
    ],
    significance: {
      en: 'Ganesha is the remover of obstacles and patron of arts and sciences.',
      bn: 'গণেশ বিঘ্নহর্তা এবং শিল্পকলা ও বিজ্ঞানের পৃষ্ঠপোষক।',
    },
    food: ['Modak', 'Ladoo', 'Karanji', 'Ukdiche modak'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Ganesh Aarti Collection' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 7. VISHWAKARMA PUJA — ২ আশ্বিন ১৪৩৩ | 17 September 2026 | বৃহস্পতিবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'vishwakarma-puja',
    order: 7,
    nameEn: 'Vishwakarma Puja',
    nameBn: 'বিশ্বকর্মা পূজা',
    subtitleEn: 'The Divine Architect of the Universe',
    subtitleBn: 'দেবশিল্পী বিশ্বকর্মার পূজা',
    date: { BD: '2026-09-17', IN: '2026-09-17' },
    bengaliDate: '২ আশ্বিন ১৪৩৩',
    dayBn: 'বৃহস্পতিবার',
    category: 'puja',
    emoji: '🔨',
    theme: {
      bg: '#0d0d1a', accent: '#4a90d9', accentLight: '#74b8f8',
      text: '#e8f4ff', particle: '#a8d4f5',
      gradient: 'from-[#0d0d1a] via-[#111124] to-[#080812]',
    },
    image: '/images/festivals/Vishwakarma Puja.jpg',
    imageAlt: 'Artisan tools and kite flying for Vishwakarma Puja',
    descriptionEn: 'Vishwakarma Puja honours Lord Vishwakarma — the divine architect and craftsman of the universe. Celebrated by artisans, mechanics, workers, and factories, this puja is the annual festival of the working class who worship their tools, machines, and workplaces.',
    descriptionBn: 'বিশ্বকর্মা পূজায় ভগবান বিশ্বকর্মাকে সম্মান জানানো হয় — যিনি ব্রহ্মাণ্ডের দেবশিল্পী। কারিগর, মেকানিক, শ্রমিক ও কারখানায় পালিত এই পূজা শ্রমজীবী মানুষের বার্ষিক উৎসব।',
    shortDescriptionEn: 'Honouring the divine craftsman and workers.',
    shortDescriptionBn: 'দেবশিল্পী ও কর্মজীবীদের উৎসব।',
    rituals: [
      { en: 'Puja of tools, machines, and workplaces', bn: 'যন্ত্রপাতি ও কর্মক্ষেত্রের পূজা' },
      { en: 'Flying kites (especially in Bengal)', bn: 'ঘুড়ি ওড়ানো' },
      { en: 'Community feast for workers', bn: 'শ্রমিকদের সামষ্টিক ভোজ' },
      { en: 'Offering sweets and flowers', bn: 'মিষ্টি ও ফুল নিবেদন' },
    ],
    significance: {
      en: 'Vishwakarma Puja celebrates the dignity of labour and the skill of craftsmen.',
      bn: 'বিশ্বকর্মা পূজা শ্রমের মর্যাদা ও কারিগরের দক্ষতাকে উদযাপন করে।',
    },
    food: ['Khichuri', 'Luchi', 'Alur dum', 'Mishti doi', 'Rosogolla'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Vishwakarma Puja Songs' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 8. MAHALAYA — ২৩ আশ্বিন ১৪৩৩ | 10 October 2026 | শনিবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'mahalaya',
    order: 8,
    nameEn: 'Mahalaya',
    nameBn: 'মহালয়া',
    subtitleEn: 'She is Coming…',
    subtitleBn: 'মা আসছেন…',
    date: { BD: '2026-10-10', IN: '2026-10-10' },
    bengaliDate: '২৩ আশ্বিন ১৪৩৩',
    dayBn: 'শনিবার',
    category: 'mahalaya',
    emoji: '🌑',
    theme: {
      bg: '#020408', accent: '#7c6d3a', accentLight: '#c9a84c',
      text: '#e8ddc8', particle: '#d4b896',
      gradient: 'from-[#020408] via-[#050810] to-[#010204]',
    },
    image: '/images/festivals/Mahalaya.jpg',
    imageAlt: 'Night sky with moon and fog — Mahalaya atmosphere',
    descriptionEn: 'Mahalaya marks the beginning of Devi Paksha — the fortnight of the Goddess. In Bengal, Mahalaya is inseparable from the legendary radio programme "Mahishasura Mardini" by Birendra Krishna Bhadra, broadcast on All India Radio since 1931. Played at 4 AM, it signals the arrival of Goddess Durga from her celestial abode.',
    descriptionBn: 'মহালয়া দেবীপক্ষের সূচনা করে। বাংলায় মহালয়া বীরেন্দ্রকৃষ্ণ ভদ্রের কিংবদন্তি রেডিও অনুষ্ঠান "মহিষাসুরমর্দিনী" থেকে অবিচ্ছেদ্য, যা ১৯৩১ সাল থেকে আকাশবাণীতে প্রচারিত হচ্ছে।',
    shortDescriptionEn: 'The dawn of Devi Paksha — Mother arrives.',
    shortDescriptionBn: 'দেবীপক্ষের সূচনা — মায়ের আগমন।',
    rituals: [
      { en: 'Pre-dawn listening to Mahishasura Mardini', bn: 'ভোরবেলা মহিষাসুরমর্দিনী শ্রবণ' },
      { en: 'Tarpan — ancestral water offering at river', bn: 'তর্পণ — পিতৃপুরুষের উদ্দেশে জলদান' },
      { en: 'Invocation of Goddess Durga', bn: 'দুর্গা মায়ের আবাহন' },
      { en: 'Ritual bath at sacred rivers', bn: 'পবিত্র নদীতে পুণ্যস্নান' },
    ],
    significance: {
      en: 'Mahalaya is the day when Goddess Durga begins her journey from Mount Kailash to Earth.',
      bn: 'মহালয়া সেই দিন যখন দেবী দুর্গা কৈলাস পর্বত থেকে মর্তের পথে যাত্রা শুরু করেন।',
    },
    food: ['Khichuri', 'Naru', 'Moa', 'Tiler naru'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Mahishasura Mardini & Mahalaya Songs' },
    isDurgaPujaSubday: false, isSpecial: true, specialType: 'mahalaya',
  },

  // ─────────────────────────────────────────────────────────────────
  // 9. DURGA PUJA — SHASTHI | ৩০ আশ্বিন ১৪৩৩ | 17 October 2026 | শনিবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'durga-puja-shasthi',
    order: 9,
    nameEn: 'Durga Puja — Shasthi',
    nameBn: 'দুর্গাপূজা — মহাষষ্ঠী',
    subtitleEn: 'The Awakening of the Goddess',
    subtitleBn: 'দেবীর বোধন',
    date: { BD: '2026-10-17', IN: '2026-10-17' },
    bengaliDate: '৩০ আশ্বিন ১৪৩৩',
    dayBn: 'শনিবার',
    category: 'durga-puja',
    emoji: '🪔',
    theme: {
      bg: '#1a0200', accent: '#c0392b', accentLight: '#e74c3c',
      text: '#fdf5e6', particle: '#f5c6a0',
      gradient: 'from-[#1a0200] via-[#2d0500] to-[#0d0100]',
    },
    image: '/images/festivals/Mahasashthi .jpg',
    imageAlt: 'Durga Puja pandal with beautifully lit Durga idol',
    descriptionEn: 'Shasthi marks the formal beginning of Durga Puja festivities. The goddess is welcomed with Bodhon — the ritual awakening. Devotees gather at pandals as the beautifully crafted idol is unveiled. The air fills with the fragrance of incense and the sound of dhak drums.',
    descriptionBn: 'ষষ্ঠী দুর্গাপূজার আনুষ্ঠানিক শুরুকে চিহ্নিত করে। বোধনের মাধ্যমে দেবীকে আহ্বান করা হয়। ভক্তরা প্যান্ডেলে জমায়েত হয় এবং সুনির্মিত প্রতিমা উন্মোচন করা হয়।',
    shortDescriptionEn: 'Welcoming Ma Durga with Bodhon.',
    shortDescriptionBn: 'বোধনের মাধ্যমে মায়ের স্বাগত।',
    rituals: [
      { en: 'Bodhon — ritual awakening of the goddess', bn: 'বোধন' },
      { en: 'Amantran — formal invitation', bn: 'আমন্ত্রণ' },
      { en: 'Adhivas — pre-puja sanctification', bn: 'অধিবাস' },
    ],
    significance: { en: 'The goddess formally arrives on earth to bless her devotees.', bn: 'দেবী ভক্তদের আশীর্বাদ করতে আনুষ্ঠানিকভাবে মর্তে আসেন।' },
    food: ['Bhog', 'Khichuri', 'Labra', 'Chutney', 'Payesh'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Durga Puja Dhak & Songs' },
    isDurgaPujaSubday: true, durgaPujaDay: 'shasthi', isSpecial: true, specialType: 'durga-puja',
  },

  // ─────────────────────────────────────────────────────────────────
  // 10. DURGA PUJA — SAPTAMI | ১ কার্তিক ১৪৩৩ | 18 October 2026 | রবিবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'durga-puja-saptami',
    order: 10,
    nameEn: 'Durga Puja — Saptami',
    nameBn: 'দুর্গাপূজা — মহাসপ্তমী',
    subtitleEn: 'The Seven Forms of the Goddess',
    subtitleBn: 'দেবীর সাত রূপ',
    date: { BD: '2026-10-18', IN: '2026-10-18' },
    bengaliDate: '১ কার্তিক ১৪৩৩',
    dayBn: 'রবিবার',
    category: 'durga-puja',
    emoji: '🪔',
    theme: {
      bg: '#1a0200', accent: '#c0392b', accentLight: '#e74c3c',
      text: '#fdf5e6', particle: '#f5c6a0',
      gradient: 'from-[#1a0200] via-[#2d0500] to-[#0d0100]',
    },
    image: '/images/festivals/Maha Saptami.jpg',
    imageAlt: 'Nabapatrika being taken to the river for ritual bath',
    descriptionEn: 'Saptami is the main day of Durga Puja. The principal rituals — Nabapatrika Snan, Saptami puja, and Pushpanjali — take place today. Kolabou (the banana plant) is worshipped as the wife of Ganesha in a sacred river bath early in the morning.',
    descriptionBn: 'সপ্তমী দুর্গাপূজার প্রধান দিন। নবপত্রিকা স্নান, সপ্তমী পূজা ও পুষ্পাঞ্জলি — এই প্রধান অনুষ্ঠানগুলো আজ অনুষ্ঠিত হয়।',
    shortDescriptionEn: 'Nabapatrika snan and the main puja rituals.',
    shortDescriptionBn: 'নবপত্রিকা স্নান ও মূল পূজার অনুষ্ঠান।',
    rituals: [
      { en: 'Nabapatrika Snan (holy bath of banana plant)', bn: 'নবপত্রিকা স্নান' },
      { en: 'Saptami puja with 108 lotus flowers', bn: 'সপ্তমী পূজা' },
      { en: 'Pushpanjali (flower offering)', bn: 'পুষ্পাঞ্জলি' },
    ],
    significance: { en: 'The goddess fully manifests on Saptami.', bn: 'সপ্তমীতে দেবী সম্পূর্ণরূপে আবির্ভূত হন।' },
    food: ['Bhog khichuri', 'Cholar dal', 'Beguni', 'Chutney', 'Payesh'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Durga Puja Saptami Songs' },
    isDurgaPujaSubday: true, durgaPujaDay: 'saptami', isSpecial: true, specialType: 'durga-puja',
  },

  // ─────────────────────────────────────────────────────────────────
  // 11. DURGA PUJA — ASHTAMI | ২ কার্তিক ১৪৩৩ | 19 October 2026 | সোমবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'durga-puja-ashtami',
    order: 11,
    nameEn: 'Durga Puja — Ashtami',
    nameBn: 'দুর্গাপূজা — মহাষ্টমী',
    subtitleEn: 'The Most Sacred Day',
    subtitleBn: 'সর্বপবিত্র দিন',
    date: { BD: '2026-10-19', IN: '2026-10-19' },
    bengaliDate: '২ কার্তিক ১৪৩৩',
    dayBn: 'সোমবার',
    category: 'durga-puja',
    emoji: '🪔',
    theme: {
      bg: '#1a0200', accent: '#c0392b', accentLight: '#e74c3c',
      text: '#fdf5e6', particle: '#f5c6a0',
      gradient: 'from-[#1a0200] via-[#2d0500] to-[#0d0100]',
    },
    image: '/images/festivals/Maha Ashtami.jpg',
    imageAlt: 'Kumari Puja — young girl worshipped as goddess',
    descriptionEn: 'Ashtami is considered the most sacred day of Durga Puja. Kumari Puja — the worship of a young girl as the manifestation of the Goddess — takes place on this day. The Sandhi Puja, performed at the junction of Ashtami and Navami, is the most important ritual of the entire festival.',
    descriptionBn: 'অষ্টমীকে দুর্গাপূজার সবচেয়ে পবিত্র দিন মনে করা হয়। এই দিনে কুমারী পূজা অনুষ্ঠিত হয়। অষ্টমী ও নবমীর সন্ধিক্ষণে সন্ধিপূজা অনুষ্ঠিত হয়।',
    shortDescriptionEn: 'Kumari Puja and the sacred Sandhi Puja.',
    shortDescriptionBn: 'কুমারী পূজা ও পবিত্র সন্ধিপূজা।',
    rituals: [
      { en: 'Kumari Puja (worship of a young girl)', bn: 'কুমারী পূজা' },
      { en: 'Sandhi Puja at junction of Ashtami–Navami', bn: 'সন্ধিপূজা' },
      { en: 'Grand Pushpanjali', bn: 'মহাপুষ্পাঞ্জলি' },
    ],
    significance: { en: 'The sandhi moment is the most spiritually powerful time of Durga Puja.', bn: 'সন্ধিক্ষণ দুর্গাপূজার সবচেয়ে আধ্যাত্মিকভাবে শক্তিশালী মুহূর্ত।' },
    food: ['Bhog', 'Khichuri', 'Labra', 'Mishti doi'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Durga Puja Ashtami Songs' },
    isDurgaPujaSubday: true, durgaPujaDay: 'ashtami', isSpecial: true, specialType: 'durga-puja',
  },

  // ─────────────────────────────────────────────────────────────────
  // 12. DURGA PUJA — NAVAMI | ৩ কার্তিক ১৪৩৩ | 20 October 2026 | মঙ্গলবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'durga-puja-navami',
    order: 12,
    nameEn: 'Durga Puja — Navami',
    nameBn: 'দুর্গাপূজা — মহানবমী',
    subtitleEn: 'The Final Worship',
    subtitleBn: 'শেষ পূজার দিন',
    date: { BD: '2026-10-20', IN: '2026-10-20' },
    bengaliDate: '৩ কার্তিক ১৪৩৩',
    dayBn: 'মঙ্গলবার',
    category: 'durga-puja',
    emoji: '🪔',
    theme: {
      bg: '#1a0200', accent: '#c0392b', accentLight: '#e74c3c',
      text: '#fdf5e6', particle: '#f5c6a0',
      gradient: 'from-[#1a0200] via-[#2d0500] to-[#0d0100]',
    },
    image: '/images/festivals/Maha Navami.jpg',
    imageAlt: 'Durga Puja pandal celebration with lights at night',
    descriptionEn: 'Navami is the final full day of Durga Puja. The last major rituals and Navami puja take place. Emotions run high as devotees know the goddess will depart the next day. The evening is filled with cultural programmes, dance, and music at pandals across Bengal.',
    descriptionBn: 'নবমী দুর্গাপূজার শেষ পূর্ণ দিন। শেষ প্রধান অনুষ্ঠান ও নবমী পূজা এই দিনে হয়। সন্ধ্যায় বাংলার প্যান্ডেলে সাংস্কৃতিক অনুষ্ঠান, নৃত্য ও সঙ্গীত চলে।',
    shortDescriptionEn: 'The last full day with Navami puja.',
    shortDescriptionBn: 'নবমী পূজার সাথে শেষ পূর্ণ দিন।',
    rituals: [
      { en: 'Navami puja (major ritual)', bn: 'নবমী পূজা' },
      { en: 'Homa (sacred fire ritual)', bn: 'হোম' },
      { en: 'Cultural programmes at pandals', bn: 'প্যান্ডেলে সাংস্কৃতিক অনুষ্ঠান' },
    ],
    significance: { en: 'The last night before Dashami brings mixed emotions of joy and sorrow.', bn: 'দশমীর আগের রাত আনন্দ ও বিষাদের মিশ্র আবেগ নিয়ে আসে।' },
    food: ['Bhog', 'Special sweets', 'Khichuri', 'Chutney'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Navami Puja Songs' },
    isDurgaPujaSubday: true, durgaPujaDay: 'navami', isSpecial: true, specialType: 'durga-puja',
  },

  // ─────────────────────────────────────────────────────────────────
  // 13. BIJOYA DASHAMI | ৪ কার্তিক ১৪৩৩ | 21 October 2026 | বুধবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'durga-puja-dashami',
    order: 13,
    nameEn: 'Bijoya Dashami',
    nameBn: 'বিজয়া দশমী',
    subtitleEn: 'The Farewell of the Goddess',
    subtitleBn: 'মায়ের বিদায়',
    date: { BD: '2026-10-21', IN: '2026-10-21' },
    bengaliDate: '৪ কার্তিক ১৪৩৩',
    dayBn: 'বুধবার',
    category: 'durga-puja',
    emoji: '🏵️',
    theme: {
      bg: '#1a0200', accent: '#c0392b', accentLight: '#e74c3c',
      text: '#fdf5e6', particle: '#f5c6a0',
      gradient: 'from-[#1a0200] via-[#2d0500] to-[#0d0100]',
    },
    image: '/images/festivals/Bijoya Dasami.jpg',
    imageAlt: 'Sindoor Khela — women applying vermilion during Bijoya Dashami',
    descriptionEn: 'Bijoya Dashami is the tenth and final day of Durga Puja. The day begins with Dashami puja followed by Sindoor Khela — the vermilion play — where women smear sindoor on the goddess and each other as a farewell ritual. Amid tears and devotion, the idol is immersed in the river (visarjan).',
    descriptionBn: 'বিজয়া দশমী দুর্গাপূজার দশম ও শেষ দিন। দশমী পূজার পর সিঁদুর খেলা হয়। অশ্রু ও ভক্তির মধ্যে প্রতিমাকে শোভাযাত্রায় নদীতে নিয়ে গিয়ে বিসর্জন দেওয়া হয়।',
    shortDescriptionEn: 'Sindoor Khela, farewell, and visarjan.',
    shortDescriptionBn: 'সিঁদুর খেলা, বিদায় ও বিসর্জন।',
    rituals: [
      { en: 'Dashami puja', bn: 'দশমী পূজা' },
      { en: 'Sindoor Khela (vermilion play)', bn: 'সিঁদুর খেলা' },
      { en: 'Devi Baran (farewell ritual)', bn: 'দেবী বরণ' },
      { en: 'Visarjan (immersion in river)', bn: 'বিসর্জন' },
    ],
    significance: { en: 'Bijoya marks victory of good over evil and the farewell of the divine mother.', bn: 'বিজয়া মন্দের উপর ভালোর জয় এবং দেবীমায়ের বিদায়কে চিহ্নিত করে।' },
    food: ['Mishti', 'Naru', 'Sandesh', 'Rosogolla'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Bijoya Dashami Songs' },
    isDurgaPujaSubday: true, durgaPujaDay: 'dashami', isSpecial: true, specialType: 'durga-puja',
  },

  // ─────────────────────────────────────────────────────────────────
  // 14. KOJAGARI LAKSHMI PUJA | ৭ কার্তিক ১৪৩৩ | 25 October 2026 | রবিবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'lakshmi-puja',
    order: 14,
    nameEn: 'Kojagari Lakshmi Puja',
    nameBn: 'কোজাগরী লক্ষ্মী পূজা',
    subtitleEn: 'Goddess of Wealth & Fortune',
    subtitleBn: 'ধন ও সৌভাগ্যের দেবী',
    date: { BD: '2026-10-25', IN: '2026-10-25' },
    bengaliDate: '৭ কার্তিক ১৪৩৩',
    dayBn: 'রবিবার',
    category: 'puja',
    emoji: '🪷',
    theme: {
      bg: '#081a08', accent: '#27ae60', accentLight: '#2ecc71',
      text: '#f0fdf4', particle: '#a7f3d0',
      gradient: 'from-[#081a08] via-[#0d2d0d] to-[#040d04]',
    },
    image: '/images/festivals/Lakshmi Puja.jpg',
    imageAlt: 'Lakshmi Puja with lotus flowers and oil lamps under moonlight',
    descriptionEn: 'Kojagari Lakshmi Puja is observed on the full moon night of Kartik, just after Bijoya Dashami. Goddess Lakshmi — the deity of wealth, fortune, and prosperity — is worshipped under the open sky in the full moonlight. The legend says Lakshmi visits every home on this night to bless those who are awake.',
    descriptionBn: 'কোজাগরী লক্ষ্মীপূজা বিজয়া দশমীর পরের পূর্ণিমার রাতে অনুষ্ঠিত হয়। ধন, সৌভাগ্য ও সমৃদ্ধির দেবী লক্ষ্মীকে পূর্ণচাঁদের আলোয় খোলা আকাশের নিচে পূজা করা হয়। কিংবদন্তি বলে এই রাতে লক্ষ্মী প্রতিটি গৃহ পরিদর্শন করে জাগ্রতদের আশীর্বাদ করেন।',
    shortDescriptionEn: 'Welcoming the goddess of wealth on the full moon.',
    shortDescriptionBn: 'পূর্ণিমায় ধনের দেবীকে স্বাগত।',
    rituals: [
      { en: 'Full moon puja under open sky', bn: 'খোলা আকাশে পূর্ণিমার পূজা' },
      { en: 'Alpona drawing at entrance', bn: 'দরজায় আলপনা আঁকা' },
      { en: 'Offering lotus flowers and sweetmeats', bn: 'পদ্মফুল ও মিষ্টি নিবেদন' },
      { en: 'Reading of Lakshmir Panchali', bn: 'লক্ষ্মীর পাঁচালি পাঠ' },
    ],
    significance: { en: 'Lakshmi Puja celebrates prosperity, cleanliness, and the beauty of home.', bn: 'লক্ষ্মীপূজা সমৃদ্ধি, পরিচ্ছন্নতা ও গৃহের সৌন্দর্য উদযাপন করে।' },
    food: ['Kheer', 'Moa', 'Naru', 'Sandesh', 'Lotus seeds'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Lakshmi Puja Songs' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 15. KALI PUJA | ২১ কার্তিক ১৪৩৩ | 8 November 2026 | রবিবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'kali-puja',
    order: 15,
    nameEn: 'Kali Puja',
    nameBn: 'কালী / শ্যামা পূজা',
    subtitleEn: 'The Dark Mother of Power',
    subtitleBn: 'শক্তির অন্ধকার মাতা',
    date: { BD: '2026-11-08', IN: '2026-11-08' },
    bengaliDate: '২১ কার্তিক ১৪৩৩',
    dayBn: 'রবিবার',
    category: 'puja',
    emoji: '🕉️',
    theme: {
      bg: '#030303', accent: '#8b0000', accentLight: '#c0392b',
      text: '#f8e8e8', particle: '#e8a0a0',
      gradient: 'from-[#030303] via-[#0d0000] to-[#010101]',
    },
    image: '/images/festivals/Kali Puja.jpg',
    imageAlt: 'Kali Puja with earthen lamps and red hibiscus offerings at night',
    descriptionEn: 'Kali Puja is the worship of Goddess Kali — the ferocious form of Durga and the goddess of time, creation, destruction, and power. Celebrated on the new moon night (Amavasya) of Kartik, it coincides with Diwali in North India. Kali is particularly revered in Bengal, where her worship continues through the night.',
    descriptionBn: 'কালী পূজা দেবী কালীর পূজা — দুর্গার ভয়ংকর রূপ এবং সময়, সৃষ্টি, ধ্বংস ও শক্তির দেবী। কার্তিকের অমাবস্যার রাতে উদযাপিত এই উৎসব বিশেষত বাংলায় সারারাত ধরে পালিত হয়।',
    shortDescriptionEn: 'New moon night worship of the fierce goddess.',
    shortDescriptionBn: 'অমাবস্যায় ভয়ংকরী দেবীর পূজা।',
    rituals: [
      { en: 'Midnight puja on new moon night', bn: 'অমাবস্যার রাতে মধ্যরাতে পূজা' },
      { en: 'Offering of red hibiscus (joba) flowers', bn: 'জবাফুল নিবেদন' },
      { en: 'Lighting of earthen lamps (diyas)', bn: 'মাটির প্রদীপ জ্বালানো' },
      { en: 'Chanting of Kali stotras', bn: 'কালী স্তোত্র পাঠ' },
    ],
    significance: { en: 'Kali represents the power that destroys evil to protect the innocent.', bn: 'কালী অশুভকে ধ্বংস করে নিরীহকে রক্ষা করার শক্তির প্রতিনিধিত্ব করেন।' },
    food: ['Khichuri', 'Mangsho (offering)', 'Red rice', 'Mishti'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Kali Puja Songs' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

  // ─────────────────────────────────────────────────────────────────
  // 16. JAGADDHATRI PUJA | ৪ অগ্রহায়ণ ১৪৩৩ | 18 November 2026 | বুধবার
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'jagaddhatri-puja',
    order: 16,
    nameEn: 'Jagaddhatri Puja',
    nameBn: 'জগদ্ধাত্রী পূজা',
    subtitleEn: 'The Bearer of the Universe',
    subtitleBn: 'জগতের ধারণকর্ত্রী দেবী',
    date: { BD: '2026-11-18', IN: '2026-11-18' },
    bengaliDate: '৪ অগ্রহায়ণ ১৪৩৩',
    dayBn: 'বুধবার',
    category: 'puja',
    emoji: '🌸',
    theme: {
      bg: '#120805', accent: '#d4700a', accentLight: '#f0a040',
      text: '#fff8f0', particle: '#f5d8b0',
      gradient: 'from-[#120805] via-[#1f0f06] to-[#0a0402]',
    },
    image: '/images/festivals/jagadhatri Puja.jpg',
    imageAlt: 'Jagaddhatri Puja idol adorned with orange flowers and lights',
    descriptionEn: 'Jagaddhatri Puja celebrates Goddess Jagaddhatri — a form of Durga who is the bearer of the universe. The festival is especially celebrated in Chandannagar (West Bengal) and Krishnanagar with grand illuminations, processions, and artistic idol-making traditions that rival Durga Puja itself in scale and splendour.',
    descriptionBn: 'জগদ্ধাত্রী পূজা দেবী জগদ্ধাত্রীকে উদযাপন করে — দুর্গার এমন একটি রূপ যিনি জগতের ধারণকর্ত্রী। উৎসবটি বিশেষত চন্দননগর (পশ্চিমবঙ্গ) ও কৃষ্ণনগরে বিশাল আলোকসজ্জা, শোভাযাত্রা এবং শিল্পসম্মত প্রতিমা তৈরির ঐতিহ্যের সাথে পালিত হয়।',
    shortDescriptionEn: 'The magnificent puja of the universe\'s bearer.',
    shortDescriptionBn: 'জগতের ধারণকর্ত্রী দেবীর মহাপূজা।',
    rituals: [
      { en: 'Pushpanjali and main puja', bn: 'পুষ্পাঞ্জলি ও মূল পূজা' },
      { en: 'Grand illumination (alokosaijya)', bn: 'মহা আলোকসজ্জা' },
      { en: 'Procession through streets', bn: 'শোভাযাত্রা' },
      { en: 'Visarjan (immersion) procession', bn: 'বিসর্জন শোভাযাত্রা' },
    ],
    significance: {
      en: 'Jagaddhatri represents the aspect of the Goddess who controls and sustains the universe. The Chandannagar celebration is UNESCO-recognised for its artistic illumination tradition.',
      bn: 'জগদ্ধাত্রী ব্রহ্মাণ্ড নিয়ন্ত্রণ ও ধারণকারী দেবীর দিককে প্রতিনিধিত্ব করেন। চন্দননগরের আলোকসজ্জা ইউনেস্কো স্বীকৃত।',
    },
    food: ['Bhog khichuri', 'Labra', 'Cholar dal', 'Payesh', 'Rosogolla'],
    music: { provider: 'youtube', embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLwgbOa1VPE9KQ0eCUgGN5k40kV3M_BPYX', playlistName: 'Jagaddhatri Puja Songs' },
    isDurgaPujaSubday: false, isSpecial: false,
  },

];

// ── Utility exports ────────────────────────────────────────────────
export const getFestivalById    = (id)          => festivals.find(f => f.id === id);
export const getFestivalsSorted = (region='BD') => [...festivals].sort((a,b) => new Date(a.date[region]) - new Date(b.date[region]));
export const getNextFestival    = (region='BD') => {
  const today = new Date(); today.setHours(0,0,0,0);
  const sorted = getFestivalsSorted(region);
  return sorted.find(f => new Date(f.date[region]+'T00:00:00') >= today) || sorted[0];
};
export const getFestivalsByCategory = (cat) => cat === 'all' ? festivals : festivals.filter(f => f.category === cat);
export const getCategories = () => ['all', ...new Set(festivals.map(f => f.category))];
export default festivals;
