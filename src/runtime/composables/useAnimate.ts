import { animate, type AnimationOptions } from 'animejs'
import { onUnmounted } from 'vue'

export function useAnimate(
  targets: Parameters<typeof animate>[0],
  options: Omit<AnimationOptions, 'targets'>,
) {
  const inst = animate(targets, options)
  onUnmounted(() => inst.cancel())
  return inst
}
