import { createRouter, createWebHistory } from 'vue-router'

// Import your Home page component
import Home from '../components/LandingPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
