// src/runtime/composables/useScope.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

import type { ScopeParams, Scope, AnimationParams, Animation } from '../types'

export interface UseScopeOptions extends ScopeParams {
  autoCleanup?: boolean
}

export interface UseScopeReturn {
  scope: Ref<Scope | null>
  root: Ref<Element | null>
  defaults: Ref<AnimationParams>
  
  // Scope Methods
  animate: (targets: any, params?: AnimationParams) => Animation | null
  add: (targets: any, params?: AnimationParams) => void
  addOnce: (targets: any, params?: AnimationParams) => void
  revert: (targets?: any) => void
  refresh: () => void
  keepTime: (value: boolean) => void
}

export function useScope(
  options: UseScopeOptions = {},
): UseScopeReturn {
  const scope = ref<Scope | null>(null)
  const root = ref<Element | null>(null)
  const defaults = ref<AnimationParams>(options.defaults || {})

  // Scope Methods
  const animate = (targets: any, params?: AnimationParams): Animation | null => {
    if (scope.value?.animate) {
      try {
        return scope.value.animate(targets, params)
      } catch (error) {
        console.error('Failed to animate in scope:', error)
        return null
      }
    }
    return null
  }

  const add = (targets: any, params?: AnimationParams) => {
    if (scope.value?.add) {
      scope.value.add(targets, params)
    }
  }

  const addOnce = (targets: any, params?: AnimationParams) => {
    if (scope.value?.addOnce) {
      scope.value.addOnce(targets, params)
    }
  }

  const revert = (targets?: any) => {
    if (scope.value?.revert) {
      scope.value.revert(targets)
    }
  }

  const refresh = () => {
    if (scope.value?.refresh) {
      scope.value.refresh()
    }
  }

  const keepTime = (value: boolean) => {
    if (scope.value?.keepTime) {
      scope.value.keepTime(value)
    }
  }

  const updateReactiveValues = () => {
    if (scope.value) {
      root.value = scope.value.root || null
      defaults.value = scope.value.defaults || {}
    }
  }

  const createScope = async () => {
    if (typeof window === 'undefined')
      return

    const nuxtApp = useNuxtApp()
    if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('createScope' in nuxtApp.$anime)) {
      console.warn('createScope not available')
      return
    }

    const { createScope } = nuxtApp.$anime as { createScope: Function }

    // Create scope with all supported parameters
    const scopeParams: ScopeParams = {
      root: options.root,
      defaults: options.defaults,
      mediaQueries: options.mediaQueries,
    }

    try {
      scope.value = createScope(scopeParams)
      updateReactiveValues()
    } catch (error) {
      console.error('Failed to create scope:', error)
    }
  }

  onMounted(async () => {
    await createScope()
  })

  onUnmounted(() => {
    if (options.autoCleanup !== false) {
      revert()
      scope.value = null
    }
  })

  return {
    scope,
    root,
    defaults,
    animate,
    add,
    addOnce,
    revert,
    refresh,
    keepTime,
  }
}

// Simple scope creation function (backward compatibility)
export const createScopeInstance = (params?: ScopeParams) => {
  if (typeof window === 'undefined') {
    return null
  }
  
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('createScope' in nuxtApp.$anime)) {
    console.warn('createScope not available')
    return null
  }
  
  return (nuxtApp.$anime as { createScope: Function }).createScope(params)
}
