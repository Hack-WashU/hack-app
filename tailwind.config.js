// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
module.exports = {
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  daisyui: {
    themes: ["dracula"]
  }
}
