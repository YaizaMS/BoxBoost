/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#004936',
        'primary-hover': '#006a4d',
        'secondary': '#e0e0e0',
        'secondary-hover': '#c4c4c4',
        'danger': '#ff0000',
        'danger-hover': '#e60000',
        'warning': '#ffc800',
        'warning-hover': '#e6b300',
        'azul': '#0073B1',
        'gris': '#808080',
        'success': '#2fb518',
        'success-hover': '#1f8a0c',
      },

    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      exo: ['"Exo 2"', 'sans-serif'],
    },
  },
  plugins: [
    
  ],
}