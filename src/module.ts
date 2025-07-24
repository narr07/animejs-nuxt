import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  provide?: boolean
  composables?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'animejs-nuxt',
    configKey: 'animejs',
    compatibility: { nuxt: '>=4.0.0' },
  },
  defaults: { provide: true, composables: true },
  setup(options, nuxt) {
    const r = createResolver(import.meta.url)
    addPlugin(r.resolve('./runtime/plugin'))
    if (options.composables) addImportsDir(r.resolve('./runtime/composables'))

    // ⬇️ PENTING – injeksi file typings
    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: r.resolve('./runtime/types.ts') })
    })

    nuxt.options.runtimeConfig.public.animejs = options
  },
})
