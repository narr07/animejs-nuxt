/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/runtime/types.ts
export interface AnimeJS {
  animate: (targets: any, params?: AnimationParams) => Animation
  createTimeline: () => Timeline
  stagger: (value: any, options?: StaggerOptions) => any[]
  utils: {
    get: (targets: any, prop: string) => any
    set: (targets: any, prop: string, value: any) => void
    remove: (targets: any, prop: string) => void
  }
  svg: {
    createMotionPath: (path: string) => any
    morphTo: (path: string) => any
    createDrawable: (path: string) => any
  }
}

// ✅ anime.js v4 parameter types
export interface AnimationParams {
  duration?: number
  delay?: number
  ease?: string | Function
  loop?: number | boolean
  alternate?: boolean
  reversed?: boolean
  autoplay?: boolean
  composition?: 'replace' | 'add' | 'none'
  onBegin?: Function
  onUpdate?: Function
  onComplete?: Function
  onLoop?: Function
  onRender?: Function
  [key: string]: any
}

export interface Animation {
  play: () => Animation
  pause: () => Animation
  restart: () => Animation
  reverse: () => Animation
  cancel: () => Animation
  revert: () => Animation
  then: (callback?: Function) => Promise<any>
}

export interface Timeline extends Animation {
  add: (targets: any, params: AnimationParams, position?: number | string) => Timeline
}

export interface StaggerOptions {
  from?: 'first' | 'last' | 'center' | number
  reversed?: boolean
  grid?: [number, number]
}

// ✅ Nuxt plugin types
declare module '#app' {
  interface NuxtApp {
    $anime: AnimeJS
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $anime: AnimeJS
  }
}
