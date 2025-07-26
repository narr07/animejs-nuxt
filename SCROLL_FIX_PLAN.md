# useScroll Fix Implementation Plan

## Issues Identified

1. **Missing Progress Updates**: The reactive values are not updating continuously during scroll
2. **Incomplete ScrollObserver Interface**: Missing essential properties from Anime.js v4
3. **Animation Linking Issues**: The `link` method is not properly synchronizing animations with scroll progress
4. **Callback Timing**: Callbacks are not firing at the correct scroll positions
5. **Missing Scroll Properties**: Essential scroll data like velocity, direction, etc. are missing

## Solutions Implemented

### 1. Enhanced ScrollObserver Interface
- Added optional properties: `scrollY`, `scrollX`, `velocity`, `direction`
- Added threshold properties: `enterThreshold`, `leaveThreshold`
- Added animation state: `linkedAnimations`

### 2. Improved useScroll Composable
- **Continuous Updates**: Added animation frame loop for smooth progress tracking
- **Additional Reactive Properties**: Exposed scrollY, scrollX, velocity, direction
- **Better Error Handling**: More descriptive error messages and fallbacks
- **Default Values**: Provided sensible defaults for enter/leave thresholds
- **Cleanup Management**: Proper cleanup of animation frames

### 3. Key Improvements

#### Continuous Update Loop
```typescript
const startUpdateLoop = () => {
  const update = (currentTime: number) => {
    if (currentTime - lastUpdateTime >= 16) { // ~60fps
      updateReactiveValues()
      lastUpdateTime = currentTime
    }
    
    if (observer.value && isInView.value) {
      animationFrameId = requestAnimationFrame(update)
    }
  }
  
  if (observer.value) {
    animationFrameId = requestAnimationFrame(update)
  }
}
```

#### Enhanced Reactive Values Update
```typescript
const updateReactiveValues = () => {
  if (observer.value) {
    progress.value = observer.value.progress || 0
    isInView.value = observer.value.isInView || false
    container.value = observer.value.container || null
    target.value = observer.value.target || null
    
    // Update additional scroll properties if available
    if ('scrollY' in observer.value) scrollY.value = (observer.value as any).scrollY || 0
    if ('scrollX' in observer.value) scrollX.value = (observer.value as any).scrollX || 0
    if ('velocity' in observer.value) velocity.value = (observer.value as any).velocity || 0
    if ('direction' in observer.value) direction.value = (observer.value as any).direction || null
  }
}
```

#### Better Callback Management
- Start update loop on `onEnter`
- Stop update loop on `onLeave`
- Ensure all callbacks trigger `updateReactiveValues()`

### 4. Default Configuration
- `axis: 'y'` - Default to vertical scrolling
- `enter: 'bottom top'` - Element enters when bottom hits top of viewport
- `leave: 'top bottom'` - Element leaves when top hits bottom of viewport

## Testing Requirements

1. **Basic Scroll Tracking**: Verify progress updates smoothly from 0 to 1
2. **Threshold Detection**: Test enter/leave callbacks fire at correct positions
3. **Animation Linking**: Ensure linked animations sync with scroll progress
4. **Multiple Observers**: Test multiple scroll observers on same/different elements
5. **Cleanup**: Verify proper cleanup on component unmount

## Usage Examples

### Basic Usage
```vue
<script setup>
const element = ref(null)
const { progress, isInView } = useScroll(element)
</script>

<template>
  <div 
    ref="element" 
    :style="{ 
      transform: `translateY(${progress * 100}px)`,
      opacity: isInView ? 1 : 0.5 
    }"
  >
    Progress: {{ (progress * 100).toFixed(1) }}%
  </div>
</template>
```

### Advanced Usage with Callbacks
```vue
<script setup>
const element = ref(null)
const { progress, isInView, velocity, direction } = useScroll(element, {
  enter: '30%',
  leave: '70%',
  onEnter: () => console.log('Entered viewport'),
  onLeave: () => console.log('Left viewport'),
  onUpdate: (obs) => console.log('Progress:', obs.progress)
})
</script>
```

## Files Modified

1. `src/runtime/composables/useScroll.ts` - Main composable implementation
2. `src/runtime/types.ts` - Enhanced ScrollObserver interface (pending)

## Next Steps

1. Replace the original useScroll.ts with the fixed version
2. Update the ScrollObserver interface in types.ts
3. Test with the playground component
4. Verify all scroll-based animations work correctly
