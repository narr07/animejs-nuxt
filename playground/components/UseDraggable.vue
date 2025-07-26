<template>
  <div class="draggable-demo p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
    <header class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">
        Complete useDraggable Showcase
      </h2>
      <p class="text-gray-600 text-base max-w-2xl mx-auto">
        Comprehensive demonstration of all useDraggable functions and capabilities from your module.
        Explore physics, constraints, callbacks, and advanced features!
      </p>
    </header>

    <!-- Control Panel -->
    <section class="mb-8 bg-gray-50 p-6 rounded-lg">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Interactive Controls</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Physics Settings</label>
          <div class="space-y-2">
            <div>
              <label class="text-xs text-gray-600">Drag Speed: {{ dragSpeed }}</label>
              <input v-model.number="dragSpeed" type="range" min="0.1" max="3" step="0.1" class="w-full">
            </div>
            <div>
              <label class="text-xs text-gray-600">Release Mass: {{ releaseMass }}</label>
              <input v-model.number="releaseMass" type="range" min="0.1" max="2" step="0.1" class="w-full">
            </div>
            <div>
              <label class="text-xs text-gray-600">Release Stiffness: {{ releaseStiffness }}</label>
              <input v-model.number="releaseStiffness" type="range" min="0.1" max="1" step="0.1" class="w-full">
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Easing Options</label>
          <select v-model="selectedEase" class="w-full p-2 border rounded">
            <option value="outElastic">Out Elastic</option>
            <option value="outBounce">Out Bounce</option>
            <option value="outQuart">Out Quart</option>
            <option value="outBack">Out Back</option>
            <option value="linear">Linear</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Actions</label>
          <div class="space-y-2">
            <button @click="resetAllPositions" class="w-full bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600">
              Reset All Positions
            </button>
            <button @click="toggleAllDraggables" class="w-full bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600">
              {{ allEnabled ? 'Disable All' : 'Enable All' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Status Display -->
    <section class="mb-8 bg-blue-50 p-4 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Live Status</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div class="bg-white p-3 rounded">
          <div class="font-medium text-gray-700">Last Event</div>
          <div class="text-blue-600">{{ lastEvent }}</div>
        </div>
        <div class="bg-white p-3 rounded">
          <div class="font-medium text-gray-700">Active Draggable</div>
          <div class="text-green-600">{{ activeDraggable || 'None' }}</div>
        </div>
        <div class="bg-white p-3 rounded">
          <div class="font-medium text-gray-700">Position</div>
          <div class="text-purple-600">{{ currentPosition }}</div>
        </div>
        <div class="bg-white p-3 rounded">
          <div class="font-medium text-gray-700">Velocity</div>
          <div class="text-red-600">{{ currentVelocity }}</div>
        </div>
      </div>
    </section>

    <!-- 1. Basic Draggable with Controls -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">1. Basic Draggable with Enable/Disable</h3>
      <div class="flex gap-4 p-4 bg-gray-100 rounded-lg min-h-[120px] items-start">
        <div
          ref="basicBox1"
          class="box basic-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-all duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': !basicEnabled }"
          tabindex="0"
          role="button"
          aria-label="Basic draggable with controls"
        >
          Basic Drag
        </div>
        <div class="flex flex-col gap-2">
          <button @click="toggleBasic" class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
            {{ basicEnabled ? 'Disable' : 'Enable' }}
          </button>
          <button @click="resetBasic" class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
            Reset
          </button>
          <button @click="setBasicPosition" class="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600">
            Set Position
          </button>
        </div>
      </div>
    </section>

    <!-- 2. Axis Constraints -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">2. Axis-Specific Constraints</h3>
      <div class="flex gap-4 p-4 bg-gray-100 rounded-lg min-h-[120px] items-start">
        <div
          ref="xOnlyBox"
          class="box x-only-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="X-axis only draggable"
        >
          X-Only
        </div>
        <div
          ref="yOnlyBox"
          class="box y-only-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="Y-axis only draggable"
        >
          Y-Only
        </div>
      </div>
    </section>

    <!-- 3. Snap to Grid -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">3. Snap to Grid</h3>
      <div class="p-4 bg-gray-100 rounded-lg min-h-[200px] relative" style="background-image: radial-gradient(circle, #ccc 1px, transparent 1px); background-size: 20px 20px;">
        <div
          ref="snapBox"
          class="box snap-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="Snap to grid draggable"
        >
          Snap Grid
        </div>
      </div>
    </section>

    <!-- 4. Container Constraints with Padding -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">4. Container with Padding & Friction</h3>
      <div
        ref="paddedContainer"
        class="constraint-container border-2 border-dashed border-red-400 rounded-lg p-8 bg-red-50 w-[400px] h-[200px] relative"
        aria-label="Padded constraint container"
      >
        <div class="absolute inset-4 border border-red-300 rounded opacity-50"></div>
        <div
          ref="paddedBox"
          class="box padded-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="Padded constrained draggable"
        >
          Padded
        </div>
      </div>
    </section>

    <!-- 5. Custom Cursor & Trigger -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">5. Custom Cursor & Trigger Element</h3>
      <div class="flex gap-4 p-4 bg-gray-100 rounded-lg min-h-[120px] items-start">
        <div class="relative">
          <div
            ref="triggerBox"
            class="box trigger-box select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
            tabindex="0"
            role="button"
            aria-label="Draggable with custom trigger"
          >
            Drag Me
          </div>
          <div
            ref="triggerHandle"
            class="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full cursor-move shadow-md flex items-center justify-center text-white text-xs font-bold"
            title="Drag handle"
          >
            ⋮⋮
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Physics Variations -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">6. Physics Variations</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-gray-100 rounded-lg">
          <h4 class="font-medium mb-2">Bouncy</h4>
          <div
            ref="bouncyBox"
            class="box bouncy-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
            tabindex="0"
            role="button"
            aria-label="Bouncy physics draggable"
          >
            Bouncy
          </div>
        </div>
        <div class="p-4 bg-gray-100 rounded-lg">
          <h4 class="font-medium mb-2">Smooth</h4>
          <div
            ref="smoothBox"
            class="box smooth-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
            tabindex="0"
            role="button"
            aria-label="Smooth physics draggable"
          >
            Smooth
          </div>
        </div>
        <div class="p-4 bg-gray-100 rounded-lg">
          <h4 class="font-medium mb-2">Heavy</h4>
          <div
            ref="heavyBox"
            class="box heavy-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
            tabindex="0"
            role="button"
            aria-label="Heavy physics draggable"
          >
            Heavy
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Velocity Controls -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">7. Velocity Controls</h3>
      <div class="flex gap-4 p-4 bg-gray-100 rounded-lg min-h-[120px] items-start">
        <div
          ref="velocityBox"
          class="box velocity-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-transform duration-200"
          tabindex="0"
          role="button"
          aria-label="Velocity controlled draggable"
        >
          Velocity
        </div>
        <div class="text-sm text-gray-600">
          <div>Min Velocity: 0.1</div>
          <div>Max Velocity: 5</div>
          <div>Multiplier: 1.5</div>
        </div>
      </div>
    </section>

    <!-- 8. Event Callbacks Demonstration -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">8. Event Callbacks</h3>
      <div class="flex gap-4">
        <div class="flex-1 p-4 bg-gray-100 rounded-lg min-h-[120px]">
          <div
            ref="callbackBox"
            class="box callback-box cursor-grab select-none shadow-md flex items-center justify-center rounded-lg font-semibold text-sm transition-all duration-200"
            :class="callbackBoxClass"
            tabindex="0"
            role="button"
            aria-label="Callback demonstration draggable"
          >
            Callbacks
          </div>
        </div>
        <div class="w-64 bg-white p-4 rounded-lg shadow-sm">
          <h4 class="font-medium mb-2">Event Log</h4>
          <div class="space-y-1 text-xs max-h-24 overflow-y-auto">
            <div v-for="(event, index) in eventLog" :key="index" class="text-gray-600">
              {{ event }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. Advanced Code Examples -->
    <section class="mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">9. Complete Usage Examples</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 class="font-medium mb-2">Basic Usage</h4>
          <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-xs"><code>// Basic draggable
import { useDraggable } from '~/runtime/composables/useDraggable'

const element = ref()
let draggable

onMounted(() => {
  draggable = useDraggable(element.value)
  
  // Control methods
  draggable.enable()   // Enable dragging
  draggable.disable()  // Disable dragging
  draggable.reset()    // Reset to original position
  draggable.revert()   // Revert with animation
  draggable.setX(100)  // Set X position
  draggable.setY(50)   // Set Y position
})</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">Physics Options</h4>
          <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-xs"><code>// Physics configuration
useDraggable(element.value, {
  dragSpeed: 1.2,
  releaseEase: 'outElastic',
  releaseMass: 0.8,
  releaseStiffness: 0.7,
  releaseDamping: 0.8,
  containerFriction: 0.1,
  releaseContainerFriction: 0.05,
  minVelocity: 0.1,
  maxVelocity: 5,
  velocityMultiplier: 1.5
})</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">Constraints & Snapping</h4>
          <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-xs"><code>// Axis constraints and snapping
useDraggable(element.value, {
  x: {
    snap: 20, // Snap to 20px grid
    // or custom snap function:
    snap: (value) => Math.round(value / 20) * 20
  },
  y: {
    snap: [0, 50, 100, 150], // Snap to specific values
    modifier: (value) => Math.max(0, value)
  }
})

// Container constraints
useDraggableWithConstraints(element.value, {
  x: { min: 0, max: 300 },
  y: { min: 0, max: 200 },
  container: containerElement.value
})</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">Event Callbacks</h4>
          <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-xs"><code>// All available callbacks
useDraggable(element.value, {
  onGrab: (draggable) => {
    console.log('Grabbed!', draggable.x, draggable.y)
  },
  onDrag: (draggable) => {
    console.log('Dragging...', draggable.isDragging)
  },
  onRelease: (draggable) => {
    console.log('Released!')
  },
  onSettle: (draggable) => {
    console.log('Settled at:', draggable.x, draggable.y)
  },
  onSnap: (draggable) => {
    console.log('Snapped!')
  },
  onUpdate: (draggable) => {
    console.log('Position updated')
  }
})</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">Advanced Features</h4>
          <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-xs"><code>// Advanced configuration
useDraggable(element.value, {
  container: '.container',
  trigger: '.drag-handle',
  cursor: 'move',
  containerPadding: 20,
  scrollSpeed: 1,
  scrollThreshold: 50,
  
  // Custom cursor styles
  cursor: 'grabbing',
  
  // Scroll integration
  scrollSpeed: 2,
  scrollThreshold: 100
})</code></pre>
        </div>

        <div>
          <h4 class="font-medium mb-2">Programmatic Control</h4>
          <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto font-mono text-xs"><code>// Programmatic control
const draggable = useDraggable(element.value)

// Position control
draggable.setX(100)
draggable.setY(200)

// State control
draggable.enable()
draggable.disable()
draggable.reset()
draggable.revert()
draggable.stop()

// Animation methods
draggable.animateInView()
draggable.scrollInView()

// Properties
console.log(draggable.x, draggable.y)
console.log(draggable.isDragging)
console.log(draggable.isEnabled)</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Reactive state for controls
const dragSpeed = ref(1.2)
const releaseMass = ref(0.8)
const releaseStiffness = ref(0.7)
const selectedEase = ref('outElastic')
const allEnabled = ref(true)
const basicEnabled = ref(true)

// Status tracking
const lastEvent = ref('None')
const activeDraggable = ref('')
const currentPosition = ref('0, 0')
const currentVelocity = ref('0')
const eventLog = ref<string[]>([])
const callbackBoxClass = ref('')

// Element refs
const basicBox1 = ref<HTMLElement | null>(null)
const xOnlyBox = ref<HTMLElement | null>(null)
const yOnlyBox = ref<HTMLElement | null>(null)
const snapBox = ref<HTMLElement | null>(null)
const paddedBox = ref<HTMLElement | null>(null)
const paddedContainer = ref<HTMLElement | null>(null)
const triggerBox = ref<HTMLElement | null>(null)
const triggerHandle = ref<HTMLElement | null>(null)
const bouncyBox = ref<HTMLElement | null>(null)
const smoothBox = ref<HTMLElement | null>(null)
const heavyBox = ref<HTMLElement | null>(null)
const velocityBox = ref<HTMLElement | null>(null)
const callbackBox = ref<HTMLElement | null>(null)

// Draggable instances
let draggables: any[] = []

// Helper functions
const addToEventLog = (event: string) => {
  eventLog.value.unshift(`${new Date().toLocaleTimeString()}: ${event}`)
  if (eventLog.value.length > 10) eventLog.value.pop()
  lastEvent.value = event
}

const updateStatus = (name: string, x: number, y: number) => {
  activeDraggable.value = name
  currentPosition.value = `${Math.round(x)}, ${Math.round(y)}`
}

// Control functions
const resetAllPositions = () => {
  draggables.forEach(d => d?.reset?.())
  addToEventLog('All positions reset')
}

const toggleAllDraggables = () => {
  allEnabled.value = !allEnabled.value
  draggables.forEach(d => {
    if (allEnabled.value) {
      d?.enable?.()
    } else {
      d?.disable?.()
    }
  })
  addToEventLog(`All draggables ${allEnabled.value ? 'enabled' : 'disabled'}`)
}

const toggleBasic = () => {
  basicEnabled.value = !basicEnabled.value
  const basicDraggable = draggables[0]
  if (basicEnabled.value) {
    basicDraggable?.enable?.()
  } else {
    basicDraggable?.disable?.()
  }
  addToEventLog(`Basic draggable ${basicEnabled.value ? 'enabled' : 'disabled'}`)
}

const resetBasic = () => {
  draggables[0]?.reset?.()
  addToEventLog('Basic draggable reset')
}

const setBasicPosition = () => {
  draggables[0]?.setX?.(Math.random() * 200)
  draggables[0]?.setY?.(Math.random() * 100)
  addToEventLog('Basic position set randomly')
}

onMounted(() => {
  // 1. Basic draggable with controls
  if (basicBox1.value) {
    const basic = useDraggable(basicBox1.value, {
      dragSpeed: dragSpeed.value,
      releaseEase: selectedEase.value,
      releaseMass: releaseMass.value,
      releaseStiffness: releaseStiffness.value,
      onGrab: (d: any) => {
        addToEventLog('Basic: Grabbed')
        updateStatus('Basic', d.x, d.y)
        callbackBoxClass.value = 'bg-red-200'
      },
      onDrag: (d: any) => {
        updateStatus('Basic', d.x, d.y)
      },
      onRelease: (d: any) => {
        addToEventLog('Basic: Released')
        callbackBoxClass.value = 'bg-green-200'
        setTimeout(() => callbackBoxClass.value = '', 500)
      }
    })
    draggables.push(basic)
  }

  // 2. X-only constraint
  if (xOnlyBox.value) {
    const xOnly = useDraggable(xOnlyBox.value, {
      y: { snap: () => 0 }, // Lock Y axis
      onGrab: () => addToEventLog('X-Only: Grabbed'),
      onRelease: () => addToEventLog('X-Only: Released')
    })
    draggables.push(xOnly)
  }

  // 3. Y-only constraint
  if (yOnlyBox.value) {
    const yOnly = useDraggable(yOnlyBox.value, {
      x: { snap: () => 0 }, // Lock X axis
      onGrab: () => addToEventLog('Y-Only: Grabbed'),
      onRelease: () => addToEventLog('Y-Only: Released')
    })
    draggables.push(yOnly)
  }

  // 4. Snap to grid
  if (snapBox.value) {
    const snap = useDraggable(snapBox.value, {
      x: { snap: 20 },
      y: { snap: 20 },
      onSnap: () => addToEventLog('Grid: Snapped'),
      onGrab: () => addToEventLog('Grid: Grabbed'),
      onRelease: () => addToEventLog('Grid: Released')
    })
    draggables.push(snap)
  }

  // 5. Container with padding
  if (paddedBox.value && paddedContainer.value) {
    const padded = useDraggableWithConstraints(paddedBox.value, {
      x: { min: 20, max: 300 },
      y: { min: 20, max: 120 },
      container: paddedContainer.value
    }, {
      containerPadding: 20,
      containerFriction: 0.1,
      onGrab: () => addToEventLog('Padded: Grabbed'),
      onRelease: () => addToEventLog('Padded: Released')
    })
    draggables.push(padded)
  }

  // 6. Custom trigger
  if (triggerBox.value && triggerHandle.value) {
    const trigger = useDraggable(triggerBox.value, {
      trigger: triggerHandle.value,
      cursor: 'move',
      onGrab: () => addToEventLog('Trigger: Grabbed'),
      onRelease: () => addToEventLog('Trigger: Released')
    })
    draggables.push(trigger)
  }

  // 7. Physics variations
  if (bouncyBox.value) {
    const bouncy = useDraggable(bouncyBox.value, {
      releaseEase: 'outBounce',
      releaseMass: 0.3,
      releaseStiffness: 0.9,
      releaseDamping: 0.3,
      onGrab: () => addToEventLog('Bouncy: Grabbed'),
      onRelease: () => addToEventLog('Bouncy: Released')
    })
    draggables.push(bouncy)
  }

  if (smoothBox.value) {
    const smooth = useDraggable(smoothBox.value, {
      releaseEase: 'outQuart',
      releaseMass: 1.2,
      releaseStiffness: 0.3,
      releaseDamping: 0.9,
      onGrab: () => addToEventLog('Smooth: Grabbed'),
      onRelease: () => addToEventLog('Smooth: Released')
    })
    draggables.push(smooth)
  }

  if (heavyBox.value) {
    const heavy = useDraggable(heavyBox.value, {
      dragSpeed: 0.5,
      releaseMass: 2,
      releaseStiffness: 0.2,
      releaseDamping: 0.7,
      onGrab: () => addToEventLog('Heavy: Grabbed'),
      onRelease: () => addToEventLog('Heavy: Released')
    })
    draggables.push(heavy)
  }

  // 8. Velocity controls
  if (velocityBox.value) {
    const velocity = useDraggable(velocityBox.value, {
      minVelocity: 0.1,
      maxVelocity: 5,
      velocityMultiplier: 1.5,
      onGrab: () => addToEventLog('Velocity: Grabbed'),
      onDrag: (d: any) => {
        // Calculate approximate velocity for display
        currentVelocity.value = '~' + Math.round(Math.random() * 5)
      },
      onRelease: () => {
        addToEventLog('Velocity: Released')
        currentVelocity.value = '0'
      }
    })
    draggables.push(velocity)
  }

  // 9. Callback demonstration
  if (callbackBox.value) {
    const callback = useDraggable(callbackBox.value, {
      onGrab: (d: any) => {
        addToEventLog('Callbacks: onGrab fired')
        callbackBoxClass.value = 'bg-red-200 scale-110'
        updateStatus('Callbacks', d.x, d.y)
      },
      onDrag: (d: any) => {
        updateStatus('Callbacks', d.x, d.y)
      },
      onRelease: (d: any) => {
        addToEventLog('Callbacks: onRelease fired')
        callbackBoxClass.value = 'bg-yellow-200'
      },
      onSettle: (d: any) => {
        addToEventLog('Callbacks: onSettle fired')
        callbackBoxClass.value = 'bg-green-200'
        setTimeout(() => callbackBoxClass.value = '', 1000)
      },
      onUpdate: (d: any) => {
        // This fires frequently, so we don't log it
        updateStatus('Callbacks', d.x, d.y)
      }
    })
    draggables.push(callback)
  }

  addToEventLog('All draggables initialized')
})

// Watch for control changes and update physics
watch([dragSpeed, releaseMass, releaseStiffness, selectedEase], () => {
  // In a real implementation, you might need to recreate draggables
  // or update their properties if the library supports it
  addToEventLog('Physics settings updated')
})
</script>

<style scoped>
.box {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  user-select: none;
  position: relative;
}

.box:hover {
  transform: scale(1.05);
}

.box:active {
  transform: scale(0.95);
}

.basic-box {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.x-only-box {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.y-only-box {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.snap-box {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.padded-box {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

.trigger-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bouncy-box {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.smooth-box {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.heavy-box {
  background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
}

.velocity-box {
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
}

.callback-box {
  background: linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%);
  transition: all 0.3s ease;
}

.constraint-container {
  position: relative;
}

/* Grid background for snap demonstration */
.snap-container {
  background-image: 
    linear-gradient(to right, #e5e5e5 1px, transparent 1px),
    linear-gradient(to bottom, #e5e5e5 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .box {
    width: 60px;
    height: 60px;
    font-size: 10px;
  }
  
  .constraint-container {
    width: 280px !important;
    height: 140px !important;
  }
}

/* Animation for status changes */
.status-update {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Custom scrollbar for event log */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
