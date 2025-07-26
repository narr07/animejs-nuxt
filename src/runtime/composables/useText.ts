import { useNuxtApp } from 'nuxt/app'
import type { TextSplitParams, TextSplitter } from '../types'

export function useTextSplit(target: HTMLElement | string, params?: TextSplitParams): TextSplitter | null {
  if (typeof window === 'undefined') {
    console.warn('useTextSplit cannot run on the server-side.')
    return null
  }
  
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$anime || !(nuxtApp.$anime as any).text?.split) {
    console.warn('Anime.js text split functionality is not available.')
    return null
  }
  
  const element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
  if (!element) {
    console.warn('No target provided for text splitting.')
    return null
  }
  
  return (nuxtApp.$anime as any).text.split(element, params)
}

// Enhanced text split with animation presets
export function useTextSplitWithAnimation(
  target: HTMLElement | string,
  animationType: 'fadeIn' | 'slideUp' | 'slideDown' | 'scale' | 'rotate' = 'fadeIn',
  params?: TextSplitParams & { staggerDelay?: number; duration?: number }
): { splitter: TextSplitter | null; animate: () => void } {
  const splitter = useTextSplit(target, params)
  const { $anime } = useNuxtApp()
  
  const animate = () => {
    if (!splitter) return
    
    const staggerDelay = params?.staggerDelay || 50
    const duration = params?.duration || 800
    
    const animationConfigs = {
      fadeIn: { opacity: [0, 1], delay: (nuxtApp: any) => nuxtApp.$anime.stagger(staggerDelay) },
      slideUp: { y: [20, 0], opacity: [0, 1], delay: (nuxtApp: any) => nuxtApp.$anime.stagger(staggerDelay) },
      slideDown: { y: [-20, 0], opacity: [0, 1], delay: (nuxtApp: any) => nuxtApp.$anime.stagger(staggerDelay) },
      scale: { scale: [0, 1], opacity: [0, 1], delay: (nuxtApp: any) => nuxtApp.$anime.stagger(staggerDelay) },
      rotate: { rotate: [180, 0], opacity: [0, 1], delay: (nuxtApp: any) => nuxtApp.$anime.stagger(staggerDelay) }
    }
    
    const config = animationConfigs[animationType]
    if ($anime && config) {
      ($anime as any).animate(splitter.chars, {
        ...config,
        duration,
        delay: ($anime as any).stagger(staggerDelay),
        ease: 'outQuart'
      })
    }
  }
  
  return { splitter, animate }
}

// Text typewriter effect
export function useTextTypewriter(
  target: HTMLElement | string,
  text: string,
  options?: { speed?: number, cursor?: boolean }
): { start: () => void, stop: () => void, reset: () => void } {
  const element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
  if (!element) return { start: () => {}, stop: () => {}, reset: () => {} }
  
  const speed = options?.speed || 100
  const showCursor = options?.cursor !== false
  let isRunning = false
  let currentIndex = 0
  let intervalId: NodeJS.Timeout | null = null
  
  const start = () => {
    if (isRunning) return
    isRunning = true
    currentIndex = 0
    element.textContent = showCursor ? '|' : ''
    
    intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        const currentText = text.substring(0, currentIndex + 1)
        element.textContent = currentText + (showCursor ? '|' : '')
        currentIndex++
      } else {
        if (showCursor) {
          // Blinking cursor effect
          setInterval(() => {
            element.textContent = element.textContent?.endsWith('|') 
              ? text 
              : text + '|'
          }, 500)
        }
        stop()
      }
    }, speed)
  }
  
  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    isRunning = false
  }
  
  const reset = () => {
    stop()
    currentIndex = 0
    element.textContent = ''
  }
  
  return { start, stop, reset }
}

