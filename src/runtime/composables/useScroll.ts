import { useNuxtApp } from 'nuxt/app'

export const useScroll = (...args: any[]) => {
  const { $anime } = useNuxtApp()
  return $anime.onScroll(...args)
}
