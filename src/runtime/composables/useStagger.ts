import { useNuxtApp } from 'nuxt/app'
import type { StaggerOptions, StaggerFunction } from '../types'

export function useStagger(
  value: number | [number, number], 
  options?: StaggerOptions
): StaggerFunction {
  const nuxtApp = useNuxtApp()
  
  // Fallback if anime.js is not available
  if (!nuxtApp.$anime || !(nuxtApp.$anime as any).stagger) {
    console.warn('Anime.js stagger functionality is not available.')
    return () => typeof value === 'number' ? value : 0
  }
  
  try {
    return (nuxtApp.$anime as any).stagger(value, options)
  } catch (error) {
    console.error('Error in useStagger:', error)
    return () => typeof value === 'number' ? value : 0
  }
}

// Enhanced stagger with grid support
export function useStaggerGrid(
  grid: [number, number],
  value: number | [number, number],
  options?: Omit<StaggerOptions, 'grid'>
): StaggerFunction {
  return useStagger(value, { ...options, grid })
}

// Stagger with easing
export function useStaggerEased(
  value: number | [number, number],
  ease: string | ((t: number) => number),
  options?: Omit<StaggerOptions, 'ease'>
): StaggerFunction {
  return useStagger(value, { ...options, ease })
}

// Stagger from specific position
export function useStaggerFrom(
  value: number | [number, number],
  from: 'first' | 'last' | 'center' | number | [number, number],
  options?: Omit<StaggerOptions, 'from'>
): StaggerFunction {
  return useStagger(value, { ...options, from })
}

// Advanced stagger with multiple animation properties
export function useStaggerAnimation(
  elements: NodeListOf<Element> | Element[],
  animations: {
    [property: string]: {
      values: any[]
      stagger?: number | [number, number]
      staggerOptions?: StaggerOptions
    }
  },
  globalOptions?: {
    duration?: number
    ease?: string
    delay?: number
  }
): { animate: () => void, reverse: () => void } {
  const { $anime } = useNuxtApp()
  
  const animate = () => {
    if (!$anime) return
    
    const animationConfig: any = {
      duration: globalOptions?.duration || 1000,
      ease: globalOptions?.ease || 'outQuart',
      delay: globalOptions?.delay || 0
    }
    
    Object.entries(animations).forEach(([property, config]) => {
      if (config.stagger) {
        animationConfig[property] = config.values
        animationConfig.delay = useStagger(config.stagger, config.staggerOptions)
      } else {
        animationConfig[property] = config.values
      }
    })
    
    ;($anime as any).animate(elements, animationConfig)
  }
  
  const reverse = () => {
    if (!$anime) return
    
    const animationConfig: any = {
      duration: globalOptions?.duration || 1000,
      ease: globalOptions?.ease || 'outQuart',
      delay: globalOptions?.delay || 0
    }
    
    Object.entries(animations).forEach(([property, config]) => {
      const reversedValues = [...config.values].reverse()
      if (config.stagger) {
        animationConfig[property] = reversedValues
        animationConfig.delay = useStagger(config.stagger, { 
          ...config.staggerOptions,
          reversed: !config.staggerOptions?.reversed 
        })
      } else {
        animationConfig[property] = reversedValues
      }
    })
    
    ;($anime as any).animate(elements, animationConfig)
  }
  
  return { animate, reverse }
}

// Stagger with custom timing functions
export function useStaggerTiming(
  elements: NodeListOf<Element> | Element[],
  timingFunction: (index: number, total: number) => number,
  animation: any
): void {
  const { $anime } = useNuxtApp()
  if (!$anime) return
  
  const elementsArray = Array.from(elements)
  
  elementsArray.forEach((element, index) => {
    const delay = timingFunction(index, elementsArray.length)
    
    ;($anime as any).animate(element, {
      ...animation,
      delay
    })
  })
}
