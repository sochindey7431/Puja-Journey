import https from 'https';
import fs from 'fs';
import path from 'path';

const festivalImages = {
  'navami.webp': 'https://images.unsplash.com/photo-1573394213010-3b45e67c6b57?w=1600&q=85&fit=crop',
  'dashami-bijoya.webp': 'https://images.unsplash.com/photo-1632039895684-0bc73e1f0f3c?w=1600&q=85&fit=crop',
  'lakshmi-puja.webp': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1600&q=85&fit=crop',
  'kali-puja.webp': 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=1600&q=85&fit=crop',
  'saraswati-puja.webp': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=85&fit=crop',
  'janmashtami.webp': 'https://images.unsplash.com/photo-1624555130858-7a8a8f06c7b6?w=1600&q=85&fit=crop',
  'shivratri.webp': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=85&fit=crop',
  'ganesh-puja.webp': 'https://images.unsplash.com/photo-1567591370429-88f12cf5949b?w=1600&q=85&fit=crop',
  'jagaddhatri-puja.webp': 'https://images.unsplash.com/photo-1598524375538-b7fb9dda1d9d?w=1600&q=85&fit=crop',
  'rath-yatra.webp': 'https://images.unsplash.com/photo-1571079520814-c2840ce6ec7b?w=1600&q=85&fit=crop',
  'vishwakarma-puja.webp': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&fit=crop',
};

const targetDir = path.resolve('public', 'images', 'festivals');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`Already exists: ${path.basename(dest)}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Saved: ${path.basename(dest)}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(festivalImages)) {
    const dest = path.join(targetDir, filename);
    await downloadFile(url, dest);
  }
  console.log('All festival image assets are ready!');
}

run();
