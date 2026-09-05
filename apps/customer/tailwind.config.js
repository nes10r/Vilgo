/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00C2E8',
          dark: '#009DBD',
          light: '#66E0F5',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          secondary: '#60646C',
          muted: '#9AA0A8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F6F8',
          selected: '#E7F9FC',
        },
        danger: '#E5484D',
        success: '#30A46C',
        warning: '#F5A623',
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
