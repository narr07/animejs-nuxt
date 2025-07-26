import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

export interface UseEngineOptions {
  fps?: number
  precision?: number
  timeUnit?: 'ms' | 's'
  pauseOnDocumentHidden?: boolean
  speed?: number
}

export interface UseEngineReturn {
  isRunning: Ref<boolean>
  currentTime: Ref<number>
  update: () => void
  pause: () => void
  resume: () => void
}

export function useEngine(options: UseEngineOptions = {}): UseEngineReturn {
  const isRunning = ref(false)
  const currentTime = ref(0)

  let engine: any = null

  const nuxtApp = useNuxtApp()

  const update = () => {
    if (engine && engine.update) {
      engine.update()
      currentTime.value = engine.currentTime || currentTime.value
    }
  }

  const pause = () => {
    if (engine && engine.pause) {
      engine.pause()
      isRunning.value = false
    }
  }

  const resume = () => {
    if (engine && engine.resume) {
      engine.resume()
      isRunning.value = true
    }
  }

  const createEngine = () => {
    if (typeof window === 'undefined') return

    if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('engine' in nuxtApp.$anime)) {
      console.warn('Anime.js engine not available')
      return
    }

    engine = (nuxtApp.$anime as { engine: any }).engine

    // Apply options if supported
    if (options.fps !== undefined) engine.fps = options.fps
    if (options.precision !== undefined) engine.precision = options.precision
    if (options.timeUnit !== undefined) engine.timeUnit = options.timeUnit
    if (options.pauseOnDocumentHidden !== undefined) engine.pauseOnDocumentHidden = options.pauseOnDocumentHidden
    if (options.speed !== undefined) engine.speed = options.speed

    isRunning.value = engine.isRunning || false
    currentTime.value = engine.currentTime || 0
  }

  onMounted(() => {
    createEngine()
  })

  onUnmounted(() => {
    pause()
    engine = null
  })

  return {
    isRunning,
    currentTime,
    update,
    pause,
    resume,
  }
}

