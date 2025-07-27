<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold mb-4">Complex useTimeline Demo</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Animated Elements -->
      <div class="space-y-4">
        <div ref="box1" class="animated-box box1 bg-blue-600 text-white flex items-center justify-center rounded-md">Box 1</div>
        <div ref="box2" class="animated-box box2 bg-green-600 text-white flex items-center justify-center rounded-md">Box 2</div>
        <div ref="box3" class="animated-box box3 bg-purple-600 text-white flex items-center justify-center rounded-md">Box 3</div>
        <div ref="box4" class="animated-box box4 bg-red-600 text-white flex items-center justify-center rounded-md">Box 4</div>
      </div>

      <!-- Controls and Status -->
      <div class="space-y-6">
        <section>
          <h2 class="text-xl font-semibold mb-2">Timeline Controls</h2>
          <div class="flex flex-wrap gap-2">
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
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2">Timeline Methods</h2>
          <div class="flex flex-wrap gap-2 mb-2">
            <button class="btn" @click="addAnimations">Add Animations</button>
            <button class="btn" @click="setAnimations">Set Animations</button>
            <button class="btn" @click="callCallback">Call Callback</button>
            <button class="btn" @click="addLabel">Add Label</button>
            <button class="btn" @click="removeAnimations">Remove Animations</button>
            <button class="btn" @click="syncTimelines">Sync Timelines</button>
            <button class="btn" @click="initTimeline">Init Timeline</button>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <label for="labelName" class="font-medium">Label Name:</label>
            <input id="labelName" v-model="labelName" type="text" class="input" placeholder="Enter label name" />
            <button class="btn" @click="goToLabel">Go To Label</button>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2">Seek & Stretch</h2>
          <div>
            <label for="seek" class="block font-medium mb-1">Seek (ms): {{ seekValue.toFixed(0) }}</label>
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
          </div>
          <div class="mt-3">
            <label for="stretch" class="block font-medium mb-1">Stretch Factor:</label>
            <input
              id="stretch"
              type="number"
              min="0.1"
              step="0.1"
              v-model.number="stretchValue"
              @change="onStretch"
              class="input"
            />
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-2">Timeline Status</h2>
          <ul class="list-disc list-inside space-y-1">
            <li>Progress: {{ (progress * 100).toFixed(1) }}%</li>
            <li>Current Time: {{ currentTime.toFixed(0) }} ms</li>
            <li>Duration: {{ duration.toFixed(0) }} ms</li>
            <li>Is Playing: {{ isPlaying }}</li>
            <li>Is Paused: {{ isPaused }}</li>
            <li>Is Finished: {{ isFinished }}</li>
            <li>Children Count: {{ children.length }}</li>
            <li>Labels: <span v-if="labels.length === 0">None</span>
              <span v-else>
                <span v-for="(label, index) in labels" :key="index" class="inline-block mr-2 px-2 py-1 bg-gray-200 rounded">
                  {{ label }}
                </span>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <section class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Second Timeline Sync Demo</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div ref="syncBox1" class="animated-box syncBox1 bg-pink-600 text-white flex items-center justify-center rounded-md">Sync Box 1</div>
          <div class="mt-2 flex gap-2">
            <button class="btn" @click="playSyncTimelines">Play Both</button>
            <button class="btn" @click="pauseSyncTimelines">Pause Both</button>
            <button class="btn" @click="restartSyncTimelines">Restart Both</button>
          </div>
        </div>
        <div>
          <div ref="syncBox2" class="animated-box syncBox2 bg-yellow-600 text-white flex items-center justify-center rounded-md">Sync Box 2</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
 

const box1 = ref<HTMLElement | null>(null)
const box2 = ref<HTMLElement | null>(null)
const box3 = ref<HTMLElement | null>(null)
const box4 = ref<HTMLElement | null>(null)

const syncBox1 = ref<HTMLElement | null>(null)
const syncBox2 = ref<HTMLElement | null>(null)

const timeline = useTimeline({ autoplay: false })
const timeline2 = useTimeline({ autoplay: false })

const seekValue = ref(0)
const stretchValue = ref(1)
const labelName = ref('')

const labels = ref<string[]>([])

const play = () => timeline.play()
const pause = () => timeline.pause()
const restart = () => timeline.restart()
const reverse = () => timeline.reverse()
const cancel = () => timeline.cancel()
const revert = () => timeline.revert()
const resume = () => timeline.resume()
const complete = () => timeline.complete()
const alternate = () => timeline.alternate()
const refresh = () => timeline.refresh()

const addAnimations = () => {
  if (!timeline.timeline.value) {
    console.warn('Timeline instance not ready')
    return
  }
  timeline.timeline.value.children = []
  timeline.init()
  timeline.label('start')
    .add('.box1', { x: [0, 150], duration: 500 }, 0)
    .add('.box2', { y: [0, 150], duration: 700 }, 'start+=200')
    .add('.box3', { scale: [1, 1.5], duration: 600 }, 'start+=400')
    .add('.box4', { rotate: [0, 360], duration: 800 }, 'start+=600')
  labels.value = ['start']
  console.log('Timeline children after add:', timeline.timeline.value.children)
  timeline.play()
}

const setAnimations = () => {
  if (!timeline.timeline.value) {
    console.warn('Timeline instance not ready')
    return
  }
  timeline.timeline.value.children = []
  timeline.init()
  timeline.label('setStart')
    .set('.box1', { x: 2, y: 0, scale: 1, rotate: 0 }, 0)
    .set('.box2', { x: 0, y: 0, scale: 1, rotate: 0 }, 0)
    .set('.box3', { x: 0, y: 0, scale: 1, rotate: 0 }, 0)
    .set('.box4', { x: 0, y: 0, scale: 1, rotate: 0 }, 0)
  labels.value = ['setStart']
  console.log('Timeline children after set:', timeline.timeline.value.children)
  timeline.play()
}

const callCallback = () => {
  timeline.call(() => alert('Callback called at current timeline position!'), '+=500')
}

const addLabel = () => {
  if (!labelName.value.trim()) return
  timeline.label(labelName.value.trim())
  if (!labels.value.includes(labelName.value.trim())) {
    labels.value.push(labelName.value.trim())
  }
  labelName.value = ''
}

const removeAnimations = () => {
  if (!timeline.timeline.value) return
  timeline.remove('.box1')
  timeline.remove('.box2')
  timeline.remove('.box3')
  timeline.remove('.box4')
  labels.value = []
}

const syncTimelines = () => {
  if (!timeline.timeline.value || !timeline2.timeline.value) return
  timeline2.timeline.value.children = []
  timeline2.init()
  timeline2.label('syncStart')
    .add('.syncBox1', { x: [0, 100], duration: 600 }, 0)
    .add('.syncBox2', { y: [0, 100], duration: 600 }, 'syncStart+=200')
  timeline.sync(timeline2.timeline.value)
  timeline.play()
  timeline2.play()
}

const initTimeline = () => {
  timeline.init()
}

const goToLabel = () => {
  if (!labelName.value.trim()) return
  timeline.seek(labelName.value.trim())
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

const {
  progress,
  currentTime,
  duration,
  isPlaying,
  isPaused,
  isFinished,
  children,
} = timeline

// Controls for second timeline sync demo
const playSyncTimelines = () => {
  timeline.play()
  timeline2.play()
}

const pauseSyncTimelines = () => {
  timeline.pause()
  timeline2.pause()
}

const restartSyncTimelines = () => {
  timeline.restart()
  timeline2.restart()
}

onMounted(() => {
  // Initialize timelines
  timeline.init()
  timeline2.init()
})
</script>

<style scoped>
.animated-box {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
  user-select: none;
  cursor: default;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.2s ease-in-out;
}

.animated-box:hover {
  box-shadow: 0 6px 12px rgb(0 0 0 / 0.2);
}

.btn {
  background-color: #1f2937;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  user-select: none;
}

.btn:hover {
  background-color: #374151;
}

.input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease-in-out;
  width: 150px;
}

.input:focus {
  border-color: #3b82f6;
}
</style>
