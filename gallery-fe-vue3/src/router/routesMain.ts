import { RouteRecordRaw } from 'vue-router'
import ContainerLayout from '../pages/_container.vue'

const children: Array<RouteRecordRaw> = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  }
]

export default {
  path: '/',
  component: ContainerLayout,
  children: children
}
