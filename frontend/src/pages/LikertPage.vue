<!-- src/pages/LikertPage.vue -->
<template>
  <div v-if="!configStore.loaded" class="loading">
    {{ t('loading') }}…
  </div>

  <div v-else class="likert-page">
    <!-- single toggle button -->
    <LanguageToggle class="lang-toggle" />

    <!-- progress bar -->
    <ProgressBar :current="page" :total="totalPages" />

    <h2>
      {{ t('likertQuestions') }} — {{ t(currentDimension) }}
    </h2>

    <div
      v-for="q in currentQuestions"
      :key="q.id"
      class="question-wrapper"
    >
      <LikertQuestion
        :question="q"
        v-model="answerStore.answers.likert[q.id]"
      />
    </div>

    <div class="navigation-buttons">
      <button @click="prev" :disabled="page === 1">
        {{ t('previous') }}
      </button>
      <button @click="next">
        {{ page < numSectionPages ? t('next') : t('proceedToYesNo') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter }      from 'vue-router';
import { useConfigStore } from '@/stores/config';
import { useAnswerStore } from '@/stores/answers';
import ProgressBar        from '@/components/ProgressBar.vue';
import LikertQuestion     from '@/components/LikertQuestion.vue';
import LanguageToggle     from '@/components/LanguageToggle.vue';
import { useI18n }        from 'vue-i18n';

const { t }        = useI18n();
const router       = useRouter();
const configStore  = useConfigStore();
const answerStore  = useAnswerStore();

// ensure likert answers obj exists
if (!answerStore.answers.likert) {
  answerStore.answers.likert = {};
}

// set a default “4” (middle) once config is loaded
watchEffect(() => {
  if (!configStore.loaded) return;
  for (const q of configStore.questions.likert || []) {
    if (answerStore.answers.likert[q.id] == null) {
      answerStore.answers.likert[q.id] = 4;
    }
  }
});

// your three dimensions ⇒ 3 pages
const dimensions      = ['politics', 'neutrality', 'authority'];
const numSectionPages = dimensions.length;

// total pages = 3 likert + 1 yes/no + 1 demo
const totalPages = numSectionPages + 2;  // =5

// current likert page
const page = ref(1);

const currentDimension = computed(() =>
  dimensions[page.value - 1]
);

const currentQuestions = computed(() =>
  (configStore.questions?.likert || [])
    .filter(q => q.dimension === currentDimension.value)
);

function next() {
  if (page.value < numSectionPages) {
    page.value++;
  } else {
    router.push('/yesno');
  }
}

function prev() {
  if (page.value > 1) {
    page.value--;
  }
}
</script>

<style scoped>
.loading {
  text-align: center;
  margin-top: 2rem;
}

.likert-page {
  position: relative;
  padding-top: 3rem;       /* make room for the toggle */
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


