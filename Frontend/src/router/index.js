import { createRouter, createWebHistory } from 'vue-router'

// Import your Home page component
import Home from '../components/Home.vue'
import Asanas from '@/components/Asanas.vue'
import AsanaDetails from '@/components/AsanaDetails.vue'
import EventPage from '@/components/EventPage.vue'
import Communities from '@/components/communities.vue'
import PractitionerCard from '@/components/PractitionerCard.vue'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import LandingPage from '@/components/LandingPage.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: LandingPage
  },
  {
    path: '/Home',
    name: '',
    component: Home
  },
  {
    path: '/login',
    name: '',
    component: Login
  },
  {
    path: '/signup',
    name: '',
    component: SignUp
  },
  {
    path: '/communities',
    name: '',
    component: Communities
  },
  {
    path: '/events',
    name: '',
    component: EventPage
  },
  {
    path:`/asanas/:id`,
    component:AsanaDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
