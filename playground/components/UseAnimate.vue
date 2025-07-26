<template>
  <div class="animate-demo p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <div
      ref="box"
      class="box mb-4"
      aria-label="Simple animation box"
      role="region"
    >
      Simple Animation
    </div>
    <div
      ref="box2"
      class="box mb-6"
      aria-label="Rotate animation box"
      role="region"
    >
      Rotate
    </div>
    <div class="flex space-x-4">
      <button
        @click="play"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        aria-label="Play animations"
      >
        Play
      </button>
      <button
        @click="pause"
        class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        aria-label="Pause animations"
      >
        Pause
      </button>
      <button
        @click="restart"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        aria-label="Restart animations"
      >
        Restart
      </button>
    </div>
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

const box2 = ref<HTMLElement | null>(null)
const controls2 = useAnimate(box2, {
  rotate: [0, 360],
  duration: 1500,
  loop: true,
  autoplay: false,
})

const play = () => {
  if (controls) controls.play()
  if (controls2) controls2.play()
}
const pause = () => {
  if (controls) controls.pause()
  if (controls2) controls2.pause()
}
const restart = () => {
  if (controls) controls.restart()
  if (controls2) controls2.restart()
}
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
  user-select: none;
  cursor: default;
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.5);
}
</style>
