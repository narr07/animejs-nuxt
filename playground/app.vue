<script setup lang="ts">
onMounted(() => {
  useAnimate('.box', { x: 250, ease: 'outQuad', loop: true })

  const tl = useTimeline({ alternate: true })
  tl.add('.circle', { scale: 2, duration: 600 })
    .add('.circle', { scale: 1 })

  useDraggable('.circle')
})
</script>

<template>
  <div class="box" /> <div class="circle" />
</template>

<style scoped>
.box, .circle { width:80px; height:80px; background:#f36; margin:1rem }
.circle { border-radius:50%; background:#09f }
</style>
