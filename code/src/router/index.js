// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import Create from '../components/Create.vue';
import Show from '../components/Show.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
      path: '/',
      redirect: '/home'
  },
  {
      path: '/create',
      name: 'create',
      component: Create
  },
  {
      path: '/show/:id',
      name: 'show',
      component: Show
  },
  {
    path: '/show',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
