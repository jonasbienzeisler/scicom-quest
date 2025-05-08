<template>
  <div class="demographics-form">
    <div
      v-for="q in questions"
      :key="q.id"
      class="form-group"
    >
      <label :for="q.id">{{ q.label[locale] }}</label>

      <!-- number input -->
      <input
        v-if="q.type === 'number'"
        type="number"
        :id="q.id"
        v-model.number="localValues[q.id]"
      />

      <!-- select dropdown -->
      <select
        v-else-if="q.type === 'select'"
        :id="q.id"
        v-model="localValues[q.id]"
      >
        <option disabled value="">
          {{ t('pleaseSelect') }}
        </option>
        <option
          v-for="opt in q.options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label[locale] }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable vue/no-setup-props-destructure, no-undef */
import { reactive, watch } from 'vue';
import { useI18n }         from 'vue-i18n';

// props for questions array and the v-model data
const props = defineProps({
  questions:  { type: Array, required: true },
  modelValue: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['update:modelValue']);

const { locale, t } = useI18n();

// make a local reactive copy of modelValue
const localValues = reactive({ ...props.modelValue });

// whenever localValues change, emit them back to the parent
watch(
  () => localValues,
  (newVal) => {
    emit('update:modelValue', { ...newVal });
  },
  { deep: true }
);
</script>

<style scoped>
.demographics-form {
  max-width: 600px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input[type="number"],
select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>


