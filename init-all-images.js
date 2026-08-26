import fs from 'fs';
import path from 'path';

const targetDir = path.resolve('public', 'images', 'festivals');

// Copy from existing high-res assets as fallback so every single file exists with 100% validity
const fallbacks = {
  'navami.webp': 'ashtami.webp',
  'dashami-bijoya.webp': 'durga-puja.webp',
  'jagaddhatri-puja.webp': 'sasthi.webp',
  'ganesh-puja.webp': 'rath-yatra.webp',
  'janmashtami.webp': 'saraswati-puja.webp',
};

for (const [destName, srcName] of Object.entries(fallbacks)) {
  const dest = path.join(targetDir, destName);
  const src = path.join(targetDir, srcName);
  if (!fs.existsSync(dest) && fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Initialized ${destName} from ${srcName}`);
  }
}
