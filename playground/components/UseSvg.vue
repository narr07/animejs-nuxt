<template>
  <div>
    <svg width="200" height="100" viewBox="0 0 200 100">
      <path id="p" d="M10 80 Q 95 10 180 80" fill="transparent" stroke="#555" />
      <circle ref="dot" r="5" fill="#e74c3c" />
    </svg>
    <svg width="200" height="100" viewBox="0 0 200 100">
      <path id="p2" d="M10 20 Q 95 90 180 20" fill="transparent" stroke="#555" />
      <circle ref="dot2" r="5" fill="#2ecc71" />
    </svg>
    <button @click="animatePath">Animate Path</button>
    <button @click="animatePath2">Animate Path 2</button>
  </div>
</template>

<script setup lang="ts">
const dot = ref<SVGCircleElement | null>(null)
const dot2 = ref<SVGCircleElement | null>(null)
const { createMotionPath } = useSvg()
const { $anime } = useNuxtApp()

const animatePath = () => {
  if (!dot.value)
    return
  const path = createMotionPath('#p')
  $anime.animate(dot.value, { translateX: path('x'), translateY: path('y'), duration: 1000 })
}

const animatePath2 = () => {
  if (!dot2.value)
    return
  const path = createMotionPath('#p2')
  $anime.animate(dot2.value, { translateX: path('x'), translateY: path('y'), duration: 1000 })
}
</script>

<style scoped>
svg { margin-bottom: 1rem; }
</style>
