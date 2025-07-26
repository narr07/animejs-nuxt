// src/runtime/composables/useScroll.ts - Fixed Version
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
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
  scrollY: Ref<number>
  scrollX: Ref<number>
  velocity: Ref<number>
  direction: Ref<'up' | 'down' | 'left' | 'right' | null>

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
  const scrollY = ref(0)
  const scrollX = ref(0)
  const velocity = ref(0)
  const direction = ref<'up' | 'down' | 'left' | 'right' | null>(null)

  // Animation frame for continuous updates
  let animationFrameId: number | null = null
  let lastUpdateTime = 0

  // ScrollObserver Methods
  const revert = () => {
    if (observer.value?.revert) {
      observer.value.revert()
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
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
      
      // Update additional scroll properties if available
      if ('scrollY' in observer.value) scrollY.value = (observer.value as any).scrollY || 0
      if ('scrollX' in observer.value) scrollX.value = (observer.value as any).scrollX || 0
      if ('velocity' in observer.value) velocity.value = (observer.value as any).velocity || 0
      if ('direction' in observer.value) direction.value = (observer.value as any).direction || null
    }
  }

  // Continuous update loop for smooth progress tracking
  const startUpdateLoop = () => {
    const update = (currentTime: number) => {
      if (currentTime - lastUpdateTime >= 16) { // ~60fps
        updateReactiveValues()
        lastUpdateTime = currentTime
      }
      
      if (observer.value && isInView.value) {
        animationFrameId = requestAnimationFrame(update)
      }
    }
    
    if (observer.value) {
      animationFrameId = requestAnimationFrame(update)
    }
  }

  const createScrollObserver = async () => {
    if (typeof window === 'undefined')
      return

    const nuxtApp = useNuxtApp()
    if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('onScroll' in nuxtApp.$anime)) {
      console.warn('Anime.js onScroll not available. Make sure Anime.js v4 is properly installed.')
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
      axis: options.axis || 'y',
      target: options.target,
      repeat: options.repeat,
      debug: options.debug,

      // Thresholds - provide defaults for better functionality
      enter: options.enter || 'bottom top',
      leave: options.leave || 'top bottom',

      // Synchronisation
      sync: options.sync,

      // Enhanced callbacks with continuous updates
      onEnter: (obs: ScrollObserver) => {
        updateReactiveValues()
        startUpdateLoop()
        if (options.onEnter) options.onEnter(obs)
      },
      onLeave: (obs: ScrollObserver) => {
        updateReactiveValues()
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
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
      
      // Start continuous updates if in view
      if (isInView.value) {
        startUpdateLoop()
      }
    }
    catch (error) {
      console.error('Failed to create scroll observer:', error)
      console.error('Make sure you have Anime.js v4 installed and the onScroll function is available')
    }
  }

  onMounted(async () => {
    await nextTick()
    await createScrollObserver()
  })

  // Watch for target changes
  if (targets && typeof targets === 'object' && 'value' in targets) {
    watch(targets, async (newVal) => {
      if (newVal && !observer.value) {
        await nextTick()
        await createScrollObserver()
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
    scrollY,
    scrollX,
    velocity,
    direction,
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
    console.warn('Anime.js onScroll not available')
    return null
  }

  try {
    return (nuxtApp.$anime as { onScroll: (targets: any, params?: ScrollParams) => ScrollObserver }).onScroll(targets, params)
  } catch (error) {
    console.error('Failed to create scroll observer:', error)
    return null
  }
}
