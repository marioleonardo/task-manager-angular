/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#3490dc',       // Example primary color (blue)
          secondary: '#f6993f',     // Example secondary color (orange)
          background: '#f8fafc',    // Light background
          'dark-background': '#1a202c', // Dark background
          text: '#2d3748',          // Dark text color
          'light-text': '#f7fafc',   // Light text color
          success: '#38a169',       // Success color (green)
          danger: '#e53e3e',        // Danger color (red)
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], // Example font (Inter)
        },
      },
    },
    plugins: [],
  }