/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#EEF2FF', // Indigo 50
          DEFAULT: '#6366F1', // Indigo 500
          dark: '#4F46E5', // Indigo 600
          purple: '#8B5CF6', // Purple 500
          'purple-dark': '#7C3AED', // Purple 600
        },
      },
      borderRadius: {
        'xl-card': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
