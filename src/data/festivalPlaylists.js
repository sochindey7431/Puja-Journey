/**
 * PUJA JOURNEY — Central Festival Music Playlists & Mapping
 *
 * Official YouTube IFrame Player API tracks for each festival.
 * Music is strictly mapped to designated festivals:
 * - Mahalaya -> 6 Mahalaya tracks
 * - Durga Puja (Shashti, Saptami, Ashtami, Navami, Dashami) -> 16 Durga Puja tracks
 * - Other festivals -> No playlist unless explicitly configured
 */

const getThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const musicPlaylists = {

  // ── MAHALAYA (মহালয়া) — Exactly 6 Tracks ─────────────────────────
  mahalaya: {
    playlistId: 'mahalaya',
    title: 'মহালয়ার সুর',
    subtitle: 'Mahalaya Devotional Collection',
    festivalEmoji: '🌑',
    accentColor: '#c9a84c',
    tracks: [
      {
        id: 'YQFNRoi7rEc',
        youtubeId: 'YQFNRoi7rEc',
        youtubeUrl: 'https://www.youtube.com/watch?v=YQFNRoi7rEc',
        title: 'Mahalaya',
        titleBn: 'মহালয়া',
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

  // ── DURGA PUJA (দুর্গাপূজা) — Exactly 16 Tracks ─────────────────────
  durgaPuja: {
    playlistId: 'durgaPuja',
    title: 'দুর্গাপূজার সুর',
    subtitle: 'Durga Puja Collection (Shasthi — Dashami)',
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

};

/**
 * Explicit Festival ID to Playlist Mapping
 * Only mapped festivals will have music.
 */
export const festivalPlaylistMap = {
  // Mahalaya -> Mahalaya Playlist ONLY
  'mahalaya': 'mahalaya',

  // Durga Puja 5 Days -> Shared Durga Puja Playlist (16 songs)
  'durga-puja': 'durgaPuja',
  'durga-puja-shasthi': 'durgaPuja',
  'durga-puja-saptami': 'durgaPuja',
  'durga-puja-ashtami': 'durgaPuja',
  'durga-puja-navami': 'durgaPuja',
  'durga-puja-dashami': 'durgaPuja',
};

// Map each festival to its custom title when playing
const festivalDisplayTitles = {
  'mahalaya': { title: 'মহালয়ার সুর', subtitle: 'Mahalaya Devotional Collection', emoji: '🌑' },
  'durga-puja': { title: 'দুর্গাপূজার সুর', subtitle: 'Durga Puja Collection', emoji: '🪔' },
  'durga-puja-shasthi': { title: 'মহা ষষ্ঠীর সুর', subtitle: 'Maha Shasthi — Durga Puja Collection', emoji: '🪔' },
  'durga-puja-saptami': { title: 'মহা সপ্তমীর সুর', subtitle: 'Maha Saptami — Durga Puja Collection', emoji: '🪔' },
  'durga-puja-ashtami': { title: 'মহা অষ্টমীর সুর', subtitle: 'Maha Ashtami — Durga Puja Collection', emoji: '🪔' },
  'durga-puja-navami': { title: 'মহা নবমীর সুর', subtitle: 'Maha Navami — Durga Puja Collection', emoji: '🪔' },
  'durga-puja-dashami': { title: 'বিজয়া দশমীর সুর', subtitle: 'Maha Dashami — Durga Puja Collection', emoji: '🏵️' },
};

/**
 * Get playlist by festival ID.
 * Returns the playlist object if configured, or null if no music is assigned.
 */
export function getPlaylistForFestival(festivalId) {
  if (!festivalId) return null;

  // Direct mapping lookup
  const targetPlaylistId = festivalPlaylistMap[festivalId];
  if (!targetPlaylistId) return null;

  const playlist = musicPlaylists[targetPlaylistId];
  if (!playlist) return null;

  const display = festivalDisplayTitles[festivalId] || {};

  return {
    ...playlist,
    festivalId,
    targetPlaylistId,
    title: display.title || playlist.title,
    subtitle: display.subtitle || playlist.subtitle,
    festivalEmoji: display.emoji || playlist.festivalEmoji,
    key: festivalId,
  };
}

/**
 * Check if a festival has an assigned playlist
 */
export function hasPlaylistForFestival(festivalId) {
  return Boolean(festivalPlaylistMap[festivalId]);
}

export const festivalPlaylists = musicPlaylists;
export default musicPlaylists;
