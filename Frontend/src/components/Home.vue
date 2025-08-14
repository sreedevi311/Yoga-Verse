<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
    <!-- Background Image Overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: 'url(https://images.unsplash.com/photo-1554311888-2d7e3f61c0c5?auto=format&fit=crop&w=1350&q=80)',
        filter: 'blur(1px) brightness(0.8) saturate(0.3) contrast(1.1)',
      }"
    ></div>

    <div class="absolute inset-0 bg-gray-400/30 backdrop-blur-[0.5px]"></div>

    <!-- Header -->
    <header class="relative z-50 bg-gray-100/60 backdrop-blur-lg border-b border-gray-300/30 sticky top-0">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left: Title and Navigation -->
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold text-gray-800 mb-1">YogaVerse</h1>
            <nav class="flex space-x-6">
              <a href="#" class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
                AI Practice
              </a>
              <a href="#" class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
                Trainers
              </a>
              <router-link 
                to="/communities" 
                class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Community
              </router-link>

              <router-link 
                to="/events" 
                class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Events
              </router-link>
            </nav>
          </div>

          <div class="flex items-center justify-center flex-1">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search asanas..."
                v-model="searchQuery"
                class="pl-10 w-96 h-10 px-3 py-2 bg-white/90 backdrop-blur-md border border-gray-300 rounded-md focus:border-gray-500 focus:ring-1 focus:ring-gray-400 text-gray-800 placeholder:text-gray-500"
              />
            </div>
          </div>

          <!-- Right: Location and Profile -->
          <div class="flex items-center space-x-2">
            <button
              @click="ui.showLocationModal = true"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 hover:bg-gray-200 bg-white/80 backdrop-blur-md hover:border-gray-400 rounded-md transition-colors"
            >
              <MapPin class="h-4 w-4 mr-2" />
              {{ selectedLocation }}
            </button>

            <button
              v-if="isLoggedIn"
              class="p-2 text-gray-700 hover:bg-gray-200 hover:text-gray-800 rounded-md transition-colors"
            >
              <User class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Location Modal -->
    <div v-if="ui.showLocationModal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 pointer-events-none">
      <div class="bg-cream-50 text-olive-400 w-full max-w-3xl rounded-xl p-6 relative pointer-events-auto">
        <button class="absolute top-4 right-4 text-olive-400 hover:text-olive-600" @click="ui.showLocationModal = false">
          X
        </button>

        <h2 class="text-2xl font-semibold text-center mb-6 text-olive-400">Select Your Location</h2>

        <!-- Search bar -->
        <input
          v-model="search"
          type="text"
          placeholder="Search for your city"
          class="w-full px-4 py-2 mb-4 rounded border border-olive-300 focus:outline-none focus:border-olive-500 text-olive-400 placeholder:text-olive-300"
        />

        <!-- Popular Cities -->
        <div class="grid md:grid-cols-4 gap-4">
          <div
  v-for="city in filteredCities"
  :key="city._id"
  @click="handleLocationSelect(city.name)"
  class="cursor-pointer p-3 rounded text-center border border-olive-300 bg-cream-50 text-olive-400 hover:bg-olive-500 hover:text-cream-50 active:bg-olive-500 active:text-cream-50 transition-all duration-300 !hover:bg-olive-500 !hover:text-cream-50 !active:bg-olive-500 !active:text-cream-50"
>
  {{ city.name }}
</div>
          <p v-if="!filteredCities.length" class="text-olive-400 text-center col-span-full">
            No cities found matching your search.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Banner -->
      <section class="mb-12">
        <div class="bg-white/70 backdrop-blur-lg border border-gray-200/30 shadow-lg rounded-lg">
          <div class="p-8">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Good Morning, Sarah 🌞</h2>
                <p class="text-lg text-gray-600 italic">
                  "The body benefits from movement, and the mind benefits from stillness."
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1554311888-2d7e3f61c0c5?auto=format&fit=crop&w=800&q=80"
                alt="Morning yoga"
                class="w-32 h-32 rounded-lg object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Asana of the Day -->
      <section class="mb-12">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Asana of the Day</h3>
        <div class="bg-gray-50/70 backdrop-blur-lg border border-gray-200/30 hover:bg-gray-100/70 transition-all shadow-lg rounded-lg">
          <div class="p-6 flex items-center space-x-6">
            <img
              src="https://images.unsplash.com/photo-1554311888-2d7e3f61c0c5?auto=format&fit=crop&w=800&q=80"
              alt="Vrikshasana"
              class="w-24 h-24 rounded-lg object-cover shadow-md"
            />
            <div class="flex-1">
              <h4 class="text-xl font-semibold text-gray-800 mb-2">Vrikshasana (Tree Pose)</h4>
              <p class="text-gray-600 mb-4">
                Improves balance, strengthens legs, and enhances focus and concentration.
              </p>
              <button class="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md shadow-md transition-colors">
                View Details
                <ChevronRight class="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Start Practice with AI -->
      <section class="mb-12">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">Start Practice with AI</h3>
        <div class="bg-gray-200/70 backdrop-blur-lg border border-gray-300/30 shadow-lg rounded-lg">
          <div class="p-6 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="bg-gray-600 p-3 rounded-full shadow-md">
                <Camera class="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-800">AI-Powered Posture Analysis</h4>
                <p class="text-gray-600">Get real-time feedback on your yoga poses</p>
              </div>
            </div>
            <button class="inline-flex items-center px-4 py-2 bg-gray-700 text-white hover:bg-gray-800 rounded-md shadow-md transition-colors">
              Begin Practice
              <ChevronRight class="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <!-- Nearby Events -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-800">Nearby Events</h3>
          <button class="inline-flex items-center px-3 py-2 border border-gray-300/50 text-gray-700 hover:bg-gray-100/70 bg-white/60 backdrop-blur-lg shadow-md hover:border-gray-400/50 rounded-md transition-colors">
            See All Events
            <ChevronRight class="ml-2 h-4 w-4" />
          </button>
        </div>
        <div class="flex space-x-6 overflow-x-auto pb-4">
          <div
            v-for="(event, index) in events"
            :key="index"
            class="min-w-[300px] bg-gray-100/70 backdrop-blur-lg border border-gray-200/30 hover:bg-gray-150/70 transition-all shadow-lg rounded-lg"
          >
            <div class="h-32 rounded-t-lg overflow-hidden">
              <img
                :src="`https://images.unsplash.com/photo-1554311888-2d7e3f61c0c5?auto=format&fit=crop&w=800&q=80&query=yoga event ${event.title.toLowerCase()}`"
                :alt="event.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h4 class="text-lg font-semibold text-gray-800 mb-2">{{ event.title }}</h4>
              <div class="text-gray-600 mb-4">
                <div class="flex items-center space-x-2 mb-1">
                  <Calendar class="h-4 w-4" />
                  <span>{{ event.date }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <MapPin class="h-4 w-4" />
                  <span>{{ event.location }}</span>
                </div>
              </div>
              <p class="text-sm text-gray-500 mb-3">with {{ event.instructor }}</p>
              <button class="w-full px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md shadow-md transition-colors">
                View
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Connect with Practitioners -->
      <section class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-800">Connect with Practitioners</h3>
          <button class="inline-flex items-center px-3 py-2 border border-gray-300/50 text-gray-700 hover:bg-gray-100/70 bg-white/60 backdrop-blur-lg shadow-md hover:border-gray-400/50 rounded-md transition-colors">
            Find More
            <ChevronRight class="ml-2 h-4 w-4" />
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(practitioner, index) in practitioners"
            :key="index"
            class="bg-white/70 backdrop-blur-lg border border-gray-200/30 hover:bg-gray-50/70 transition-all shadow-lg rounded-lg"
          >
            <div class="p-6">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-gray-200/80 rounded-full flex items-center justify-center shadow-md">
                  <User class="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">{{ practitioner.name }}</h4>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200/80 text-gray-700 border border-gray-300/50">
                    {{ practitioner.level }}
                  </span>
                </div>
              </div>
              <p class="text-gray-600 mb-2">Specialty: {{ practitioner.specialty }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <Star class="h-4 w-4 fill-current text-gray-400" />
                  <span>{{ practitioner.rating }}</span>
                </div>
                <span>{{ practitioner.sessions }} sessions</span>
              </div>
              <button class="w-full mt-4 px-3 py-2 border border-gray-300/50 text-gray-700 hover:bg-gray-100/70 bg-white/60 backdrop-blur-lg shadow-md hover:border-gray-400/50 rounded-md transition-colors">
                Connect
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 bg-white/70 backdrop-blur-lg border-t border-gray-200/30 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">YogaVerse</h3>
            <p class="text-gray-600 mb-4 max-w-md">
              Discover your inner universe through AI-powered yoga practice. Connect with practitioners, join events,
              and transform your wellness journey.
            </p>
            <div class="flex space-x-4">
              <button class="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors">
                <Facebook class="h-5 w-5" />
              </button>
              <button class="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors">
                <Instagram class="h-5 w-5" />
              </button>
              <button class="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors">
                <Twitter class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-gray-800 transition-colors">AI Practice</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800 transition-colors">Find Trainers</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800 transition-colors">Events</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800 transition-colors">Community</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Contact</h4>
            <ul class="space-y-2">
              <li class="flex items-center space-x-2 text-gray-600">
                <Mail class="h-4 w-4" />
                <span>hello@yogaverse.com</span>
              </li>
              <li class="flex items-center space-x-2 text-gray-600">
                <Phone class="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li class="flex items-center space-x-2 text-gray-600">
                <MapPin class="h-4 w-4" />
                <span>New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200/50 mt-8 pt-8 text-center">
          <p class="text-gray-500">© 2024 YogaVerse. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed ,onMounted,watch} from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { usePreferencesStore } from '@/stores/preferences'
import { Search, MapPin, User, ChevronRight, Camera, Calendar, Star, Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const ui = useUiStore()
const prefs = usePreferencesStore()

const searchQuery = ref('')
const selectedLocation = ref(localStorage.getItem('selectedLocation') || 'New York, NY')

// Save to localStorage whenever it changes
watch(selectedLocation, (newVal) => {
  localStorage.setItem('selectedLocation', newVal)
})
const search = ref('')
const cities = ref([
  { _id: '1', name: 'Nidadavolu' },
  { _id: '2', name: 'Bhimavaram' },
  { _id: '3', name: 'Akiveedu' },
  { _id: '4', name: 'Narsapur' },
  { _id: '5', name: 'Polavaram' },
  { _id: '6', name: 'Tadepalligudem' },
  { _id: '7', name: 'Jangareddygudem' },
  { _id: '8', name: 'Eluru' },
  { _id: '9', name: 'Palakollu' },
  { _id: '10', name: 'Tanuku' }
])

const filteredCities = computed(() =>
  cities.value.filter(city =>
    city.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const isLoggedIn = computed(() => !!authStore.user)

const events = ref([
  {
    title: 'Sunrise Yoga Session',
    date: 'Oct 15, 2024',
    location: 'Central Park, NY',
    instructor: 'Lala Sundara'
  },
  {
    title: 'Vinyasa Flow Workshop',
    date: 'Oct 20, 2024',
    location: 'Brooklyn Studio, NY',
    instructor: 'Ethan Harmony'
  },
  {
    title: 'Meditation Retreat',
    date: 'Nov 5, 2024',
    location: 'Hudson Valley, NY',
    instructor: 'Sophie Light'
  }
])

const practitioners = ref([
  {
    name: 'Lala Sundara',
    level: 'Master',
    specialty: 'Hatha Yoga',
    rating: '4.8',
    sessions: 120
  },
  {
    name: 'Ethan Harmony',
    level: 'Expert',
    specialty: 'Vinyasa Flow',
    rating: '4.7',
    sessions: 95
  },
  {
    name: 'Sophie Light',
    level: 'Advanced',
    specialty: 'Meditation',
    rating: '4.9',
    sessions: 80
  }
])

function handleLocationSelect(city) {
  console.log('Selected city:', city) // Debug log
  if (!authStore.user || !authStore.user._id) {
    console.log('User not logged in, redirecting to /login') // Debug log
    router.push('/login')
    return
  }
  prefs.setCity(city)
  selectedLocation.value = city
  authStore.updatePreferences(city)
  ui.showLocationModal = false
  ui.showInterestModal = true
}

onMounted(async () => {
  await authStore.fetchProfile()
  if (authStore.user?.city) {
    prefs.setCity(authStore.user.city)
  }
})
</script>

<style scoped>
.bg-cream-50 {
  background-color: #FFF8E7;
}
.bg-olive-600 {
  background-color: #4B5E40;
}
.bg-olive-500 {
  background-color: #5A6F4A;
}
.text-olive-400 {
  color: #6B7A56;
}
.text-olive-600 {
  color: #4B5E40;
}
.border-olive-300 {
  border-color: #A8B99A;
}
.text-cream-50 {
  color: #FFF8E7;
}
</style>