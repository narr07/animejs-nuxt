/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

import type { StaggerFunction } from '../types'

export interface UseAnimateOptions {
  x?: number | string | number[] | string[]
  y?: number | string | number[] | string[]
  scale?: number | number[]
  rotate?: number | string | number[]
  duration?: number
  delay?: number | string | StaggerFunction
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

  const play = () => {
    if (animation.value?.play) {
      animation.value.play()
      isPlaying.value = true
      isFinished.value = false
    }
  }

  const pause = () => {
    if (animation.value?.pause) {
      animation.value.pause()
      isPlaying.value = false
    }
  }

  const restart = () => {
    if (animation.value?.restart) {
      animation.value.restart()
      isPlaying.value = true
      isFinished.value = false
    }
  }

  const reverse = () => {
    if (animation.value?.reverse)
      animation.value.reverse()
  }

  const cancel = () => {
    if (animation.value?.cancel) {
      animation.value.cancel()
      isPlaying.value = false
      isFinished.value = false
    }
  }

  const createAnimation = async () => {
    if (typeof window === 'undefined')
      return

    const { animate } = useNuxtApp().$anime
    const actualTarget = targets && typeof targets === 'object' && 'value' in targets
      ? targets.value
      : targets

    animation.value = animate(actualTarget, {
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
        isPlaying.value = true
        isFinished.value = false
        if (options.onBegin) options.onBegin(animation.value)
      },
      onUpdate: () => {
        if (options.onUpdate) options.onUpdate(animation.value)
      },
      onComplete: () => {
        isPlaying.value = false
        isFinished.value = true
        if (options.onComplete) options.onComplete(animation.value)
      },
    })
  }

  onMounted(async () => {
    await nextTick()
    await createAnimation()
  })

  if (targets && typeof targets === 'object' && 'value' in targets) {
    watch(targets, (newVal) => {
      if (newVal instanceof Element && !animation.value)
        createAnimation()
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
    play,
    pause,
    restart,
    reverse,
    cancel,
  }
}

export const animateElement = async (
  targets: any,
  options: UseAnimateOptions = {},
): Promise<any> => {
  if (typeof window === 'undefined')
    return Promise.resolve()

  const { animate } = useNuxtApp().$anime
  const actualTarget = targets && typeof targets === 'object' && 'value' in targets
    ? targets.value
    : targets

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
