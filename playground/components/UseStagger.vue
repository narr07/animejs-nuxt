<template>
  <div>
    <div ref="wrap" class="wrap">
      <div v-for="n in 5" :key="n" class="box">{{ n }}</div>
    </div>
    <div ref="wrap2" class="wrap">
      <div v-for="n in 3" :key="`b-${n}`" class="box">B{{ n }}</div>
    </div>
    <button @click="run">Stagger</button>
    <button @click="run2">Stagger 2</button>
  </div>
</template>

<script setup lang="ts">
const wrap = ref<HTMLElement | null>(null)
const { $anime } = useNuxtApp()
const wrap2 = ref<HTMLElement | null>(null)

const run = () => {
  if (!wrap.value)
    return
  const boxes = wrap.value.querySelectorAll('.box')
  const offset = useStagger(20)
  $anime.animate(boxes, { x: offset, delay: useStagger(100) })
}

const run2 = () => {
  if (!wrap2.value)
    return
  const boxes = wrap2.value.querySelectorAll('.box')
  $anime.animate(boxes, { scale: useStagger([1, 1.5]), delay: useStagger(80) })
}
</script>

<style scoped>
.wrap {
  display: flex;
  gap: 4px;
  margin-bottom: 1rem;
}
.box {
  width: 40px;
  height: 40px;
  background: #1abc9c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
