import fs from 'fs';
import https from 'https';

const allPlaylists = {
  saraswatiPuja: {
    festivalName: 'Saraswati Puja',
    tracks: [
      { id: 'X5isMK80lLg', userTitle: 'Veena Badini' },
      { id: 'Njc1Hu6WPDU', userTitle: 'Saraswati Bandana' },
      { id: 'W2lvglZaw7o', userTitle: 'Devi Vagavati' },
      { id: 'aXbMRb0QTKY', userTitle: 'Basontika' },
      { id: '0bHmnIT79B4', userTitle: 'Setho Sotodole' },
      { id: 'Wq4n6EjWecQ', userTitle: 'Binapani Saraswati' },
    ]
  },
  shivaratri: {
    festivalName: 'Maha Shivaratri',
    tracks: [
      { id: 'ZIKzQJYKJV0', userTitle: 'Shiv Tandav' },
      { id: 'DW7BbIJUE2M', userTitle: 'Kaha Hay Huan' },
      { id: 'XXjXrU1KgSU', userTitle: 'Vedsar Shiv Stav' },
      { id: 'o4nJ2F7yHsM', userTitle: 'Kantara' },
      { id: 'oZ72uTWla5Q', userTitle: 'Sankara' },
      { id: 'IjlNhw29UQ0', userTitle: 'Shiv Panchakshar' },
    ]
  },
  dolPurnima: {
    festivalName: 'Dol Purnima',
    tracks: [
      { id: 'Feoea8FQTI0', userTitle: 'Tum Prem Ho Radhe' },
      { id: 'fbo1JO_Qmy0', userTitle: 'Krishna Govinda' },
      { id: 'rhisrU8QFZk', userTitle: 'Tulasi' },
      { id: 'mGC-S7n_HkE', userTitle: 'Krish Theme' },
      { id: '8clRfKww5vI', userTitle: 'Shyamol Sansare' },
      { id: 'tCQHZ2kTWBo', userTitle: 'Kanha' },
      { id: 'lAsJ_rCgbZE', userTitle: 'Prem Ki Lila' },
      { id: '6sidltN4ox0', userTitle: 'Kunj Bihari' },
      { id: 'f18cpg-mTrY', userTitle: 'Sri Krishna Govinda Hare Murari' },
      { id: '_rxDkrG5CWQ', userTitle: 'Tum Prem Ho Radhe' },
      { id: '-DEP6_CPGe8', userTitle: 'Shyama Ao Banshi' },
      { id: '6VD0NDgN-RM', userTitle: 'O Kana Re' },
      { id: 'VCvV2AvwMPs', userTitle: 'Krishna Krishna' },
      { id: 'Cm0MZ5WfTzw', userTitle: 'Mere Banke Bihari Lal' },
      { id: 'xVU2UDaFOfE', userTitle: 'Radha Gori Gori' },
      { id: 'U7ts7eLOLxM', userTitle: 'Hare Krishna' },
      { id: 'jOEJfsISeSQ', userTitle: 'Achutam Keshavam' },
      { id: 'WTjZxav7naU', userTitle: 'Soja Jara' },
    ]
  },
  rathYatra: {
    festivalName: 'Rath Yatra',
    tracks: [
      { id: 'tq-FFDUpJZc', userTitle: 'Jay Jagannath' },
      { id: 'HSwaWt7PCOo', userTitle: 'Jagannath Chaka Nayan' },
      { id: 'OAhApT1C66U', userTitle: 'Jagannath Slok' },
      { id: 'HEIwMwjZlTU', userTitle: 'Jagannath Swami Nayan Pathagami' },
      { id: '6x0qq8FV1i0', userTitle: 'Sri Jagannath Kirtan' },
      { id: 'UTJ-g6DU53c', userTitle: 'Laute Jagannath' },
      { id: 'aL1Y0iS5XlU', userTitle: 'Kencho Kencho Re' },
    ]
  },
  janmashtami: {
    festivalName: 'Krishna Janmashtami',
    tracks: [
      { id: 'Feoea8FQTI0', userTitle: 'Tum Prem Ho Radhe' },
      { id: 'fbo1JO_Qmy0', userTitle: 'Krishna Govinda' },
      { id: 'rhisrU8QFZk', userTitle: 'Tulasi' },
      { id: 'mGC-S7n_HkE', userTitle: 'Krish Theme' },
      { id: '8clRfKww5vI', userTitle: 'Shyamol Sansare' },
      { id: 'tCQHZ2kTWBo', userTitle: 'Kanha' },
      { id: 'lAsJ_rCgbZE', userTitle: 'Prem Ki Lila' },
      { id: '6sidltN4ox0', userTitle: 'Kunj Bihari' },
      { id: 'f18cpg-mTrY', userTitle: 'Sri Krishna Govinda Hare Murari' },
      { id: '_rxDkrG5CWQ', userTitle: 'Tum Prem Ho Radhe' },
      { id: '-DEP6_CPGe8', userTitle: 'Shyama Ao Banshi' },
      { id: '6VD0NDgN-RM', userTitle: 'O Kana Re' },
      { id: 'VCvV2AvwMPs', userTitle: 'Krishna Krishna' },
      { id: 'Cm0MZ5WfTzw', userTitle: 'Mere Banke Bihari Lal' },
      { id: 'xVU2UDaFOfE', userTitle: 'Radha Gori Gori' },
      { id: 'U7ts7eLOLxM', userTitle: 'Hare Krishna' },
      { id: 'jOEJfsISeSQ', userTitle: 'Achutam Keshavam' },
      { id: 'WTjZxav7naU', userTitle: 'Soja Jara' },
    ]
  },
  ganeshChaturthi: {
    festivalName: 'Ganesh Chaturthi',
    tracks: [
      { id: 'CAKZlI5UaeQ', userTitle: 'Samporna Ganesh Arati' },
      { id: 'N8tiIur0saA', userTitle: 'Sindur Lal Chadayo' },
      { id: 'Yi_elkhw4vI', userTitle: 'Ya Re Ra' },
      { id: '-9OiNkTCIQM', userTitle: 'Bappa Morya' },
      { id: 'jLnU_SIA-cU', userTitle: 'Agman' },
    ]
  },
  vishwakarmaPuja: {
    festivalName: 'Vishwakarma Puja',
    tracks: [
      { id: 'Gp3vaJdoOy0', userTitle: 'Vishwakarma Arati' },
      { id: 'pjjT_iiXz8s', userTitle: 'Vishwakarma Pranam Mantra' },
      { id: 'ER9wONtSdr8', userTitle: 'Vishwakarma Joy' },
    ]
  },
  mahalaya: {
    festivalName: 'Mahalaya',
    tracks: [
      { id: 'YQFNRoi7rEc', userTitle: 'Mahalaya' },
      { id: 'tXXwsHeS_T0', userTitle: 'Rupang Dehi' },
      { id: '8PC7PuhwckQ', userTitle: 'Bajlo Tomar Alor Benu' },
      { id: '9nyeDJiGQwU', userTitle: 'Yaa Chandi' },
      { id: 'GJccKU4_5wg', userTitle: 'Aham Rudre' },
      { id: 'IfSJy3_Lkuo', userTitle: 'Jago Durga' },
    ]
  },
  durgaPuja: {
    festivalName: 'Durga Puja',
    tracks: [
      { id: 'E2zfQEo7Q_M', userTitle: 'Ebar Jeno Onno Rokom Pujo' },
      { id: '2U416kTo0as', userTitle: 'Elo J Ma' },
      { id: 'sPuZ0Q3KDWo', userTitle: 'Dugga Ma' },
      { id: '3E_qefwPA0E', userTitle: 'Joy Joy Dugga Ma' },
      { id: 'hnkfDCbULxk', userTitle: 'Uma Ashe Notun Saje' },
      { id: 'asdoVzpUFsE', userTitle: 'Gouri Elo' },
      { id: 'xlElO06nQy8', userTitle: 'Dugga Elo' },
      { id: 'voH3xUpLVr4', userTitle: 'Dhak Baja Kasor Baja' },
      { id: '4h5DXcN6cd4', userTitle: 'Amar Dugga' },
      { id: 'xUMhpMmwAmM', userTitle: 'O Menuka O Menuka' },
      { id: '4zyCkmAS1Oo', userTitle: 'Ailo Uma Barite' },
      { id: 'VgnUeGb1_DE', userTitle: 'Puja' },
      { id: 'iWCll2MhFsA', userTitle: 'Rai Jago' },
      { id: 'Gx_Rqsq1DIw', userTitle: 'Subahram' },
      { id: 'sf6usUybi3k', userTitle: 'Dugga Ma Ashche' },
      { id: 'm1d_w2D4cEc', userTitle: 'Durga Durgotihora' },
    ]
  },
  lakshmiPuja: {
    festivalName: 'Lakshmi Puja',
    tracks: [
      { id: 'dsWdH8-U8u8', userTitle: 'Lakshmi Panchali' },
      { id: 'mGEbPzEK2jw', userTitle: 'Lokki Elo Gore' },
      { id: '38sjlow5yeM', userTitle: 'Ashtalakshmi Stotram' },
      { id: 'cCFkWJf7cvo', userTitle: 'Sonko Bajiye Make' },
      { id: '5k_2d_15f6Y', userTitle: 'Lakshmi Stuti' },
    ]
  },
  kaliPuja: {
    festivalName: 'Kali Puja',
    tracks: [
      { id: 'IOa0-YO9Bss', userTitle: 'Amar Sobo Onge' },
      { id: 'ndX-htQoEn8', userTitle: 'Mayer Murit Gorate Chai' },
      { id: 'exNreXIXGSo', userTitle: 'Kali Kali Bol Rosona' },
      { id: 'LOmU7v63zb0', userTitle: 'Amar Cetona' },
      { id: 'nwbFiQcjkyY', userTitle: 'Ami Montro Tontrro Kichui Jani Na Ma' },
      { id: 'gtpojOKWUOM', userTitle: 'Shyama Ma Ki Amar Kalo' },
      { id: 'EZbQ-uaDbw4', userTitle: 'Ekbar Nacho Ma' },
      { id: 'VwibjuKHO0c', userTitle: 'O Shyama' },
      { id: 'p2EkxgDewl0', userTitle: 'Jano Na Re Mono' },
      { id: 'GyT5wc64t28', userTitle: 'Rone Nemeche' },
      { id: 'lE4Z6v9CTjQ', userTitle: 'O Shiv Nacho Re' },
      { id: '_EZdLG2cmSU', userTitle: 'Mayer Paye Jobe' },
      { id: 'wcHGiF0zloU', userTitle: 'Amar Hate Kali Muke Kali' },
      { id: 'GhG5Ms11fm8', userTitle: 'Vebe Dek Mon' },
      { id: 'jIw9mHgoHwM', userTitle: 'Ekbar Birajo Go Ma' },
    ]
  },
  jagaddhatriPuja: {
    festivalName: 'Jagaddhatri Puja',
    tracks: [
      { id: 'P_DkTG76P-w', userTitle: 'Jagaddhatri Stotram' },
      { id: 'H6yBYuVzWtA', userTitle: 'Jagaddhatri Pujar Gan' },
      { id: 'KPJO7k6WFIE', userTitle: 'Jao Jao Giri Gouri Anite' },
      { id: 'b5AjTamUjTU', userTitle: 'Asio Ma Jagaddhatri' },
      { id: '6d4Q-UfgubQ', userTitle: 'Jagaddhatri Ma' },
      { id: 'nTDQNqbYWsM', userTitle: 'Mago Tumi Sarbojonin' },
      { id: 'x8p5Qx3YMmA', userTitle: 'Jagaddhatri Gayatri Mantra' },
    ]
  },
};

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            resolve({ ok: true, status: res.statusCode, json: JSON.parse(data) });
          } else {
            resolve({ ok: false, status: res.statusCode, data });
          }
        } catch (e) {
          resolve({ ok: false, status: res.statusCode, error: e.message, data });
        }
      });
    }).on('error', (e) => resolve({ ok: false, error: e.message }));
  });
}

function fetchEmbed(id) {
  const url = `https://www.youtube.com/embed/${id}`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const isRestricted = data.includes('UNPLAYABLE') ||
          data.includes('EMBEDDING_DISABLED') ||
          data.includes('Video unavailable') ||
          data.includes('Playback on other websites has been disabled by the video owner') ||
          data.includes('status=ERROR') ||
          (data.includes('playableInEmbed') && data.includes('"playableInEmbed":false'));
        resolve({
          ok: res.statusCode === 200,
          statusCode: res.statusCode,
          restricted: isRestricted,
          bodySnippet: data.substring(0, 300)
        });
      });
    }).on('error', (e) => resolve({ ok: false, error: e.message }));
  });
}

async function runAudit() {
  const auditedResults = {};
  const removedTracks = [];
  const validTracks = [];

  for (const [key, playlist] of Object.entries(allPlaylists)) {
    console.log(`\n🔍 Auditing: ${playlist.festivalName} (${playlist.tracks.length} tracks)...`);
    auditedResults[key] = {
      festivalName: playlist.festivalName,
      tracks: []
    };

    for (const track of playlist.tracks) {
      const oembedRes = await fetchJson(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${track.id}&format=json`);
      const embedRes = await fetchEmbed(track.id);

      if (!oembedRes.ok) {
        console.log(`❌ REMOVED: [${track.id}] "${track.userTitle}" -> oEmbed failed (${oembedRes.status || oembedRes.error})`);
        removedTracks.push({ festival: playlist.festivalName, id: track.id, title: track.userTitle, reason: `oEmbed status ${oembedRes.status}` });
        continue;
      }

      if (embedRes.restricted) {
        console.log(`❌ REMOVED: [${track.id}] "${track.userTitle}" -> EMBED RESTRICTED`);
        removedTracks.push({ festival: playlist.festivalName, id: track.id, title: track.userTitle, reason: 'Embed restricted / Disabled by owner' });
        continue;
      }

      const officialTitle = oembedRes.json.title;
      const authorName = oembedRes.json.author_name;

      console.log(`✅ OK: [${track.id}] "${officialTitle}" (by ${authorName})`);
      auditedResults[key].tracks.push({
        id: track.id,
        youtubeId: track.id,
        youtubeUrl: `https://www.youtube.com/watch?v=${track.id}`,
        title: officialTitle,
        artist: authorName || 'Devotional Music',
        thumbnail: `https://img.youtube.com/vi/${track.id}/hqdefault.jpg`,
      });
      validTracks.push({ id: track.id, title: officialTitle });
    }
  }

  console.log(`\n========================================`);
  console.log(`AUDIT COMPLETE:`);
  console.log(`Total Valid Embeddable Tracks: ${validTracks.length}`);
  console.log(`Total Removed Tracks: ${removedTracks.length}`);
  if (removedTracks.length > 0) {
    console.log(`Removed Tracks Detail:`, JSON.stringify(removedTracks, null, 2));
  }
  console.log(`========================================\n`);

  fs.writeFileSync('scripts/audit-results.json', JSON.stringify(auditedResults, null, 2));
}

runAudit();
