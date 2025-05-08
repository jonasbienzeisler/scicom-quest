<!-- src/components/LanguageToggle.vue -->
<template>
  <button class="lang-toggle" @click="toggle">
    {{ locale === 'de' ? t('switchToEnglish') : t('switchToGerman') }}
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

// grab both the reactive locale and the translation fn
const { locale, t } = useI18n();

function toggle() {
  locale.value = locale.value === 'de' ? 'en' : 'de';
}
</script>

<style scoped>
.lang-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
}
</style>

