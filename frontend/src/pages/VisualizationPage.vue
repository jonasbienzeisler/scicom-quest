<template>
  <div v-if="!configStore.loaded" class="loading">
    {{ $t('loading') }}…
  </div>
  <div v-else class="visualization-page">
    <!-- language toggle pill -->
    <LanguageToggle class="lang-toggle" />

    <h2>{{ $t('visualization') }}</h2>

    <!-- matrix gets its full container width, never viewport width -->
    <MatrixVisualization />

    <!-- CSV export sits at the bottom -->
    <CsvExportButton :answers="answerStore.answers" />
  </div>
</template>

<script setup>
import { onMounted }       from 'vue';
import { useConfigStore }  from '@/stores/config';
import { useAnswerStore }  from '@/stores/answers';
import MatrixVisualization from '@/components/MatrixVisualization.vue';
import CsvExportButton     from '@/components/CsvExportButton.vue';
import LanguageToggle      from '@/components/LanguageToggle.vue';

const configStore = useConfigStore();
const answerStore = useAnswerStore();

onMounted(() => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = Date.now().toString(36) + '-' + Math.random().toString(36).substr(2);
    localStorage.setItem('sessionId', sessionId);
  }

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

.visualization-page {
  position: relative;       /* for the pill */
  padding-top: 3rem;        /* room for the toggle pill */
  max-width: 900px;
  width: 90%;               /* adapt to smaller screens */
  margin: 2rem auto;
  text-align: center;
  font-family: sans-serif;
}

/* keep the toggle pill up in the corner */
.lang-toggle {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

