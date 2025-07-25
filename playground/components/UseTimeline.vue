<template>
  <div>
    <div ref="box" class="box">Timeline</div>
    <div ref="box2" class="box">Timeline 2</div>
    <button @click="start">Start</button>
    <button @click="start2">Start 2</button>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)
const timeline = useTimeline({ autoplay: false })
const box2 = ref<HTMLElement | null>(null)
const timeline2 = useTimeline({ autoplay: false })

const start = () => {
  if (!box.value)
    return
  timeline
    .add(box.value, { x: [0, 120], duration: 500 })
    .add(box.value, { y: [0, 120], duration: 500 })
  timeline.play()
}

const start2 = () => {
  if (!box2.value)
    return
  timeline2
    .add(box2.value, { scale: [1, 1.5], duration: 400 })
    .add(box2.value, { rotate: [0, 180], duration: 400 })
  timeline2.play()
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
