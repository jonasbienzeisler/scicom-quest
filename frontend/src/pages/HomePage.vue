<template>
  <div v-if="!configStore.loaded" class="loading">
    {{ $t('loading') }}
  </div>
  <div v-else class="privacy-only">
    <h1>{{ $t('heading') }}</h1>
    <p>{{ configStore.privacy[locale] }}</p>

    <button @click="start">
      {{ $t('startQuestionnaire') }}
    </button>
    <button @click="toggleLang">
      {{ locale === 'de' ? $t('switchToEnglish') : $t('switchToGerman') }}
    </button>
  </div>
</template>

<script setup>
import { onMounted }     from 'vue';
import { useI18n }       from 'vue-i18n';
import { useRouter }     from 'vue-router';
import { useConfigStore }from '@/stores/config';

const { locale }   = useI18n();
const configStore = useConfigStore();
const router      = useRouter();

onMounted(() => {
  configStore.fetchConfig();
});
function start()       { router.push('/likert'); }
function toggleLang()  { locale.value = locale.value === 'de' ? 'en' : 'de'; }
</script>

<style scoped>
.loading { text-align: center; margin-top: 2rem; }
.privacy-only { max-width: 600px; margin: 2rem auto; text-align: center; }
.privacy-only button { margin: 0.5rem; }
</style>



