<template>
  <div v-if="!configStore.loaded" class="loading">
    {{ $t('loading') }}…
  </div>
  <div v-else class="reflection-page">
    <h2>{{ $t('reflection') }}</h2>

    <div 
      v-for="dim in dimensions" 
      :key="dim" 
      class="dimension-block"
    >
      <h3>{{ $t(dim) }}</h3>
      <ReflectionText :text="reflectionFor(dim)" />
    </div>

    <button @click="next" class="btn-next">
      {{ $t('viewVisualization') }}
    </button>
  </div>
</template>

<script setup>
import { useRouter }      from 'vue-router';
import { useConfigStore } from '@/stores/config';
import { useAnswerStore } from '@/stores/answers';
import ReflectionText     from '@/components/ReflectionText.vue';

const router      = useRouter();
const configStore = useConfigStore();
const answerStore = useAnswerStore();

// the three dimensions
const dimensions = ['politics', 'neutrality', 'authority'];

/** 
 * Compute average and pick the matching reflection rule.
 */
function reflectionFor(dim) {
  const answers = answerStore.answers.likert || {};
  const qs      = (configStore.questions.likert || []).filter(q => q.dimension === dim);
  const vals    = qs.map(q => answers[q.id]).filter(v => v != null);
  const avg     = vals.length ? vals.reduce((a,b) => a + b, 0) / vals.length : 0;

  const rules = (configStore.reflections.dimensions || {})[dim] || [];
  const rule  = rules.find(r => avg >= r.min && avg <= r.max);
  return rule ? rule.text : { de: '', en: '' };
}

function next() {
  router.push('/visualization');
}
</script>

<style scoped>
.loading {
  text-align: center;
  margin-top: 2rem;
}
.reflection-page {
  max-width: 800px;
  margin: 2rem auto;
  font-family: sans-serif;
}
.dimension-block {
  margin-bottom: 1.5rem;
}
.btn-next {
  display: block;
  margin: 2rem auto;
}
</style>



