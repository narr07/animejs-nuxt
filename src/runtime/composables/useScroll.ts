import { useNuxtApp } from '#imports'

export const useScroll = (...args: any[]) => {
  return useNuxtApp().$anime.onScroll(...args)
}
