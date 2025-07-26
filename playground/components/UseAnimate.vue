<template>
  <div class="animate-demo-container p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">useAnimate - Complete Demo</h1>
    
    <!-- Section 1: Basic Controls -->
    <section class="demo-section mb-12">
      <h2 class="section-title">1. Basic Animation Controls</h2>
      <div class="demo-content">
        <div class="animation-area">
          <div
            ref="basicBox"
            class="demo-box bg-blue-500"
            aria-label="Basic animation box"
          >
            Basic Controls
          </div>
        </div>
        <div class="controls-grid">
          <button @click="basicControls.play" class="btn btn-blue">Play</button>
          <button @click="basicControls.pause" class="btn btn-gray">Pause</button>
          <button @click="basicControls.restart" class="btn btn-green">Restart</button>
          <button @click="basicControls.reverse" class="btn btn-purple">Reverse</button>
          <button @click="basicControls.cancel" class="btn btn-red">Cancel</button>
          <button @click="basicControls.revert" class="btn btn-orange">Revert</button>
          <button @click="basicControls.resume" class="btn btn-teal">Resume</button>
          <button @click="basicControls.complete" class="btn btn-indigo">Complete</button>
        </div>
        <div class="status-display">
          <div class="status-item">Playing: {{ basicState.isPlaying }}</div>
          <div class="status-item">Paused: {{ basicState.isPaused }}</div>
          <div class="status-item">Finished: {{ basicState.isFinished }}</div>
          <div class="status-item">Progress: {{ Math.round(basicState.progress * 100) }}%</div>
        </div>
      </div>
    </section>

    <!-- Section 2: Advanced Controls -->
    <section class="demo-section mb-12">
      <h2 class="section-title">2. Advanced Controls (Seek, Stretch, Alternate)</h2>
      <div class="demo-content">
        <div class="animation-area">
          <div
            ref="advancedBox"
            class="demo-box bg-green-500"
            aria-label="Advanced controls box"
          >
            Advanced Controls
          </div>
        </div>
        <div class="controls-grid">
          <button @click="() => advancedControls.seek(0)" class="btn btn-blue">Seek Start</button>
          <button @click="() => advancedControls.seek(500)" class="btn btn-blue">Seek Middle</button>
          <button @click="() => advancedControls.seek(1000)" class="btn btn-blue">Seek End</button>
          <button @click="() => advancedControls.stretch(0.5)" class="btn btn-purple">Stretch 0.5x</button>
          <button @click="() => advancedControls.stretch(2)" class="btn btn-purple">Stretch 2x</button>
          <button @click="advancedControls.alternate" class="btn btn-orange">Alternate</button>
          <button @click="advancedControls.refresh" class="btn btn-teal">Refresh</button>
        </div>
        <div class="status-display">
          <div class="status-item">Current Time: {{ Math.round(advancedState.currentTime) }}ms</div>
          <div class="status-item">Duration: {{ Math.round(advancedState.duration) }}ms</div>
        </div>
      </div>
    </section>

    <!-- Section 3: Transform Properties -->
    <section class="demo-section mb-12">
      <h2 class="section-title">3. Transform Properties</h2>
      <div class="demo-content">
        <div class="animation-area grid grid-cols-3 gap-4">
          <div ref="translateBox" class="demo-box bg-red-500">Translate</div>
          <div ref="scaleBox" class="demo-box bg-yellow-500">Scale</div>
          <div ref="rotateBox" class="demo-box bg-purple-500">Rotate</div>
          <div ref="skewBox" class="demo-box bg-pink-500">Skew</div>
          <div ref="multiTransformBox" class="demo-box bg-indigo-500">Multi Transform</div>
        </div>
        <div class="controls-grid">
          <button @click="playTransformAnimations" class="btn btn-blue">Play All Transforms</button>
          <button @click="pauseTransformAnimations" class="btn btn-gray">Pause All</button>
          <button @click="restartTransformAnimations" class="btn btn-green">Restart All</button>
        </div>
      </div>
    </section>

    <!-- Section 4: CSS Properties -->
    <section class="demo-section mb-12">
      <h2 class="section-title">4. CSS Properties Animation</h2>
      <div class="demo-content">
        <div class="animation-area grid grid-cols-2 gap-4">
          <div ref="opacityBox" class="demo-box bg-blue-500">Opacity</div>
          <div ref="colorBox" class="demo-box bg-green-500">Color Change</div>
          <div ref="sizeBox" class="demo-box bg-red-500">Size Change</div>
          <div ref="backgroundBox" class="demo-box bg-purple-500">Background</div>
        </div>
        <div class="controls-grid">
          <button @click="playCSSAnimations" class="btn btn-blue">Play CSS Animations</button>
          <button @click="pauseCSSAnimations" class="btn btn-gray">Pause All</button>
          <button @click="restartCSSAnimations" class="btn btn-green">Restart All</button>
        </div>
      </div>
    </section>

    <!-- Section 5: Keyframes Animation -->
    <section class="demo-section mb-12">
      <h2 class="section-title">5. Keyframes Animation</h2>
      <div class="demo-content">
        <div class="animation-area">
          <div
            ref="keyframesBox"
            class="demo-box bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Keyframes
          </div>
        </div>
        <div class="controls-grid">
          <button @click="keyframesControls.play" class="btn btn-blue">Play Keyframes</button>
          <button @click="keyframesControls.pause" class="btn btn-gray">Pause</button>
          <button @click="keyframesControls.restart" class="btn btn-green">Restart</button>
        </div>
        <div class="status-display">
          <div class="status-item">Progress: {{ Math.round(keyframesState.progress * 100) }}%</div>
        </div>
      </div>
    </section>

    <!-- Section 6: Easing and Timing -->
    <section class="demo-section mb-12">
      <h2 class="section-title">6. Easing and Timing Options</h2>
      <div class="demo-content">
        <div class="animation-area grid grid-cols-4 gap-2">
          <div ref="easeLinear" class="demo-box bg-red-400 text-xs">Linear</div>
          <div ref="easeQuad" class="demo-box bg-blue-400 text-xs">Quad</div>
          <div ref="easeCubic" class="demo-box bg-green-400 text-xs">Cubic</div>
          <div ref="easeElastic" class="demo-box bg-purple-400 text-xs">Elastic</div>
        </div>
        <div class="controls-grid">
          <button @click="playEasingAnimations" class="btn btn-blue">Play Easing Demo</button>
          <button @click="pauseEasingAnimations" class="btn btn-gray">Pause All</button>
          <button @click="restartEasingAnimations" class="btn btn-green">Restart All</button>
        </div>
      </div>
    </section>

    <!-- Section 7: Loop and Alternate -->
    <section class="demo-section mb-12">
      <h2 class="section-title">7. Loop and Alternate Options</h2>
      <div class="demo-content">
        <div class="animation-area grid grid-cols-3 gap-4">
          <div ref="loopBox" class="demo-box bg-orange-500">Infinite Loop</div>
          <div ref="alternateBox" class="demo-box bg-teal-500">Alternate</div>
          <div ref="loopCountBox" class="demo-box bg-pink-500">Loop 3x</div>
        </div>
        <div class="controls-grid">
          <button @click="playLoopAnimations" class="btn btn-blue">Play Loop Demo</button>
          <button @click="pauseLoopAnimations" class="btn btn-gray">Pause All</button>
          <button @click="cancelLoopAnimations" class="btn btn-red">Cancel All</button>
        </div>
      </div>
    </section>

    <!-- Section 8: Callbacks and Events -->
    <section class="demo-section mb-12">
      <h2 class="section-title">8. Animation Callbacks</h2>
      <div class="demo-content">
        <div class="animation-area">
          <div
            ref="callbackBox"
            class="demo-box bg-indigo-500"
          >
            Callback Demo
          </div>
        </div>
        <div class="controls-grid">
          <button @click="callbackControls.play" class="btn btn-blue">Play with Callbacks</button>
          <button @click="callbackControls.restart" class="btn btn-green">Restart</button>
          <button @click="clearCallbackLog" class="btn btn-red">Clear Log</button>
        </div>
        <div class="callback-log">
          <h4 class="font-semibold mb-2">Callback Log:</h4>
          <div class="log-container">
            <div v-for="(log, index) in callbackLog" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 9: Function-based Values -->
    <section class="demo-section mb-12">
      <h2 class="section-title">9. Function-based Values & Stagger</h2>
      <div class="demo-content">
        <div class="animation-area">
          <div class="stagger-container">
            <div
              v-for="i in 8"
              :key="i"
              :ref="el => staggerBoxes[i-1] = el"
              class="stagger-box"
              :style="{ backgroundColor: `hsl(${i * 45}, 70%, 60%)` }"
            >
              {{ i }}
            </div>
          </div>
        </div>
        <div class="controls-grid">
          <button @click="playStaggerAnimation" class="btn btn-blue">Play Stagger</button>
          <button @click="pauseStaggerAnimation" class="btn btn-gray">Pause</button>
          <button @click="restartStaggerAnimation" class="btn btn-green">Restart</button>
        </div>
      </div>
    </section>

    <!-- Section 10: Advanced Features -->
    <section class="demo-section mb-12">
      <h2 class="section-title">10. Advanced Features</h2>
      <div class="demo-content">
        <div class="animation-area grid grid-cols-2 gap-4">
          <div ref="fromToBox" class="demo-box bg-cyan-500">From/To Values</div>
          <div ref="modifierBox" class="demo-box bg-lime-500">With Modifier</div>
        </div>
        <div class="controls-grid">
          <button @click="playAdvancedFeatures" class="btn btn-blue">Play Advanced</button>
          <button @click="pauseAdvancedFeatures" class="btn btn-gray">Pause</button>
          <button @click="restartAdvancedFeatures" class="btn btn-green">Restart</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Refs for all demo boxes
const basicBox = ref<HTMLElement | null>(null)
const advancedBox = ref<HTMLElement | null>(null)
const translateBox = ref<HTMLElement | null>(null)
const scaleBox = ref<HTMLElement | null>(null)
const rotateBox = ref<HTMLElement | null>(null)
const skewBox = ref<HTMLElement | null>(null)
const multiTransformBox = ref<HTMLElement | null>(null)
const opacityBox = ref<HTMLElement | null>(null)
const colorBox = ref<HTMLElement | null>(null)
const sizeBox = ref<HTMLElement | null>(null)
const backgroundBox = ref<HTMLElement | null>(null)
const keyframesBox = ref<HTMLElement | null>(null)
const easeLinear = ref<HTMLElement | null>(null)
const easeQuad = ref<HTMLElement | null>(null)
const easeCubic = ref<HTMLElement | null>(null)
const easeElastic = ref<HTMLElement | null>(null)
const loopBox = ref<HTMLElement | null>(null)
const alternateBox = ref<HTMLElement | null>(null)
const loopCountBox = ref<HTMLElement | null>(null)
const callbackBox = ref<HTMLElement | null>(null)
const staggerBoxes = ref<HTMLElement[]>([])
const fromToBox = ref<HTMLElement | null>(null)
const modifierBox = ref<HTMLElement | null>(null)

// Callback log
const callbackLog = ref<string[]>([])

// Section 1: Basic Controls
const basicControls = useAnimate(basicBox, {
  x: [0, 300, 0],
  duration: 2000,
  loop: true,
  autoplay: false,
})
const basicState = basicControls

// Section 2: Advanced Controls
const advancedControls = useAnimate(advancedBox, {
  x: [0, 250],
  rotate: [0, 180],
  duration: 1000,
  autoplay: false,
})
const advancedState = advancedControls

// Section 3: Transform Properties
const translateControls = useAnimate(translateBox, {
  translateX: [0, 150],
  translateY: [0, 50],
  duration: 1500,
  autoplay: false,
})

const scaleControls = useAnimate(scaleBox, {
  scale: [1, 1.5, 1],
  duration: 1500,
  autoplay: false,
})

const rotateControls = useAnimate(rotateBox, {
  rotate: [0, 360],
  duration: 1500,
  autoplay: false,
})

const skewControls = useAnimate(skewBox, {
  skewX: [0, 20, 0],
  skewY: [0, 10, 0],
  duration: 1500,
  autoplay: false,
})

const multiTransformControls = useAnimate(multiTransformBox, {
  x: [0, 100],
  y: [0, 50],
  scale: [1, 1.2],
  rotate: [0, 45],
  duration: 1500,
  autoplay: false,
})

// Section 4: CSS Properties
const opacityControls = useAnimate(opacityBox, {
  opacity: [1, 0.3, 1],
  duration: 1500,
  autoplay: false,
})

const colorControls = useAnimate(colorBox, {
  color: ['#ffffff', '#ff0000', '#ffffff'],
  duration: 1500,
  autoplay: false,
})

const sizeControls = useAnimate(sizeBox, {
  width: [100, 150, 100],
  height: [100, 150, 100],
  duration: 1500,
  autoplay: false,
})

const backgroundControls = useAnimate(backgroundBox, {
  backgroundColor: ['#8b5cf6', '#ef4444', '#10b981', '#8b5cf6'],
  duration: 2000,
  autoplay: false,
})

// Section 5: Keyframes
const keyframesControls = useAnimate(keyframesBox, {
  keyframes: [
    { x: 0, y: 0, scale: 1, rotate: 0 },
    { x: 100, y: 0, scale: 1.2, rotate: 90 },
    { x: 100, y: 100, scale: 1, rotate: 180 },
    { x: 0, y: 100, scale: 0.8, rotate: 270 },
    { x: 0, y: 0, scale: 1, rotate: 360 }
  ],
  duration: 3000,
  autoplay: false,
})
const keyframesState = keyframesControls

// Section 6: Easing
const easingControls = [
  useAnimate(easeLinear, { x: [0, 200], duration: 2000, ease: 'linear', autoplay: false }),
  useAnimate(easeQuad, { x: [0, 200], duration: 2000, ease: 'outQuad', autoplay: false }),
  useAnimate(easeCubic, { x: [0, 200], duration: 2000, ease: 'outCubic', autoplay: false }),
  useAnimate(easeElastic, { x: [0, 200], duration: 2000, ease: 'outElastic', autoplay: false }),
]

// Section 7: Loop and Alternate
const loopControls = useAnimate(loopBox, {
  x: [0, 150, 0],
  duration: 1000,
  loop: true,
  autoplay: false,
})

const alternateControls = useAnimate(alternateBox, {
  x: [0, 150],
  duration: 1000,
  loop: true,
  alternate: true,
  autoplay: false,
})

const loopCountControls = useAnimate(loopCountBox, {
  x: [0, 150, 0],
  duration: 1000,
  loop: 3,
  autoplay: false,
})

// Section 8: Callbacks
const callbackControls = useAnimate(callbackBox, {
  x: [0, 200, 0],
  duration: 2000,
  autoplay: false,
  onBegin: () => addToLog('Animation began'),
  onUpdate: () => addToLog('Animation updating...'),
  onComplete: () => addToLog('Animation completed'),
  onLoop: () => addToLog('Animation looped'),
  onPause: () => addToLog('Animation paused'),
})

// Section 9: Stagger Animation
const staggerControls = ref<any>(null)

// Section 10: Advanced Features
const fromToControls = useAnimate(fromToBox, {
  x: { from: 50, to: 200 },
  rotate: { from: 45, to: 315 },
  duration: 2000,
  autoplay: false,
})

const modifierControls = useAnimate(modifierBox, {
  x: [0, 100],
  modifier: (value: number) => value * 2, // Double the animation distance
  duration: 2000,
  autoplay: false,
})

// Helper functions
const addToLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  callbackLog.value.push(`[${timestamp}] ${message}`)
  if (callbackLog.value.length > 10) {
    callbackLog.value.shift()
  }
}

const clearCallbackLog = () => {
  callbackLog.value = []
}

// Control functions for grouped animations
const playTransformAnimations = () => {
  translateControls.play()
  scaleControls.play()
  rotateControls.play()
  skewControls.play()
  multiTransformControls.play()
}

const pauseTransformAnimations = () => {
  translateControls.pause()
  scaleControls.pause()
  rotateControls.pause()
  skewControls.pause()
  multiTransformControls.pause()
}

const restartTransformAnimations = () => {
  translateControls.restart()
  scaleControls.restart()
  rotateControls.restart()
  skewControls.restart()
  multiTransformControls.restart()
}

const playCSSAnimations = () => {
  opacityControls.play()
  colorControls.play()
  sizeControls.play()
  backgroundControls.play()
}

const pauseCSSAnimations = () => {
  opacityControls.pause()
  colorControls.pause()
  sizeControls.pause()
  backgroundControls.pause()
}

const restartCSSAnimations = () => {
  opacityControls.restart()
  colorControls.restart()
  sizeControls.restart()
  backgroundControls.restart()
}

const playEasingAnimations = () => {
  easingControls.forEach(control => control.play())
}

const pauseEasingAnimations = () => {
  easingControls.forEach(control => control.pause())
}

const restartEasingAnimations = () => {
  easingControls.forEach(control => control.restart())
}

const playLoopAnimations = () => {
  loopControls.play()
  alternateControls.play()
  loopCountControls.play()
}

const pauseLoopAnimations = () => {
  loopControls.pause()
  alternateControls.pause()
  loopCountControls.pause()
}

const cancelLoopAnimations = () => {
  loopControls.cancel()
  alternateControls.cancel()
  loopCountControls.cancel()
}

const playStaggerAnimation = () => {
  if (staggerControls.value) {
    staggerControls.value.play()
  }
}

const pauseStaggerAnimation = () => {
  if (staggerControls.value) {
    staggerControls.value.pause()
  }
}

const restartStaggerAnimation = () => {
  if (staggerControls.value) {
    staggerControls.value.restart()
  }
}

const playAdvancedFeatures = () => {
  fromToControls.play()
  modifierControls.play()
}

const pauseAdvancedFeatures = () => {
  fromToControls.pause()
  modifierControls.pause()
}

const restartAdvancedFeatures = () => {
  fromToControls.restart()
  modifierControls.restart()
}

// Initialize stagger animation after mount
onMounted(() => {
  // Create stagger animation for multiple elements
  staggerControls.value = useAnimate(staggerBoxes.value, {
    y: [0, -50, 0],
    scale: [1, 1.2, 1],
    delay: (el: any, i: number) => i * 100, // Stagger delay
    duration: 800,
    autoplay: false,
  })
})
</script>

<style scoped>
.animate-demo-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.demo-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 0.5rem;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.animation-area {
  min-height: 150px;
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.demo-box {
  width: 100px;
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  user-select: none;
  cursor: default;
  transition: box-shadow 0.2s;
}

.demo-box:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-blue { background: #3b82f6; }
.btn-blue:hover { background: #2563eb; }
.btn-gray { background: #6b7280; }
.btn-gray:hover { background: #4b5563; }
.btn-green { background: #10b981; }
.btn-green:hover { background: #059669; }
.btn-purple { background: #8b5cf6; }
.btn-purple:hover { background: #7c3aed; }
.btn-red { background: #ef4444; }
.btn-red:hover { background: #dc2626; }
.btn-orange { background: #f97316; }
.btn-orange:hover { background: #ea580c; }
.btn-teal { background: #14b8a6; }
.btn-teal:hover { background: #0d9488; }
.btn-indigo { background: #6366f1; }
.btn-indigo:hover { background: #4f46e5; }

.status-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.status-item {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.callback-log {
  margin-top: 1rem;
}

.log-container {
  max-height: 200px;
  overflow-y: auto;
  background: #1f2937;
  color: #10b981;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.75rem;
}

.log-item {
  margin-bottom: 0.25rem;
  padding: 0.25rem 0;
  border-bottom: 1px solid #374151;
}

.log-item:last-child {
  border-bottom: none;
}

.stagger-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.stagger-box {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .animation-area.grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .controls-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .status-display {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .animation-area.grid {
    grid-template-columns: 1fr;
  }
  
  .controls-grid {
    grid-template-columns: 1fr;
  }
}
</style>
