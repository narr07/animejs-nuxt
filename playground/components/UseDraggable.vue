<template>
  <div class="draggable-demo">
    <div class="demo-header">
      <h2 class="demo-title">🎯 Draggable Elements</h2>
      <p class="demo-description">
        Interactive draggable elements with constraints and physics. Try dragging the boxes below!
      </p>
    </div>

    <div class="demo-section">
      <h3 class="section-title">Basic Draggable</h3>
      <div class="demo-area">
        <div ref="box1" class="box basic-box">
          <span>Free Drag</span>
        </div>
        <div ref="box2" class="box basic-box">
          <span>Also Free</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">Constrained Draggable</h3>
      <div ref="constraintContainer" class="constraint-container">
        <div ref="constrainedBox" class="box constrained-box">
          <span>Constrained</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h3 class="section-title">Physics Draggable</h3>
      <div class="demo-area">
        <div ref="physicsBox" class="box physics-box">
          <span>Physics</span>
        </div>
      </div>
    </div>

    <div class="code-example">
      <h3 class="section-title">Usage Examples</h3>
      <div class="code-block">
        <pre><code>// Basic draggable
import { useDraggable } from '~/composables/useDraggable'

const element = ref()
onMounted(() => {
  useDraggable(element.value)
})

// With constraints
import { useDraggableWithConstraints } from '~/composables/useDraggable'

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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDraggable, useDraggableWithConstraints } from '~/runtime/composables/useDraggable'

const box1 = ref<HTMLElement | null>(null)
const box2 = ref<HTMLElement | null>(null)
const constrainedBox = ref<HTMLElement | null>(null)
const constraintContainer = ref<HTMLElement | null>(null)
const physicsBox = ref<HTMLElement | null>(null)

onMounted(() => {
  // Basic draggable elements
  if (box1.value) {
    const draggable1 = useDraggable(box1.value)
    if (!draggable1) console.error('Draggable initialization failed for box 1.')
  }
  
  if (box2.value) {
    const draggable2 = useDraggable(box2.value)
    if (!draggable2) console.error('Draggable initialization failed for box 2.')
  }

  // Constrained draggable
  if (constrainedBox.value && constraintContainer.value) {
    const constrainedDraggable = useDraggableWithConstraints(
      constrainedBox.value,
      {
        x: { min: 0, max: 250 },
        y: { min: 0, max: 100 },
        container: constraintContainer.value
      }
    )
    if (!constrainedDraggable) console.error('Constrained draggable initialization failed.')
  }

  // Physics-based draggable
  if (physicsBox.value) {
    const physicsDraggable = useDraggable(physicsBox.value, {
      dragSpeed: 1.2,
      releaseEase: 'outElastic',
      releaseMass: 0.8,
      releaseStiffness: 0.7,
      releaseDamping: 0.8
    })
    if (!physicsDraggable) console.error('Physics draggable initialization failed.')
  }
})
</script>

<style scoped>
.draggable-demo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0;
}

.demo-header {
  text-align: center;
  margin-bottom: 2rem;
}

.demo-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.demo-description {
  font-size: 1rem;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.6;
}

.demo-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #34495e;
  margin: 0 0 1rem 0;
}

.demo-area {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  min-height: 120px;
  align-items: flex-start;
}

.constraint-container {
  width: 300px;
  height: 150px;
  background: rgba(255, 255, 255, 0.7);
  border: 2px dashed #bdc3c7;
  border-radius: 8px;
  position: relative;
  padding: 1rem;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: grab;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  user-select: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.box:active {
  cursor: grabbing;
  transform: scale(1.05);
}

.basic-box {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.basic-box:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.constrained-box {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.physics-box {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.code-example {
  background: #2d3748;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.code-example .section-title {
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.code-block {
  background: #1a202c;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.code-block code {
  color: #e2e8f0;
}
</style>
