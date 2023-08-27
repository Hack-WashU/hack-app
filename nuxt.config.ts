export default defineNuxtConfig({
  
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
  css: ['@/assets/main.css'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: [],
    }  
  },
  ssr: false
})