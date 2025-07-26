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
    const onScroll = vi.fn().mockReturnValue({ progress: 0, isInView: false })

    // Mock the entire nuxt/app module before importing
    vi.doMock('nuxt/app', () => ({
      useNuxtApp: () => ({
        $anime: {
          onScroll,
        },
      }),
    }))

    // Mock Vue to prevent lifecycle warnings
    vi.doMock('vue', () => ({
      ref: vi.fn(() => ({ value: null })),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      watch: vi.fn(),
    }))

    // Mock window
    Object.defineProperty(global, 'window', {
      value: {},
      writable: true,
    })

    const { createScrollObserver } = await import('../src/runtime/composables/useScroll')
    createScrollObserver('el')
    expect(onScroll).toHaveBeenCalledWith('el', undefined)
  })

  it('calls svg helpers via useSvg', async () => {
    const createMotionPath = vi.fn().mockReturnValue({ x: () => 0, y: () => 0 })
    const morphTo = vi.fn().mockReturnValue({})
    const createDrawable = vi.fn().mockReturnValue({ draw: () => {} })

    // Mock the entire nuxt/app module before importing
    vi.doMock('nuxt/app', () => ({
      useNuxtApp: () => ({
        $anime: {
          svg: {
            createMotionPath,
            morphTo,
            createDrawable,
          },
        },
      }),
    }))

    const { createMotionPath: cmp, morphTo: mt, createDrawable: cd } = await import('../src/runtime/composables/useSvg')
    cmp('path')
    mt('p2')
    cd('d')
    expect(createMotionPath).toHaveBeenCalledWith('path', undefined)
    expect(morphTo).toHaveBeenCalledWith('p2', undefined)
    expect(createDrawable).toHaveBeenCalledWith('d', undefined)
  })
})

describe('SSR fallback', () => {
  it('provides server fallback without throwing', async () => {
    const provide = vi.fn()
    const nuxtApp = { provide, $config: { public: { animejs: { provide: true } } } }

    // Mock defineNuxtPlugin
    vi.doMock('nuxt/app', () => ({
      defineNuxtPlugin: vi.fn(callback => callback),
      useNuxtApp: () => ({ $anime: { onScroll: vi.fn() } }),
    }))

    // Mock Vue lifecycle hooks for the fallback test
    vi.doMock('vue', () => ({
      ref: vi.fn(() => ({ value: null })),
      onMounted: vi.fn(),
      onUnmounted: vi.fn(),
      watch: vi.fn(),
    }))

    const plugin = (await import('../src/runtime/plugin.server')).default
    expect(() => plugin(nuxtApp as any)).not.toThrow()

    // Test that the fallback works
    const { createScrollObserver } = await import('../src/runtime/composables/useScroll')
    expect(() => createScrollObserver('el')).not.toThrow()
  })
})
