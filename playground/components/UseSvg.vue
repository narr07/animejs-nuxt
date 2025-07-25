<template>
  <div class="svg-demo">
    <div class="demo-header">
      <h2 class="demo-title">SVG Motion Path Animation</h2>
      <p class="demo-description">
        Animate elements along SVG paths with staggered timing and rotation.
      </p>
    </div>

    <div class="svg-container">
      <svg width="200" height="100" viewBox="0 0 200 100" class="svg-canvas">
        <path id="p" d="M10 80 Q 95 10 180 80" fill="transparent" stroke="#555" />
        <circle ref="dot" r="5" fill="#e74c3c" />
      </svg>
      <svg width="200" height="100" viewBox="0 0 200 100" class="svg-canvas">
        <path id="p2" d="M10 20 Q 95 90 180 20" fill="transparent" stroke="#555" />
        <circle ref="dot2" r="5" fill="#2ecc71" />
      </svg>
    </div>

    <div class="button-group">
      <button @click="animatePath" class="btn">Animate Path 1</button>
      <button @click="animatePath2" class="btn">Animate Path 2</button>
    </div>

    <div class="code-example">
      <h3 class="section-title">Usage Example</h3>
      <pre><code>import { createMotionPath } from '~/runtime/composables/useSvg'

const pathFunc = createMotionPath('#p')
$anime.animate(element, { translateX: pathFunc('x'), translateY: pathFunc('y'), duration: 1000 })</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createMotionPath } from '~/runtime/composables/useSvg'
import { useNuxtApp } from 'nuxt/app'

const dot = ref<SVGCircleElement | null>(null)
const dot2 = ref<SVGCircleElement | null>(null)
const { $anime } = useNuxtApp()

const animatePath = () => {
  if (!dot.value) return
  const pathFunc = createMotionPath('#p')
  if (pathFunc) {
    $anime.animate(dot.value, { translateX: pathFunc('x'), translateY: pathFunc('y'), duration: 1000 })
  }
}

const animatePath2 = () => {
  if (!dot2.value) return
  const pathFunc = createMotionPath('#p2')
  if (pathFunc) {
    $anime.animate(dot2.value, { translateX: pathFunc('x'), translateY: pathFunc('y'), duration: 1000 })
  }
}
</script>

<style scoped>
.svg-demo {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
}

.demo-header {
  margin-bottom: 1rem;
}

.demo-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.demo-description {
  font-size: 1rem;
  margin: 0;
  color: #555;
}

.svg-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.svg-canvas {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #27ae60;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #1e8449;
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
