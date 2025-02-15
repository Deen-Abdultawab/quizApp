import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/mc-quiz',
        name: 'multiChoice',
        component: () => import('../views/Quiz Pages/MultiChoiceQuiz.vue')
      },
      {
        path: '/dad-quiz',
        name: 'dragAndDrop',
        component: () => import('../views/Quiz Pages/DragAndDropQuiz.vue')
      },
  ]
});

export default router;
