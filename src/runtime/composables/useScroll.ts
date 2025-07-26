// src/runtime/composables/useScroll.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

import type { ScrollParams, ScrollObserver, Animation } from '../types'

export interface UseScrollOptions extends ScrollParams {
  autoCleanup?: boolean
}

export interface UseScrollReturn {
  observer: Ref<ScrollObserver | null>
  progress: Ref<number>
  isInView: Ref<boolean>
  container: Ref<Element | null>
  target: Ref<Element | null>

  // ScrollObserver Methods
  revert: () => void
  refresh: () => void
  link: (animation: Animation) => void
}

export function useScroll(
  targets: any,
  options: UseScrollOptions = {},
): UseScrollReturn {
  const observer = ref<ScrollObserver | null>(null)
  const progress = ref(0)
  const isInView = ref(false)
  const container = ref<Element | null>(null)
  const target = ref<Element | null>(null)

  // ScrollObserver Methods
  const revert = () => {
    if (observer.value?.revert) {
      observer.value.revert()
    }
  }

  const refresh = () => {
    if (observer.value?.refresh) {
      observer.value.refresh()
    }
  }

  const link = (animation: Animation) => {
    if (observer.value?.link) {
      observer.value.link(animation)
    }
  }

  const updateReactiveValues = () => {
    if (observer.value) {
      progress.value = observer.value.progress || 0
      isInView.value = observer.value.isInView || false
      container.value = observer.value.container || null
      target.value = observer.value.target || null
    }
  }

  const createScrollObserver = async () => {
    if (typeof window === 'undefined')
      return

    const nuxtApp = useNuxtApp()
    if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('onScroll' in nuxtApp.$anime)) {
      console.warn('onScroll not available')
      return
    }

    const { onScroll } = nuxtApp.$anime as { onScroll: Function }
    const actualTarget = targets && typeof targets === 'object' && 'value' in targets
      ? targets.value
      : targets

    if (!actualTarget) {
      console.warn('No target provided for scroll observer')
      return
    }

    // Create scroll observer with all supported parameters
    const scrollParams: ScrollParams = {
      // Settings
      container: options.container,
      axis: options.axis,
      target: options.target,
      repeat: options.repeat,
      debug: options.debug,

      // Thresholds
      enter: options.enter,
      leave: options.leave,

      // Synchronisation
      sync: options.sync,

      // Callbacks
      onEnter: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (options.onEnter) options.onEnter(obs)
      },
      onLeave: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (options.onLeave) options.onLeave(obs)
      },
      onEnterForward: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (options.onEnterForward) options.onEnterForward(obs)
      },
      onEnterBackward: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (options.onEnterBackward) options.onEnterBackward(obs)
      },
      onLeaveForward: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (options.onLeaveForward) options.onLeaveForward(obs)
      },
      onLeaveBackward: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (options.onLeaveBackward) options.onLeaveBackward(obs)
      },
      onUpdate: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (options.onUpdate) options.onUpdate(obs)
      },
      onSyncComplete: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (options.onSyncComplete) options.onSyncComplete(obs)
      },
    }

    try {
      observer.value = onScroll(actualTarget, scrollParams)
      updateReactiveValues()
    }
    catch (error) {
      console.error('Failed to create scroll observer:', error)
    }
  }

  onMounted(async () => {
    await createScrollObserver()
  })

  // Watch for target changes
  if (targets && typeof targets === 'object' && 'value' in targets) {
    watch(targets, (newVal) => {
      if (newVal && !observer.value) {
        createScrollObserver()
      }
    })
  }

  onUnmounted(() => {
    if (options.autoCleanup !== false) {
      revert()
      observer.value = null
    }
  })

  return {
    observer,
    progress,
    isInView,
    container,
    target,
    revert,
    refresh,
    link,
  }
}

// Simple scroll observer creation function (backward compatibility)
export const createScrollObserver = (targets: any, params?: ScrollParams): ScrollObserver | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('onScroll' in nuxtApp.$anime)) {
    console.warn('onScroll not available')
    return null
  }

  return (nuxtApp.$anime as { onScroll: (targets: any, params?: ScrollParams) => ScrollObserver }).onScroll(targets, params)
}
