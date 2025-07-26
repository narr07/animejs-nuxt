# Animejs-Nuxt Module

This module provides comprehensive integration of Anime.js v4 features into Nuxt.js applications with full SSR support, zero-config setup, and extensive composable APIs.

## Features

- Full Anime.js v4 feature parity
- Zero-config setup with SSR compatibility
- Tree-shakable and optimized for performance
- Comprehensive TypeScript support
- Extensive composable APIs for animations, timelines, scopes, scroll observers, draggable elements, text splitting, SVG animations, utilities, timers, engine controls, animatable objects, and Web Animation API (WAAPI)
- Detailed documentation and usage examples
- Developer-friendly with runtime warnings and devtools integration

## Installation

```bash
npm install animejs-nuxt
```

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['animejs-nuxt'],
  publicRuntimeConfig: {
    animejs: {
      provide: true,
    },
  },
})
```

## Usage

### useAnimate

Basic animation composable supporting all Anime.js animation methods, callbacks, and playback settings.

```ts
const { animation, play, pause, restart } = useAnimate(target, {
  duration: 1000,
  loop: true,
  onComplete: () => console.log('Animation complete'),
})
```

### useTimeline

Timeline composable with full timeline control and synchronization.

```ts
const { timeline, add, play, pause } = useTimeline({
  loop: true,
})
add(target, { x: 100, duration: 500 })
```

### useScope

Scope composable for grouping animations with media query support.

```ts
const { scope, animate, add } = useScope({
  root: '#container',
  mediaQueries: {
    '(max-width: 600px)': { duration: 500 },
  },
})
animate(target, { x: 100 })
```

### useScroll

Scroll observer composable with advanced callbacks and synchronization.

```ts
const { observer, progress, isInView } = useScroll(target, {
  onEnter: () => console.log('Entered viewport'),
})
```

### useDraggable

Draggable composable with full physics and callback support.

```ts
const draggable = useDraggable('#drag', {
  releaseStiffness: 200,
  onDrag: () => console.log('Dragging'),
})
```

### useText

Text splitting and animation composable with presets and typewriter effect.

```ts
const { splitter, animate } = useTextSplitWithAnimation('#text', 'fadeIn')
animate()
```

### useSvg

SVG animation helpers including motion paths, morphing, and drawing.

```ts
const { animate, reverse } = usePathAnimation(elements, '#path')
animate()
```

### useUtils

Utility functions for DOM, math, strings, and advanced helpers.

```ts
const randomValue = useRandom()(0, 10)
```

### useTimer

Timer composable with full playback control and callbacks.

```ts
const { timer, play, pause } = useTimer({ duration: 2000 })
play()
```

### useEngine

Engine control composable for animation timing and speed.

```ts
const { isRunning, update, pause, resume } = useEngine({ fps: 60 })
```

### useAnimatable

Animatable object composable with getters, setters, and revert.

```ts
const { target, get, set, revert } = useAnimatable(element, { duration: 500 })
```

### useWAAPI

Web Animation API composable with playback controls and effects.

```ts
const { animation, play, pause } = useWAAPI(element)
play()
```

## Migration Guide

- Replace direct Anime.js calls with composables.
- Use reactive state and lifecycle hooks for animation control.
- Leverage SSR-safe fallbacks provided by the module.

## Troubleshooting

- Ensure `publicRuntimeConfig.animejs.provide` is enabled.
- Check for SSR compatibility by verifying no direct DOM access on server.
- Use development warnings to identify missing features or misconfigurations.

## Development

- Run tests with `vitest`.
- Build with tree-shaking and lazy loading enabled.
- Contribute via pull requests.

## License

MIT License
