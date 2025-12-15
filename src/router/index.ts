import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/questions'
  },
  {
    path: '/home',
    name: 'Home',
    component: import('../views/home/home-page.vue')
  },
  {
    path: '/questions',
    name: 'Questions',
    component: import('../views/question-picking/question-page.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
