// src/runtime/composables/useScroll.ts - Fixed Version with Debug Logging
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

import type { ScrollParams, ScrollObserver, Animation } from '../types'

export interface UseScrollOptions extends ScrollParams {
  autoCleanup?: boolean
  debug?: boolean
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

  // Debug logging
  const debugLog = (message: string, data?: any) => {
    if (options.debug !== false) {
      console.log(`[useScroll Debug] ${message}`, data || '')
    }
  }

  // Animation frame for continuous updates
  let animationFrameId: number | null = null
  let lastUpdateTime = 0
  let lastScrollY = 0

  // ScrollObserver Methods
  const revert = () => {
    debugLog('Reverting scroll observer')
    if (observer.value?.revert) {
      observer.value.revert()
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  const refresh = () => {
    debugLog('Refreshing scroll observer')
    if (observer.value?.refresh) {
      observer.value.refresh()
    }
  }

  const link = (animation: Animation) => {
    debugLog('Linking animation to scroll observer')
    if (observer.value?.link) {
      observer.value.link(animation)
    }
  }

  const updateReactiveValues = () => {
    if (observer.value) {
      const oldProgress = progress.value
      const oldIsInView = isInView.value
      
      progress.value = observer.value.progress || 0
      isInView.value = observer.value.isInView || false
      container.value = observer.value.container || null
      target.value = observer.value.target || null
      
      // Update additional scroll properties if available
      if ('scrollY' in observer.value) scrollY.value = (observer.value as any).scrollY || 0
      if ('scrollX' in observer.value) scrollX.value = (observer.value as any).scrollX || 0
      if ('velocity' in observer.value) velocity.value = (observer.value as any).velocity || 0
      if ('direction' in observer.value) direction.value = (observer.value as any).direction || null

      // Log changes
      if (oldProgress !== progress.value || oldIsInView !== isInView.value) {
        debugLog('Scroll values updated', {
          progress: progress.value,
          isInView: isInView.value,
          scrollY: scrollY.value,
          velocity: velocity.value,
          direction: direction.value
        })
      }
    }
  }

  // Manual scroll tracking as fallback
  const trackScrollManually = () => {
    const currentScrollY = window.scrollY
    const deltaY = currentScrollY - lastScrollY
    
    if (Math.abs(deltaY) > 1) {
      scrollY.value = currentScrollY
      velocity.value = Math.abs(deltaY)
      direction.value = deltaY > 0 ? 'down' : 'up'
      lastScrollY = currentScrollY
      
      debugLog('Manual scroll tracking', {
        scrollY: scrollY.value,
        velocity: velocity.value,
        direction: direction.value,
        deltaY
      })
    }
  }

  // Continuous update loop for smooth progress tracking
  const startUpdateLoop = () => {
    debugLog('Starting update loop')
    const update = (currentTime: number) => {
      if (currentTime - lastUpdateTime >= 16) { // ~60fps
        updateReactiveValues()
        trackScrollManually() // Fallback manual tracking
        lastUpdateTime = currentTime
      }
      
      if (observer.value) {
        animationFrameId = requestAnimationFrame(update)
      }
    }
    
    if (observer.value || !observer.value) { // Always start the loop for manual tracking
      animationFrameId = requestAnimationFrame(update)
    }
  }

  const createScrollObserver = async () => {
    debugLog('Creating scroll observer...')
    
    if (typeof window === 'undefined') {
      debugLog('Window is undefined, skipping scroll observer creation')
      return
    }

    const nuxtApp = useNuxtApp()
    debugLog('NuxtApp available:', !!nuxtApp)
    debugLog('$anime available:', !!nuxtApp.$anime)
    debugLog('onScroll available:', !!(nuxtApp.$anime && 'onScroll' in nuxtApp.$anime))

    // Start manual tracking regardless of Anime.js availability
    startUpdateLoop()

    if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('onScroll' in nuxtApp.$anime)) {
      debugLog('Anime.js onScroll not available. Using manual scroll tracking only.')
      
      // Manual scroll event listener as fallback
      const handleScroll = () => {
        trackScrollManually()
        
        // Simple in-view detection
        const targetElement = targets && typeof targets === 'object' && 'value' in targets
          ? targets.value
          : targets
          
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const isVisible = rect.top < windowHeight && rect.bottom > 0
          
          if (isVisible !== isInView.value) {
            isInView.value = isVisible
            debugLog('Manual in-view detection', { isInView: isVisible, rect })
          }
          
          // Calculate progress based on element position
          if (isVisible) {
            const elementHeight = rect.height
            const visibleTop = Math.max(0, -rect.top)
            const visibleHeight = Math.min(elementHeight, windowHeight - Math.max(0, rect.top))
            const progressCalc = visibleHeight / elementHeight
            
            if (Math.abs(progressCalc - progress.value) > 0.01) {
              progress.value = Math.max(0, Math.min(1, progressCalc))
              debugLog('Manual progress calculation', { progress: progress.value, rect })
            }
          }
        }
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      // Initial check
      handleScroll()
      
      // Cleanup function
      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
      })
      
      return
    }

    const { onScroll } = nuxtApp.$anime as { onScroll: Function }
    const actualTarget = targets && typeof targets === 'object' && 'value' in targets
      ? targets.value
      : targets

    if (!actualTarget) {
      debugLog('No target provided for scroll observer')
      return
    }

    debugLog('Target element:', actualTarget)

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

      // Enhanced callbacks with detailed logging
      onEnter: (obs: ScrollObserver) => {
        debugLog('onEnter triggered', obs)
        updateReactiveValues()
        if (options.onEnter) options.onEnter(obs)
      },
      onLeave: (obs: ScrollObserver) => {
        debugLog('onLeave triggered', obs)
        updateReactiveValues()
        if (options.onLeave) options.onLeave(obs)
      },
      onEnterForward: (obs: ScrollObserver) => {
        debugLog('onEnterForward triggered', obs)
        updateReactiveValues()
        if (options.onEnterForward) options.onEnterForward(obs)
      },
      onEnterBackward: (obs: ScrollObserver) => {
        debugLog('onEnterBackward triggered', obs)
        updateReactiveValues()
        if (options.onEnterBackward) options.onEnterBackward(obs)
      },
      onLeaveForward: (obs: ScrollObserver) => {
        debugLog('onLeaveForward triggered', obs)
        updateReactiveValues()
        if (options.onLeaveForward) options.onLeaveForward(obs)
      },
      onLeaveBackward: (obs: ScrollObserver) => {
        debugLog('onLeaveBackward triggered', obs)
        updateReactiveValues()
        if (options.onLeaveBackward) options.onLeaveBackward(obs)
      },
      onUpdate: (obs: ScrollObserver) => {
        debugLog('onUpdate triggered', { progress: obs.progress, isInView: obs.isInView })
        updateReactiveValues()
        if (options.onUpdate) options.onUpdate(obs)
      },
      onSyncComplete: (obs: ScrollObserver) => {
        debugLog('onSyncComplete triggered', obs)
        updateReactiveValues()
        if (options.onSyncComplete) options.onSyncComplete(obs)
      },
    }

    debugLog('Scroll params:', scrollParams)

    try {
      observer.value = onScroll(actualTarget, scrollParams)
      debugLog('Scroll observer created successfully:', observer.value)
      updateReactiveValues()
    }
    catch (error) {
      debugLog('Failed to create scroll observer:', error)
      console.error('Failed to create scroll observer:', error)
      console.error('Make sure you have Anime.js v4 installed and the onScroll function is available')
    }
  }

  onMounted(async () => {
    debugLog('Component mounted, creating scroll observer...')
    await nextTick()
    await createScrollObserver()
  })

  // Watch for target changes
  if (targets && typeof targets === 'object' && 'value' in targets) {
    watch(targets, async (newVal) => {
      debugLog('Target changed:', newVal)
      if (newVal && !observer.value) {
        await nextTick()
        await createScrollObserver()
      }
    })
  }

  onUnmounted(() => {
    debugLog('Component unmounting...')
    if (options.autoCleanup !== false) {
      revert()
      observer.value = null
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
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
    } catch (error: any) {
      console.error('Failed to create scroll observer:', error)
      return null
    }
}
