import { describe, it, expect, vi, afterEach } from 'vitest'

// Reset mocks between tests
afterEach(() => {
  vi.resetModules()
  vi.restoreAllMocks()
})


describe('useDraggable', () => {
  it('re-exports createDraggable from animejs', async () => {
    const { createDraggable } = await import('animejs')
    const { useDraggable } = await import('../src/runtime/composables/useDraggable')
    expect(useDraggable).toBe(createDraggable)
  })
})

describe('other composables', () => {
  it('calls $anime.onScroll from useScroll', async () => {
    const onScroll = vi.fn()
    vi.mock('nuxt/app', () => ({
      useNuxtApp: () => ({ $anime: { onScroll } })
    }))
    const { useScroll } = await import('../src/runtime/composables/useScroll')
    useScroll('el')
    expect(onScroll).toHaveBeenCalledWith('el')
  })

  it('calls svg helpers via useSvg', async () => {
    const createMotionPath = vi.fn()
    const morphTo = vi.fn()
    const createDrawable = vi.fn()
    vi.mock('nuxt/app', () => ({
      useNuxtApp: () => ({ $anime: { svg: { createMotionPath, morphTo, createDrawable } } })
    }))
    const { createMotionPath: cmp, morphTo: mt, createDrawable: cd } = await import('../src/runtime/composables/useSvg')
    cmp('path')
    mt('p2')
    cd('d')
    expect(createMotionPath).toHaveBeenCalledWith('path')
    expect(morphTo).toHaveBeenCalledWith('p2')
    expect(createDrawable).toHaveBeenCalledWith('d')
  })
})

describe('SSR fallback', () => {
  it('provides server fallback without throwing', async () => {
    const provide = vi.fn()
    const nuxtApp = { provide, $config: { public: { animejs: { provide: true } } } }
    const plugin = (await import('../src/runtime/plugin.server')).default
    expect(() => plugin(nuxtApp as any)).not.toThrow()
    const fallback = provide.mock.calls[0][1]
    vi.mock('nuxt/app', () => ({ useNuxtApp: () => ({ $anime: fallback }) }))
    const { useScroll } = await import('../src/runtime/composables/useScroll')
    expect(() => useScroll('el')).not.toThrow()
  })
})
