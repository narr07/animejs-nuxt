import { useNuxtApp } from 'nuxt/app'
import type { SVGHelpers, MotionPath, Drawable, MotionPathParams, DrawableParams, MorphParams } from '../types'

export function useSvg(): SVGHelpers | null {
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$anime || !(nuxtApp.$anime as any).svg) {
    console.warn('Anime.js SVG functionality is not available.')
    return null
  }
  return (nuxtApp.$anime as any).svg
}

export function createMotionPath(
  path: string | SVGPathElement,
  params?: MotionPathParams,
): MotionPath | null {
  const svg = useSvg()
  if (!svg || !svg.createMotionPath) {
    return null
  }
  return svg.createMotionPath(path, params)
}

export function createDrawable(
  target: string | SVGElement,
  params?: DrawableParams,
): Drawable | null {
  const svg = useSvg()
  if (!svg || !svg.createDrawable) {
    return null
  }
  return svg.createDrawable(target, params)
}

export function morphTo(
  target: string | SVGElement,
  params?: MorphParams,
): any {
  const svg = useSvg()
  if (!svg || !svg.morphTo) {
    return null
  }
  return svg.morphTo(target, params)
}

// Enhanced SVG path animation with multiple elements
export function usePathAnimation(
  elements: (HTMLElement | SVGElement)[],
  path: string | SVGPathElement,
  options?: {
    duration?: number
    stagger?: number
    ease?: string
    rotate?: boolean
    precision?: number
  },
): { animate: () => void, reverse: () => void } {
  const { $anime } = useNuxtApp()

  const animate = () => {
    const motionPath = createMotionPath(path, {
      precision: options?.precision || 1,
      rotate: options?.rotate || false,
    })

    if (!motionPath || !$anime) return

    elements.forEach((element, index) => {
      const delay = (options?.stagger || 0) * index

      ;($anime as any).animate(element, {
        translateX: motionPath.x,
        translateY: motionPath.y,
        rotate: options?.rotate ? motionPath.angle : 0,
        duration: options?.duration || 2000,
        delay,
        ease: options?.ease || 'outQuart',
      })
    })
  }

  const reverse = () => {
    const motionPath = createMotionPath(path, {
      precision: options?.precision || 1,
      rotate: options?.rotate || false,
    })

    if (!motionPath || !$anime) return

    elements.forEach((element, index) => {
      const delay = (options?.stagger || 0) * (elements.length - 1 - index)

      ;($anime as any).animate(element, {
        translateX: [motionPath.x(1), motionPath.x(0)],
        translateY: [motionPath.y(1), motionPath.y(0)],
        rotate: options?.rotate ? [motionPath.angle(1), motionPath.angle(0)] : 0,
        duration: options?.duration || 2000,
        delay,
        ease: options?.ease || 'outQuart',
      })
    })
  }

  return { animate, reverse }
}

// SVG drawing animation
export function useSvgDraw(
  paths: (string | SVGPathElement)[],
  options?: {
    duration?: number
    stagger?: number
    ease?: string
    direction?: 'forward' | 'reverse'
  },
): { draw: () => void, erase: () => void } {
  const { $anime } = useNuxtApp()

  const draw = () => {
    if (!$anime) return

    paths.forEach((path, index) => {
      const drawable = createDrawable(path)
      if (!drawable) return

      const delay = (options?.stagger || 0) * index
      const pathElement = typeof path === 'string' ? document.querySelector(path) as SVGPathElement : path

      if (pathElement) {
        const length = pathElement.getTotalLength()
        pathElement.style.strokeDasharray = length.toString()
        pathElement.style.strokeDashoffset = options?.direction === 'reverse' ? '0' : length.toString()

        ;($anime as any).animate(pathElement, {
          strokeDashoffset: options?.direction === 'reverse' ? length : 0,
          duration: options?.duration || 2000,
          delay,
          ease: options?.ease || 'outQuart',
        })
      }
    })
  }

  const erase = () => {
    if (!$anime) return

    paths.forEach((path, index) => {
      const delay = (options?.stagger || 0) * index
      const pathElement = typeof path === 'string' ? document.querySelector(path) as SVGPathElement : path

      if (pathElement) {
        const length = pathElement.getTotalLength()

        ;($anime as any).animate(pathElement, {
          strokeDashoffset: length,
          duration: options?.duration || 1000,
          delay,
          ease: options?.ease || 'outQuart',
        })
      }
    })
  }

  return { draw, erase }
}
