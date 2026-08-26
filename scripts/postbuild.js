import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

if (fs.existsSync(distDir)) {
  const indexHtml = path.join(distDir, 'index.html');
  const notFoundHtml = path.join(distDir, '404.html');
  const noJekyll = path.join(distDir, '.nojekyll');

  if (fs.existsSync(indexHtml)) {
    fs.copyFileSync(indexHtml, notFoundHtml);
    console.log('✅ Created dist/404.html for GitHub Pages fallback');
  }

  fs.writeFileSync(noJekyll, '# Bypass Jekyll on GitHub Pages');
  console.log('✅ Created dist/.nojekyll');
}
