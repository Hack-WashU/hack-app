export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_ENV_VERCEL_URL ? `https://app.hackwashu.com` : 'https://localhost:3000',
        }
    },
    modules: ['@nuxtjs/supabase', '@nuxt/content', '@nuxtjs/color-mode', '@nuxtjs/tailwindcss'],
    css: ['@/assets/main.css'],
    supabase: {
        redirectOptions: {
            login: '/',
            callback: '/confirm',
            exclude: ['/', '/faq'],
        }
    },
    colorMode: {
        preference: 'dracula',
        dataValue: 'theme'
    },
    ssr: false
})
