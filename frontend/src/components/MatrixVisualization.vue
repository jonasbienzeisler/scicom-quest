<!-- src/components/MatrixVisualization.vue -->
<template>
  <div ref="chart" class="matrix-viz"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import Plotly                            from 'plotly.js-dist-min';
import { useConfigStore }               from '@/stores/config';
import { useAnswerStore }               from '@/stores/answers';
import { useI18n }                      from 'vue-i18n';

const chart       = ref(null);
const configStore = useConfigStore();
const answerStore = useAnswerStore();
const { t }       = useI18n();

// color palette per discipline
const disciplineColors = {
  humanities:       '#6baed6',
  social_sciences:  '#74c476',
  natural_sciences: '#fd8d3c',
  engineering:      '#9e9ac8',
  other:            '#bbbbbb'
};

// load the “last complete” history from the server
const history = ref([]);
onMounted(() => {
  fetch('/api/results')
    .then(r => r.json())
    .then(data => { history.value = Array.isArray(data) ? data : []; })
    .catch(() => { history.value = []; });
});

// helper: compute (politics, neutrality, authority) means
function meanOf(answers) {
  return ['politics','neutrality','authority'].map(dim => {
    const qs   = (configStore.questions.likert || [])
                   .filter(q => q.dimension === dim);
    const vals = qs.map(q => answers[q.id]).filter(v => typeof v === 'number');
    return vals.length
      ? vals.reduce((a,b) => a + b, 0) / vals.length
      : 0;
  });
}

watchEffect(() => {
  if (!chart.value || !configStore.loaded) return;

  // your own point
  const [cx, cy, cz] = meanOf(answerStore.answers.likert);

  // group past participants by discipline
  const groups = {};
  for (const rec of history.value) {
    if (!rec.answers?.likert) continue;
    const field = rec.demo.field || 'other';
    const [x,y,z] = meanOf(rec.answers.likert);
    groups[field] ??= { xs: [], ys: [], zs: [] };
    groups[field].xs.push(x);
    groups[field].ys.push(y);
    groups[field].zs.push(z);
  }

  // one trace per discipline
  const histTraces = Object.entries(groups).map(
    ([field, { xs, ys, zs }]) => ({
      x: xs, y: ys, z: zs,
      mode:     'markers',
      type:     'scatter3d',
      marker:   {
        size:    8,
        color:   disciplineColors[field] || disciplineColors.other,
        symbol:  'circle',
        opacity: 0.6
      },
      name:       t(field),
      showlegend: true
    })
  );

  // “you” as a bigger red circle
  const youTrace = {
    x: [cx], y: [cy], z: [cz],
    mode:     'markers',
    type:     'scatter3d',
    marker:   {
      size:    16,
      color:   '#e91e63',
      symbol:  'circle'
    },
    name:     t('you')
  };

  Plotly.react(
    chart.value,
    [...histTraces, youTrace],
    {
      width:  chart.value.clientWidth,
      height: 600,
      scene: {
        aspectmode: 'cube',
        xaxis: {
          title:  { text: t('politics') },
          range:  [1,5], tickmode: 'linear', dtick: 1
        },
        yaxis: {
          title:  { text: t('neutrality') },
          range:  [1,5], tickmode: 'linear', dtick: 1
        },
        zaxis: {
          title:  { text: t('authority') },
          range:  [1,5], tickmode: 'linear', dtick: 1
        },
        camera: { eye: { x:1.5, y:1.5, z:1.5 } }
      },
      margin:        { l:50, r:50, b:50, t:50 },
      paper_bgcolor: 'white',
      plot_bgcolor:  'white',
      legend: {
        orientation: 'h',
        x:           0.5,
        xanchor:     'center',
        y:           1.2,
        yanchor:     'bottom'
      }
    }
  );
});
</script>

<style scoped>
.matrix-viz {
  width: 75vw;   /* 75% of viewport width */
  height: 600px;
  margin: 0 auto;
}
</style>








