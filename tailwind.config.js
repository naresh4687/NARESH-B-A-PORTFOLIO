/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0B0B0C',
        surface: '#141415',
        raised: '#1C1C1E',
        cream: '#F5F1EA',
        muted: '#8C8C8C',
        amber: {
          DEFAULT: '#E8A24A',
          light: '#F5C77E',
          dark: '#B8741A'
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'sans-serif']
      },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        marquee: { to: { transform: 'translateX(-50%)' } }
      },
      animation: {
        'spin-slow': 'spin-slow 28s linear infinite',
        marquee: 'marquee 40s linear infinite'
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
};
