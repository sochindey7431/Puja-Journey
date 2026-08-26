/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        'puja-black':    '#0a0805',
        'puja-charcoal': '#1a1510',
        'puja-maroon':   '#3d0c0c',
        'puja-crimson':  '#8b1a1a',
        'puja-vermilion':'#c0392b',
        'puja-gold':     '#d4a017',
        'puja-gold-light':'#f0c040',
        'puja-ivory':    '#f5e6c8',
        'puja-cream':    '#faf3e0',
        // Festival moods
        'saraswati-bg':  '#f8f4e8',
        'saraswati-accent': '#d4a017',
        'shiva-bg':      '#1a1030',
        'shiva-accent':  '#6b46c1',
        'ganesh-bg':     '#2d1500',
        'ganesh-accent': '#e67e22',
        'vishwakarma-bg':'#1a1a2e',
        'vishwakarma-accent': '#4a90d9',
        'mahalaya-bg':   '#050810',
        'mahalaya-accent':'#7c6d3a',
        'durga-bg':      '#1a0505',
        'durga-accent':  '#c0392b',
        'lakshmi-bg':    '#0d1a0d',
        'lakshmi-accent':'#27ae60',
        'kali-bg':       '#050505',
        'kali-accent':   '#8b0000',
      },
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'body':    ['"Inter"', 'system-ui', 'sans-serif'],
        'bengali': ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        'mono':    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'fluid-xs':  'clamp(0.75rem, 1.5vw, 0.875rem)',
        'fluid-sm':  'clamp(0.875rem, 2vw, 1rem)',
        'fluid-base':'clamp(1rem, 2.5vw, 1.125rem)',
        'fluid-lg':  'clamp(1.125rem, 3vw, 1.5rem)',
        'fluid-xl':  'clamp(1.5rem, 4vw, 2rem)',
        'fluid-2xl': 'clamp(2rem, 5vw, 3rem)',
        'fluid-3xl': 'clamp(2.5rem, 7vw, 5rem)',
        'fluid-4xl': 'clamp(3rem, 10vw, 8rem)',
        'fluid-5xl': 'clamp(4rem, 14vw, 12rem)',
      },
      spacing: {
        'section': '100vh',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float':          'float 6s ease-in-out infinite',
        'float-slow':     'float 10s ease-in-out infinite',
        'pulse-glow':     'pulseGlow 3s ease-in-out infinite',
        'scroll-bounce':  'scrollBounce 2s ease-in-out infinite',
        'shimmer':        'shimmer 2s linear infinite',
        'particle-drift': 'particleDrift 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':      { opacity: '0.8', transform: 'scale(1.05)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        particleDrift: {
          '0%':   { transform: 'translateY(100vh) translateX(0)' },
          '100%': { transform: 'translateY(-100px) translateX(100px)' },
        },
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
}
