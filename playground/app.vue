<template>
  <div class="playground">
    <header class="header">
      <h1>Anime.js Composables Playground</h1>
      <p>
        Explore enhanced wrappers for draggable elements, animated text splits, SVG motion paths, and staggered animations.
      </p>
    </header>
    <div class="examples">
      <UseAnimate />
      <UseTimeline />
      <UseScope />
      <UseStagger />
      <UseSvg />
      <UseText />
      <UseUtils />
      <UseDraggable />
      <UseScroll />
    </div>
  </div>
</template>

<script setup lang="ts">
import UseAnimate from '~/components/UseAnimate.vue'
import UseTimeline from '~/components/UseTimeline.vue'
import UseScope from '~/components/UseScope.vue'
import UseStagger from '~/components/UseStagger.vue'
import UseSvg from '~/components/UseSvg.vue'
import UseText from '~/components/UseText.vue'
import UseUtils from '~/components/UseUtils.vue'
import UseDraggable from '~/components/UseDraggable.vue'
import UseScroll from '~/components/UseScroll.vue'
</script>

<style>
.playground {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
  background-color: #f0f0f0;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2rem;
  margin: 0;
  color: #333;
}

.header p {
  font-size: 1rem;
  color: #666;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
