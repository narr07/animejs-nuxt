import { useNuxtApp } from 'nuxt/app'
import type { Draggable, DraggableParams } from '../types'

export function useDraggable(target: HTMLElement | string, options?: DraggableParams): Draggable | null {
  if (typeof window === 'undefined') {
    console.warn('useDraggable cannot run on the server-side.')
    return null
  }
  
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$anime || !(nuxtApp.$anime as any).createDraggable) {
    console.warn('Anime.js is not available.')
    return null
  }
  
  const element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
  if (!element) {
    console.warn('No target provided for draggable animation.')
    return null
  }
  
  return (nuxtApp.$anime as any).createDraggable(element, options)
}

// Enhanced draggable with constraints
export function useDraggableWithConstraints(
  target: HTMLElement | string, 
  constraints?: { 
    x?: { min?: number, max?: number }, 
    y?: { min?: number, max?: number },
    container?: HTMLElement | string
  },
  options?: DraggableParams
): Draggable | null {
  const element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
  if (!element) return null
  
  const containerEl = constraints?.container 
    ? (typeof constraints.container === 'string' ? document.querySelector(constraints.container) as HTMLElement : constraints.container)
    : element.parentElement as HTMLElement
  
  const draggableOptions: DraggableParams = {
    ...options,
    container: containerEl,
    x: constraints?.x ? {
      snap: (value: number) => Math.max(constraints.x!.min || -Infinity, Math.min(constraints.x!.max || Infinity, value))
    } : undefined,
    y: constraints?.y ? {
      snap: (value: number) => Math.max(constraints.y!.min || -Infinity, Math.min(constraints.y!.max || Infinity, value))
    } : undefined
  }
  
  return useDraggable(element, draggableOptions)
}
