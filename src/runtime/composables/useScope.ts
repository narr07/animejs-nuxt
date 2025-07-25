// src/runtime/composables/useScope.ts
import { useNuxtApp } from '#imports'

export const useScope = (...args: any[]) => {
  return useNuxtApp().$anime.createScope(...args)
}
