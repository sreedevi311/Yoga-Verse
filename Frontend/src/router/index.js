import { createRouter, createWebHistory } from 'vue-router'

// Import your Home page component
import LandingPage from '../components/LandingPage.vue'
import Signup from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Trainers from '../components/Trainers.vue'
import EventPage from '../components/EventPage.vue'
import Aipractice from '../components/AiPractice.vue'

import Profile from '../components/Profile.vue'
import Communities from '../components/communities.vue'
import AsanaDetails from '@/components/AsanaDetails.vue'
import Asanas from '../components/Asanas.vue'
const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component:Signup
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/home',
    name: 'Home',
    component:Home
  },
   {
    path:'/trainers',
    name:'Trainers',
    component:Trainers
  },

  {
    path:'/profile',
    name: 'Profile',
    component:Profile
  },
  {
  path:'/eventpage',
  name:'EventPage',
  component:EventPage
},

{
    path:'/ai-practice',
    name: 'Aipractice',
    component:Aipractice
},
{
    path: '/communities',
    name: '',
    component: Communities
  },
  {
path:'/asanas',
name:'',
component:Asanas
  },
  {
    path:'/asanas/:id',
    component:AsanaDetails
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router