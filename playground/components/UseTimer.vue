<template>
  <div>
    <div class="box">{{ display }}</div>
    <button @click="play">Play</button>
    <button @click="pause">Pause</button>
    <button @click="restart">Restart</button>
  </div>
</template>

<script setup lang="ts">
const progress = ref(0)

const timer = useTimer({
  duration: 3000,
  autoplay: false,
  onUpdate(animation: any) {
    if (animation && typeof animation.currentTime === 'number' && typeof animation.duration === 'number')
      progress.value = (animation.currentTime / animation.duration) * 100
  },
})

const play = () => timer.play()
const pause = () => timer.pause()
const restart = () => timer.restart()

const display = computed(() => `${Math.round(progress.value)}%`)
</script>

<style scoped>
.box {
  width: 80px;
  height: 80px;
  background: #e74c3c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: 6px;
}
</style>
