<template>
  <div class="language-selector">
    <button
      :class="{ active: locale === 'de' }"
      @click="setLocale('de')"
    >
      Deutsch
    </button>
    <button
      :class="{ active: locale === 'en' }"
      @click="setLocale('en')"
    >
      English
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

function setLocale(lang) {
  locale.value = lang;
}
</script>

<style scoped>
.language-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.language-selector button {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 3px;
}
.language-selector button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
</style>

