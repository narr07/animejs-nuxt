<template>
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
    <UseTimer />
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
import UseTimer from '~/components/UseTimer.vue'
</script>

<style>
.examples {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
}
</style>
