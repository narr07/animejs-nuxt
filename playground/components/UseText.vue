<template>
  <div class="text-demo">
    <div class="demo-header">
      <h2 class="demo-title">Animated Text Split</h2>
      <p class="demo-description">
        Animate text by splitting into characters with staggered effects.
      </p>
    </div>

    <p ref="text" class="demo-text">Anime.js Text Split Example</p>
    <p ref="text2" class="demo-text">Another Split Example</p>

    <div class="button-group">
      <button @click="animate" class="btn">Animate Style 1</button>
      <button @click="animate2" class="btn">Animate Style 2</button>
    </div>

    <div class="code-example">
      <h3 class="section-title">Usage Example</h3>
      <pre><code>import { useTextSplit } from '~/runtime/composables/useText'
import { useStagger } from '~/runtime/composables/useStagger'

const text = ref()
const chars = useTextSplit(text.value)
$anime.animate(chars, { y: [20, 0], opacity: [0, 1], delay: useStagger(30) })</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTextSplit } from '~/runtime/composables/useText'
import { useStagger } from '~/runtime/composables/useStagger'
import { useNuxtApp } from 'nuxt/app'

const text = ref<HTMLElement | null>(null)
const text2 = ref<HTMLElement | null>(null)
const { $anime } = useNuxtApp()

const animate = () => {
  if (!text.value) return
  const chars = useTextSplit(text.value)
  if (chars) {
    $anime.animate(chars, { y: [20, 0], opacity: [0, 1], delay: useStagger(30) })
  }
}

const animate2 = () => {
  if (!text2.value) return
  const chars = useTextSplit(text2.value)
  if (chars) {
    $anime.animate(chars, { y: [-20, 0], opacity: [0, 1], delay: useStagger(40) })
  }
}
</script>

<style scoped>
.text-demo {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #2c3e50;
  padding: 1rem;
  background: #ecf0f1;
  border-radius: 6px;
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.demo-description {
  font-size: 1rem;
  margin: 0;
}

.demo-text {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #2980b9;
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
