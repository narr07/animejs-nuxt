<template>
  <div>
    <div ref="box" class="box">Drag me</div>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)

onMounted(() => {
  if (box.value)
    useDraggable(box.value)
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
