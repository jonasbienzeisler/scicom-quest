import { createRouter, createWebHistory } from 'vue-router';
import HomePage          from '../pages/HomePage.vue';
import LikertPage        from '../pages/LikertPage.vue';
import YesNoPage         from '../pages/YesNoPage.vue';
import DemographicsPage  from '../pages/DemographicsPage.vue';
import ReflectionPage    from '../pages/ReflectionPage.vue';
import VisualizationPage from '../pages/VisualizationPage.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',              component: HomePage },
    { path: '/likert',        component: LikertPage },
    { path: '/yesno',         component: YesNoPage },
    { path: '/demographics',  component: DemographicsPage },
    { path: '/reflection',    component: ReflectionPage },
    { path: '/visualization', component: VisualizationPage },
  ]
});


