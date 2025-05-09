<!-- src/pages/YesNoPage.vue -->
<template>
  <div v-if="!configStore.loaded" class="loading">
    {{ t('loading') }}…
  </div>

  <div v-else class="yesno-page">
    <!-- language toggle pill -->
    <LanguageToggle class="lang-toggle" />

    <!-- overall page 4 of 5 -->
    <ProgressBar :current="page" :total="totalPages" />

    <h2>{{ t('yesNoQuestions') }}</h2>

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
        {{ t('previous') }}
      </button>
      <button @click="next">
        {{ t('proceedToDemographics') }}
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
import LanguageToggle     from '@/components/LanguageToggle.vue';
import { useI18n }        from 'vue-i18n';

const { t }        = useI18n();
const router       = useRouter();
const configStore  = useConfigStore();
const answerStore  = useAnswerStore();

// init yesno object
if (!answerStore.answers.yesno) {
  answerStore.answers.yesno = {};
}

// overall survey pages: 3 likert + 1 yes/no + 1 demo = 5
const totalPages = 5;
const page       = 4;

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
  position: relative;   /* for the toggle */
  padding-top: 3rem;    /* space for pill */
  max-width: 800px;
  margin: 2rem auto;
  font-family: sans-serif;
}

.lang-toggle {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
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
