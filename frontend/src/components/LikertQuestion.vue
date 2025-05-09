<template>
  <div class="likert-question">
    <!-- Question text -->
    <p>{{ props.question.text[locale] }}</p>

    <!-- slider with just two endpoint labels -->
    <div class="slider-with-labels">
      <span class="slider-end">{{ t('stronglyDisagree') }}</span>

      <!-- range with datalist to show 5 ticks -->
      <input
        class="slider"
        type="range"
        min="1"
        max="5"
        step="1"
        list="tickmarks"
        :value="props.modelValue"
        @input="onInput"
      />
      <datalist id="tickmarks">
        <option v-for="n in 5" :key="n" :value="n" />
      </datalist>

      <span class="slider-end">{{ t('stronglyAgree') }}</span>
    </div>

    <!-- current value readout -->
    <div class="current-value">
      {{ props.modelValue }} — {{ labelFor(props.modelValue) }}
    </div>
  </div>
</template>

<script setup>
/* eslint-disable vue/no-setup-props-destructure, no-undef */
import { useI18n } from 'vue-i18n'

// defineProps / defineEmits compiler macros
const props = defineProps({
  question:   { type: Object, required: true },
  modelValue: { type: Number, required: true }
})
const emit = defineEmits(['update:modelValue'])

const { locale, t } = useI18n()

// mapping 1–5 ⇒ translation keys
const keyFor = {
  1: 'stronglyDisagree',
  2: 'disagree',
  3: 'neutral',
  4: 'agree',
  5: 'stronglyAgree'
}

function onInput(e) {
  emit('update:modelValue', Number(e.target.value))
}
function labelFor(val) {
  return t(keyFor[val] || 'neutral')
}
</script>

<style scoped>
.likert-question {
  margin-bottom: 1.5rem;
  font-family: sans-serif;
}

.slider-with-labels {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

/* Makes the slider track stretch */
.slider {
  flex: 1;
}

/* Browser-rendered tick marks */
.slider::-webkit-slider-runnable-track {
  background-color: #ddd; /* Example customization */
}

/* Endpoint labels */
.slider-end {
  font-size: 0.9rem;
  white-space: nowrap;
  color: #555;
}

.current-value {
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>

