<template>
  <div class="scroll-test">
    <h1>useScroll Test - Fixed Version</h1>
    
    <!-- Status Display -->
    <div class="status-panel">
      <h2>Scroll Status</h2>
      <div class="status-grid">
        <div class="status-item">
          <label>Progress:</label>
          <span>{{ (progress * 100).toFixed(1) }}%</span>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (progress * 100) + '%' }"></div>
          </div>
        </div>
        
        <div class="status-item">
          <label>In View:</label>
          <span :class="{ active: isInView }">{{ isInView ? '✅ YES' : '❌ NO' }}</span>
        </div>
        
        <div class="status-item">
          <label>Scroll Y:</label>
          <span>{{ scrollY }}px</span>
        </div>
        
        <div class="status-item">
          <label>Velocity:</label>
          <span>{{ velocity.toFixed(2) }}</span>
        </div>
        
        <div class="status-item">
          <label>Direction:</label>
          <span>{{ direction || 'none' }}</span>
        </div>
      </div>
    </div>

    <!-- Spacer for scrolling -->
    <div class="spacer"></div>

    <!-- Test Element -->
    <div
      ref="testElement"
      class="test-element"
      :style="{
        transform: `translateY(${progress * 100}px) scale(${0.5 + progress * 0.5})`,
        backgroundColor: `hsl(${progress * 360}, 70%, 60%)`,
        opacity: isInView ? 1 : 0.3
      }"
    >
      <h3>Scroll Test Element</h3>
      <p>Progress: {{ (progress * 100).toFixed(1) }}%</p>
      <p>In View: {{ isInView ? 'Yes' : 'No' }}</p>
      <p>This element should:</p>
      <ul>
        <li>Move down as you scroll (translateY)</li>
        <li>Scale from 0.5 to 1.0</li>
        <li>Change color through the spectrum</li>
        <li>Show opacity changes based on visibility</li>
      </ul>
    </div>

    <!-- More spacer -->
    <div class="spacer"></div>

    <!-- Event Log -->
    <div class="event-log">
      <h3>Event Log</h3>
      <div class="log-container">
        <div v-for="(event, index) in eventLog" :key="index" class="log-entry">
          <span class="timestamp">{{ event.timestamp }}</span>
          <span class="event-type">{{ event.type }}</span>
          <span class="message">{{ event.message }}</span>
        </div>
      </div>
      <button @click="clearLog">Clear Log</button>
    </div>

    <!-- Final spacer -->
    <div class="spacer"></div>
  </div>
</template>

<script setup lang="ts">
const testElement = ref<HTMLElement | null>(null)
const eventLog = ref<Array<{timestamp: string, type: string, message: string}>>([])

// Helper function to log events
const logEvent = (type: string, message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLog.value.unshift({ timestamp, type, message })
  if (eventLog.value.length > 20) {
    eventLog.value = eventLog.value.slice(0, 20)
  }
}

// Use the fixed useScroll composable
const {
  progress,
  isInView,
  scrollY,
  scrollX,
  velocity,
  direction,
  refresh,
  revert
} = useScroll(testElement, {
  enter: 'bottom top',
  leave: 'top bottom',
  onEnter: () => logEvent('ENTER', 'Element entered viewport'),
  onLeave: () => logEvent('LEAVE', 'Element left viewport'),
  onEnterForward: () => logEvent('ENTER_FWD', 'Entered viewport scrolling down'),
  onEnterBackward: () => logEvent('ENTER_BWD', 'Entered viewport scrolling up'),
  onLeaveForward: () => logEvent('LEAVE_FWD', 'Left viewport scrolling down'),
  onLeaveBackward: () => logEvent('LEAVE_BWD', 'Left viewport scrolling up'),
  onUpdate: () => logEvent('UPDATE', `Progress: ${(progress.value * 100).toFixed(1)}%`),
})

const clearLog = () => {
  eventLog.value = []
}

// Log initial state
onMounted(() => {
  logEvent('INIT', 'useScroll test component initialized')
})
</script>

<style scoped>
.scroll-test {
  min-height: 300vh;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
}

h1 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 30px;
}

.status-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  z-index: 1000;
}

.status-panel h2 {
  margin-bottom: 15px;
  color: #1e293b;
  font-size: 1.2rem;
}

.status-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

.status-item:last-child {
  border-bottom: none;
}

.status-item label {
  font-weight: 600;
  color: #374151;
}

.status-item span {
  color: #6b7280;
}

.status-item span.active {
  color: #059669;
  font-weight: 600;
}

.progress-bar {
  width: 100px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-left: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
  transition: width 0.1s ease;
}

.spacer {
  height: 50vh;
}

.test-element {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.test-element h3 {
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.test-element p {
  margin: 8px 0;
  opacity: 0.9;
}

.test-element ul {
  text-align: left;
  margin-top: 15px;
  padding-left: 20px;
}

.test-element li {
  margin: 5px 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.event-log {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
}

.event-log h3 {
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
  font-family: monospace;
}

.event-type {
  font-weight: 600;
  min-width: 100px;
  color: #3b82f6;
}

.message {
  color: #374151;
}

button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

button:hover {
  background: #2563eb;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .status-panel {
    position: relative;
    top: auto;
    right: auto;
    margin-bottom: 20px;
  }
  
  .test-element {
    width: 250px;
    height: 250px;
    padding: 20px;
  }
}
</style>
