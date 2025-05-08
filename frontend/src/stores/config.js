import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => ({
    questions: null,
    reflections: null,
    privacy: null,
    loaded: false
  }),
  actions: {
    async fetchConfig() {
      const res = await fetch('/api/config');
      const json = await res.json();
      this.questions   = json.questions;
      this.reflections = json.reflections;
      this.privacy     = json.privacy;
      this.loaded = true;
    }
  }
});
