/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

import type { AnimationParams, Animation, StaggerFunction } from '../types'

export interface UseAnimateOptions extends AnimationParams {
  autoCleanup?: boolean
}

export interface UseAnimateReturn {
  animation: Ref<Animation | null>
  isPlaying: Ref<boolean>
  isFinished: Ref<boolean>
  isPaused: Ref<boolean>
  progress: Ref<number>
  currentTime: Ref<number>
  duration: Ref<number | ((el: any, i: number, total: number) => number)>
  
  // Control Methods
  play: () => void
  pause: () => void
  restart: () => void
  reverse: () => void
  cancel: () => void
  revert: () => void
  resume: () => void
  complete: () => void
  seek: (time: number) => void
  stretch: (factor: number) => void
  alternate: () => void
  refresh: () => void
}

export function useAnimate(
  targets: any,
  options: UseAnimateOptions = {},
): UseAnimateReturn {
  const animation = ref<Animation | null>(null)
  const isPlaying = ref(false)
  const isFinished = ref(false)
  const isPaused = ref(false)
  const progress = ref(0)
  const currentTime = ref(0)
  const duration = ref(options.duration || 1000)

  // Control Methods
  const play = () => {
    if (animation.value?.play) {
      animation.value.play()
      isPlaying.value = true
      isPaused.value = false
      isFinished.value = false
    }
  }

  const pause = () => {
    if (animation.value?.pause) {
      animation.value.pause()
      isPlaying.value = false
      isPaused.value = true
    }
  }

  const restart = () => {
    if (animation.value?.restart) {
      animation.value.restart()
      isPlaying.value = true
      isPaused.value = false
      isFinished.value = false
    }
  }

  const reverse = () => {
    if (animation.value?.reverse) {
      animation.value.reverse()
    }
  }

  const cancel = () => {
    if (animation.value?.cancel) {
      animation.value.cancel()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = false
    }
  }

  const revert = () => {
    if (animation.value?.revert) {
      animation.value.revert()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = false
    }
  }

  const resume = () => {
    if (animation.value?.resume) {
      animation.value.resume()
      isPlaying.value = true
      isPaused.value = false
    }
  }

  const complete = () => {
    if (animation.value?.complete) {
      animation.value.complete()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = true
    }
  }

  const seek = (time: number) => {
    if (animation.value?.seek) {
      animation.value.seek(time)
      currentTime.value = time
    }
  }

  const stretch = (factor: number) => {
    if (animation.value?.stretch) {
      animation.value.stretch(factor)
      duration.value = (typeof options.duration === 'number' ? options.duration : 1000) * factor
    }
  }

  const alternate = () => {
    if (animation.value?.alternate) {
      animation.value.alternate()
    }
  }

  const refresh = () => {
    if (animation.value?.refresh) {
      animation.value.refresh()
    }
  }

  const updateReactiveValues = () => {
    if (animation.value) {
      progress.value = animation.value.progress || 0
      currentTime.value = animation.value.currentTime || 0
      duration.value = animation.value.duration || options.duration || 1000
      isPlaying.value = !animation.value.paused && !animation.value.completed
      isPaused.value = animation.value.paused || false
      isFinished.value = animation.value.completed || false
    }
  }

  const createAnimation = async () => {
    if (typeof window === 'undefined')
      return

    const nuxtApp = useNuxtApp()
    if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('animate' in nuxtApp.$anime)) {
      console.warn('Anime.js not available')
      return
    }

    const { animate } = nuxtApp.$anime as { animate: Function }
    const actualTarget = targets && typeof targets === 'object' && 'value' in targets
      ? targets.value
      : targets

    if (!actualTarget) {
      console.warn('No target provided for animation')
      return
    }

    // Create animation with all supported parameters
    const animationParams: AnimationParams = {
      duration: options.duration ?? 1000,
      delay: options.delay ?? 0,
      ease: options.ease ?? 'outQuad',
      loop: options.loop ?? false,
      alternate: options.alternate ?? false,
      reversed: options.reversed ?? false,
      autoplay: options.autoplay ?? true,
      framerate: options.framerate,
      playbackRate: options.playbackRate,
      playbackEase: options.playbackEase,
      playbackLoopDelay: options.playbackLoopDelay,
      
      // Transform properties
      ...(options.x !== undefined && { x: options.x }),
      ...(options.y !== undefined && { y: options.y }),
      ...(options.z !== undefined && { z: options.z }),
      ...(options.scale !== undefined && { scale: options.scale }),
      ...(options.scaleX !== undefined && { scaleX: options.scaleX }),
      ...(options.scaleY !== undefined && { scaleY: options.scaleY }),
      ...(options.scaleZ !== undefined && { scaleZ: options.scaleZ }),
      ...(options.rotate !== undefined && { rotate: options.rotate }),
      ...(options.rotateX !== undefined && { rotateX: options.rotateX }),
      ...(options.rotateY !== undefined && { rotate: options.rotateY }),
      ...(options.rotateZ !== undefined && { rotateZ: options.rotateZ }),
      ...(options.skew !== undefined && { skew: options.skew }),
      ...(options.skewX !== undefined && { skewX: options.skewX }),
      ...(options.skewY !== undefined && { skewY: options.skewY }),
      ...(options.translateX !== undefined && { translateX: options.translateX }),
      ...(options.translateY !== undefined && { translateY: options.translateY }),
      ...(options.translateZ !== undefined && { translateZ: options.translateZ }),
      
      // CSS properties
      ...(options.opacity !== undefined && { opacity: options.opacity }),
      ...(options.backgroundColor !== undefined && { backgroundColor: options.backgroundColor }),
      ...(options.color !== undefined && { color: options.color }),
      ...(options.width !== undefined && { width: options.width }),
      ...(options.height !== undefined && { height: options.height }),
      
      // Tween parameters
      ...(options.from !== undefined && { from: options.from }),
      ...(options.to !== undefined && { to: options.to }),
      ...(options.modifier !== undefined && { modifier: options.modifier }),
      ...(options.composition !== undefined && { composition: options.composition }),
      
      // Keyframes
      ...(options.keyframes !== undefined && { keyframes: options.keyframes }),
      
      // Callbacks
      onBegin: (anim: Animation) => {
        isPlaying.value = true
        isPaused.value = false
        isFinished.value = false
        updateReactiveValues()
        if (options.onBegin) options.onBegin(anim)
      },
      onUpdate: (anim: Animation) => {
        updateReactiveValues()
        if (options.onUpdate) options.onUpdate(anim)
      },
      onComplete: (anim: Animation) => {
        isPlaying.value = false
        isPaused.value = false
        isFinished.value = true
        updateReactiveValues()
        if (options.onComplete) options.onComplete(anim)
      },
      onLoop: (anim: Animation) => {
        updateReactiveValues()
        if (options.onLoop) options.onLoop(anim)
      },
      onPause: (anim: Animation) => {
        isPlaying.value = false
        isPaused.value = true
        updateReactiveValues()
        if (options.onPause) options.onPause(anim)
      },
      onRender: (anim: Animation) => {
        updateReactiveValues()
        if (options.onRender) options.onRender(anim)
      },
      onBeforeUpdate: (anim: Animation) => {
        if (options.onBeforeUpdate) options.onBeforeUpdate(anim)
      },
      
      // Add any additional properties
      ...Object.keys(options).reduce((acc, key) => {
        if (!['autoCleanup', 'onBegin', 'onUpdate', 'onComplete', 'onLoop', 'onPause', 'onRender', 'onBeforeUpdate'].includes(key)) {
          acc[key] = options[key as keyof UseAnimateOptions]
        }
        return acc
      }, {} as any)
    }

    try {
      animation.value = animate(actualTarget, animationParams)
      updateReactiveValues()
    } catch (error) {
      console.error('Failed to create animation:', error)
    }
  }

  onMounted(async () => {
    await nextTick()
    await createAnimation()
  })

  // Watch for target changes
  if (targets && typeof targets === 'object' && 'value' in targets) {
    watch(targets, (newVal) => {
      if (newVal && !animation.value) {
        createAnimation()
      }
    })
  }

  onUnmounted(() => {
    if (options.autoCleanup !== false) {
      cancel()
      animation.value = null
    }
  })

  return {
    animation,
    isPlaying,
    isFinished,
    isPaused,
    progress,
    currentTime,
    duration,
    play,
    pause,
    restart,
    reverse,
    cancel,
    revert,
    resume,
    complete,
    seek,
    stretch,
    alternate,
    refresh,
  }
}

// Enhanced animateElement function
export const animateElement = (
  targets: any,
  options: UseAnimateOptions = {},
): Promise<Animation> => {
  if (typeof window === 'undefined') {
    return Promise.resolve({} as Animation)
  }

  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('animate' in nuxtApp.$anime)) {
    console.warn('Anime.js not available')
    return Promise.resolve({} as Animation)
  }

  const { animate } = nuxtApp.$anime as { animate: Function }
  const actualTarget = targets && typeof targets === 'object' && 'value' in targets
    ? targets.value
    : targets

  return new Promise((resolve, reject) => {
    try {
      const originalComplete = options.onComplete

      const animation = animate(actualTarget, {
        ...options,
        onComplete: (anim: Animation) => {
          if (originalComplete) originalComplete(anim)
          resolve(anim)
        },
      })

      // Fallback resolve in case onComplete doesn't fire
      if (animation && typeof animation.then === 'function') {
        animation.then(() => resolve(animation))
      }
    } catch (error) {
      reject(error)
    }
  })
}
