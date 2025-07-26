import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'

export interface UseAnimatableOptions {
  duration?: number
  ease?: string
  unit?: string
  modifier?: (value: any) => any
}

export interface UseAnimatableReturn {
  target: Ref<any>
  duration: Ref<number>
  ease: Ref<string>
  revert: () => void
  get: (property: string) => any
  set: (property: string, value: any) => void
}

export function useAnimatable(target: any, options: UseAnimatableOptions = {}): UseAnimatableReturn {
  const animatable = ref<any>(null)
  const targetRef = ref(target)
  const duration = ref(options.duration || 0)
  const ease = ref(options.ease || '')

  const nuxtApp = useNuxtApp()

  const revert = () => {
    if (animatable.value && animatable.value.revert) {
      animatable.value.revert()
    }
  }

  const get = (property: string) => {
    if (animatable.value && animatable.value.get) {
      return animatable.value.get(property)
    }
    return undefined
  }

  const set = (property: string, value: any) => {
    if (animatable.value && animatable.value.set) {
      animatable.value.set(property, value)
    }
  }

  const createAnimatable = () => {
    if (typeof window === 'undefined') return

    if (!nuxtApp.$anime || !(nuxtApp.$anime as any).animatable) {
      console.warn('Anime.js animatable not available')
      return
    }

    try {
      animatable.value = (nuxtApp.$anime as any).animatable(targetRef.value, options)
      duration.value = animatable.value.duration || options.duration || 0
      ease.value = animatable.value.ease || options.ease || ''
    } catch (error) {
      console.error('Failed to create animatable:', error)
    }
  }

  onMounted(() => {
    createAnimatable()
  })

  onUnmounted(() => {
    revert()
    animatable.value = null
  })

  return {
    target: targetRef,
    duration,
    ease,
    revert,
    get,
    set,
  }
}
