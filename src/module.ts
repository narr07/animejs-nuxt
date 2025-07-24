// src/module.ts
import {
  defineNuxtModule,
  addPlugin,
  addImportsDir,
  createResolver,
} from '@nuxt/kit'

export interface ModuleOptions {
  /** Provide $animate helper di NuxtApp & Vue instance */
  provide?: boolean
  /** Aktifkan auto-import seluruh composables */
  composables?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'animejs-nuxt',
    configKey: 'animejs',
    compatibility: { nuxt: '>=4.0.0' },
  },
  defaults: {
    provide: true,
    composables: true,
  },
  setup(options, nuxt) {
    const r = createResolver(import.meta.url)
    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: r.resolve('./runtime/types.ts') })
    })
    // 1. Inject plugin runtime
    addPlugin(r.resolve('./runtime/plugin'))

    // 2. Auto-import composables
    if (options.composables) {
      addImportsDir(r.resolve('./runtime/composables'))
    }

    // 3. Expose opsi ke runtimeConfig publik
    nuxt.options.runtimeConfig.public.animejs = {
      provide: options.provide ?? true,
      composables: options.composables ?? true,
    }
  },
})
