<template>
  <div class="progress-bar">
    <div class="progress-fill" :style="{ width: pct + '%' }"></div>
    <div class="progress-text">{{ props.current }} / {{ props.total }}</div>
  </div>
</template>

<script setup>
/* eslint-disable vue/no-setup-props-destructure, no-undef */
import { computed } from 'vue';

// grab the two numbers
const props = defineProps({
  current: { type: Number, required: true },
  total:   { type: Number, required: true }
});

// compute percentage (guarding against zero-division)
const pct = computed(() =>
  props.total > 0 ? Math.round((props.current / props.total) * 100) : 0
);
</script>

<style scoped>
.progress-bar {
  position: relative;
  background: #eee;
  border-radius: 4px;
  height: 12px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}
.progress-fill {
  height: 100%;
  background: #3b82f6; /* blue fill */
  transition: width 0.3s ease;
}
.progress-text {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  line-height: 12px;
  color: #333;
}
</style>
