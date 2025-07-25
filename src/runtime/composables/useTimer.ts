import { useNuxtApp } from 'nuxt/app'

export const useTimer = (...args: any[]) => {
  return useNuxtApp().$anime.timer(...args)
}
