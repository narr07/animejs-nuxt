import { useNuxtApp } from '#imports'

const svg = () => useNuxtApp().$anime.svg

export const createMotionPath = (...args: any[]) => svg().createMotionPath(...args)
export const createDrawable = (...args: any[]) => svg().createDrawable(...args)
export const morphTo = (...args: any[]) => svg().morphTo(...args)
