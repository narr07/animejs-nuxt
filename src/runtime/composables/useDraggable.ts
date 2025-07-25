import { useNuxtApp } from '#imports'

export const useDraggable = (...args: any[]) => {
  return useNuxtApp().$anime.createDraggable(...args)
}
