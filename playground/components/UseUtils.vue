<template>
  <div>
    <div ref="box" class="box">Utils</div>
    <button @click="randomize">Random Color</button>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)

const randomize = () => {
  if (!box.value)
    return
  const color = useUtils.random(['#e74c3c', '#3498db', '#2ecc71'])
  box.value.style.background = color
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
