<template>
  <div class="playground">
    <section class="split-section">
      <h2>Chars Split</h2>
      <p
        ref="charsEl"
        class="split-text"
      >
        Anime.js text split example for characters.
      </p>
      <button @click="animateChars">
        Animate Chars
      </button>
    </section>
    <section class="split-section">
      <h2>Words Split</h2>
      <p
        ref="wordsEl"
        class="split-text"
      >
        Another text split example using words to animate.
      </p>
      <button @click="animateWords">
        Animate Words
      </button>
    </section>
    <section class="split-section">
      <h2>Lines Split</h2>
      <p
        ref="linesEl"
        class="split-text"
      >
        Finally we split lines to animate line by line with Anime.js.
      </p>
      <button @click="animateLines">
        Animate Lines
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
const charsEl = ref<HTMLElement | null>(null)
const wordsEl = ref<HTMLElement | null>(null)
const linesEl = ref<HTMLElement | null>(null)
const { $anime } = useNuxtApp()

const animateChars = () => {
  if (!charsEl.value) return
  const splitter = useTextSplit(charsEl.value, { type: 'chars' })
  if (splitter) {
    $anime.animate(splitter.chars, { y: [20, 0], opacity: [0, 1], delay: $anime.stagger(30) })
  }
}

const animateWords = () => {
  if (!wordsEl.value) return
  const splitter = useTextSplit(wordsEl.value, { type: 'words' })
  if (splitter) {
    $anime.animate(splitter.words, { y: [-10, 0], opacity: [0, 1], delay: $anime.stagger(10) })
  }
}

const animateLines = () => {
  if (!linesEl.value) return
  const splitter = useTextSplit(linesEl.value, { type: 'lines' })
  if (splitter) {
    $anime.animate(splitter.lines, { opacity: [0, 1], translateX: [-40, 0], delay: $anime.stagger(60) })
  }
}
</script>

<style scoped>
.playground {
  padding: 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
.split-section {
  margin-bottom: 2rem;
}
.split-text {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  background: #3498db;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #2980b9;
}
</style>
