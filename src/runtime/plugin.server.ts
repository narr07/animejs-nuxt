/* eslint-disable @typescript-eslint/no-unsafe-function-type */
// src/runtime/plugin.server.ts
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  // ✅ Server-side fallback implementations
  const noOpAnimation = () => ({
    play: () => {},
    pause: () => {},
    restart: () => {},
    reverse: () => {},
    cancel: () => {},
    revert: () => {},

    then: (callback?: Function) => {
      // Return resolved promise untuk SSR compatibility
      return Promise.resolve().then(() => callback && callback())
    },
  })

  const serverFallback = {
    animate: () => noOpAnimation(),
    createTimeline: () => {
      const timeline = {
        add: () => timeline,
        play: () => {},
        pause: () => {},
        restart: () => {},
        seek: () => {},
        cancel: () => {},
        revert: () => {},
        then: (callback?: Function) => Promise.resolve().then(() => callback && callback()),
      }
      return timeline
    },
    stagger: () => [],
    onScroll: () => noOpAnimation(),
    createScope: () => ({
      animate: () => noOpAnimation(),
    }),
    timer: () => noOpAnimation(),
    text: {
      split: () => [],
    },
    utils: {
      get: () => null,
      set: () => {},
      remove: () => {},
    },
    svg: {
      createMotionPath: () => ({}),
      morphTo: () => ({}),
      createDrawable: () => ({}),
    },
  }

  if (nuxtApp.$config.public.animejs?.provide) {
    // ✅ Provide server fallback
    nuxtApp.provide('anime', serverFallback)
  }
})
