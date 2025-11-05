import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e6f4f1',
          DEFAULT: '#2aa79b',
          dark: '#1b6f67'
        },
        accent: '#67b3ff'
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Tahoma', 'Arial', 'Noto Sans', 'sans-serif']
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 700ms ease-out forwards'
      }
    }
  },
  plugins: []
};

export default config;

