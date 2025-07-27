<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div ref="box" class="box mb-4">Timeline</div>
        <div ref="box2" class="box mb-4">Timeline 2</div>
        <div class="large row">
          <div class="medium pyramid">
            <div ref="triangle" class="triangle box mb-4">Triangle</div>
            <div ref="square" class="square box mb-4">Square</div>
            <div ref="circle" class="circle box mb-4">Circle</div>
          </div>
        </div>
      </div>
      <div class="space-y-4">
        <div class="space-x-2 flex flex-wrap gap-2">
          <button class="btn" @click="start">Start</button>
          <button class="btn" @click="start2">Start 2</button>
          <button class="btn" @click="play">Play</button>
          <button class="btn" @click="pause">Pause</button>
          <button class="btn" @click="restart">Restart</button>
          <button class="btn" @click="reverse">Reverse</button>
          <button class="btn" @click="cancel">Cancel</button>
          <button class="btn" @click="revert">Revert</button>
          <button class="btn" @click="resume">Resume</button>
          <button class="btn" @click="complete">Complete</button>
          <button class="btn" @click="alternate">Alternate</button>
          <button class="btn" @click="refresh">Refresh</button>
          <button class="btn" @click="startSimple">Start Simple</button>
        </div>
        <div>
          <label for="seek" class="block mb-1 font-semibold">Seek</label>
          <input
            id="seek"
            type="range"
            min="0"
            :max="duration"
            step="1"
            v-model.number="seekValue"
            @input="onSeek"
            class="w-full"
          />
          <div class="text-sm mt-1">Current Time: {{ currentTime.toFixed(0) }} / Duration: {{ duration.toFixed(0) }}</div>
        </div>
        <div>
          <label for="stretch" class="block mb-1 font-semibold">Stretch</label>
          <input
            id="stretch"
            type="number"
            min="0.1"
            step="0.1"
            v-model.number="stretchValue"
            @change="onStretch"
            class="w-full border rounded px-2 py-1"
          />
        </div>
        <div class="space-y-1">
          <div>Progress: {{ (progress * 100).toFixed(1) }}%</div>
          <div>Is Playing: {{ isPlaying }}</div>
          <div>Is Paused: {{ isPaused }}</div>
          <div>Is Finished: {{ isFinished }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
 
const box = ref<HTMLElement | null>(null)
const box2 = ref<HTMLElement | null>(null)
const circle = ref<HTMLElement | null>(null)
const triangle = ref<HTMLElement | null>(null)
const square = ref<HTMLElement | null>(null)

const timeline = useTimeline({ autoplay: true })
const timeline2 = useTimeline({ autoplay: false })

const seekValue = ref(0)
const stretchValue = ref(1)

const start = () => {
  if (!timeline.timeline.value)
    return
  timeline.timeline.value.children = []
  timeline.init()
  timeline.label('start')
    .add('.box', { x: [0, 120], duration: 500 }, 500)
    .add('.box', { y: [0, 120], duration: 500 }, 'start')
  console.log('Timeline children after add:', timeline.timeline.value.children)
  timeline.play()
}

const start2 = () => {
  if (!timeline2.timeline.value)
    return
  timeline2.timeline.value.children = []
  timeline2.init()
  timeline2.label('start')
    .add('.box2', { scale: [1, 1.5], duration: 400 }, 400)
    .add('.box2', { rotate: [0, 180], duration: 400 }, 'start')
  timeline2.play()
}

const play = () => {
  timeline.play()
}

const pause = () => {
  timeline.pause()
}

const restart = () => {
  timeline.restart()
}

const reverse = () => {
  timeline.reverse()
}

const cancel = () => {
  timeline.cancel()
}

const revert = () => {
  timeline.revert()
}

const resume = () => {
  timeline.resume()
}

const complete = () => {
  timeline.complete()
}

const alternate = () => {
  timeline.alternate()
}

const refresh = () => {
  timeline.refresh()
}

const onSeek = () => {
  timeline.seek(seekValue.value)
}

const onStretch = () => {
  timeline.stretch(stretchValue.value)
}

watch(() => timeline.currentTime, (newVal) => {
  seekValue.value = newVal
})

const progress = timeline.progress
const isPlaying = timeline.isPlaying
const isPaused = timeline.isPaused
const isFinished = timeline.isFinished
const currentTime = timeline.currentTime
const duration = timeline.duration

const startSimple = () => {
  if (!circle.value || !triangle.value || !square.value)
    return

  const circleAnimation = animate(circle.value, {
    x: '15rem',
    duration: 750,
  })

  const tl = createTimelineInstance({ defaults: { duration: 750 } })
  if (!tl) {
    console.warn('Timeline instance not created')
    return
  }

  tl.sync(circleAnimation)
    .add(triangle.value, {
      x: '15rem',
      rotate: '1turn',
      duration: 500,
      alternate: true,
      loop: 2,
    })
    .add(square.value, {
      x: '15rem',
    })

  tl.play()
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
.box2 {
  width: 80px;
  height: 80px;
  background: #e67322;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border-radius: 6px;
}

.btn {
  background-color: #1f2937;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn:hover {
  background-color: #374151;
}
</style>
