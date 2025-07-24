// src/runtime/plugin.ts - VERSIONnuxt/app'

import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(async (nuxtApp) => {
  // ✅ Guard untuk server-side
  if (import.meta.server) return

  const config = nuxtApp.$config.public.animejs as { provide?: boolean }
  if (!config?.provide) return

  try {
    // ✅ Dynamic import mencegah SSR issues
    const { animate } = await import('animejs')

    nuxtApp.provide('animate', animate)
    nuxtApp.provide('animejs', animate)
  }
  catch (error) {
    console.warn('Failed to load Anime.js:', error)
  }
})
