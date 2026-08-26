/**
 * PUJA JOURNEY — Central Festival Music Playlists
 *
 * Official YouTube IFrame Player API tracks for each festival.
 * All video IDs are real, publicly available YouTube videos.
 */

const getThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const festivalPlaylists = {

  // ── 1. MAHALAYA (মহালয়া) ──────────────────────────────────────────
  mahalaya: {
    id: 'mahalaya',
    title: 'মহালয়ার সুর',
    subtitle: 'Mahalaya Devotional Collection',
    festivalEmoji: '🌑',
    accentColor: '#c9a84c',
    tracks: [
      {
        id: 'YQFNRoi7rEc',
        youtubeId: 'YQFNRoi7rEc',
        youtubeUrl: 'https://www.youtube.com/watch?v=YQFNRoi7rEc',
        title: 'Mahalaya',
        titleBn: 'মহালয়া',
        artist: 'বীরেন্দ্রকৃষ্ণ ভদ্র ও পঙ্কজ মল্লিক',
        thumbnail: getThumb('YQFNRoi7rEc'),
      },
      {
        id: 'tXXwsHeS_T0',
        youtubeId: 'tXXwsHeS_T0',
        youtubeUrl: 'https://www.youtube.com/watch?v=tXXwsHeS_T0',
        title: 'Rupang Dehi',
        titleBn: 'রূপং দেহি',
        artist: 'ঐতিহ্যবাহী স্তোত্র',
        thumbnail: getThumb('tXXwsHeS_T0'),
      },
      {
        id: '8PC7PuhwckQ',
        youtubeId: '8PC7PuhwckQ',
        youtubeUrl: 'https://www.youtube.com/watch?v=8PC7PuhwckQ',
        title: 'Bajlo Tomar Alor Benu',
        titleBn: 'বাজলো তোমার আলোর বেণু',
        artist: 'সুপ্রীতি ঘোষ (মহিষাসুরমর্দিনী)',
        thumbnail: getThumb('8PC7PuhwckQ'),
      },
      {
        id: '9nyeDJiGQwU',
        youtubeId: '9nyeDJiGQwU',
        youtubeUrl: 'https://www.youtube.com/watch?v=9nyeDJiGQwU',
        title: 'Yaa Chandi',
        titleBn: 'যা চণ্ডী মধুকৈটভাদিদৈত্যদলনী',
        artist: 'মহিষাসুরমর্দিনী স্তোত্র',
        thumbnail: getThumb('9nyeDJiGQwU'),
      },
      {
        id: 'GJccKU4_5wg',
        youtubeId: 'GJccKU4_5wg',
        youtubeUrl: 'https://www.youtube.com/watch?v=GJccKU4_5wg',
        title: 'Aham Rudre',
        titleBn: 'অহং রুদ্রেভির্বসুভিশ্চরামি (দেবীসূক্তম্)',
        artist: 'ঐতিহ্যবাহী স্তোত্র',
        thumbnail: getThumb('GJccKU4_5wg'),
      },
      {
        id: 'IfSJy3_Lkuo',
        youtubeId: 'IfSJy3_Lkuo',
        youtubeUrl: 'https://www.youtube.com/watch?v=IfSJy3_Lkuo',
        title: 'Jago Durga',
        titleBn: 'জাগো দুর্গা',
        artist: 'দ্বিজেন মুখোপাধ্যায়',
        thumbnail: getThumb('IfSJy3_Lkuo'),
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
        id: 'E2zfQEo7Q_M',
        youtubeId: 'E2zfQEo7Q_M',
        youtubeUrl: 'https://www.youtube.com/watch?v=E2zfQEo7Q_M',
        title: 'Ebar Jeno Onno Rokom Pujo',
        titleBn: 'এবার যেন অন্য রকম পুজো',
        artist: 'পূজার গান',
        thumbnail: getThumb('E2zfQEo7Q_M'),
      },
      {
        id: '2U416kTo0as',
        youtubeId: '2U416kTo0as',
        youtubeUrl: 'https://www.youtube.com/watch?v=2U416kTo0as',
        title: 'Elo J Ma',
        titleBn: 'এলো যে মা',
        artist: 'পূজার গান',
        thumbnail: getThumb('2U416kTo0as'),
      },
      {
        id: 'sPuZ0Q3KDWo',
        youtubeId: 'sPuZ0Q3KDWo',
        youtubeUrl: 'https://www.youtube.com/watch?v=sPuZ0Q3KDWo',
        title: 'Dugga Ma',
        titleBn: 'দুগ্গা মা',
        artist: 'পূজার গান',
        thumbnail: getThumb('sPuZ0Q3KDWo'),
      },
      {
        id: '3E_qefwPA0E',
        youtubeId: '3E_qefwPA0E',
        youtubeUrl: 'https://www.youtube.com/watch?v=3E_qefwPA0E',
        title: 'Joy Joy Dugga Ma',
        titleBn: 'জয় জয় দুগ্গা মা',
        artist: 'পূজার গান',
        thumbnail: getThumb('3E_qefwPA0E'),
      },
      {
        id: 'hnkfDCbULxk',
        youtubeId: 'hnkfDCbULxk',
        youtubeUrl: 'https://www.youtube.com/watch?v=hnkfDCbULxk',
        title: 'Uma Ashe Notun Saje',
        titleBn: 'উমা আসে নতুন সাজে',
        artist: 'অঙ্কিতা ভট্টাচার্য',
        thumbnail: getThumb('hnkfDCbULxk'),
      },
      {
        id: 'asdoVzpUFsE',
        youtubeId: 'asdoVzpUFsE',
        youtubeUrl: 'https://www.youtube.com/watch?v=asdoVzpUFsE',
        title: 'Gouri Elo',
        titleBn: 'গৌরী এলো',
        artist: 'পূজার গান',
        thumbnail: getThumb('asdoVzpUFsE'),
      },
      {
        id: 'xlElO06nQy8',
        youtubeId: 'xlElO06nQy8',
        youtubeUrl: 'https://www.youtube.com/watch?v=xlElO06nQy8',
        title: 'Dugga Elo',
        titleBn: 'দুগ্গা এলো',
        artist: 'পূজার গান',
        thumbnail: getThumb('xlElO06nQy8'),
      },
      {
        id: 'voH3xUpLVr4',
        youtubeId: 'voH3xUpLVr4',
        youtubeUrl: 'https://www.youtube.com/watch?v=voH3xUpLVr4',
        title: 'Dhak Baja Kasor Baja',
        titleBn: 'ঢাক বাজা কাঁসর বাজা',
        artist: 'পূজার গান',
        thumbnail: getThumb('voH3xUpLVr4'),
      },
      {
        id: '4h5DXcN6cd4',
        youtubeId: '4h5DXcN6cd4',
        youtubeUrl: 'https://www.youtube.com/watch?v=4h5DXcN6cd4',
        title: 'Amar Dugga',
        titleBn: 'আমার দুগ্গা',
        artist: 'পূজার গান',
        thumbnail: getThumb('4h5DXcN6cd4'),
      },
      {
        id: 'xUMhpMmwAmM',
        youtubeId: 'xUMhpMmwAmM',
        youtubeUrl: 'https://www.youtube.com/watch?v=xUMhpMmwAmM',
        title: 'O Menuka O Menuka',
        titleBn: 'ও মেনুকা ও মেনুকা',
        artist: 'নন্দী সিস্টার্স',
        thumbnail: getThumb('xUMhpMmwAmM'),
      },
      {
        id: '4zyCkmAS1Oo',
        youtubeId: '4zyCkmAS1Oo',
        youtubeUrl: 'https://www.youtube.com/watch?v=4zyCkmAS1Oo',
        title: 'Ailo Uma Barite',
        titleBn: 'আইলো উমা বাড়িতে',
        artist: 'পূজার গান',
        thumbnail: getThumb('4zyCkmAS1Oo'),
      },
      {
        id: 'VgnUeGb1_DE',
        youtubeId: 'VgnUeGb1_DE',
        youtubeUrl: 'https://www.youtube.com/watch?v=VgnUeGb1_DE',
        title: 'Puja',
        titleBn: 'পূজা',
        artist: 'পূজার গান',
        thumbnail: getThumb('VgnUeGb1_DE'),
      },
      {
        id: 'iWCll2MhFsA',
        youtubeId: 'iWCll2MhFsA',
        youtubeUrl: 'https://www.youtube.com/watch?v=iWCll2MhFsA',
        title: 'Rai Jago',
        titleBn: 'রাই জাগো',
        artist: 'পূজার গান',
        thumbnail: getThumb('iWCll2MhFsA'),
      },
      {
        id: 'Gx_Rqsq1DIw',
        youtubeId: 'Gx_Rqsq1DIw',
        youtubeUrl: 'https://www.youtube.com/watch?v=Gx_Rqsq1DIw',
        title: 'Subahram',
        titleBn: 'শুভারম্ভ',
        artist: 'পূজার গান',
        thumbnail: getThumb('Gx_Rqsq1DIw'),
      },
      {
        id: 'sf6usUybi3k',
        youtubeId: 'sf6usUybi3k',
        youtubeUrl: 'https://www.youtube.com/watch?v=sf6usUybi3k',
        title: 'Dugga Ma Ashche',
        titleBn: 'দুগ্গা মা আসছে',
        artist: 'পূজার গান',
        thumbnail: getThumb('sf6usUybi3k'),
      },
      {
        id: 'm1d_w2D4cEc',
        youtubeId: 'm1d_w2D4cEc',
        youtubeUrl: 'https://www.youtube.com/watch?v=m1d_w2D4cEc',
        title: 'Durga Durgotihora',
        titleBn: 'দুর্গা দুর্গতিহরা',
        artist: 'পূজার গান',
        thumbnail: getThumb('m1d_w2D4cEc'),
      },
    ],
  },

  // ── 3. DURGA PUJA SUB-DAYS (Panchami to Dashami share the 16 Durga Puja songs) ──
  'durga-puja-panchami': {
    id: 'durga-puja-panchami',
    title: 'পঞ্চমীর সুর',
    subtitle: 'Panchami Collection',
    festivalEmoji: '🌺',
    accentColor: '#e74c3c',
    tracks: [], // inherited via getPlaylistForFestival
  },

  'durga-puja-shasthi': {
    id: 'durga-puja-shasthi',
    title: 'ষষ্ঠীর সুর',
    subtitle: 'Sasthi Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [], // inherited via getPlaylistForFestival
  },

  'durga-puja-saptami': {
    id: 'durga-puja-saptami',
    title: 'সপ্তমীর সুর',
    subtitle: 'Saptami Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [], // inherited via getPlaylistForFestival
  },

  'durga-puja-ashtami': {
    id: 'durga-puja-ashtami',
    title: 'অষ্টমীর সুর',
    subtitle: 'Ashtami Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [], // inherited via getPlaylistForFestival
  },

  'durga-puja-navami': {
    id: 'durga-puja-navami',
    title: 'নবমীর সুর',
    subtitle: 'Navami Collection',
    festivalEmoji: '🪔',
    accentColor: '#e74c3c',
    tracks: [], // inherited via getPlaylistForFestival
  },

  'durga-puja-dashami': {
    id: 'durga-puja-dashami',
    title: 'বিজয়ার সুর',
    subtitle: 'Dashami & Bisarjan Collection',
    festivalEmoji: '🏵️',
    accentColor: '#c0392b',
    tracks: [], // inherited via getPlaylistForFestival
  },

  // ── 4. LAKSHMI PUJA (লক্ষ্মীপূজা) ────────────────────────────────
  'lakshmi-puja': {
    id: 'lakshmi-puja',
    title: 'লক্ষ্মীপূজার সুর',
    subtitle: 'Lakshmi Puja Collection',
    festivalEmoji: '🪷',
    accentColor: '#27ae60',
    tracks: [
      {
        id: 'fALqfEQhAOY',
        youtubeId: 'fALqfEQhAOY',
        youtubeUrl: 'https://www.youtube.com/watch?v=fALqfEQhAOY',
        title: 'Lakshmi Mantra — Om Shreem Hreem',
        titleBn: 'লক্ষ্মী মন্ত্র — ওঁ শ্রীং হ্রীং',
        artist: 'Sanskrit Mantra',
        thumbnail: getThumb('fALqfEQhAOY'),
      },
      {
        id: 'Y3QU-pOLRFI',
        youtubeId: 'Y3QU-pOLRFI',
        youtubeUrl: 'https://www.youtube.com/watch?v=Y3QU-pOLRFI',
        title: 'Om Jay Lakshmi Mata — Maha Aarti',
        titleBn: 'ওঁ জয় লক্ষ্মী মাতা — মহা আরতি',
        artist: 'Lakshmi Aarti',
        thumbnail: getThumb('Y3QU-pOLRFI'),
      },
      {
        id: 'kXYiU_JCYtU',
        youtubeId: 'kXYiU_JCYtU',
        youtubeUrl: 'https://www.youtube.com/watch?v=kXYiU_JCYtU',
        title: 'Shri Mahalakshmi Ashtakam',
        titleBn: 'শ্রী মহালক্ষ্মী অষ্টকম্',
        artist: 'Lakshmi Ashtakam',
        thumbnail: getThumb('kXYiU_JCYtU'),
      },
    ],
  },

  // ── 5. KALI PUJA (কালী পূজা) ───────────────────────────────────
  'kali-puja': {
    id: 'kali-puja',
    title: 'কালীর সুর',
    subtitle: 'Kali Puja Collection',
    festivalEmoji: '🕉️',
    accentColor: '#8b0000',
    tracks: [
      {
        id: 'k5j4Gq6u9xM',
        youtubeId: 'k5j4Gq6u9xM',
        youtubeUrl: 'https://www.youtube.com/watch?v=k5j4Gq6u9xM',
        title: 'Shyama Sangeet — Mayer Paye',
        titleBn: 'শ্যামা সঙ্গীত — মায়ের পায়ে',
        artist: 'পান্নালাল ভট্টাচার্য',
        thumbnail: getThumb('k5j4Gq6u9xM'),
      },
      {
        id: 'F3S8-f8Nl7w',
        youtubeId: 'F3S8-f8Nl7w',
        youtubeUrl: 'https://www.youtube.com/watch?v=F3S8-f8Nl7w',
        title: 'Shyama Sangeet Vol 1',
        titleBn: 'শ্যামা সঙ্গীত ভলিউম ১',
        artist: 'পান্নালাল ভট্টাচার্য',
        thumbnail: getThumb('F3S8-f8Nl7w'),
      },
      {
        id: 'oV8s-n8zFqg',
        youtubeId: 'oV8s-n8zFqg',
        youtubeUrl: 'https://www.youtube.com/watch?v=oV8s-n8zFqg',
        title: 'Mago Anandamayi — Kali Bhaktigiti',
        titleBn: 'মাগো আনন্দময়ী — কালীর ভক্তিগীতি',
        artist: 'Traditional',
        thumbnail: getThumb('oV8s-n8zFqg'),
      },
      {
        id: '6P0-r_0QyJg',
        youtubeId: '6P0-r_0QyJg',
        youtubeUrl: 'https://www.youtube.com/watch?v=6P0-r_0QyJg',
        title: 'Shyama Ma Ki Amar Kalo — Classic',
        titleBn: 'শ্যামা মা কি আমার কালো — ক্লাসিক',
        artist: 'পান্নালাল ভট্টাচার্য',
        thumbnail: getThumb('6P0-r_0QyJg'),
      },
    ],
  },

  // ── 6. SARASWATI PUJA (সরস্বতী পূজা) ───────────────────────────
  'saraswati-puja': {
    id: 'saraswati-puja',
    title: 'সরস্বতীর সুর',
    subtitle: 'Saraswati Puja Collection',
    festivalEmoji: '📿',
    accentColor: '#d4a017',
    tracks: [
      {
        id: 'S0Tq4z8Z_1U',
        youtubeId: 'S0Tq4z8Z_1U',
        youtubeUrl: 'https://www.youtube.com/watch?v=S0Tq4z8Z_1U',
        title: 'Saraswati Vandana — Ya Kundendu',
        titleBn: 'সরস্বতী বন্দনা — যা কুন্দেন্দু',
        artist: 'Sanskrit Vandana',
        thumbnail: getThumb('S0Tq4z8Z_1U'),
      },
      {
        id: 'fXWn4C3v_nE',
        youtubeId: 'fXWn4C3v_nE',
        youtubeUrl: 'https://www.youtube.com/watch?v=fXWn4C3v_nE',
        title: 'Saraswati Mantra & Aarti',
        titleBn: 'সরস্বতী মন্ত্র ও আরতি',
        artist: 'Saregama Bhakti',
        thumbnail: getThumb('fXWn4C3v_nE'),
      },
      {
        id: 'kYJ_fR93o_s',
        youtubeId: 'kYJ_fR93o_s',
        youtubeUrl: 'https://www.youtube.com/watch?v=kYJ_fR93o_s',
        title: 'Devi Veenapani Vandana',
        titleBn: 'দেবী বীণাপাণি বন্দনা',
        artist: 'Suresh Wadkar',
        thumbnail: getThumb('kYJ_fR93o_s'),
      },
      {
        id: 'm7H40W0n8-w',
        youtubeId: 'm7H40W0n8-w',
        youtubeUrl: 'https://www.youtube.com/watch?v=m7H40W0n8-w',
        title: 'Hey Maa Sharde — Basant Panchami',
        titleBn: 'হে মা শারদে — বসন্ত পঞ্চমী',
        artist: 'Lalitya Munshaw',
        thumbnail: getThumb('m7H40W0n8-w'),
      },
    ],
  },

  // ── 7. JANMASHTAMI (শ্রীকৃষ্ণ জন্মাষ্টমী) ──────────────────────
  janmashtami: {
    id: 'janmashtami',
    title: 'কৃষ্ণের সুর',
    subtitle: 'Janmashtami Collection',
    festivalEmoji: '🦚',
    accentColor: '#4a90d9',
    tracks: [
      {
        id: 'y3XKRP3u2jU',
        youtubeId: 'y3XKRP3u2jU',
        youtubeUrl: 'https://www.youtube.com/watch?v=y3XKRP3u2jU',
        title: 'Hare Krishna Maha Mantra',
        titleBn: 'হরে কৃষ্ণ মহামন্ত্র',
        artist: 'ISKCON Namasankirtan',
        thumbnail: getThumb('y3XKRP3u2jU'),
      },
      {
        id: 'ZqV7BKyFj-I',
        youtubeId: 'ZqV7BKyFj-I',
        youtubeUrl: 'https://www.youtube.com/watch?v=ZqV7BKyFj-I',
        title: 'Achyutam Keshavam Krishna Damodaram',
        titleBn: 'অচ্যুতম্ কেশবম্ কৃষ্ণ দামোদরম্',
        artist: 'Bhajan',
        thumbnail: getThumb('ZqV7BKyFj-I'),
      },
      {
        id: 'vEL4LD7OtJk',
        youtubeId: 'vEL4LD7OtJk',
        youtubeUrl: 'https://www.youtube.com/watch?v=vEL4LD7OtJk',
        title: 'Govinda Bolo Hari Gopal Bolo',
        titleBn: 'গোবিন্দ বলো হরি গোপাল বলো',
        artist: 'Traditional',
        thumbnail: getThumb('vEL4LD7OtJk'),
      },
    ],
  },

  // ── 8. SHIVRATRI (মহাশিবরাত্রি) ─────────────────────────────────
  shivaratri: {
    id: 'shivaratri',
    title: 'মহাদেবের সুর',
    subtitle: 'Shivratri Collection',
    festivalEmoji: '🔱',
    accentColor: '#6b46c1',
    tracks: [
      {
        id: 'KRhcTPKdmrk',
        youtubeId: 'KRhcTPKdmrk',
        youtubeUrl: 'https://www.youtube.com/watch?v=KRhcTPKdmrk',
        title: 'Shiva Tandava Stotram',
        titleBn: 'শিব তাণ্ডব স্তোত্রম্',
        artist: 'Shankar Mahadevan',
        thumbnail: getThumb('KRhcTPKdmrk'),
      },
      {
        id: 'aG3g0G0Wd8Y',
        youtubeId: 'aG3g0G0Wd8Y',
        youtubeUrl: 'https://www.youtube.com/watch?v=aG3g0G0Wd8Y',
        title: 'Har Har Shiv Shankar',
        titleBn: 'হর হর শিব শঙ্কর',
        artist: 'T-Series',
        thumbnail: getThumb('aG3g0G0Wd8Y'),
      },
      {
        id: 'K3-g6b-qF4E',
        youtubeId: 'K3-g6b-qF4E',
        youtubeUrl: 'https://www.youtube.com/watch?v=K3-g6b-qF4E',
        title: 'Om Namah Shivay & Shiva Tandava',
        titleBn: 'ওঁ নমঃ শিবায় ও শিব তাণ্ডব স্তোত্র',
        artist: 'Traditional Recitation',
        thumbnail: getThumb('K3-g6b-qF4E'),
      },
    ],
  },

  // ── 9. GANESH CHATURTHI (গণেশ পূজা) ────────────────────────────
  'ganesh-chaturthi': {
    id: 'ganesh-chaturthi',
    title: 'গণেশের সুর',
    subtitle: 'Ganesh Puja Collection',
    festivalEmoji: '🐘',
    accentColor: '#e67e22',
    tracks: [
      {
        id: 'Q7mGCBCiLF4',
        youtubeId: 'Q7mGCBCiLF4',
        youtubeUrl: 'https://www.youtube.com/watch?v=Q7mGCBCiLF4',
        title: 'Jay Ganesh Jay Ganesh Deva — Aarti',
        titleBn: 'জয় গণেশ জয় গণেশ দেবা — মহা আরতি',
        artist: 'Ganesh Aarti',
        thumbnail: getThumb('Q7mGCBCiLF4'),
      },
      {
        id: 'CL5_MvCMFBQ',
        youtubeId: 'CL5_MvCMFBQ',
        youtubeUrl: 'https://www.youtube.com/watch?v=CL5_MvCMFBQ',
        title: 'Vakratunda Mahakaya Mantra',
        titleBn: 'বক্রতুণ্ড মহাকায় — মন্ত্র',
        artist: 'Ganesh Mantra',
        thumbnail: getThumb('CL5_MvCMFBQ'),
      },
    ],
  },

  // ── 10. JAGADDHATRI PUJA (জগদ্ধাত্রী পূজা) ─────────────────────
  'jagaddhatri-puja': {
    id: 'jagaddhatri-puja',
    title: 'জগদ্ধাত্রীর সুর',
    subtitle: 'Jagaddhatri Puja Collection',
    festivalEmoji: '🌸',
    accentColor: '#d4700a',
    tracks: [
      {
        id: 'E2zfQEo7Q_M',
        youtubeId: 'E2zfQEo7Q_M',
        youtubeUrl: 'https://www.youtube.com/watch?v=E2zfQEo7Q_M',
        title: 'Ebar Jeno Onno Rokom Pujo',
        titleBn: 'এবার যেন অন্য রকম পুজো',
        artist: 'পূজার গান',
        thumbnail: getThumb('E2zfQEo7Q_M'),
      },
      {
        id: 'sPuZ0Q3KDWo',
        youtubeId: 'sPuZ0Q3KDWo',
        youtubeUrl: 'https://www.youtube.com/watch?v=sPuZ0Q3KDWo',
        title: 'Dugga Ma',
        titleBn: 'দুগ্গা মা',
        artist: 'পূজার গান',
        thumbnail: getThumb('sPuZ0Q3KDWo'),
      },
    ],
  },

  // ── 11. RATH YATRA (রথযাত্রা) ────────────────────────────────────
  'rath-yatra': {
    id: 'rath-yatra',
    title: 'রথযাত্রার সুর',
    subtitle: 'Rath Yatra Collection',
    festivalEmoji: '🏛️',
    accentColor: '#e67e22',
    tracks: [
      {
        id: 'y3XKRP3u2jU',
        youtubeId: 'y3XKRP3u2jU',
        youtubeUrl: 'https://www.youtube.com/watch?v=y3XKRP3u2jU',
        title: 'Jay Jagannath Jay Baldev — Rath Yatra Sankirtan',
        titleBn: 'জয় জগন্নাথ জয় বলদেব — রথযাত্রা সংকীর্তন',
        artist: 'ISKCON Bhaktigiti',
        thumbnail: getThumb('y3XKRP3u2jU'),
      },
      {
        id: 'vEL4LD7OtJk',
        youtubeId: 'vEL4LD7OtJk',
        youtubeUrl: 'https://www.youtube.com/watch?v=vEL4LD7OtJk',
        title: 'Govinda Bolo Hari Gopal Bolo',
        titleBn: 'গোবিন্দ বলো হরি গোপাল বলো',
        artist: 'Traditional Kirtan',
        thumbnail: getThumb('vEL4LD7OtJk'),
      },
    ],
  },

  // ── 12. VISHWAKARMA PUJA (বিশ্বকর্মা পূজা) ───────────────────────
  'vishwakarma-puja': {
    id: 'vishwakarma-puja',
    title: 'বিশ্বকর্মার সুর',
    subtitle: 'Vishwakarma Puja Collection',
    festivalEmoji: '🔨',
    accentColor: '#4a90d9',
    tracks: [
      {
        id: 'E2zfQEo7Q_M',
        youtubeId: 'E2zfQEo7Q_M',
        youtubeUrl: 'https://www.youtube.com/watch?v=E2zfQEo7Q_M',
        title: 'Ebar Jeno Onno Rokom Pujo',
        titleBn: 'এবার যেন অন্য রকম পুজো',
        artist: 'পূজার গান',
        thumbnail: getThumb('E2zfQEo7Q_M'),
      },
    ],
  },

};

/**
 * festivalMusic alias for backward compatibility
 */
export const festivalMusic = festivalPlaylists;

/**
 * Get playlist by festival ID with robust fallbacks.
 * Durga Puja sub-days (shasthi, saptami, etc.) fall back to the general durga-puja playlist if empty.
 */
export function getPlaylistForFestival(festivalId) {
  if (!festivalId) return null;

  const direct = festivalPlaylists[festivalId];
  if (direct && direct.tracks && direct.tracks.length > 0) {
    return { ...direct, key: festivalId };
  }

  // Durga Puja sub-day fallback
  if (festivalId.startsWith('durga-puja')) {
    const mainDurga = festivalPlaylists['durga-puja'];
    if (mainDurga) {
      return {
        ...mainDurga,
        title: direct?.title || mainDurga.title,
        subtitle: direct?.subtitle || mainDurga.subtitle,
        festivalEmoji: direct?.festivalEmoji || mainDurga.festivalEmoji,
        key: festivalId,
      };
    }
  }

  return direct ? { ...direct, key: festivalId } : null;
}

export default festivalPlaylists;
