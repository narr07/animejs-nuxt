/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

import type { TimelineParams, Timeline, AnimationParams, Animation } from '../types'

export interface UseTimelineOptions extends TimelineParams {
  autoCleanup?: boolean
}

export interface UseTimelineReturn {
  timeline: Ref<Timeline | null>
  isPlaying: Ref<boolean>
  isFinished: Ref<boolean>
  isPaused: Ref<boolean>
  progress: Ref<number>
  currentTime: Ref<number>
  duration: Ref<number>
  children: Ref<Animation[]>
  
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
  
  // Timeline Methods
  add: (targets: any, params?: AnimationParams, position?: number | string) => void
  set: (targets: any, params: AnimationParams, position?: number | string) => void
  call: (callback: Function, position?: number | string) => void
  label: (name: string, position?: number | string) => void
  remove: (targets: any) => void
  sync: (timeline: Timeline) => void
  init: () => void
}

export function useTimeline(
  options: UseTimelineOptions = {},
): UseTimelineReturn {
  const timeline = ref<Timeline | null>(null)
  const isPlaying = ref(false)
  const isFinished = ref(false)
  const isPaused = ref(false)
  const progress = ref(0)
  const currentTime = ref(0)
  const duration = ref(0)
  const children = ref<Animation[]>([])

  // Control Methods
  const play = () => {
    if (timeline.value?.play) {
      timeline.value.play()
      isPlaying.value = true
      isPaused.value = false
      isFinished.value = false
    }
  }

  const pause = () => {
    if (timeline.value?.pause) {
      timeline.value.pause()
      isPlaying.value = false
      isPaused.value = true
    }
  }

  const restart = () => {
    if (timeline.value?.restart) {
      timeline.value.restart()
      isPlaying.value = true
      isPaused.value = false
      isFinished.value = false
    }
  }

  const reverse = () => {
    if (timeline.value?.reverse) {
      timeline.value.reverse()
    }
  }

  const cancel = () => {
    if (timeline.value?.cancel) {
      timeline.value.cancel()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = false
    }
  }

  const revert = () => {
    if (timeline.value?.revert) {
      timeline.value.revert()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = false
    }
  }

  const resume = () => {
    if (timeline.value?.resume) {
      timeline.value.resume()
      isPlaying.value = true
      isPaused.value = false
    }
  }

  const complete = () => {
    if (timeline.value?.complete) {
      timeline.value.complete()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = true
    }
  }

  const seek = (time: number) => {
    if (timeline.value?.seek) {
      timeline.value.seek(time)
      currentTime.value = time
    }
  }

  const stretch = (factor: number) => {
    if (timeline.value?.stretch) {
      timeline.value.stretch(factor)
    }
  }

  const alternate = () => {
    if (timeline.value?.alternate) {
      timeline.value.alternate()
    }
  }

  const refresh = () => {
    if (timeline.value?.refresh) {
      timeline.value.refresh()
    }
  }

  // Timeline Methods
  const add = (targets: any, params?: AnimationParams, position?: number | string) => {
    if (timeline.value?.add) {
      timeline.value.add(targets, params, position)
      updateReactiveValues()
    }
  }

  const set = (targets: any, params: AnimationParams, position?: number | string) => {
    if (timeline.value?.set) {
      timeline.value.set(targets, params, position)
      updateReactiveValues()
    }
  }

  const call = (callback: Function, position?: number | string) => {
    if (timeline.value?.call) {
      timeline.value.call(callback, position)
    }
  }

  const label = (name: string, position?: number | string) => {
    if (timeline.value?.label) {
      timeline.value.label(name, position)
    }
  }

  const remove = (targets: any) => {
    if (timeline.value?.remove) {
      timeline.value.remove(targets)
      updateReactiveValues()
    }
  }

  const sync = (tl: Timeline) => {
    if (timeline.value?.sync) {
      timeline.value.sync(tl)
    }
  }

  const init = () => {
    if (timeline.value?.init) {
      timeline.value.init()
    }
  }

  const updateReactiveValues = () => {
    if (timeline.value) {
      progress.value = timeline.value.progress || 0
      currentTime.value = timeline.value.currentTime || 0
      duration.value = timeline.value.duration || 0
      children.value = timeline.value.children || []
      isPlaying.value = !timeline.value.paused && !timeline.value.completed
      isPaused.value = timeline.value.paused || false
      isFinished.value = timeline.value.completed || false
    }
  }

  const createTimeline = async () => {
    if (typeof window === 'undefined')
      return

    const nuxtApp = useNuxtApp()
    if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('createTimeline' in nuxtApp.$anime)) {
      console.warn('createTimeline not available')
      return
    }

    const { createTimeline } = nuxtApp.$anime as { createTimeline: Function }

    // Create timeline with all supported parameters
    const timelineParams: TimelineParams = {
      loop: options.loop ?? false,
      alternate: options.alternate ?? false,
      autoplay: options.autoplay ?? true,
      reversed: options.reversed ?? false,
      delay: options.delay ?? 0,
      framerate: options.framerate,
      playbackRate: options.playbackRate,
      playbackEase: options.playbackEase,
      playbackLoopDelay: options.playbackLoopDelay,
      defaults: options.defaults,
      
      // Callbacks
      onBegin: (tl: Timeline) => {
        isPlaying.value = true
        isPaused.value = false
        isFinished.value = false
        updateReactiveValues()
        if (options.onBegin) options.onBegin(tl)
      },
      onUpdate: (tl: Timeline) => {
        updateReactiveValues()
        if (options.onUpdate) options.onUpdate(tl)
      },
      onComplete: (tl: Timeline) => {
        isPlaying.value = false
        isPaused.value = false
        isFinished.value = true
        updateReactiveValues()
        if (options.onComplete) options.onComplete(tl)
      },
      onLoop: (tl: Timeline) => {
        updateReactiveValues()
        if (options.onLoop) options.onLoop(tl)
      },
      onPause: (tl: Timeline) => {
        isPlaying.value = false
        isPaused.value = true
        updateReactiveValues()
        if (options.onPause) options.onPause(tl)
      },
      onRender: (tl: Timeline) => {
        updateReactiveValues()
        if (options.onRender) options.onRender(tl)
      },
      onBeforeUpdate: (tl: Timeline) => {
        if (options.onBeforeUpdate) options.onBeforeUpdate(tl)
      },
    }

    try {
      timeline.value = createTimeline(timelineParams)
      updateReactiveValues()
    } catch (error) {
      console.error('Failed to create timeline:', error)
    }
  }

  onMounted(async () => {
    await createTimeline()
  })

  onUnmounted(() => {
    if (options.autoCleanup !== false) {
      cancel()
      timeline.value = null
    }
  })

  return {
    timeline,
    isPlaying,
    isFinished,
    isPaused,
    progress,
    currentTime,
    duration,
    children,
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
    add,
    set,
    call,
    label,
    remove,
    sync,
    init,
  }
}

// Simple timeline creation function (backward compatibility)
export const createTimelineInstance = (params?: TimelineParams): Timeline | null => {
  if (typeof window === 'undefined') {
    return null
  }
  
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('createTimeline' in nuxtApp.$anime)) {
    console.warn('createTimeline not available')
    return null
  }
  
  return (nuxtApp.$anime as { createTimeline: Function }).createTimeline(params)
}

