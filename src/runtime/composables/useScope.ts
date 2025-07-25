// src/runtime/composables/useScope.ts
import { useNuxtApp } from 'nuxt/app'

export const useScope = () => {
  const { $anime } = useNuxtApp()
  return $anime.createScope()
}
