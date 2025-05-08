<template>
  <div v-if="!configStore.loaded" class="loading">
    {{ $t('loading') }}…
  </div>

  <div v-else class="yesno-page">
    <!-- overall page 4 of 5 -->
    <ProgressBar :current="page" :total="totalPages" />

    <h2>{{ $t('yesNoQuestions') }}</h2>

    <div
      v-for="q in yesnoQuestions"
      :key="q.id"
      class="question-wrapper"
    >
      <YesNoQuestion
        :question="q"
        v-model="answerStore.answers.yesno[q.id]"
      />
    </div>

    <div class="navigation-buttons">
      <button @click="prev">
        {{ $t('previous') }}
      </button>
      <button @click="next">
        {{ $t('proceedToDemographics') }}
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
import YesNoQuestion      from '@/components/YesNoQuestion.vue';

const router       = useRouter();
const configStore  = useConfigStore();
const answerStore  = useAnswerStore();

// init yesno object
if (!answerStore.answers.yesno) {
  answerStore.answers.yesno = {};
}

// overall survey pages: 3 likert + 1 yes/no + 1 demo = 5
const totalPages     = 5;
const page           = 4;

const yesnoQuestions = computed(() =>
  Array.isArray(configStore.questions?.yesno)
    ? configStore.questions.yesno
    : []
);

function next() {
  router.push('/demographics');
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
.yesno-page {
  max-width: 800px;
  margin: 2rem auto;
  font-family: sans-serif;
}
.question-wrapper {
  margin-bottom: 1.5rem;
}
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style>

