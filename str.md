animejs-nuxt/
 ├─ src/
 │  ├─ module.ts              # definisi Nuxt module
 │  └─ runtime/
 │     ├─ plugin.client.ts    # loads anime.js only on the client
 │     ├─ plugin.server.ts    # SSR-safe fallback plugin
 │     ├─ types.ts            # augmentasi tipe
 │     └─ composables/
 │        ├─ useAnimate.ts
 │        ├─ useTimeline.ts
 │        ├─ useDraggable.ts
 │        ├─ useScroll.ts
 │        ├─ useScope.ts
 │        ├─ useStagger.ts
 │        ├─ useSvg.ts
 │        ├─ useText.ts
 │        ├─ useTimer.ts
 │        └─ useUtils.ts
 ├─ playground/               # app demo Nuxt
 ├─ package.json
 └─ tsconfig.json
