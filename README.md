<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# animejs-nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module that integrates **anime.js** v4 with zero configuration. It lazily
loads the library on the client and provides SSR-safe fallbacks so you can use
anime.js in your components without extra setup.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

* Zero configuration – just install and start animating
* Works with both client-side and server-side rendering
* Useful composables like `useAnimate` and `useTimeline`

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add animejs-nuxt
```

That's it! You can now use anime.js in your Nuxt app ✨

## Usage

All composables are auto-imported when you enable them (the default). Simply
call them directly in your components.

### `useAnimate`

Animate a single element and get playback controls.

```ts
const el = ref<HTMLElement | null>(null)
const { play, pause } = useAnimate(el, { x: [0, 100] })
```

### `useTimeline`

Create and control an anime.js timeline.

```ts
const tl = useTimeline({ autoplay: false })
tl.add(el.value, { scale: [1, 2] })
tl.play()
```

### `useScope`

Create a scoped animator instance.

```ts
const scope = useScope()
scope.animate(el.value, { y: [0, 50] })
```

### `useStagger`

Generate staggered values.

```ts
const offset = useStagger(20)
$anime.animate(nodes, { x: offset, delay: useStagger(100) })
```

### `useSvg`

Helpers for SVG animations.

```ts
const { createMotionPath } = useSvg()
const path = createMotionPath('#path')
$anime.animate(dot.value, { translateX: path('x'), translateY: path('y') })
```

### `useTextSplit`

Split text nodes into characters for animation.

```ts
const chars = useTextSplit(el.value)
$anime.animate(chars, { opacity: [0, 1], delay: useStagger(50) })
```

### `useUtils`

Access anime.js utility helpers.

```ts
const color = useUtils.random(['#f00', '#0f0', '#00f'])
```

### `useDraggable`

Make an element draggable.

```ts
onMounted(() => {
  if (box.value)
    useDraggable(box.value)
})
```

### `useScroll`

Trigger animations on scroll.

```ts
onMounted(() => {
  if (box.value)
    useScroll(box.value, { y: [0, 200] })
})
```


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/animejs-nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/animejs-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/animejs-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/animejs-nuxt

[license-src]: https://img.shields.io/npm/l/animejs-nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/animejs-nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
