<template>
  <button @click="exportCsv">{{ $t('downloadCsv') }}</button>
</template>

<script setup>
/* eslint-disable vue/no-setup-props-destructure, no-undef */
import { toRaw } from 'vue';

const props = defineProps({
  answers: { type: Object, required: true }
});

function exportCsv() {
  const raw = toRaw(props.answers);
  const rows = [];

  // header row
  rows.push(Object.keys(raw).join(','));

  // single data row (flatten nested objects if needed)
  rows.push(Object.values(raw).join(','));

  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'results.csv';
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
</style>
