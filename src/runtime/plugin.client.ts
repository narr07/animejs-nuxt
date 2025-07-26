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
        // animatable is not present in animejs types, so exclude it
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
        createTimer: createTimer || (() => {
          if (process.dev) console.warn('createTimer not available in this Anime.js version')
          return null
        }),
        engine: engine || {
          update: () => { if (process.dev) console.warn('engine.update not available') },
          pause: () => { if (process.dev) console.warn('engine.pause not available') },
          resume: () => { if (process.dev) console.warn('engine.resume not available') },
          fps: 60,
          precision: 0.01,
          timeUnit: 'ms',
          pauseOnDocumentHidden: true,
          speed: 1,
          isRunning: true,
          currentTime: 0
        },
        // Provide a no-op animatable function with warning
        animatable: () => {
          if (process.dev) console.warn('animatable not available in this Anime.js version')
          return null
        },
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
  if (
    anime &&
    config.public &&
    typeof config.public === 'object' &&
    'animejs' in config.public &&
    config.public.animejs &&
    typeof config.public.animejs === 'object' &&
    'provide' in config.public.animejs &&
    config.public.animejs.provide
  ) {
    nuxtApp.provide('anime', anime)
  }
})
