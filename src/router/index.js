import { createRouter, createWebHashHistory } from 'vue-router'
import YeniEzber from '../views/YeniEzber.vue'
import Ezber from '../views/Ezber.vue'

const routes = [
  {
    path: '/',
    name: 'YeniEzber',
    component: YeniEzber
  },
  {
    path: '/ezber',
    name: 'Ezber',
    component: Ezber
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
