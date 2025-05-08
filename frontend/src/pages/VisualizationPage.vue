<template>
  <div v-if="!configStore.loaded" class="loading">
    {{ $t('loading') }}…
  </div>
  <div v-else class="visualization-page">
    <h2>{{ $t('visualization') }}</h2>

    <!-- single point for the current user -->
    <MatrixVisualization />

    <!-- also allow CSV download -->
    <CsvExportButton :answers="answerStore.answers" />
  </div>
</template>

<script setup>
import { onMounted }      from 'vue';
import { useConfigStore } from '@/stores/config';
import { useAnswerStore } from '@/stores/answers';
import MatrixVisualization from '@/components/MatrixVisualization.vue';
import CsvExportButton     from '@/components/CsvExportButton.vue';

const configStore = useConfigStore();
const answerStore = useAnswerStore();

// on mount, submit answers + sessionId to the server
onMounted(() => {
  // 1) generate or retrieve a persistent sessionId
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Date.now().toString(36) + '-' + Math.random().toString(36).substr(2);
    localStorage.setItem('sessionId', sessionId);
  }

  // 2) POST your answers + sessionId
  fetch('/api/submit', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      answers: answerStore.answers,
      demo:    answerStore.answers.demo || {}
    })
  })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(() => {
      console.log('Results saved for session', sessionId);
    })
    .catch(err => {
      console.error('Submit failed:', err);
    });
});
</script>

<style scoped>
.loading {
  text-align: center;
  margin-top: 2rem;
}

/* make this page’s inner card take up 75% of the viewport */
.visualization-page {
  max-width: none;         /* ignore the 800px global cap */
  width: 75vw;             /* 75% of the window width */
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  text-align: center;
  font-family: sans-serif;
}
</style>


