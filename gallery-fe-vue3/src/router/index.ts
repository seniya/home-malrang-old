import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routesMain from './routesMain'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  routesMain,
  {
    path: '/:pathMatch(.*)*',
    name: 'e404',
    component: () => import('../pages/e404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
