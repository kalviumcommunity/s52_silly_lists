/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        'page':'66vw',
        '96':'24rem',
        'remains':'calc(100vh - 1rem)',
      }
    },
    screens: {
      'xs': '300px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      },
    fontFamily: {
        'itim': ['Itim', 'sans-serif'],
        'arial': ["Arial", "sans-serif"],
        'roboto': ['Roboto Condensed', 'sans-serif'],
        'serif' : ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
  },
  plugins: [],
}

