import { useNuxtApp } from '#imports'

export const useStagger = (...args: any[]) => {
  return useNuxtApp().$anime.stagger(...args)
}
