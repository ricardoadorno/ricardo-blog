// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/content'],
  css: ['~/assets/css/global.css'],
  content: {},
});
