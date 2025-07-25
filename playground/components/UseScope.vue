<template>
  <div>
    <div ref="box" class="box">Scoped</div>
    <div ref="box2" class="box">Scoped 2</div>
    <button @click="run">Run Scope</button>
    <button @click="run2">Run Scope 2</button>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)
const scope = useScope()
const box2 = ref<HTMLElement | null>(null)
const scope2 = useScope()

const run = () => {
  if (!box.value)
    return
  scope.animate(box.value, { x: [0, 80], background: '#9b59b6', duration: 600 })
}

const run2 = () => {
  if (!box2.value)
    return
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
}
</style>
