import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/home/home-page.vue';
import QuestionPage from '../views/question-picking/question-page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/questions'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/questions',
    name: 'Questions',
    component: QuestionPage
  },
]
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
