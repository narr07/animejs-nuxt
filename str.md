animejs-nuxt/
 ├─ src/
 │  ├─ module.ts              # definisi Nuxt module
 │  └─ runtime/
 │     ├─ plugin.client.ts    # plugin client-side untuk load anime.js
 │     ├─ plugin.server.ts    # plugin server-side fallback
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
 │        └─ useUtils.ts
 ├─ playground/               # app demo Nuxt
 ├─ package.json
 └─ tsconfig.json
