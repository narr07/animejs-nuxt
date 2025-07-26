<template>
  <div class="scope-demo p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <div
      ref="box"
      class="box mb-4"
      role="region"
      aria-label="Scoped animation box 1"
      tabindex="0"
    >
      Scoped
    </div>
    <div
      ref="box2"
      class="box mb-6"
      role="region"
      aria-label="Scoped animation box 2"
      tabindex="0"
    >
      Scoped 2
    </div>
    <div class="flex space-x-4">
      <button
        @click="run"
        class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        aria-label="Run scope animation 1"
      >
        Run Scope
      </button>
      <button
        @click="run2"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        aria-label="Run scope animation 2"
      >
        Run Scope 2
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">


const box = ref<HTMLElement | null>(null)
const scope = useScope()
const box2 = ref<HTMLElement | null>(null)
const scope2 = useScope()

const run = () => {
  if (!box.value) return
  scope.animate(box.value, { x: [0, 80], background: '#9b59b6', duration: 600 })
}

const run2 = () => {
  if (!box2.value) return
  scope2.animate(box2.value, { y: [0, 80], background: '#2980b9', duration: 600 })
}
</script>

<style scoped>
.box {
  width: 80px;
  height: 80px;
  background: #8e44ad;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: 6px;
  user-select: none;
  cursor: default;
  box-shadow: 0 4px 8px rgba(142, 68, 173, 0.5);
  transition: background-color 0.3s ease;
}
</style>
