<template>
  <div>
    <div ref="box" class="box">Drag me</div>
    <div ref="box2" class="box">Drag me 2</div>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)
const box2 = ref<HTMLElement | null>(null)

onMounted(() => {
  if (box.value)
    useDraggable(box.value)
  if (box2.value)
    useDraggable(box2.value)
})
</script>

<style scoped>
.box {
  width: 80px;
  height: 80px;
  background: #f1c40f;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: grab;
}
</style>
