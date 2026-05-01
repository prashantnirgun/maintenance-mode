import { createRouter, createWebHistory } from 'vue-router'
import PublicStatusPage from '../views/PublicStatusPage.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PublicStatusPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard
    }
  ]
})

export default router
