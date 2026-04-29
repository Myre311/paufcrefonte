/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pau-night': '#04091D',
        'pau-primary': '#1A1D38',
        'pau-yellow': '#FFCC00',
        'pau-gold': '#CBA74D',
        'pau-white': '#FFFFFF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Didot', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
