/* eslint-disable @typescript-eslint/no-explicit-any */
// src/runtime/composables/useAnimate.ts (ENHANCED DEBUG VERSION)
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

export interface UseAnimateOptions {
  x?: number | string | number[] | string[]
  y?: number | string | number[] | string[]
  scale?: number | number[]
  rotate?: number | string | number[]
  duration?: number
  delay?: number | ((el: any, i: number) => number)
  ease?: string
  loop?: boolean | number
  alternate?: boolean
  autoplay?: boolean
  onBegin?: (animation: any) => void
  onUpdate?: (animation: any) => void
  onComplete?: (animation: any) => void
  autoCleanup?: boolean
}

export interface UseAnimateReturn {
  animation: Ref<any | null>
  isPlaying: Ref<boolean>
  isFinished: Ref<boolean>
  play: () => void
  pause: () => void
  restart: () => void
  reverse: () => void
  cancel: () => void
}

export function useAnimate(
  targets: any,
  options: UseAnimateOptions = {},
): UseAnimateReturn {
  const animation = ref<any | null>(null)
  const isPlaying = ref(false)
  const isFinished = ref(false)

  // =============== 🔍 ENHANCED DEBUG LOGGING ===============
  const debugLog = (message: string, data?: any) => {
    console.group(`🎯 useAnimate DEBUG: ${message}`)
    if (data) console.log(data)
    console.groupEnd()
  }

  // =============== ANIMATION CONTROLS ===============
  const play = () => {
    debugLog('▶️ Play called', { hasAnimation: !!animation.value })
    if (animation.value && typeof animation.value.play === 'function') {
      animation.value.play()
      isPlaying.value = true
      isFinished.value = false
    }
    else {
      console.warn('⚠️ Cannot play: animation object invalid')
    }
  }

  const pause = () => {
    debugLog('⏸️ Pause called')
    if (animation.value && typeof animation.value.pause === 'function') {
      animation.value.pause()
      isPlaying.value = false
    }
  }

  const restart = () => {
    debugLog('🔄 Restart called')
    if (animation.value && typeof animation.value.restart === 'function') {
      animation.value.restart()
      isPlaying.value = true
      isFinished.value = false
    }
  }

  const reverse = () => {
    if (animation.value && typeof animation.value.reverse === 'function') {
      animation.value.reverse()
    }
  }

  const cancel = () => {
    if (animation.value && typeof animation.value.cancel === 'function') {
      animation.value.cancel()
      isPlaying.value = false
      isFinished.value = false
    }
  }

  // =============== 🎯 ENHANCED TARGET VALIDATION ===============
  const validateTarget = (target: any): boolean => {
    debugLog('🔍 Validating target', {
      target: target,
      type: typeof target,
      isRef: target && typeof target === 'object' && 'value' in target,
      refValue: target?.value,
      isElement: target instanceof Element,
      refIsElement: target?.value instanceof Element,
      nodeType: target?.nodeType,
      refNodeType: target?.value?.nodeType,
      tagName: target?.tagName,
      refTagName: target?.value?.tagName,
    })

    // If it's a Vue ref, check the .value
    if (target && typeof target === 'object' && 'value' in target) {
      if (!target.value) {
        console.error('❌ Target ref.value is null!')
        return false
      }
      if (!(target.value instanceof Element)) {
        console.error('❌ Target ref.value is not an Element!', target.value)
        return false
      }
      return true
    }

    // If it's a direct element
    if (target instanceof Element) {
      return true
    }

    console.error('❌ Target is invalid!', target)
    return false
  }

  // =============== 🎯 ENHANCED ANIMATION CREATION ===============
  const createAnimation = async () => {
    debugLog('🚀 Creating animation...', {
      targets,
      options,
      windowExists: typeof window !== 'undefined',
      documentExists: typeof document !== 'undefined',
    })

    // SSR Safety
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.warn('⚠️ useAnimate: Server-side detected, skipping animation')
      return
    }

    // ✅ CRITICAL: Validate target BEFORE creating animation
    if (!validateTarget(targets)) {
      console.error('❌ CRITICAL: Target validation failed! Animation will not work.')
      return
    }

    try {
      const { animate } = useNuxtApp().$anime

      if (animation.value) {
        cancel()
      }

      // Extract actual element for anime.js
      const actualTarget = targets && typeof targets === 'object' && 'value' in targets
        ? targets.value
        : targets

      debugLog('🎨 Creating anime.js animation', {
        actualTarget,
        targetTagName: actualTarget?.tagName,
        targetId: actualTarget?.id,
        targetClass: actualTarget?.className,
        animationConfig: {
          duration: options.duration ?? 1000,
          ease: options.ease ?? 'outQuad',
          loop: options.loop ?? false,
          alternate: options.alternate ?? false,
          autoplay: options.autoplay ?? true,
          x: options.x,
          y: options.y,
          scale: options.scale,
          rotate: options.rotate,
        },
      })

      const animationConfig = {
        duration: options.duration ?? 1000,
        delay: options.delay ?? 0,
        ease: options.ease ?? 'outQuad',
        loop: options.loop ?? false,
        alternate: options.alternate ?? false,
        autoplay: options.autoplay ?? true,

        ...(options.x !== undefined && { x: options.x }),
        ...(options.y !== undefined && { y: options.y }),
        ...(options.scale !== undefined && { scale: options.scale }),
        ...(options.rotate !== undefined && { rotate: options.rotate }),

        onBegin: () => {
          debugLog('🚀 Animation onBegin triggered')
          isPlaying.value = true
          isFinished.value = false
          if (options.onBegin) options.onBegin(animation.value)
        },
        onUpdate: () => {
          if (options.onUpdate) options.onUpdate(animation.value)
        },
        onComplete: () => {
          debugLog('✅ Animation onComplete triggered')
          isPlaying.value = false
          isFinished.value = true
          if (options.onComplete) options.onComplete(animation.value)
        },
      }

      // ✅ CRITICAL: Pass actual target to anime.js
      animation.value = animate(actualTarget, animationConfig)

      debugLog('✨ Animation created successfully', {
        animationObject: animation.value,
        hasTargets: !!animation.value?.targets,
        targetsCount: animation.value?.targets?.length,
      })

      if (options.autoplay !== false) {
        isPlaying.value = true
        isFinished.value = false
      }
    }
    catch (error) {
      console.error('❌ useAnimate: Failed to create animation:', error)
      animation.value = null
      isPlaying.value = false
      isFinished.value = false
    }
  }

  // =============== 🎯 ENHANCED LIFECYCLE WITH MULTIPLE TIMING APPROACHES ===============

  // Approach 1: Traditional onMounted + nextTick
  onMounted(async () => {
    debugLog('🔄 onMounted triggered')
    await nextTick()

    if (typeof window !== 'undefined') {
      debugLog('🌐 Client-side detected, creating animation...')
      await createAnimation()
    }
  })

  // Approach 2: Watch for ref changes (BACKUP STRATEGY)
  if (targets && typeof targets === 'object' && 'value' in targets) {
    watch(targets, (newVal) => {
      debugLog('👀 Target ref changed', { newVal, isElement: newVal instanceof Element })

      if (newVal instanceof Element && !animation.value) {
        debugLog('🔄 Creating animation via watcher...')
        createAnimation()
      }
    }, { immediate: false })
  }

  onUnmounted(() => {
    debugLog('🗑️ Component unmounting, cleaning up...')
    if (options.autoCleanup !== false) {
      cancel()
      animation.value = null
    }
  })

  return {
    animation,
    isPlaying,
    isFinished,
    play,
    pause,
    restart,
    reverse,
    cancel,
  }
}

// =============== SIMPLE FUNCTION (DEBUGGING VERSION) ===============
export const animateElement = async (
  targets: any,
  options: UseAnimateOptions = {},
): Promise<any> => {
  console.group('🎯 animateElement DEBUG')
  console.log('Targets:', targets)
  console.log('Options:', options)

  if (typeof window === 'undefined') {
    console.warn('⚠️ Server-side detected')
    console.groupEnd()
    return Promise.resolve()
  }

  try {
    const { animate } = useNuxtApp().$anime

    const actualTarget = targets && typeof targets === 'object' && 'value' in targets
      ? targets.value
      : targets

    console.log('Actual target for anime.js:', actualTarget)
    console.groupEnd()

    return new Promise((resolve) => {
      const originalComplete = options.onComplete

      const animation = animate(actualTarget, {
        duration: options.duration ?? 1000,
        delay: options.delay ?? 0,
        ease: options.ease ?? 'outQuad',

        ...(options.x !== undefined && { x: options.x }),
        ...(options.y !== undefined && { y: options.y }),
        ...(options.scale !== undefined && { scale: options.scale }),
        ...(options.rotate !== undefined && { rotate: options.rotate }),

        onComplete: () => {
          if (originalComplete) originalComplete(animation)
          resolve(animation)
        },
      })
    })
  }
  catch (error) {
    console.error('❌ animateElement failed:', error)
    console.groupEnd()
    return Promise.resolve()
  }
}
