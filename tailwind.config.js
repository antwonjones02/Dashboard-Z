/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#003366', // Delta Blue
          50: '#E6EEF5',
          100: '#CCDCEA',
          200: '#99B9D5',
          300: '#6697C0',
          400: '#3374AB',
          500: '#003366', // Delta Blue
          600: '#002E5C',
          700: '#002852',
          800: '#002247',
          900: '#001C3D',
          950: '#041C2C', // Delta Dark Blue
        },
        // Delta Color Palette
        delta: {
          blue: '#003366', // Pantone 654c
          darkBlue: '#041C2C', // Pantone 296c
          lightBlue: '#7D9BC1', // Pantone 652c
          red: '#C01933', // Pantone 187c
          lightRed: '#E01933', // Pantone 186c
          darkRed: '#991933', // Pantone 202c
          yellow: '#EAAA00', // Pantone 124c
          orange: '#FF6900', // Pantone 1505c
          plum: '#2E1A47', // Passport Plum - Pantone 2695c
          white: '#FFFFFF', // Wayfaring White
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}