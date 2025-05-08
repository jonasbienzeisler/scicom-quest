<template>
  <p>{{ props.text[locale] }}</p>
</template>

<script setup>
/* eslint-disable no-undef */
import { useI18n } from 'vue-i18n';

const props = defineProps({
  text: { type: Object, required: true }
});
const { locale } = useI18n();
</script>

<style scoped>
/* optional styling */
</style>





