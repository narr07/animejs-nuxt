<template>
  <div class="module-feature-demo p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md space-y-8">
    <header class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">
        Module Feature Demo
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        This example demonstrates combined usage of animation, draggable, and timeline composables from the module.
      </p>
    </header>

    <section
      aria-label="Animation and Draggable demo"
      class="space-y-4"
    >
      <h2 class="text-2xl font-semibold text-gray-800">
        Animation & Draggable
      </h2>
      <div
        ref="animatedDraggableBox"
        class="w-32 h-32 bg-blue-600 text-white flex items-center justify-center rounded-lg shadow-lg cursor-grab select-none"
        tabindex="0"
        role="button"
        aria-label="Animated and draggable box"
      >
        Drag Me & Animate
      </div>
      <div class="flex space-x-4">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          aria-label="Play animation"
          @click="playAnimation"
        >
          Play Animation
        </button>
        <button
          class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          aria-label="Pause animation"
          @click="pauseAnimation"
        >
          Pause Animation
        </button>
        <button
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          aria-label="Restart animation"
          @click="restartAnimation"
        >
          Restart Animation
        </button>
      </div>
    </section>

    <section
      aria-label="Timeline demo"
      class="space-y-4"
    >
      <h2 class="text-2xl font-semibold text-gray-800">
        Timeline Control
      </h2>
      <div
        ref="timelineBox"
        class="w-24 h-24 bg-purple-600 text-white flex items-center justify-center rounded-lg shadow-lg"
        tabindex="0"
        aria-label="Timeline animation box"
      >
        Timeline Box
      </div>
      <div class="flex space-x-4">
        <button
          class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          aria-label="Play timeline"
          @click="playTimeline"
        >
          Play Timeline
        </button>
        <button
          class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          aria-label="Pause timeline"
          @click="pauseTimeline"
        >
          Pause Timeline
        </button>
        <button
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          aria-label="Restart timeline"
          @click="restartTimeline"
        >
          Restart Timeline
        </button>
      </div>
    </section>

    <section
      aria-label="Usage code examples"
      class="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto font-mono text-sm"
    >
      <h2 class="text-xl font-semibold mb-4">
        Usage Examples
      </h2>
      <pre><code>
// Animation & Draggable setup
const animatedDraggableBox = ref(null)
const animationControls = useAnimate(animatedDraggableBox, {
  x: [0, 200, 0],
  rotate: [0, 360],
  duration: 2000,
  loop: true,
  autoplay: false,
})
const draggableControls = useDraggable(animatedDraggableBox)

// Timeline setup
const timelineBox = ref(null)
const timeline = useTimeline()
timeline.add(timelineBox.value, { x: [0, 100, 0], background: '#7f3fbf', duration: 1500 })
timeline.add(timelineBox.value, { rotate: [0, 360], duration: 1500 })

// Control functions
function playAnimation() {
  animationControls?.play()
}
function pauseAnimation() {
  animationControls?.pause()
}
function restartAnimation() {
  animationControls?.restart()
}
function playTimeline() {
  timeline.play()
}
function pauseTimeline() {
  timeline.pause()
}
function restartTimeline() {
  timeline.restart()
}
      </code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">
const animatedDraggableBox = ref<HTMLElement | null>(null)
const timelineBox = ref<HTMLElement | null>(null)

let animationControls: ReturnType<typeof useAnimate> | null = null
let draggableControls: ReturnType<typeof useDraggable> | null = null
const timeline = useTimeline()

onMounted(() => {
  if (animatedDraggableBox.value) {
    animationControls = useAnimate(animatedDraggableBox, {
      x: [0, 200, 0],
      rotate: [0, 360],
      duration: 2000,
      loop: true,
      autoplay: false,
    })
    draggableControls = useDraggable(animatedDraggableBox.value)
  }

  if (timelineBox.value) {
    timeline.add(timelineBox.value, { x: [0, 100, 0], background: '#7f3fbf', duration: 1500 })
    timeline.add(timelineBox.value, { rotate: [0, 360], duration: 1500 })
  }
})

function playAnimation() {
  animationControls?.play()
}
function pauseAnimation() {
  animationControls?.pause()
}
function restartAnimation() {
  animationControls?.restart()
}
function playTimeline() {
  timeline.play()
}
function pauseTimeline() {
  timeline.pause()
}
function restartTimeline() {
  timeline.restart()
}
</script>

<style scoped>
.module-feature-demo {
  user-select: none;
}
</style>
