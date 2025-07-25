<template>
  <div>
    <div
      ref="box"
      class="box"
    >
      Animasi Sederhana
    </div>
    <button @click="play">
      Play
    </button>
    <button @click="pause">
      Pause
    </button>
    <button @click="restart">
      Restart
    </button>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null)
const controls = useAnimate(box, {
  x: [0, 200, 0],
  duration: 1000,
  loop: true,
  autoplay: false,
})

const play = () => controls.play()
const pause = () => controls.pause()
const restart = () => controls.restart()
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s;
}
</style>
