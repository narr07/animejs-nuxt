<template>
  <div>
    <div
      ref="box"
      class="box"
    >
      Utils
    </div>
    <div
      ref="box2"
      class="box"
    >
      Utils 2
    </div>
    <button @click="randomize">
      Random Color
    </button>
    <button @click="randomize2">
      Random Color 2
    </button>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)
const box2 = ref<HTMLElement | null>(null)

const randomize = () => {
  if (!box.value)
    return
  const color = useUtils.random(['#e74c3c', '#3498db', '#2ecc71'])
  box.value.style.background = color
}

const randomize2 = () => {
  if (!box2.value)
    return
  const color = useUtils.random(['#9b59b6', '#1abc9c', '#f1c40f'])
  box2.value.style.background = color
}
</script>

<style scoped>
.box {
  width: 80px;
  height: 80px;
  background: #bdc3c7;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: 6px;
}
</style>
