<template>
  <div class="stagger-demo">
    <div class="demo-header">
      <h2 class="demo-title">Stagger Animation Demo</h2>
      <p class="demo-description">
        Animate elements with staggered delays and effects.
      </p>
    </div>

    <div ref="wrap" class="wrap">
      <div v-for="n in 5" :key="n" class="box">{{ n }}</div>
    </div>
    <div ref="wrap2" class="wrap">
      <div v-for="n in 3" :key="`b-${n}`" class="box">B{{ n }}</div>
    </div>

    <div class="button-group">
      <button @click="run" class="btn">Stagger Effect 1</button>
      <button @click="run2" class="btn">Stagger Effect 2</button>
    </div>

    <div class="code-example">
      <h3 class="section-title">Usage Example</h3>
      <pre><code>import { useStagger } from '~/runtime/composables/useStagger'

const offset = useStagger(20)
$anime.animate(elements, { x: offset, delay: useStagger(100) })</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStagger } from '~/runtime/composables/useStagger'
import { useNuxtApp } from 'nuxt/app'

const wrap = ref<HTMLElement | null>(null)
const wrap2 = ref<HTMLElement | null>(null)
const { $anime } = useNuxtApp()

const run = () => {
  if (!wrap.value) return
  const boxes = wrap.value.querySelectorAll('.box')
  const offset = useStagger(20)
  $anime.animate(boxes, { x: offset, delay: useStagger(100) })
}

const run2 = () => {
  if (!wrap2.value) return
  const boxes = wrap2.value.querySelectorAll('.box')
  $anime.animate(boxes, { scale: useStagger([1, 1.5]), delay: useStagger(80) })
}
</script>

<style scoped>
.stagger-demo {
  font-family: Arial, sans-serif;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.demo-description {
  font-size: 1rem;
  margin: 0 0 1rem 0;
}

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
  font-weight: bold;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #8e44ad;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #732d91;
}

.code-example {
  background: #2d3748;
  border-radius: 8px;
  padding: 1rem;
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  overflow-x: auto;
}
</style>
