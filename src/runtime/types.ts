// src/runtime/types.ts
import type { animate } from 'animejs'

declare module '#app' {
  interface NuxtApp {
    $animate: typeof animate
    $animejs: typeof animate
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $animate: typeof animate
    $animejs: typeof animate
  }
}
