// src/runtime/plugin.ts
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'
import { animate } from 'animejs'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const cfg = nuxtApp.$config.public.animejs
  if (cfg?.provide) {
    nuxtApp.provide('animate', animate)
    nuxtApp.provide('animejs', animate)
  }
})
