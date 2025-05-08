<template>
  <div v-if="!configStore.loaded" class="loading">
    {{ $t('loading') }}…
  </div>

  <div v-else class="demographics-page">
    <!-- overall survey page 5 of 5 -->
    <ProgressBar :current="page" :total="totalPages" />

    <h2>{{ $t('demographics') }}</h2>

    <DemographicsForm
      :questions="demographicsQuestions"
      v-model="answerStore.answers.demo"
    />

    <div class="navigation-buttons">
      <button @click="prev">
        {{ $t('previous') }}
      </button>
      <button @click="next">
        {{ $t('proceedToReflection') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed }       from 'vue';
import { useRouter }      from 'vue-router';
import { useConfigStore } from '@/stores/config';
import { useAnswerStore } from '@/stores/answers';
import ProgressBar        from '@/components/ProgressBar.vue';
import DemographicsForm   from '@/components/DemographicsForm.vue';

const router       = useRouter();
const configStore  = useConfigStore();
const answerStore  = useAnswerStore();

// total pages = 3 likert + 1 yes/no + 1 demo
const totalPages   = 5;
const page         = 5;

const demographicsQuestions = computed(() =>
  Array.isArray(configStore.questions?.demographics)
    ? configStore.questions.demographics
    : []
);

// initialize demo object
if (!answerStore.answers.demo) {
  answerStore.answers.demo = {};
}

function next() {
  router.push('/reflection');
}
function prev() {
  router.back();
}
</script>

<style scoped>
.loading {
  text-align: center;
  margin-top: 2rem;
}
.demographics-page {
  max-width: 800px;
  margin: 2rem auto;
  font-family: sans-serif;
}
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style>
