<template>
  <div>
    <div ref="box" class="box">Timeline</div>
    <button @click="start">Start</button>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)
const timeline = useTimeline({ autoplay: false })

const start = () => {
  if (!box.value)
    return
  timeline
    .add(box.value, { x: [0, 120], duration: 500 })
    .add(box.value, { y: [0, 120], duration: 500 })
  timeline.play()
}
</script>

<style scoped>
.box {
  width: 80px;
  height: 80px;
  background: #e67e22;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: 6px;
}
</style>
