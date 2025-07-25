// src/runtime/plugin.client.ts
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const loadAnime = async () => {
    try {
      return await import('animejs')
    }
    catch (error) {
      console.warn('Failed to load anime.js:', error)
      return null
    }
  }

  const anime = await loadAnime()
  const config = useRuntimeConfig()

  // ✅ Sekarang config sudah ter-set dengan benar dari module
  if (anime && config.public.animejs?.provide) {
    nuxtApp.provide('anime', anime)
    nuxtApp.vueApp.config.globalProperties.$anime = anime
  }
})
