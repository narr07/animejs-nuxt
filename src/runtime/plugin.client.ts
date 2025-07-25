// src/runtime/plugin.client.ts
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const loadAnime = async () => {
    try {
      // Load all Anime.js v4 features
      const animeModule = await import('animejs')
      
      // Extract all available features
      const {
        animate,
        createTimeline,
        stagger,
        utils,
        svg,
        onScroll,
        createScope,
        text,
        createDraggable,
        createTimer,
        engine,
        animatable,
        // Add any other exports that might be available
        ...rest
      } = animeModule
      
      return {
        animate,
        createTimeline,
        stagger,
        utils,
        svg,
        onScroll,
        createScope,
        text,
        createDraggable,
        createTimer: createTimer || (() => console.warn('createTimer not available in this Anime.js version')),
        engine: engine || {
          update: () => console.warn('engine.update not available'),
          pause: () => console.warn('engine.pause not available'),
          resume: () => console.warn('engine.resume not available'),
          fps: 60,
          precision: 0.01,
          timeUnit: 'ms',
          pauseOnDocumentHidden: true,
          speed: 1,
          isRunning: true,
          currentTime: 0
        },
        animatable: animatable || (() => console.warn('animatable not available in this Anime.js version')),
        ...rest
      }
    }
    catch (error) {
      if (process.dev) {
        console.warn('Failed to load Anime.js:', error)
      }
      return null
    }
  }

  const anime = await loadAnime()
  const config = useRuntimeConfig()

  // Provide anime instance if enabled
  if (anime && config.public.animejs?.provide) {
    nuxtApp.provide('anime', anime)
  }
})
