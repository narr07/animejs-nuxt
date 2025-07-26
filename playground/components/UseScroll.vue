<template>
  <div class="use-scroll-demo">
    <!-- Header -->
    <div class="demo-header">
      <h1>useScroll Composable - Complete Feature Demo</h1>
      <p>Comprehensive demonstration of all useScroll features and capabilities</p>
    </div>

    <!-- Controls Panel -->
    <div class="controls-panel">
      <h2>Interactive Controls</h2>
      <div class="control-group">
        <button @click="refreshAll">Refresh All Observers</button>
        <button @click="revertAll">Revert All Observers</button>
        <button @click="toggleDebug">Toggle Debug: {{ debugMode ? 'ON' : 'OFF' }}</button>
      </div>
    </div>

    <!-- Status Dashboard -->
    <div class="status-dashboard">
      <h2>Real-time Status</h2>
      <div class="status-grid">
        <div class="status-card">
          <h3>Basic Scroll</h3>
          <p>Progress: {{ (basicScroll.progress.value * 100).toFixed(1) }}%</p>
          <p>In View: {{ basicScroll.isInView.value ? '✅' : '❌' }}</p>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (basicScroll.progress.value * 100) + '%' }"></div>
          </div>
        </div>
        
        <div class="status-card">
          <h3>X-Axis Scroll</h3>
          <p>Progress: {{ (xAxisScroll.progress.value * 100).toFixed(1) }}%</p>
          <p>In View: {{ xAxisScroll.isInView.value ? '✅' : '❌' }}</p>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (xAxisScroll.progress.value * 100) + '%' }"></div>
          </div>
        </div>

        <div class="status-card">
          <h3>Container Scroll</h3>
          <p>Progress: {{ (containerScroll.progress.value * 100).toFixed(1) }}%</p>
          <p>In View: {{ containerScroll.isInView.value ? '✅' : '❌' }}</p>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (containerScroll.progress.value * 100) + '%' }"></div>
          </div>
        </div>

        <div class="status-card">
          <h3>Threshold Scroll</h3>
          <p>Progress: {{ (thresholdScroll.progress.value * 100).toFixed(1) }}%</p>
          <p>In View: {{ thresholdScroll.isInView.value ? '✅' : '❌' }}</p>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (thresholdScroll.progress.value * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Log -->
    <div class="event-log">
      <h2>Event Log</h2>
      <div class="log-container">
        <div v-for="(event, index) in eventLog" :key="index" class="log-entry" :class="event.type">
          <span class="timestamp">{{ event.timestamp }}</span>
          <span class="event-type">{{ event.type }}</span>
          <span class="message">{{ event.message }}</span>
        </div>
      </div>
      <button @click="clearLog">Clear Log</button>
    </div>

    <!-- Demo Sections -->
    <div class="demo-sections">
      
      <!-- 1. Basic Y-Axis Scroll -->
      <section class="demo-section">
        <h2>1. Basic Y-Axis Scroll</h2>
        <p>Default scroll tracking with progress and visibility detection</p>
        <div
          ref="basicScrollElement"
          class="scroll-box basic-scroll"
          :style="{ 
            transform: `translateY(${basicScroll.progress.value * 100}px)`,
            opacity: basicScroll.isInView.value ? 1 : 0.5
          }"
        >
          <div class="box-content">
            <h3>Basic Scroll Element</h3>
            <p>Progress: {{ (basicScroll.progress.value * 100).toFixed(1) }}%</p>
            <p>In View: {{ basicScroll.isInView.value ? 'Yes' : 'No' }}</p>
          </div>
        </div>
      </section>

      <!-- 2. X-Axis Scroll -->
      <section class="demo-section">
        <h2>2. X-Axis Scroll</h2>
        <p>Horizontal scroll tracking with axis: 'x' option</p>
        <div class="horizontal-scroll-container">
          <div
            ref="xAxisScrollElement"
            class="scroll-box x-axis-scroll"
            :style="{ 
              transform: `translateX(${xAxisScroll.progress.value * 200}px)`,
              backgroundColor: `hsl(${xAxisScroll.progress.value * 360}, 70%, 60%)`
            }"
          >
            <div class="box-content">
              <h3>X-Axis Scroll</h3>
              <p>Progress: {{ (xAxisScroll.progress.value * 100).toFixed(1) }}%</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Custom Container Scroll -->
      <section class="demo-section">
        <h2>3. Custom Container Scroll</h2>
        <p>Scroll tracking within a custom container element</p>
        <div ref="customContainer" class="custom-container">
          <div class="container-content">
            <div
              ref="containerScrollElement"
              class="scroll-box container-scroll"
              :style="{ 
                transform: `scale(${0.5 + containerScroll.progress.value * 0.5}) rotate(${containerScroll.progress.value * 360}deg)`
              }"
            >
              <div class="box-content">
                <h3>Container Scroll</h3>
                <p>{{ (containerScroll.progress.value * 100).toFixed(1) }}%</p>
              </div>
            </div>
            <div class="spacer"></div>
          </div>
        </div>
      </section>

      <!-- 4. Threshold Controls -->
      <section class="demo-section">
        <h2>4. Threshold Controls</h2>
        <p>Custom enter/leave thresholds: enter at 30%, leave at 70%</p>
        <div
          ref="thresholdScrollElement"
          class="scroll-box threshold-scroll"
          :class="{ 'in-threshold': thresholdScroll.isInView.value }"
          :style="{ 
            transform: `rotateY(${thresholdScroll.progress.value * 180}deg)`,
            borderWidth: `${2 + thresholdScroll.progress.value * 8}px`
          }"
        >
          <div class="box-content">
            <h3>Threshold Scroll</h3>
            <p>Progress: {{ (thresholdScroll.progress.value * 100).toFixed(1) }}%</p>
            <p>In Threshold: {{ thresholdScroll.isInView.value ? 'Yes' : 'No' }}</p>
          </div>
        </div>
      </section>

      <!-- 5. Directional Callbacks -->
      <section class="demo-section">
        <h2>5. Directional Callbacks</h2>
        <p>Demonstrates all directional scroll callbacks</p>
        <div
          ref="callbackScrollElement"
          class="scroll-box callback-scroll"
          :class="callbackState"
          :style="{ 
            transform: `translateX(${callbackScroll.progress.value * 100 - 50}px) translateY(${callbackScroll.progress.value * 50 - 25}px)`
          }"
        >
          <div class="box-content">
            <h3>Callback Scroll</h3>
            <p>State: {{ callbackState }}</p>
            <p>Progress: {{ (callbackScroll.progress.value * 100).toFixed(1) }}%</p>
            <p>Last Event: {{ lastCallbackEvent }}</p>
          </div>
        </div>
      </section>

      <!-- 6. Repeat Mode -->
      <section class="demo-section">
        <h2>6. Repeat Mode</h2>
        <p>Scroll observer with repeat: true - triggers multiple times</p>
        <div
          ref="repeatScrollElement"
          class="scroll-box repeat-scroll"
          :style="{ 
            transform: `rotate(${repeatScroll.progress.value * 720}deg)`,
            filter: `hue-rotate(${repeatScroll.progress.value * 360}deg)`
          }"
        >
          <div class="box-content">
            <h3>Repeat Scroll</h3>
            <p>Triggers: {{ repeatTriggerCount }}</p>
            <p>Progress: {{ (repeatScroll.progress.value * 100).toFixed(1) }}%</p>
          </div>
        </div>
      </section>

      <!-- 7. Sync Modes -->
      <section class="demo-section">
        <h2>7. Sync Modes</h2>
        <p>Different synchronization modes: smooth, eased, progress</p>
        <div class="sync-demos">
          <div
            ref="smoothSyncElement"
            class="scroll-box sync-scroll smooth"
            :style="{ 
              transform: `translateY(${smoothSync.progress.value * 100}px)`
            }"
          >
            <div class="box-content">
              <h3>Smooth Sync</h3>
              <p>{{ (smoothSync.progress.value * 100).toFixed(1) }}%</p>
            </div>
          </div>
          
          <div
            ref="easedSyncElement"
            class="scroll-box sync-scroll eased"
            :style="{ 
              transform: `translateY(${easedSync.progress.value * 100}px)`
            }"
          >
            <div class="box-content">
              <h3>Eased Sync</h3>
              <p>{{ (easedSync.progress.value * 100).toFixed(1) }}%</p>
            </div>
          </div>
          
          <div
            ref="progressSyncElement"
            class="scroll-box sync-scroll progress"
            :style="{ 
              transform: `translateY(${progressSync.progress.value * 100}px)`
            }"
          >
            <div class="box-content">
              <h3>Progress Sync</h3>
              <p>{{ (progressSync.progress.value * 100).toFixed(1) }}%</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Animation Linking -->
      <section class="demo-section">
        <h2>8. Animation Linking</h2>
        <p>Scroll observer linked to animations</p>
        <div
          ref="animationLinkElement"
          class="scroll-box animation-link"
          :style="animationStyles"
        >
          <div class="box-content">
            <h3>Animation Link</h3>
            <p>Progress: {{ (animationLink.progress.value * 100).toFixed(1) }}%</p>
            <p>Linked Animation Active</p>
          </div>
        </div>
        <button @click="createLinkedAnimation">Create Linked Animation</button>
      </section>

      <!-- 9. Debug Mode -->
      <section class="demo-section">
        <h2>9. Debug Mode</h2>
        <p>Debug visualization enabled</p>
        <div
          ref="debugScrollElement"
          class="scroll-box debug-scroll"
          :style="{ 
            transform: `scale(${0.8 + debugScroll.progress.value * 0.4})`
          }"
        >
          <div class="box-content">
            <h3>Debug Scroll</h3>
            <p>Progress: {{ (debugScroll.progress.value * 100).toFixed(1) }}%</p>
            <p>Debug Mode: {{ debugMode ? 'ON' : 'OFF' }}</p>
          </div>
        </div>
      </section>

      <!-- 10. Multiple Observers -->
      <section class="demo-section">
        <h2>10. Multiple Observers</h2>
        <p>Multiple scroll observers on the same element</p>
        <div
          ref="multipleObserverElement"
          class="scroll-box multiple-observer"
          :style="multipleObserverStyles"
        >
          <div class="box-content">
            <h3>Multiple Observers</h3>
            <p>Observer 1: {{ (multipleObserver1.progress.value * 100).toFixed(1) }}%</p>
            <p>Observer 2: {{ (multipleObserver2.progress.value * 100).toFixed(1) }}%</p>
          </div>
        </div>
      </section>

    </div>

    <!-- Spacer for scrolling -->
    <div class="spacer-large"></div>

    <!-- Footer -->
    <div class="demo-footer">
      <h2>useScroll Features Summary</h2>
      <div class="features-grid">
        <div class="feature-item">✅ Basic scroll tracking</div>
        <div class="feature-item">✅ X/Y axis control</div>
        <div class="feature-item">✅ Custom containers</div>
        <div class="feature-item">✅ Threshold controls</div>
        <div class="feature-item">✅ Directional callbacks</div>
        <div class="feature-item">✅ Repeat mode</div>
        <div class="feature-item">✅ Sync modes</div>
        <div class="feature-item">✅ Animation linking</div>
        <div class="feature-item">✅ Debug mode</div>
        <div class="feature-item">✅ Multiple observers</div>
        <div class="feature-item">✅ Auto cleanup</div>
        <div class="feature-item">✅ Reactive properties</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive references for all demo elements
const basicScrollElement = ref<HTMLElement | null>(null)
const xAxisScrollElement = ref<HTMLElement | null>(null)
const containerScrollElement = ref<HTMLElement | null>(null)
const customContainer = ref<HTMLElement | null>(null)
const thresholdScrollElement = ref<HTMLElement | null>(null)
const callbackScrollElement = ref<HTMLElement | null>(null)
const repeatScrollElement = ref<HTMLElement | null>(null)
const smoothSyncElement = ref<HTMLElement | null>(null)
const easedSyncElement = ref<HTMLElement | null>(null)
const progressSyncElement = ref<HTMLElement | null>(null)
const animationLinkElement = ref<HTMLElement | null>(null)
const debugScrollElement = ref<HTMLElement | null>(null)
const multipleObserverElement = ref<HTMLElement | null>(null)

// State management
const debugMode = ref(false)
const callbackState = ref('idle')
const lastCallbackEvent = ref('none')
const repeatTriggerCount = ref(0)
const eventLog = ref<Array<{timestamp: string, type: string, message: string}>>([])

// Helper function to log events
const logEvent = (type: string, message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLog.value.unshift({ timestamp, type, message })
  if (eventLog.value.length > 50) {
    eventLog.value = eventLog.value.slice(0, 50)
  }
}

// 1. Basic Y-Axis Scroll
const basicScroll = useScroll(basicScrollElement, {
  onEnter: () => logEvent('enter', 'Basic scroll entered viewport'),
  onLeave: () => logEvent('leave', 'Basic scroll left viewport'),
  onUpdate: () => logEvent('update', `Basic scroll progress: ${(basicScroll.progress.value * 100).toFixed(1)}%`)
})

// 2. X-Axis Scroll
const xAxisScroll = useScroll(xAxisScrollElement, {
  axis: 'x',
  onEnter: () => logEvent('enter', 'X-axis scroll entered viewport'),
  onLeave: () => logEvent('leave', 'X-axis scroll left viewport')
})

// 3. Custom Container Scroll
const containerScroll = useScroll(containerScrollElement, {
  container: customContainer,
  onEnter: () => logEvent('enter', 'Container scroll entered viewport'),
  onLeave: () => logEvent('leave', 'Container scroll left viewport')
})

// 4. Threshold Controls
const thresholdScroll = useScroll(thresholdScrollElement, {
  enter: '30%',
  leave: '70%',
  onEnter: () => logEvent('threshold', 'Entered threshold zone (30%)'),
  onLeave: () => logEvent('threshold', 'Left threshold zone (70%)')
})

// 5. Directional Callbacks
const callbackScroll = useScroll(callbackScrollElement, {
  onEnter: () => {
    callbackState.value = 'entered'
    lastCallbackEvent.value = 'onEnter'
    logEvent('callback', 'onEnter triggered')
  },
  onLeave: () => {
    callbackState.value = 'left'
    lastCallbackEvent.value = 'onLeave'
    logEvent('callback', 'onLeave triggered')
  },
  onEnterForward: () => {
    callbackState.value = 'enter-forward'
    lastCallbackEvent.value = 'onEnterForward'
    logEvent('callback', 'onEnterForward triggered')
  },
  onEnterBackward: () => {
    callbackState.value = 'enter-backward'
    lastCallbackEvent.value = 'onEnterBackward'
    logEvent('callback', 'onEnterBackward triggered')
  },
  onLeaveForward: () => {
    callbackState.value = 'leave-forward'
    lastCallbackEvent.value = 'onLeaveForward'
    logEvent('callback', 'onLeaveForward triggered')
  },
  onLeaveBackward: () => {
    callbackState.value = 'leave-backward'
    lastCallbackEvent.value = 'onLeaveBackward'
    logEvent('callback', 'onLeaveBackward triggered')
  }
})

// 6. Repeat Mode
const repeatScroll = useScroll(repeatScrollElement, {
  repeat: true,
  onEnter: () => {
    repeatTriggerCount.value++
    logEvent('repeat', `Repeat scroll triggered (${repeatTriggerCount.value} times)`)
  }
})

// 7. Sync Modes
const smoothSync = useScroll(smoothSyncElement, {
  sync: 'smooth',
  onSyncComplete: () => logEvent('sync', 'Smooth sync completed')
})

const easedSync = useScroll(easedSyncElement, {
  sync: 'eased',
  onSyncComplete: () => logEvent('sync', 'Eased sync completed')
})

const progressSync = useScroll(progressSyncElement, {
  sync: 'progress',
  onSyncComplete: () => logEvent('sync', 'Progress sync completed')
})

// 8. Animation Linking
const animationLink = useScroll(animationLinkElement, {
  onEnter: () => logEvent('animation', 'Animation link scroll entered')
})

const animationStyles = computed(() => ({
  transform: `
    translateX(${animationLink.progress.value * 200 - 100}px)
    translateY(${Math.sin(animationLink.progress.value * Math.PI * 4) * 50}px)
    rotate(${animationLink.progress.value * 360}deg)
    scale(${0.5 + animationLink.progress.value * 0.5})
  `,
  background: `linear-gradient(${animationLink.progress.value * 360}deg, #ff6b6b, #4ecdc4, #45b7d1)`
}))

// 9. Debug Mode
const debugScroll = useScroll(debugScrollElement, {
  debug: debugMode,
  onEnter: () => logEvent('debug', 'Debug scroll entered with debug mode')
})

// 10. Multiple Observers
const multipleObserver1 = useScroll(multipleObserverElement, {
  enter: '20%',
  leave: '80%',
  onEnter: () => logEvent('multiple', 'Multiple observer 1 entered')
})

const multipleObserver2 = useScroll(multipleObserverElement, {
  enter: '40%',
  leave: '60%',
  onEnter: () => logEvent('multiple', 'Multiple observer 2 entered')
})

const multipleObserverStyles = computed(() => ({
  transform: `
    translateX(${multipleObserver1.progress.value * 100}px)
    translateY(${multipleObserver2.progress.value * 100}px)
    rotate(${(multipleObserver1.progress.value + multipleObserver2.progress.value) * 180}deg)
  `,
  background: `linear-gradient(45deg, 
    hsl(${multipleObserver1.progress.value * 360}, 70%, 60%),
    hsl(${multipleObserver2.progress.value * 360}, 70%, 60%)
  )`
}))

// Control functions
const refreshAll = () => {
  basicScroll.refresh()
  xAxisScroll.refresh()
  containerScroll.refresh()
  thresholdScroll.refresh()
  callbackScroll.refresh()
  repeatScroll.refresh()
  smoothSync.refresh()
  easedSync.refresh()
  progressSync.refresh()
  animationLink.refresh()
  debugScroll.refresh()
  multipleObserver1.refresh()
  multipleObserver2.refresh()
  logEvent('control', 'All observers refreshed')
}

const revertAll = () => {
  basicScroll.revert()
  xAxisScroll.revert()
  containerScroll.revert()
  thresholdScroll.revert()
  callbackScroll.revert()
  repeatScroll.revert()
  smoothSync.revert()
  easedSync.revert()
  progressSync.revert()
  animationLink.revert()
  debugScroll.revert()
  multipleObserver1.revert()
  multipleObserver2.revert()
  logEvent('control', 'All observers reverted')
}

const toggleDebug = () => {
  debugMode.value = !debugMode.value
  logEvent('control', `Debug mode ${debugMode.value ? 'enabled' : 'disabled'}`)
}

const clearLog = () => {
  eventLog.value = []
}

const createLinkedAnimation = () => {
  // This would typically link to an actual animation
  // For demo purposes, we'll just log the action
  logEvent('animation', 'Linked animation created (demo)')
}

// Initialize logging
onMounted(() => {
  logEvent('system', 'useScroll demo initialized')
})
</script>

<style scoped>
.use-scroll-demo {
  min-height: 500vh;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.demo-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 10px;
}

.demo-header p {
  font-size: 1.1rem;
  color: #64748b;
}

.controls-panel {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.controls-panel h2 {
  margin-bottom: 15px;
  color: #1e293b;
}

.control-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.control-group button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.control-group button:hover {
  background: #2563eb;
}

.status-dashboard {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.status-dashboard h2 {
  margin-bottom: 20px;
  color: #1e293b;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.status-card {
  background: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.status-card h3 {
  margin-bottom: 10px;
  color: #1e293b;
  font-size: 1rem;
}

.status-card p {
  margin: 5px 0;
  color: #64748b;
  font-size: 0.9rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.1s ease;
}

.event-log {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.event-log h2 {
  margin-bottom: 15px;
  color: #1e293b;
}

.log-container {
  max-height: 200px;
  overflow-y: auto;
  background: #f8fafc;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}

.log-entry {
  display: flex;
  gap: 10px;
  padding: 4px 0;
  font-size: 0.85rem;
  border-bottom: 1px solid #e2e8f0;
}

.log-entry:last-child {
  border-bottom: none;
}

.timestamp {
  color: #64748b;
  min-width: 80px;
}

.event-type {
  font-weight: 600;
  min-width: 80px;
}

.event-type.enter { color: #059669; }
.event-type.leave { color: #dc2626; }
.event-type.update { color: #3b82f6; }
.event-type.callback { color: #7c3aed; }
.event-type.threshold { color: #ea580c; }
.event-type.repeat { color: #db2777; }
.event-type.sync { color: #0891b2; }
.event-type.animation { color: #65a30d; }
.event-type.debug { color: #4338ca; }
.event-type.multiple { color: #be185d; }
.event-type.control { color: #374151; }
.event-type.system { color: #6b7280; }

.message {
  color: #374151;
}

.demo-sections {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.demo-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  color: #1e293b;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.demo-section p {
  color: #64748b;
  margin-bottom: 20px;
}

.scroll-box {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.box-content {
  text-align: center;
  padding: 20px;
}

.box-content h3 {
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 600;
}

.box-content p {
  margin: 5px 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.basic-scroll {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.x-axis-scroll {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.horizontal-scroll-container {
  width: 100%;
  overflow-x: auto;
  padding: 20px 0;
}

.custom-container {
  height: 300px;
  overflow-y: auto;
  background: #f8fafc;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
}

.container-content {
  height: 600px;
  position: relative;
}

.container-scroll {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.spacer {
  height: 200px;
}

.threshold-scroll {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  border: 2px solid #10b981;
}

.threshold-scroll.in-threshold {
  border-color: #f59e0b;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
}

.callback-scroll {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  transition: all 0.3s ease;
}

.callback-scroll.entered { border-color: #10b981; }
.callback-scroll.left { border-color: #ef4444; }
.callback-scroll.enter-forward { border-color: #3b82f6; }
.callback-scroll.enter-backward { border-color: #8b5cf6; }
.callback-scroll.leave-forward { border-color: #f59e0b; }
.callback-scroll.leave-backward { border-color: #ec4899; }

.repeat-scroll {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.sync-demos {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.sync-scroll {
  width: 150px;
  height: 150px;
}

.sync-scroll.smooth {
  background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
}

.sync-scroll.eased {
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
}

.sync-scroll.progress {
  background: linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%);
}

.animation-link {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

.debug-scroll {
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
}

.multiple-observer {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.spacer-large {
  height: 100vh;
}

.demo-footer {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.demo-footer h2 {
  color: #1e293b;
  margin-bottom: 30px;
  font-size: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
}

.feature-item {
  background: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #10b981;
  font-weight: 500;
  color: #1e293b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .demo-header h1 {
    font-size: 2rem;
  }
  
  .status-grid {
    grid-template-columns: 1fr;
  }
  
  .sync-demos {
    flex-direction: column;
    align-items: center;
  }
  
  .scroll-box {
    width: 150px;
    height: 150px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

/* Animation for smooth transitions */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.scroll-box:hover {
  animation: pulse 2s infinite;
}

/* Custom scrollbar for containers */
.custom-container::-webkit-scrollbar {
  width: 8px;
}

.custom-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.custom-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.log-container::-webkit-scrollbar {
  width: 6px;
}

.log-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.log-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
</style>
