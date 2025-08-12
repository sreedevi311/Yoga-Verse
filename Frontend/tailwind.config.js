/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
  extend: {
    colors: {
      'neon-cyan': '#00ffff',
      'neon-blue': '#3a8dff',
      'neon-pink': '#ff00cc',
      'neon-purple': '#a100ff',
    }
  }
}

}

