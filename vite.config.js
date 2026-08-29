import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path resolver:
// - Vercel / Root hosting: '/'
// - GitHub Pages: '/Puja-Journey/' (when VITE_BASE_PATH or GITHUB_PAGES is set, or running deploy-gh-pages)
// - Local Dev: '/'
const getBase = () => {
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH;
  }
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    return '/';
  }
  if (process.env.GITHUB_PAGES === 'true' || process.env.DEPLOY_TARGET === 'gh-pages') {
    return '/Puja-Journey/';
  }
  return '/';
};

export default defineConfig({
  plugins: [react()],
  base: getBase(),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
          framer: ['framer-motion'],
        }
      }
    }
  }
})
