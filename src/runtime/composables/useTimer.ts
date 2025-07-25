/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

import type { TimerParams, Timer } from '../types'

export interface UseTimerOptions extends TimerParams {
  autoCleanup?: boolean
}

export interface UseTimerReturn {
  timer: Ref<Timer | null>
  isPlaying: Ref<boolean>
  isFinished: Ref<boolean>
  isPaused: Ref<boolean>
  progress: Ref<number>
  currentTime: Ref<number>
  duration: Ref<number>
  
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
}

export function useTimer(
  options: UseTimerOptions = {},
): UseTimerReturn {
  const timer = ref<Timer | null>(null)
  const isPlaying = ref(false)
  const isFinished = ref(false)
  const isPaused = ref(false)
  const progress = ref(0)
  const currentTime = ref(0)
  const duration = ref(options.duration || 1000)

  // Control Methods
  const play = () => {
    if (timer.value?.play) {
      timer.value.play()
      isPlaying.value = true
      isPaused.value = false
      isFinished.value = false
    }
  }

  const pause = () => {
    if (timer.value?.pause) {
      timer.value.pause()
      isPlaying.value = false
      isPaused.value = true
    }
  }

  const restart = () => {
    if (timer.value?.restart) {
      timer.value.restart()
      isPlaying.value = true
      isPaused.value = false
      isFinished.value = false
    }
  }

  const reverse = () => {
    if (timer.value?.reverse) {
      timer.value.reverse()
    }
  }

  const cancel = () => {
    if (timer.value?.cancel) {
      timer.value.cancel()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = false
    }
  }

  const revert = () => {
    if (timer.value?.revert) {
      timer.value.revert()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = false
    }
  }

  const resume = () => {
    if (timer.value?.resume) {
      timer.value.resume()
      isPlaying.value = true
      isPaused.value = false
    }
  }

  const complete = () => {
    if (timer.value?.complete) {
      timer.value.complete()
      isPlaying.value = false
      isPaused.value = false
      isFinished.value = true
    }
  }

  const seek = (time: number) => {
    if (timer.value?.seek) {
      timer.value.seek(time)
      currentTime.value = time
    }
  }

  const stretch = (factor: number) => {
    if (timer.value?.stretch) {
      timer.value.stretch(factor)
      duration.value = (options.duration || 1000) * factor
    }
  }

  const alternate = () => {
    if (timer.value?.alternate) {
      timer.value.alternate()
    }
  }

  const updateReactiveValues = () => {
    if (timer.value) {
      progress.value = timer.value.progress || 0
      currentTime.value = timer.value.currentTime || 0
      duration.value = timer.value.duration || options.duration || 1000
      isPlaying.value = !timer.value.paused && !timer.value.completed
      isPaused.value = timer.value.paused || false
      isFinished.value = timer.value.completed || false
    }
  }

  const createTimer = async () => {
    if (typeof window === 'undefined')
      return

    const nuxtApp = useNuxtApp()
    if (!nuxtApp.$anime?.createTimer) {
      console.warn('createTimer not available in this Anime.js version')
      return
    }

    const { createTimer } = nuxtApp.$anime

    // Create timer with all supported parameters
    const timerParams: TimerParams = {
      duration: options.duration ?? 1000,
      delay: options.delay ?? 0,
      loop: options.loop ?? false,
      alternate: options.alternate ?? false,
      autoplay: options.autoplay ?? true,
      reversed: options.reversed ?? false,
      framerate: options.framerate,
      playbackRate: options.playbackRate,
      playbackLoopDelay: options.playbackLoopDelay,
      
      // Callbacks
      onBegin: (tmr: Timer) => {
        isPlaying.value = true
        isPaused.value = false
        isFinished.value = false
        updateReactiveValues()
        if (options.onBegin) options.onBegin(tmr)
      },
      onUpdate: (tmr: Timer) => {
        updateReactiveValues()
        if (options.onUpdate) options.onUpdate(tmr)
      },
      onComplete: (tmr: Timer) => {
        isPlaying.value = false
        isPaused.value = false
        isFinished.value = true
        updateReactiveValues()
        if (options.onComplete) options.onComplete(tmr)
      },
      onLoop: (tmr: Timer) => {
        updateReactiveValues()
        if (options.onLoop) options.onLoop(tmr)
      },
      onPause: (tmr: Timer) => {
        isPlaying.value = false
        isPaused.value = true
        updateReactiveValues()
        if (options.onPause) options.onPause(tmr)
      },
    }

    try {
      timer.value = createTimer(timerParams)
      updateReactiveValues()
    } catch (error) {
      console.error('Failed to create timer:', error)
    }
  }

  onMounted(async () => {
    await createTimer()
  })

  onUnmounted(() => {
    if (options.autoCleanup !== false) {
      cancel()
      timer.value = null
    }
  })

  return {
    timer,
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
  }
}
