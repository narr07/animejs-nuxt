import { useNuxtApp } from 'nuxt/app'

export const useTextSplit = (...args: any[]) =>
  useNuxtApp().$anime.text.split(...args)
