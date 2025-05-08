import { defineStore } from 'pinia';

export const useAnswerStore = defineStore('answers', {
  state: () => ({
    answers: {
      likert: {},
      yesno:  {},
      demo:   {}
    }
  })
});
