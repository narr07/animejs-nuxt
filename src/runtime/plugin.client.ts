// src/runtime/plugin.client.ts
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const loadAnime = async () => {
    try {
      const { animate, createTimeline, stagger, utils, svg, onScroll, createScope, text } = await import('animejs')
      return { animate, createTimeline, stagger, utils, svg, onScroll, createScope, text }
    }
    catch (error) {
      return null
    }
  }

  const anime = await loadAnime()
  const config = useRuntimeConfig()

  // ✅ Sekarang config sudah ter-set dengan benar dari module
  if (anime && config.public.animejs?.provide) {
    nuxtApp.provide('anime', anime)
  }
})
