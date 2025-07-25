import { useNuxtApp } from '#imports'

export const useTimeline = (params?: any) => {
  return useNuxtApp().$anime.createTimeline(params)
}
