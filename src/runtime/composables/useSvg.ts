import { useNuxtApp } from 'nuxt/app'

export const useSvg = () => useNuxtApp().$anime.svg

export const createMotionPath = (...args: any[]) =>
  useNuxtApp().$anime.svg.createMotionPath(...args)

export const createDrawable = (...args: any[]) =>
  useNuxtApp().$anime.svg.createDrawable(...args)

export const morphTo = (...args: any[]) =>
  useNuxtApp().$anime.svg.morphTo(...args)
