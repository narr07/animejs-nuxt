<template>
  <div class="draggable-demo p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
    <header class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">Draggable Elements</h2>
      <p class="text-gray-600 text-base max-w-xl mx-auto">
        Interactive draggable elements with constraints and physics. Try dragging the boxes below!
      </p>
    </header>

    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Basic Draggable</h3>
      <div class="flex gap-4 p-4 bg-gray-100 rounded-lg min-h-[120px] items-start">
        <div
          ref="box1"
          class="box basic-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="Free draggable box 1"
        >
          Free Drag
        </div>
        <div
          ref="box2"
          class="box basic-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="Free draggable box 2"
        >
          Also Free
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Constrained Draggable</h3>
      <div
        ref="constraintContainer"
        class="constraint-container border-2 border-dashed border-gray-400 rounded-lg p-4 bg-gray-100 w-[300px] h-[150px] relative"
        aria-label="Constraint container"
      >
        <div
          ref="constrainedBox"
          class="box constrained-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="Constrained draggable box"
        >
          Constrained
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Physics Draggable</h3>
      <div class="flex gap-4 p-4 bg-gray-100 rounded-lg min-h-[120px] items-start">
        <div
          ref="physicsBox"
          class="box physics-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="Physics draggable box"
        >
          Physics
        </div>
      </div>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Usage Examples</h3>
      <pre
        class="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto font-mono text-sm"
        tabindex="0"
        aria-label="Code examples for draggable usage"
      ><code>// Basic draggable
import { useDraggable } from '~/runtime/composables/useDraggable'

const element = ref()
onMounted(() => {
  useDraggable(element.value)
})

// With constraints
import { useDraggableWithConstraints } from '~/runtime/composables/useDraggable'

useDraggableWithConstraints(element.value, {
  x: { min: 0, max: 300 },
  y: { min: 0, max: 200 },
  container: containerElement.value
})

// With physics options
useDraggable(element.value, {
  dragSpeed: 1.2,
  releaseEase: 'outElastic',
  releaseMass: 0.8
})</code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">


const box1 = ref<HTMLElement | null>(null)
const box2 = ref<HTMLElement | null>(null)
const constrainedBox = ref<HTMLElement | null>(null)
const constraintContainer = ref<HTMLElement | null>(null)
const physicsBox = ref<HTMLElement | null>(null)

onMounted(() => {
  if (box1.value) {
    const draggable1 = useDraggable(box1.value)
    if (!draggable1) console.error('Draggable initialization failed for box 1.')
  }

  if (box2.value) {
    const draggable2 = useDraggable(box2.value)
    if (!draggable2) console.error('Draggable initialization failed for box 2.')
  }

  if (constrainedBox.value && constraintContainer.value) {
    const constrainedDraggable = useDraggableWithConstraints(
      constrainedBox.value,
      {
        x: { min: 0, max: 250 },
        y: { min: 0, max: 100 },
        container: constraintContainer.value,
      }
    )
    if (!constrainedDraggable) console.error('Constrained draggable initialization failed.')
  }

  if (physicsBox.value) {
    const physicsDraggable = useDraggable(physicsBox.value, {
      dragSpeed: 1.2,
      releaseEase: 'outElastic',
      releaseMass: 0.8,
      releaseStiffness: 0.7,
      releaseDamping: 0.8,
    })
    if (!physicsDraggable) console.error('Physics draggable initialization failed.')
  }
})
</script>

<style scoped>
/* No changes needed here as Tailwind CSS is used for styling */
</style>
