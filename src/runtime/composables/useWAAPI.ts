import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

export interface UseWAAPIOptions {
  convertEase?: boolean
  hardwareAcceleration?: boolean
}

export interface UseWAAPIReturn {
  animation: Ref<Animation | null>
  playState: Ref<AnimationPlayState | null>
  effect: Ref<KeyframeEffect | null>
  timeline: Ref<AnimationTimeline | null>
  play: () => void
  pause: () => void
  cancel: () => void
  finish: () => void
  reverse: () => void
  updatePlaybackRate: (rate: number) => void
}

export function useWAAPI(target: any, options: UseWAAPIOptions = {}): UseWAAPIReturn {
  const animation = ref<Animation | null>(null)
  const playState = ref<AnimationPlayState | null>(null)
  const effect = ref<KeyframeEffect | null>(null)
  const timeline = ref<AnimationTimeline | null>(null)

  const nuxtApp = useNuxtApp()

  const play = () => {
    if (animation.value) {
      animation.value.play()
      playState.value = animation.value.playState
    }
  }

  const pause = () => {
    if (animation.value) {
      animation.value.pause()
      playState.value = animation.value.playState
    }
  }

  const cancel = () => {
    if (animation.value) {
      animation.value.cancel()
      playState.value = animation.value.playState
    }
  }

  const finish = () => {
    if (animation.value) {
      animation.value.finish()
      playState.value = animation.value.playState
    }
  }

  const reverse = () => {
    if (animation.value) {
      animation.value.reverse()
      playState.value = animation.value.playState
    }
  }

  const updatePlaybackRate = (rate: number) => {
    if (animation.value) {
      animation.value.playbackRate = rate
    }
  }

  const createWAAPIAnimation = () => {
    if (typeof window === 'undefined') return

    if (!nuxtApp.$anime || !(nuxtApp.$anime as any).waapi) {
      console.warn('Anime.js WAAPI not available')
      return
    }

    try {
      animation.value = (nuxtApp.$anime as any).waapi(target, options)
      // Type assertion to KeyframeEffect to avoid TS error
      effect.value = animation.value.effect as KeyframeEffect || null
      timeline.value = animation.value.timeline || null
      playState.value = animation.value.playState || null
    }
    catch (error) {
      console.error('Failed to create WAAPI animation:', error)
    }
  }

  onMounted(() => {
    createWAAPIAnimation()
  })

  onUnmounted(() => {
    cancel()
    animation.value = null
  })

  return {
    animation,
    playState,
    effect,
    timeline,
    play,
    pause,
    cancel,
    finish,
    reverse,
    updatePlaybackRate,
  }
}
