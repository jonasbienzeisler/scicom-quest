<template>
  <div class="yesno-question">
    <p>{{ question.text[locale] }}</p>
    <div class="radio-group">
      <label>
        <input
          type="radio"
          :name="question.id"
          :value="true"
          :checked="modelValue === true"
          @change="updateValue(true)"
        />
        {{ t('yes') }}
      </label>
      <label>
        <input
          type="radio"
          :name="question.id"
          :value="false"
          :checked="modelValue === false"
          @change="updateValue(false)"
        />
        {{ t('no') }}
      </label>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable vue/no-setup-props-destructure, no-undef */
import { useI18n } from 'vue-i18n';

const { question, modelValue } = defineProps({
  question:   { type: Object, required: true },
  modelValue: { type: Boolean, default: null }
});
const emit = defineEmits(['update:modelValue']);
const { locale, t } = useI18n();

function updateValue(val) {
  emit('update:modelValue', val);
}
</script>

<style scoped>
.yesno-question {
  margin-bottom: 1.5rem;
}
.radio-group {
  display: flex;
  gap: 1rem;
}
.radio-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.radio-group input {
  margin-right: 0.3rem;
}
</style>


