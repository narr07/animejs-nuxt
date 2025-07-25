// src/module.ts
import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  provide?: boolean
  composables?: boolean
  ssr?: boolean
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
    ssr: true,
  },
  setup(options, nuxt) {
    const r = createResolver(import.meta.url)

    // ✅ Pisahkan plugin client dan server
    if (options.ssr) {
      addPlugin({ src: r.resolve('./runtime/plugin.client'), mode: 'client' })
      addPlugin({ src: r.resolve('./runtime/plugin.server'), mode: 'server' })
    }
    else {
      addPlugin({ src: r.resolve('./runtime/plugin.client'), mode: 'client' })
    }

    if (options.composables) addImportsDir(r.resolve('./runtime/composables'))

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: r.resolve('./runtime/types.ts') })
    })

    // ✅ Set runtime config dengan proper typing
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
    nuxt.options.runtimeConfig.public.animejs = options
  },
})
