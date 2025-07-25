import { useNuxtApp } from '#imports'

export const useTextSplit = (...args: any[]) => {
  return useNuxtApp().$anime.text.split(...args)
}
