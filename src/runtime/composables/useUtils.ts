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

function getUtils() {
  const utils = useUtils()
  if (utils) return utils

  // Fallback utils implementation
  return {
    get: () => null,
    set: () => {},
    remove: () => {},
    cleanInlineStyles: () => {},
    random: (min: number | any[] = 0, max = 1) => {
      if (Array.isArray(min)) {
        return min[Math.floor(Math.random() * min.length)]
      }
      return Math.random() * (max - min) + min
    },
    randomPick: <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)],
    lerp: (start: number, end: number, progress: number) => start + (end - start) * progress,
    clamp: (value: number, min: number, max: number) => Math.min(Math.max(value, min), max),
    round: (value: number, precision = 0) => Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision),
    roundPad: (value: number, precision: number) => value.toFixed(precision),
    snap: (value: number, increment: number) => Math.round(value / increment) * increment,
    wrap: (value: number, min: number, max: number) => ((value - min) % (max - min) + (max - min)) % (max - min) + min,
    mapRange: (value: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
      (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin,
    interpolate: (start: any, end: any, progress: number) => start,
    padStart: (str: string, length: number, char = ' ') => str.padStart(length, char),
    padEnd: (str: string, length: number, char = ' ') => str.padEnd(length, char),
    shuffle: <T>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5),
    degToRad: (degrees: number) => degrees * Math.PI / 180,
    radToDeg: (radians: number) => radians * 180 / Math.PI,
    sync: (callback: Function) => callback(),
    createTimekeeper: (params?: TimekeeperParams) => ({
      time: 0,
      progress: 0,
      play: () => ({}),
      pause: () => ({}),
      restart: () => ({}),
    }),
    $: (selector: string) => {
      if (typeof window !== 'undefined') {
        const elements = document.querySelectorAll(selector)
        return elements.length === 1 ? elements[0] : Array.from(elements)
      }
      return null
    },
  }
}

// Individual utility functions as composables
export function useGet() {
  const utils = getUtils()
  return (targets: any, property: string) => {
    return utils.get(targets, property)
  }
}

export function useSet() {
  const utils = getUtils()
  return (targets: any, property: string, value: any) => {
    utils.set(targets, property, value)
  }
}

export function useRemove() {
  const utils = getUtils()
  return (targets: any, property: string) => {
    utils.remove(targets, property)
  }
}

export function useCleanInlineStyles() {
  const utils = getUtils()
  return (targets: any) => {
    utils.cleanInlineStyles(targets)
  }
}

// Math Utils
export function useRandom() {
  const utils = getUtils()
  return (min = 0, max = 1) => {
    return utils.random(min, max)
  }
}

export function useRandomPick() {
  const utils = getUtils()
  return <T>(array: T[]): T => {
    return utils.randomPick(array)
  }
}

export function useLerp() {
  const utils = getUtils()
  return (start: number, end: number, progress: number) => {
    return utils.lerp(start, end, progress)
  }
}

export function useClamp() {
  const utils = getUtils()
  return (value: number, min: number, max: number) => {
    return utils.clamp(value, min, max)
  }
}

export function useRound() {
  const utils = getUtils()
  return (value: number, precision = 0) => {
    return utils.round(value, precision)
  }
}

export function useRoundPad() {
  const utils = getUtils()
  return (value: number, precision: number) => {
    return utils.roundPad(value, precision)
  }
}

export function useSnap() {
  const utils = getUtils()
  return (value: number, increment: number) => {
    return utils.snap(value, increment)
  }
}

export function useWrap() {
  const utils = getUtils()
  return (value: number, min: number, max: number) => {
    return utils.wrap(value, min, max)
  }
}

export function useMapRange() {
  const utils = getUtils()
  return (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return utils.mapRange(value, inMin, inMax, outMin, outMax)
  }
}

export function useInterpolate() {
  const utils = getUtils()
  return (start: any, end: any, progress: number) => {
    return utils.interpolate(start, end, progress)
  }
}

// String Utils
export function usePadStart() {
  const utils = getUtils()
  return (str: string, length: number, char = ' ') => {
    return utils.padStart(str, length, char)
  }
}

export function usePadEnd() {
  const utils = getUtils()
  return (str: string, length: number, char = ' ') => {
    return utils.padEnd(str, length, char)
  }
}

export function useShuffle() {
  const utils = getUtils()
  return <T>(array: T[]): T[] => {
    return utils.shuffle(array)
  }
}

// Conversion Utils
export function useDegToRad() {
  const utils = getUtils()
  return (degrees: number) => {
    return utils.degToRad(degrees)
  }
}

export function useRadToDeg() {
  const utils = getUtils()
  return (radians: number) => {
    return utils.radToDeg(radians)
  }
}

// Advanced Utils
export function useSync() {
  return (callback: Function) => {
    const utils = useUtils()
    if (utils?.sync) {
      utils.sync(callback)
    }
    else {
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
