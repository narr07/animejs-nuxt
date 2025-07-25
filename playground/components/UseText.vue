<template>
  <div>
    <p ref="text">Anime.js Text Split Example</p>
    <button @click="animate">Animate</button>
  </div>
</template>

<script setup lang="ts">
const text = ref<HTMLElement | null>(null)
const { $anime } = useNuxtApp()

const animate = () => {
  if (!text.value)
    return
  const chars = useTextSplit(text.value)
  $anime.animate(chars, { y: [20, 0], opacity: [0, 1], delay: useStagger(30) })
}
</script>

<style scoped>
p { margin-bottom: 1rem; display: inline-block; }
</style>
