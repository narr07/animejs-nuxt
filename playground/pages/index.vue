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
      <ModuleFeatureExample />
    </div>
  </div>
</template>

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
