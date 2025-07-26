// src/runtime/composables/useUtils.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNuxtApp } from 'nuxt/app'

import type { Utils, TimekeeperParams, Timekeeper } from '../types'

// Main utils composable
export function useUtils(): Utils | null {
  if (typeof window === 'undefined') {
    return null
  }
  
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$anime || typeof nuxtApp.$anime !== 'object' || !('utils' in nuxtApp.$anime)) {
    console.warn('utils not available')
    return null
  }
  
  return (nuxtApp.$anime as { utils: Utils }).utils
}

// Individual utility functions as composables
export function useGet() {
  return (targets: any, property: string) => {
    const utils = useUtils()
    return utils?.get(targets, property) || null
  }
}

export function useSet() {
  return (targets: any, property: string, value: any) => {
    const utils = useUtils()
    utils?.set(targets, property, value)
  }
}

export function useRemove() {
  return (targets: any, property: string) => {
    const utils = useUtils()
    utils?.remove(targets, property)
  }
}

export function useCleanInlineStyles() {
  return (targets: any) => {
    const utils = useUtils()
    utils?.cleanInlineStyles(targets)
  }
}

// Math Utils
export function useRandom() {
  return (min = 0, max = 1) => {
    const utils = useUtils()
    return utils?.random(min, max) || Math.random() * (max - min) + min
  }
}

export function useRandomPick() {
  return <T>(array: T[]): T => {
    const utils = useUtils()
    return utils?.randomPick(array) || array[Math.floor(Math.random() * array.length)]
  }
}

export function useLerp() {
  return (start: number, end: number, progress: number) => {
    const utils = useUtils()
    return utils?.lerp(start, end, progress) || start + (end - start) * progress
  }
}

export function useClamp() {
  return (value: number, min: number, max: number) => {
    const utils = useUtils()
    return utils?.clamp(value, min, max) || Math.min(Math.max(value, min), max)
  }
}

export function useRound() {
  return (value: number, precision = 0) => {
    const utils = useUtils()
    return utils?.round(value, precision) || Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
  }
}

export function useRoundPad() {
  return (value: number, precision: number) => {
    const utils = useUtils()
    return utils?.roundPad(value, precision) || value.toFixed(precision)
  }
}

export function useSnap() {
  return (value: number, increment: number) => {
    const utils = useUtils()
    return utils?.snap(value, increment) || Math.round(value / increment) * increment
  }
}

export function useWrap() {
  return (value: number, min: number, max: number) => {
    const utils = useUtils()
    return utils?.wrap(value, min, max) || ((value - min) % (max - min) + (max - min)) % (max - min) + min
  }
}

export function useMapRange() {
  return (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    const utils = useUtils()
    return utils?.mapRange(value, inMin, inMax, outMin, outMax) || 
           (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
  }
}

export function useInterpolate() {
  return (start: any, end: any, progress: number) => {
    const utils = useUtils()
    return utils?.interpolate(start, end, progress) || start
  }
}

// String Utils
export function usePadStart() {
  return (str: string, length: number, char = ' ') => {
    const utils = useUtils()
    return utils?.padStart(str, length, char) || str.padStart(length, char)
  }
}

export function usePadEnd() {
  return (str: string, length: number, char = ' ') => {
    const utils = useUtils()
    return utils?.padEnd(str, length, char) || str.padEnd(length, char)
  }
}

export function useShuffle() {
  return <T>(array: T[]): T[] => {
    const utils = useUtils()
    return utils?.shuffle(array) || [...array].sort(() => Math.random() - 0.5)
  }
}

// Conversion Utils
export function useDegToRad() {
  return (degrees: number) => {
    const utils = useUtils()
    return utils?.degToRad(degrees) || degrees * Math.PI / 180
  }
}

export function useRadToDeg() {
  return (radians: number) => {
    const utils = useUtils()
    return utils?.radToDeg(radians) || radians * 180 / Math.PI
  }
}

// Advanced Utils
export function useSync() {
  return (callback: Function) => {
    const utils = useUtils()
    if (utils?.sync) {
      utils.sync(callback)
    } else {
      callback()
    }
  }
}

export function useCreateTimekeeper() {
  return (params?: TimekeeperParams): Timekeeper | null => {
    const utils = useUtils()
    if (utils?.createTimekeeper) {
      return utils.createTimekeeper(params)
    }
    
    // Fallback implementation
    return {
      time: 0,
      progress: 0,
      play: () => ({}),
      pause: () => ({}),
      restart: () => ({}),
    } as Timekeeper
  }
}

export function useDollarSign() {
  return (selector: string): Element | Element[] | null => {
    const utils = useUtils()
    if (utils?.$) {
      return utils.$(selector)
    }
    
    // Fallback implementation
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll(selector)
      return elements.length === 1 ? elements[0] : Array.from(elements)
    }
    
    return null
  }
}

// Export all individual utils for convenience
export {
  useGet as get,
  useSet as set,
  useRemove as remove,
  useCleanInlineStyles as cleanInlineStyles,
  useRandom as random,
  useRandomPick as randomPick,
  useLerp as lerp,
  useClamp as clamp,
  useRound as round,
  useRoundPad as roundPad,
  useSnap as snap,
  useWrap as wrap,
  useMapRange as mapRange,
  useInterpolate as interpolate,
  usePadStart as padStart,
  usePadEnd as padEnd,
  useShuffle as shuffle,
  useDegToRad as degToRad,
  useRadToDeg as radToDeg,
  useSync as sync,
  useCreateTimekeeper as createTimekeeper,
  useDollarSign as $,
}
