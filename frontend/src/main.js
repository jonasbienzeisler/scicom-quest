// src/main.js
import { createApp }   from 'vue';
import { createPinia } from 'pinia';
import { createI18n }  from 'vue-i18n';
import App             from './App.vue';
import router          from './router';

const messages = {
  de: {
    loading:            'Laden…',
    heading:            'Datenschutzerklärung',
    startQuestionnaire: 'Fragebogen starten',
    switchToEnglish:    'Switch to English',
    switchToGerman:     'Wechsel zu Deutsch',

    likertLeft:         'Stimme überhaupt nicht zu',
    likertRight:        'Stimme voll und ganz zu',

    stronglyDisagree:   'Stimme überhaupt nicht zu',
    disagree:           'Stimme eher nicht zu',
    neutral:            'Neutral',
    agree:              'Stimme eher zu',
    stronglyAgree:      'Stimme voll und ganz zu',

    previous:           'Zurück',
    next:               'Weiter',

    likertQuestions:       'Opinio',
    proceedToYesNo:        'Zu Ja oder Nein',
    yesNoQuestions:        'Ja oder Nein? Bitte auswählen',
    proceedToDemographics: 'Zur Demografie',
    demographics:          'Demografie',
    proceedToReflection:   'Zur Reflexion',
    reflection:            'Reflexion',
    viewVisualization:     'Zur Visualisierung',
    visualization:         'Visualisierung',
    downloadCsv:           'Als CSV herunterladen',
    pleaseSelect:          'Bitte wählen',

    politics:   'Politik',
    neutrality: 'Neutralität',
    authority:  'Autorität',
    yes:        'Ja',
    no:         'Nein',

    // ← new key for labeling "your" point
    you:        'Du'
  },
  en: {
    loading:            'Loading…',
    heading:            'Privacy Statement',
    startQuestionnaire: 'Start questionnaire',
    switchToEnglish:    'Switch to English',
    switchToGerman:     'Switch to German',

    likertLeft:         'Strongly disagree',
    likertRight:        'Strongly agree',

    stronglyDisagree:   'Strongly disagree',
    disagree:           'Disagree',
    neutral:            'Neutral',
    agree:              'Agree',
    stronglyAgree:      'Strongly agree',

    previous:           'Previous',
    next:               'Next',

    likertQuestions:       'Opinion',
    proceedToYesNo:        'to Yes or No',
    yesNoQuestions:        'Yes or No? Please select',
    proceedToDemographics: 'to Demographics',
    demographics:          'Demographics',
    proceedToReflection:   'to Reflection',
    reflection:            'Reflection',
    viewVisualization:     'Visualization',
    visualization:         'Visualization',
    downloadCsv:           'Download CSV',
    pleaseSelect:          'Please select',

    politics:   'Politics',
    neutrality: 'Neutrality',
    authority:  'Authority',
    yes:        'Yes',
    no:         'No',

    // ← new key for labeling "your" point
    you:        'You'
  }
};

const i18n = createI18n({
  legacy:          false,
  globalInjection: true,
  locale:          'de',
  fallbackLocale:  'en',
  messages
});

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .mount('#app');
