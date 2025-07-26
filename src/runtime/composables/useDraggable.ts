import { createDraggable } from 'animejs'

// Re-export createDraggable from animejs for direct compatibility
export const useDraggable = createDraggable

// Enhanced draggable with constraints
export function useDraggableWithConstraints(
  target: HTMLElement | string,
  constraints?: {
    x?: { min?: number, max?: number }
    y?: { min?: number, max?: number }
    container?: HTMLElement | string
  },
  options?: any,
): any {
  const element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
  if (!element) return null

  const containerEl = constraints?.container
    ? (typeof constraints.container === 'string' ? document.querySelector(constraints.container) as HTMLElement : constraints.container)
    : element.parentElement as HTMLElement

  const draggableOptions: any = {
    ...options,
    container: containerEl,
    x: constraints?.x
      ? {
          snap: (value: number) => Math.max(constraints.x!.min ?? -Infinity, Math.min(constraints.x!.max ?? Infinity, value)),
        }
      : undefined,
    y: constraints?.y
      ? {
          snap: (value: number) => Math.max(constraints.y!.min ?? -Infinity, Math.min(constraints.y!.max ?? Infinity, value)),
        }
      : undefined,
  }

  return useDraggable(element, draggableOptions)
}
