/**
 * PUJA JOURNEY — Central Festival Music Playlists
 *
 * Official YouTube IFrame Player API tracks for each festival.
 */

const getThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const festivalPlaylists = {

  // ── 1. MAHALAYA (মহালয়া) ──────────────────────────────────────────
  mahalaya: {
    id: 'mahalaya',
    title: 'মহালয়ার সুর',
    subtitle: 'Mahalaya Devotional Collection',
    festivalEmoji: '🌑',
    accentColor: '#c9a84c',
    tracks: [
      {
        id: 'zZ4dYYcPxUY',
        youtubeId: 'zZ4dYYcPxUY',
        youtubeUrl: 'https://www.youtube.com/watch?v=zZ4dYYcPxUY',
        title: 'Ahang Rudre - Sourendro-Soumyojit',
        titleBn: 'অহং রুদ্রে — সৌরেন্দ্র-সৌম্যজিৎ',
        artist: 'Sourendro-Soumyojit',
        thumbnail: getThumb('zZ4dYYcPxUY'),
      },
      {
        id: '57O9a_Y5vE0',
        youtubeId: '57O9a_Y5vE0',
        youtubeUrl: 'https://www.youtube.com/watch?v=57O9a_Y5vE0',
        title: 'মহিষাসুরমর্দিনী — সম্পূর্ণ মূল অনুষ্ঠান',
        titleBn: 'মহিষাসুরমর্দিনী — সম্পূর্ণ মূল অনুষ্ঠান',
        artist: 'বীরেন্দ্রকৃষ্ণ ভদ্র (Birendra Krishna Bhadra)',
        thumbnail: getThumb('57O9a_Y5vE0'),
      },
      {
        id: '1F_4bWq1g3I',
        youtubeId: '1F_4bWq1g3I',
        youtubeUrl: 'https://www.youtube.com/watch?v=1F_4bWq1g3I',
        title: 'মহালয়া — অল ইন্ডিয়া রেডিও ও সারেগামা অ্যালবাম',
        titleBn: 'মহালয়া — অল ইন্ডিয়া রেডিও ও সারেগামা অ্যালবাম',
        artist: 'বীরেন্দ্রকৃষ্ণ ভদ্র ও পঙ্কজ মল্লিক',
        thumbnail: getThumb('1F_4bWq1g3I'),
      },
      {
        id: 'S0Tq4z8Z_1U',
        youtubeId: 'S0Tq4z8Z_1U',
        youtubeUrl: 'https://www.youtube.com/watch?v=S0Tq4z8Z_1U',
        title: 'দেবী স্তুতি ও মহিষাসুরমর্দিনী স্তোত্রম্',
        titleBn: 'দেবী স্তুতি ও মহিষাসুরমর্দিনী স্তোত্রম্',
        artist: 'ঐতিহ্যবাহী স্তোত্র (Traditional Stotram)',
        thumbnail: getThumb('S0Tq4z8Z_1U'),
      },
      {
        id: '6P3O1gH1qFw',
        youtubeId: '6P3O1gH1qFw',
        youtubeUrl: 'https://www.youtube.com/watch?v=6P3O1gH1qFw',
        title: 'ভোরের আগমনী সুর — মা আসছেন',
        titleBn: 'ভোরের আগমনী সুর — মা আসছেন',
        artist: 'বাংলা ভক্তিগীতি (Agomoni)',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
    ],
  },

  // ── 2. DURGA PUJA (দুর্গাপূজা) ─────────────────────────────────────
  'durga-puja': {
    id: 'durga-puja',
    title: 'দুর্গাপূজার সুর',
    subtitle: 'Durga Puja Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [
      {
        id: 'FqS-m6_n_Cg',
        title: 'দুর্গাপূজা স্পেশাল — নন-স্টপ বাংলা গীতি ও ঢাকের তাল',
        artist: 'বাংলা পূজার গান (Jukebox)',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
      {
        id: 'R9Z_5U8v-XU',
        title: 'সেরা দুর্গাপূজার গান — টাইমস মিউজিক বাংলা',
        artist: 'জনপ্রিয় শিল্পীবৃন্দ (Times Music)',
        thumbnail: getThumb('R9Z_5U8v-XU'),
      },
      {
        id: '6P3O1gH1qFw',
        title: 'মা দুর্গা এলো — পূজার গান অ্যালবাম',
        artist: 'উৎসবের সঙ্গীত (Full Album)',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
      {
        id: 'Yp69mY8L5h4',
        title: 'সবার দুর্গা মা — নতুন পূজার গান',
        artist: 'কুমার শানু ও শোভন গাঙ্গুলী',
        thumbnail: getThumb('Yp69mY8L5h4'),
      },
    ],
  },

  // ── 3. PANCHAMI (পঞ্চমী) ──────────────────────────────────────────
  'durga-puja-panchami': {
    id: 'durga-puja-panchami',
    title: 'পঞ্চমীর সুর',
    subtitle: 'Panchami Collection',
    festivalEmoji: '🌺',
    accentColor: '#e74c3c',
    tracks: [
      {
        id: '6P3O1gH1qFw',
        title: 'পঞ্চমীর আগমনী — মা আসতে আর দেরি নেই',
        artist: 'পূজার ভক্তিগীতি (Agomoni Gaan)',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
      {
        id: 'FqS-m6_n_Cg',
        title: 'দুগ্গা এলো ও প্যান্ডেল উদ্বোধনের সুর',
        artist: 'বাংলা পূজার গান (Puja Special)',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
      {
        id: 'R9Z_5U8v-XU',
        title: 'উমা আসে নতুন সাজে — পঞ্চমীর আনন্দ',
        artist: 'অঙ্কিতা ভট্টাচার্য (Ankita)',
        thumbnail: getThumb('R9Z_5U8v-XU'),
      },
    ],
  },

  // ── 4. SHASTHI (ষষ্ঠী) ───────────────────────────────────────────
  'durga-puja-shasthi': {
    id: 'durga-puja-shasthi',
    title: 'ষষ্ঠীর সুর',
    subtitle: 'Sasthi Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [
      {
        id: 'FqS-m6_n_Cg',
        title: 'বোধন — দেবীর বোধন ও আগমনী ঢাকের বোল',
        artist: 'বোধন ও ঢাক (Bodhon Sangeet)',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
      {
        id: '6P3O1gH1qFw',
        title: 'আমন্ত্রণ ও অধিবাস — মা এলেন মর্ত্যে',
        artist: 'ভক্তিগীতি অ্যালবাম (Devotional)',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
      {
        id: 'R9Z_5U8v-XU',
        title: 'ও মেনকা ও মেনকা — ষষ্ঠীর উৎসব',
        artist: 'নন্দী সিস্টার্স (Nandy Sisters)',
        thumbnail: getThumb('R9Z_5U8v-XU'),
      },
    ],
  },

  // ── 5. SAPTAMI (সপ্তমী) ──────────────────────────────────────────
  'durga-puja-saptami': {
    id: 'durga-puja-saptami',
    title: 'সপ্তমীর সুর',
    subtitle: 'Saptami Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [
      {
        id: 'FqS-m6_n_Cg',
        title: 'নবপত্রিকা স্নান ও সপ্তমীর ঢাকের মহাবোল',
        artist: 'ঐতিহ্যবাহী ঢাক ও ভক্তিগীতি',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
      {
        id: 'Yp69mY8L5h4',
        title: 'সপ্তমী পূজা বন্দনা ও পুষ্পাঞ্জলি',
        artist: 'কুমার শানু (Kumar Sanu)',
        thumbnail: getThumb('Yp69mY8L5h4'),
      },
      {
        id: '6P3O1gH1qFw',
        title: 'মহাসপ্তমীর পূর্ণ পূজার গান',
        artist: 'পূজা স্পেশাল (Puja Special)',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
    ],
  },

  // ── 6. ASHTAMI (অষ্টমী) ──────────────────────────────────────────
  'durga-puja-ashtami': {
    id: 'durga-puja-ashtami',
    title: 'অষ্টমীর সুর',
    subtitle: 'Ashtami Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [
      {
        id: 'FqS-m6_n_Cg',
        title: 'মহাষ্টমী পুষ্পাঞ্জলি ও কুমারী পূজা আবাহন',
        artist: 'পুষ্পাঞ্জলি গীতি (Pushpanjali)',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
      {
        id: '57O9a_Y5vE0',
        title: 'সন্ধিপূজার সন্ধিক্ষণ ও ১০৮ পদ্মের স্তব',
        artist: 'বীরেন্দ্রকৃষ্ণ ভদ্র (Sandhi Puja)',
        thumbnail: getThumb('57O9a_Y5vE0'),
      },
      {
        id: 'R9Z_5U8v-XU',
        title: 'মহাষ্টমীর ঢাকের মহাতাল ও কাঁসির ছন্দ',
        artist: 'ঐতিহ্যবাহী ঢাক (Traditional Dhak)',
        thumbnail: getThumb('R9Z_5U8v-XU'),
      },
      {
        id: '6P3O1gH1qFw',
        title: 'জয় মা দুর্গা — অষ্টমী আরতি',
        artist: 'ভক্তিগীতি (Durga Aarti)',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
    ],
  },

  // ── 7. NAVAMI (নবমী) ────────────────────────────────────────────
  'durga-puja-navami': {
    id: 'durga-puja-navami',
    title: 'নবমীর সুর',
    subtitle: 'Navami Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [
      {
        id: 'FqS-m6_n_Cg',
        title: 'মহানবমী হোম-যজ্ঞ ও ধুনুচি নাচের ঢাকের বোল',
        artist: 'ধুনুচি নাচ ঢাক (Dhunuchi Dance)',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
      {
        id: 'Yp69mY8L5h4',
        title: 'নবমীর নিশি যেও না রে থামো — আকুল প্রার্থনা',
        artist: 'পূজার বিশেষ ভক্তিগীতি',
        thumbnail: getThumb('Yp69mY8L5h4'),
      },
      {
        id: '6P3O1gH1qFw',
        title: 'মহানবমী আরতি ও ভজন',
        artist: 'বাংলা ভক্তিগীতি (Navami Aarti)',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
    ],
  },

  // ── 8. DASHAMI (বিজয়া দশমী) ──────────────────────────────────────
  'durga-puja-dashami': {
    id: 'durga-puja-dashami',
    title: 'বিজয়ার সুর',
    subtitle: 'Dashami & Bisarjan Collection',
    festivalEmoji: '🏵️',
    accentColor: '#c0392b',
    tracks: [
      {
        id: 'FqS-m6_n_Cg',
        title: 'সিঁদুর খেলা ও দেবী বরণ — বিজয়া দশমী',
        artist: 'বিজয়ার গান (Sindoor Khela)',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
      {
        id: 'R9Z_5U8v-XU',
        title: 'আসবে বছর আবার হবে — বিসর্জনের গান',
        artist: 'বিসর্জন সঙ্গীত (Bisarjan Song)',
        thumbnail: getThumb('R9Z_5U8v-XU'),
      },
      {
        id: '6P3O1gH1qFw',
        title: 'মা ফিরে চলো কৈলাসে — বিদায় স্তুতি',
        artist: 'বিদায়ের সুর (Farewell)',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
    ],
  },

  // ── 9. LAKSHMI PUJA (লক্ষ্মীপূজা) ────────────────────────────────
  'lakshmi-puja': {
    id: 'lakshmi-puja',
    title: 'লক্ষ্মীপূজার সুর',
    subtitle: 'Lakshmi Puja Collection',
    festivalEmoji: '🪷',
    accentColor: '#27ae60',
    tracks: [
      {
        id: 'fALqfEQhAOY',
        title: 'লক্ষ্মী মন্ত্র — ওঁ শ্রীং হ্রীং ক্লীং মহালক্ষ্মৈ নমঃ',
        artist: 'মহালক্ষ্মী মন্ত্র (Sanskrit Mantra)',
        thumbnail: getThumb('fALqfEQhAOY'),
      },
      {
        id: 'Y3QU-pOLRFI',
        title: 'ওঁ জয় লক্ষ্মী মাতা — সম্পূর্ণ মহা আরতি',
        artist: 'লক্ষ্মী আরতি (Lakshmi Aarti)',
        thumbnail: getThumb('Y3QU-pOLRFI'),
      },
      {
        id: 'kXYiU_JCYtU',
        title: 'শ্রী মহালক্ষ্মী অষ্টকম্ স্তোত্রম্',
        artist: 'ক্লাসিক্যাল স্তোত্র (Lakshmi Ashtakam)',
        thumbnail: getThumb('kXYiU_JCYtU'),
      },
    ],
  },

  // ── 10. KALI PUJA (কালী পূজা) ───────────────────────────────────
  'kali-puja': {
    id: 'kali-puja',
    title: 'কালীর সুর',
    subtitle: 'Kali Puja Collection',
    festivalEmoji: '🕉️',
    accentColor: '#8b0000',
    tracks: [
      {
        id: 'k5j4Gq6u9xM',
        title: '৩০টি সেরা শ্যামা সঙ্গীত — মায়ের পায়ে জবা হয়ে',
        artist: 'পান্নালাল ভট্টাচার্য (Pannalal Bhattacharya)',
        thumbnail: getThumb('k5j4Gq6u9xM'),
      },
      {
        id: 'F3S8-f8Nl7w',
        title: 'শ্যামা সঙ্গীত ভলিউম ১ — অমর কণ্ঠ',
        artist: 'পান্নালাল ভট্টাচার্য (Shyama Sangeet)',
        thumbnail: getThumb('F3S8-f8Nl7w'),
      },
      {
        id: 'oV8s-n8zFqg',
        title: 'মাগো আনন্দময়ী — কালীর ভক্তিগীতি',
        artist: 'ঐতিহ্যবাহী শ্যামাসঙ্গীত (Traditional)',
        thumbnail: getThumb('oV8s-n8zFqg'),
      },
      {
        id: '6P0-r_0QyJg',
        title: 'শ্যামা মা কি আমার কালো — ক্লাসিক',
        artist: 'পান্নালাল ভট্টাচার্য (All Time Greats)',
        thumbnail: getThumb('6P0-r_0QyJg'),
      },
    ],
  },

  // ── 11. SARASWATI PUJA (সরস্বতী পূজা) ───────────────────────────
  'saraswati-puja': {
    id: 'saraswati-puja',
    title: 'সরস্বতীর সুর',
    subtitle: 'Saraswati Puja Collection',
    festivalEmoji: '📿',
    accentColor: '#d4a017',
    tracks: [
      {
        id: 'S0Tq4z8Z_1U',
        title: 'সরস্বতী বন্দনা — যা কুন্দেন্দু তুষারহারধবলা',
        artist: 'সংস্কৃত বন্দনা ও স্তোত্র (Sanskrit Vandana)',
        thumbnail: getThumb('S0Tq4z8Z_1U'),
      },
      {
        id: 'fXWn4C3v_nE',
        title: 'সরস্বতী মন্ত্র ও আরতি — বিদ্যা ও জ্ঞানদায়িনী',
        artist: 'সঞ্জীবনী ভেলান্ডে (Saregama Bhakti)',
        thumbnail: getThumb('fXWn4C3v_nE'),
      },
      {
        id: 'kYJ_fR93o_s',
        title: 'দেবী বীণাপাণি বন্দনা',
        artist: 'সুরেশ ওয়াডকর (Suresh Wadkar)',
        thumbnail: getThumb('kYJ_fR93o_s'),
      },
      {
        id: 'm7H40W0n8-w',
        title: 'হে মা শারদে — বসন্ত পঞ্চমীর ভক্তিগীতি',
        artist: 'লালিত্যা মুনশাওয়া (Hey Maa Sharda)',
        thumbnail: getThumb('m7H40W0n8-w'),
      },
    ],
  },

  // ── 12. JANMASHTAMI (শ্রীকৃষ্ণ জন্মাষ্টমী) ──────────────────────
  janmashtami: {
    id: 'janmashtami',
    title: 'কৃষ্ণের সুর',
    subtitle: 'Janmashtami Collection',
    festivalEmoji: '🦚',
    accentColor: '#4a90d9',
    tracks: [
      {
        id: 'y3XKRP3u2jU',
        title: 'হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে — মহামন্ত্র',
        artist: 'ইস্কন নামসংকীর্তন (Maha Mantra)',
        thumbnail: getThumb('y3XKRP3u2jU'),
      },
      {
        id: 'ZqV7BKyFj-I',
        title: 'অচ্যুতম্ কেশবম্ কৃষ্ণ দামোদরম্',
        artist: 'শ্রীকৃষ্ণ ভজন (Achyutam Keshavam)',
        thumbnail: getThumb('ZqV7BKyFj-I'),
      },
      {
        id: 'vEL4LD7OtJk',
        title: 'গোবিন্দ বলো হরি গোপাল বলো — মধ্যরাতের জন্মাষ্টমী',
        artist: 'ভক্তিগীতি (Traditional)',
        thumbnail: getThumb('vEL4LD7OtJk'),
      },
    ],
  },

  // ── 13. SHIVRATRI (মহাশিবরাত্রি) ─────────────────────────────────
  shivaratri: {
    id: 'shivaratri',
    title: 'মহাদেবের সুর',
    subtitle: 'Shivratri Collection',
    festivalEmoji: '🔱',
    accentColor: '#6b46c1',
    tracks: [
      {
        id: 'KRhcTPKdmrk',
        title: 'শিব তাণ্ডব স্তোত্রম্ — জটাটবীগলজ্জল',
        artist: 'শঙ্কর মহাদেবন (Shankar Mahadevan)',
        thumbnail: getThumb('KRhcTPKdmrk'),
      },
      {
        id: 'aG3g0G0Wd8Y',
        title: 'হর হর শিব শঙ্কর — মহাশিবরাত্রি',
        artist: 'সাচেত ও পরম্পরা ট্যান্ডন (T-Series)',
        thumbnail: getThumb('aG3g0G0Wd8Y'),
      },
      {
        id: 'K3-g6b-qF4E',
        title: 'ওঁ নমঃ শিবায় ও শিব তাণ্ডব স্তোত্র',
        artist: 'রমেশভাই ওঝা (Traditional Recitation)',
        thumbnail: getThumb('K3-g6b-qF4E'),
      },
    ],
  },

  // ── 14. GANESH CHATURTHI (গণেশ পূজা) ────────────────────────────
  'ganesh-chaturthi': {
    id: 'ganesh-chaturthi',
    title: 'গণেশের সুর',
    subtitle: 'Ganesh Puja Collection',
    festivalEmoji: '🐘',
    accentColor: '#e67e22',
    tracks: [
      {
        id: 'Q7mGCBCiLF4',
        title: 'জয় গণেশ জয় গণেশ দেবা — মহা আরতি',
        artist: 'গণেশ আরতি (Ganesh Aarti)',
        thumbnail: getThumb('Q7mGCBCiLF4'),
      },
      {
        id: 'CL5_MvCMFBQ',
        title: 'বক্রতুণ্ড মহাকায় সূর্যকোটি সমপ্রভ — মন্ত্র',
        artist: 'গণেশ স্তোত্র (Ganesh Mantra)',
        thumbnail: getThumb('CL5_MvCMFBQ'),
      },
    ],
  },

  // ── 15. JAGADDHATRI PUJA (জগদ্ধাত্রী পূজা) ────────────────────────
  'jagaddhatri-puja': {
    id: 'jagaddhatri-puja',
    title: 'জগদ্ধাত্রীর সুর',
    subtitle: 'Jagaddhatri Puja Collection',
    festivalEmoji: '🌸',
    accentColor: '#d4700a',
    tracks: [
      {
        id: '6P3O1gH1qFw',
        title: 'দেবী জগদ্ধাত্রী বন্দনা — জগতের ধারণকর্ত্রী',
        artist: 'দেবী স্তোত্র ও ভক্তিগীতি',
        thumbnail: getThumb('6P3O1gH1qFw'),
      },
      {
        id: 'FqS-m6_n_Cg',
        title: 'চন্দননগরের জগদ্ধাত্রী পূজার আলোকসজ্জা ও ঢাকের বোল',
        artist: 'ঐতিহ্যবাহী ঢাক (Chandannagar Dhak)',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
    ],
  },

  // ── 16. RATH YATRA (রথযাত্রা) ────────────────────────────────────
  'rath-yatra': {
    id: 'rath-yatra',
    title: 'রথযাত্রার সুর',
    subtitle: 'Rath Yatra Collection',
    festivalEmoji: '🏛️',
    accentColor: '#e67e22',
    tracks: [
      {
        id: 'y3XKRP3u2jU',
        title: 'জয় জগন্নাথ জয় বলদেব — রথযাত্রা সংকীর্তন',
        artist: 'ইস্কন ভক্তিগীতি (Jagannath Sankirtan)',
        thumbnail: getThumb('y3XKRP3u2jU'),
      },
      {
        id: 'vEL4LD7OtJk',
        title: 'গোবিন্দ বলো হরি গোপাল বলো',
        artist: 'ঐতিহ্যবাহী কীর্তন',
        thumbnail: getThumb('vEL4LD7OtJk'),
      },
    ],
  },

  // ── 17. VISHWAKARMA PUJA (বিশ্বকর্মা পূজা) ───────────────────────
  'vishwakarma-puja': {
    id: 'vishwakarma-puja',
    title: 'বিশ্বকর্মার সুর',
    subtitle: 'Vishwakarma Puja Collection',
    festivalEmoji: '🔨',
    accentColor: '#4a90d9',
    tracks: [
      {
        id: 'FqS-m6_n_Cg',
        title: 'বিশ্বকর্মা পূজার গান ও ঘুড়ি ওড়ানোর উৎসব',
        artist: 'বাংলা পূজার গান (Bangla Geet)',
        thumbnail: getThumb('FqS-m6_n_Cg'),
      },
    ],
  },

};

/**
 * festivalMusic alias matching requirement format
 */
export const festivalMusic = festivalPlaylists;

/**
 * Get playlist by festival ID with robust fallbacks
 */
export function getPlaylistForFestival(festivalId) {
  if (!festivalId) return null;
  if (festivalPlaylists[festivalId]) {
    return { ...festivalPlaylists[festivalId], key: festivalId };
  }
  if (festivalId.startsWith('durga-puja')) {
    return { ...festivalPlaylists['durga-puja'], key: 'durga-puja' };
  }
  return null;
}

export default festivalPlaylists;

