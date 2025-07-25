<template>
  <div style="height: 150vh;">
    <div ref="box" class="box">Scroll</div>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)

onMounted(() => {
  if (box.value)
    useScroll(box.value, { y: [0, 200] })
})
</script>

<style scoped>
.box {
  width: 80px;
  height: 80px;
  background: #2ecc71;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40vh;
  border-radius: 6px;
}
</style>
