<template>
  <div>
    <p ref="text">Anime.js Text Split Example</p>
    <p ref="text2">Another Split Example</p>
    <button @click="animate">Animate</button>
    <button @click="animate2">Animate 2</button>
  </div>
</template>

<script setup lang="ts">
const text = ref<HTMLElement | null>(null)
const { $anime } = useNuxtApp()
const text2 = ref<HTMLElement | null>(null)

const animate = () => {
  if (!text.value)
    return
  const chars = useTextSplit(text.value)
  $anime.animate(chars, { y: [20, 0], opacity: [0, 1], delay: useStagger(30) })
}

const animate2 = () => {
  if (!text2.value)
    return
  const chars = useTextSplit(text2.value)
  $anime.animate(chars, { y: [-20, 0], opacity: [0, 1], delay: useStagger(40) })
}
</script>

<style scoped>
p { margin-bottom: 1rem; display: inline-block; }
</style>
