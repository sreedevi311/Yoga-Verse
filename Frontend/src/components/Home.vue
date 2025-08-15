<template>
  <div class="min-h-screen bg-gradient-to-b from-[#FAF9F6] to-white relative text-gray-800">
    <!-- Subtle Background Texture/Image -->
    <div
      class="pointer-events-none absolute inset-0 opacity-20"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(2px) saturate(0.8)'
      }"
    ></div>

    <!-- HEADER -->
    <header class="relative z-40 sticky top-0">
  <div class="backdrop-blur-xl bg-white/70 border-b border-gray-200/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between ml-0">
      
      <!-- Left: Logo + Nav -->
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-2">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">Y</span>
          <h1 class="text-xl font-semibold tracking-tight">YogaVerse</h1>
        </div>
        <nav class="hidden md:flex items-center gap-6 text-sm">
          <router-link 
            to="/home" 
            class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Home
          </router-link>
          <router-link 
            to="/ai-practice" 
            class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            AI Practice
          </router-link>
          <router-link 
            to="/trainers" 
            class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Trainers
          </router-link>
          <router-link 
            to="/asanas" 
            class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Asanas
          </router-link>
          <router-link 
            to="/communities" 
            class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Community
          </router-link>
          <router-link 
            to="/eventpage" 
            class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Events
          </router-link>
        </nav>
      </div>

      <!-- Center: Search -->
      <div class="hidden lg:flex flex-1 justify-center">
        <div class="relative w-full max-w-md">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search asanas, trainers, or events..."
            class="w-full h-10 pl-10 pr-3 rounded-xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600/40 placeholder:text-gray-400"
          />
        </div>
      </div>

      <!-- Right: Location + Profile -->
      <div class="flex items-center gap-2">
        <button
          @click="ui.showLocationModal = true"
          class="inline-flex items-center gap-2 px-3 h-10 rounded-xl border border-gray-200 bg-white/80 hover:bg-white transition"
        >
          <MapPin class="h-4 w-4" />
          <span class="max-w-[120px] truncate">{{ selectedLocation }}</span>
        </button>

        <button
          v-if="isLoggedIn"
          class="p-2 rounded-xl hover:bg-white border border-gray-200 bg-white/70 transition"
          title="Profile"
          @click="openProfilePage"
        >
          <User class="h-5 w-5" />
        </button>
      </div>

    </div>
  </div>

  <!-- Mobile Search -->
  <div class="lg:hidden border-b border-gray-200/70 bg-white/70 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search asanas, trainers, or events..."
          class="w-full h-10 pl-10 pr-3 rounded-xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600/40 placeholder:text-gray-400"
        />
      </div>
    </div>
  </div>
</header>


    <!-- LOCATION MODAL -->
    <div
      v-if="ui.showLocationModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div class="w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-gray-200">
        <div class="p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h2 class="text-xl font-semibold">Select Your Location</h2>
            <p class="text-sm text-gray-500 mt-1">Personalize events and trainer suggestions near you.</p>
          </div>
          <button @click="ui.showLocationModal = false" class="h-9 w-9 grid place-items-center rounded-xl border border-gray-200 hover:bg-gray-50">✕</button>
        </div>

        <div class="p-6">
          <!-- Search bar -->
          <div class="relative mb-4">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Search for your city"
              class="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600/40"
            />
          </div>

          <!-- Popular Cities -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <button
              v-for="city in filteredCities"
              :key="city._id"
              @click="handleLocationSelect(city.name)"
              class="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:border-emerald-600/50 hover:bg-emerald-50 text-sm transition"
            >
              {{ city.name }}
            </button>
            <p v-if="!filteredCities.length" class="col-span-full text-center text-gray-500 py-6">
              No cities found matching your search.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Level Selector Modal -->
<div
  v-if="ui.showLevelModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
>
  <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200 flex items-start justify-between">
      <div>
        <h2 class="text-xl font-semibold">Select Your Level</h2>
        <p class="text-sm text-gray-500 mt-1">Choose your yoga experience level.</p>
      </div>
      <button
        @click="ui.showLevelModal = false"
        class="h-9 w-9 grid place-items-center rounded-xl border border-gray-200 hover:bg-gray-50"
      >
        ✕
      </button>
    </div>

    <!-- Options -->
    <div class="p-6">
      <div class="grid grid-cols-1 gap-3">
        <button
          v-for="level in levels"
          :key="level"
          @click="handleLevelSelect(level)"
          class="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:border-emerald-600/50 hover:bg-emerald-50 text-sm transition"
        >
          {{ level }}
        </button>
      </div>
    </div>
  </div>
</div>

    <!-- MAIN -->
    <main class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <!-- WELCOME BANNER / HERO -->
      <section class="rounded-3xl overflow-hidden border border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
        <div class="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p class="text-sm uppercase tracking-wider text-emerald-700/80 font-medium">Welcome back</p>
            <h2 class="mt-2 text-3xl md:text-4xl font-bold leading-tight">Good Morning, {{ userName }} 🌞</h2>
            <p class="mt-3 text-gray-600 italic">"The body benefits from movement, and the mind benefits from stillness."</p>
            <div class="mt-6 flex items-center gap-3">
              <RouterLink
                to="/aipractice"
                class="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
              >
                Start Practicing
                <ChevronRight class="h-4 w-4" />
              </RouterLink>
              
            </div>
          </div>
          <div class="relative">
            <img
              src="https://png.pngtree.com/background/20250209/original/pngtree-photo-of-a-woman-doing-yoga-outdoors-in-a-fresh-green-picture-image_15690981.jpg"
              alt="Morning yoga"
              class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl shadow"
            />
          </div>
        </div>
      </section>

      <!-- ASANA OF THE DAY -->
  <section v-if="asana" class="rounded-3xl overflow-hidden border border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
  <div class="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
    
    <!-- Image Left -->
    <div class="relative">
      <img
        :src="asana.image_url"
        :alt="asana.asana_name"
        class="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl shadow"
      />
    </div>

    <!-- Text Right -->
    <div>
      <p class="text-sm uppercase tracking-wider text-emerald-700/80 font-medium">Asana of the Day</p>
      <h2 class="mt-2 text-3xl md:text-4xl font-bold leading-tight">
        {{ asana.asana_name }}
        <span class="text-lg text-gray-500">({{ asana.sanskrit_meaning }})</span>
      </h2>
      <p class="mt-1 text-sm text-gray-500 italic">Origin: {{ asana.origin }}</p>
      
      <p class="mt-4 text-gray-700 leading-relaxed">
        {{ asana.historical_background }}
        Benefits include: {{ asana.benefits.join(", ") }}.
        References: {{ asana.references.join(", ") }}.
      </p>

      <div class="mt-6 flex items-center gap-3">
        
      </div>
    </div>
    
  </div>
</section>


      <!-- AI PRACTICE CTA -->
      <section>
        <div class="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-2xl bg-emerald-600 text-white">
              <Camera class="h-6 w-6" />
            </div>
            <div>
              <h4 class="text-lg font-semibold">AI‑Powered Posture Analysis</h4>
              <p class="text-gray-600">Get real‑time feedback on your yoga poses.</p>
            </div>
          </div>
          <router-link 
          to="/ai-practice"
          class="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700 transition">
            Begin Practice
            <ChevronRight class="h-4 w-4" />
          </router-link>
        </div>
      </section>

      <!-- NEARBY EVENTS -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-2xl font-semibold">Nearby Events</h3>
          <router-link 
          to="/eventpage"
          class="inline-flex items-center gap-2 px-3 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
            See All Events
            <ChevronRight class="h-4 w-4" />
          </router-link>
        </div>
        <div class="flex gap-5 overflow-x-auto pb-2 snap-x">
          <article
            v-for="(event, index) in events"
            :key="index"
            class="min-w-[280px] snap-start rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow transition"
          >
            <div class="h-36 w-full overflow-hidden">
              <img
  :src="event.image"
  :alt="event.title"
  class="w-full h-full object-cover"
/>

            </div>
            <div class="p-5 space-y-3">
              <h4 class="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap" :title="event.title">
  {{ event.title }}
</h4>

              <div class="text-sm text-gray-600 space-y-1">
                <div class="flex items-center gap-2">
                  <Calendar class="h-4 w-4" />
                  <span>
  
</span>

                </div>
                <div class="flex items-center gap-2">
                  <MapPin class="h-4 w-4" />
                  

                </div>
              </div>
            
              <button class="w-full h-10 rounded-xl bg-gray-900 text-white hover:bg-black transition">View</button>
            </div>
          </article>
        </div>
      </section>

      <!-- PRACTITIONERS -->
      <section>
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-2xl font-semibold">Connect with Practitioners</h3>
    <router-link 
          to="/trainers"
          class="inline-flex items-center gap-2 px-3 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
            See All Events
            <ChevronRight class="h-4 w-4" />
          </router-link>
  </div>

  <!-- Horizontal scroll container -->
  <div class="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
    <article
      v-for="(practitioner, index) in practitioners"
      :key="index"
      class="max-w-[350px] max-h-[350px] shrink-0 rounded-2xl border border-gray-200 bg-white p-8 hover:shadow transition"
    >
      <div class="flex items-center gap-4 mb-4">
        <div class="w-12 h-12 rounded-full bg-gray-100 grid place-items-center">
          <img 
  :src="practitioner.avatar" 
  :alt="practitioner.name"
  class="w-12 h-12 rounded-full object-cover"
/>

        </div>
        <div>
          <h4 class="font-semibold">{{ practitioner.name }}</h4>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
          >
            {{ practitioner.type }}
          </span>
        </div>
      </div>
      <p class="text-gray-600 pt-2 pb-2">{{ practitioner.short }}</p>
      <p class="text-gray-600 pt-2">E-mail: {{ practitioner.email }}</p>
      <p class="text-gray-600 pt-2">Phn: {{ practitioner.phone }}</p>
      
      <button class="w-full mt-16 h-10 rounded-xl border border-gray-200 bg-black text-white hover:bg-gray-50">
        Connect
      </button>
    </article>
  </div>
</section>

    </main>

    <!-- FOOTER -->
    <footer class="relative z-10 mt-16 border-t border-gray-200 bg-white/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <h3 class="text-2xl font-semibold">YogaVerse</h3>
            <p class="mt-2 text-gray-600 max-w-md">Discover your inner universe through AI‑powered yoga practice. Connect with practitioners, join events, and transform your wellness journey.</p>
            <div class="mt-4 flex gap-2">
              <button class="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"><Facebook class="h-5 w-5" /></button>
              <button class="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"><Instagram class="h-5 w-5" /></button>
              <button class="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"><Twitter class="h-5 w-5" /></button>
            </div>
          </div>

          <div>
            <h4 class="font-semibold">Quick Links</h4>
            <ul class="mt-3 space-y-2 text-gray-600">
              <li><a href="#" class="hover:text-gray-900">AI Practice</a></li>
              <li><a href="#" class="hover:text-gray-900">Find Trainers</a></li>
              <li><a href="#" class="hover:text-gray-900">Events</a></li>
              <li><a href="#" class="hover:text-gray-900">Community</a></li>
              <li><a href="#" class="hover:text-gray-900">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold">Contact</h4>
            <ul class="mt-3 space-y-2 text-gray-600">
              <li class="flex items-center gap-2"><Mail class="h-4 w-4" /><span>hello@yogaverse.com</span></li>
              <li class="flex items-center gap-2"><Phone class="h-4 w-4" /><span>+1 (555) 123-4567</span></li>
              <li class="flex items-center gap-2"><MapPin class="h-4 w-4" /><span>New York, NY</span></li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2024 YogaVerse. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { usePreferencesStore } from '@/stores/preferences'
import { useEventStore } from '@/stores/event'
import {api} from '../services/api'
import { Search, MapPin, User, ChevronRight, Camera, Calendar, Star, Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-vue-next'
const router = useRouter()
const authStore = useAuthStore()
const ui = useUiStore()
const prefs = usePreferencesStore()
const eventStore = useEventStore()

// 🔍 Search bar
const searchQuery = ref('')
const asana = ref(null);
// 📍 Location persistence
const selectedLocation = ref(localStorage.getItem('selectedLocation') || 'New York, NY')
watch(selectedLocation, (val) => localStorage.setItem('selectedLocation', val))

// 📍 Cities
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
  cities.value.filter((c) =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

// 🎯 Level modal
const levels = ref(['Beginner', 'Intermediate', 'Expert'])
function handleLevelSelect(level) {
  if (!authStore.user?._id) {
    router.push('/login')
    return
  }
  prefs.setLevel(level)
  authStore.updatePreferences({ level })
  ui.showLevelModal = false
}

// ✅ Auth helpers
const isLoggedIn = computed(() => !!authStore.user)
const userName = computed(() => authStore.user?.name || 'Yogi')
const practitioners=ref([])
// 🧘 Practitioners list
async function fetchPractitioners() {
      try {
        const res = await api.get("/trainers");
        practitioners.value = res.data;
      } catch (err) {
        console.error("Error fetching practitioners:", err);
      }
    }
function openProfilePage() {
  router.push('/profile')
}

// 📅 Events
const events = ref([])

function handleLocationSelect(city) {
  if (!authStore.user?._id) {
    router.push('/login')
    return
  }
  prefs.setCity(city)
  selectedLocation.value = city
  authStore.updatePreferences({ city })
  ui.showLocationModal = false
  ui.showLevelModal = true
}

async function loadEventsForUser(user) {
  if (!user?._id) {
    console.warn('⚠️ No user loaded yet, skipping event fetch')
    return
  }

  console.log('🎯 Fetching events for userId:', user._id)
  const fetchedEvents = await eventStore.fetchUpcomingEvents(user._id)
  console.log('📦 Raw fetchedEvents:', fetchedEvents)

  events.value = (fetchedEvents || []).map(e => ({
    title: e.title || 'Untitled Event',
    date: e.start
      ? new Date(e.start).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
      : 'Date TBD',
    location: e.address?.trim() || e.city?.trim() || 'Location TBD',
    instructor: e.organizer?.name?.trim() || 'Unknown',
    image: e.image || '/fallback-image.jpg'
  }))
}

// ⏳ Load profile first, then events
onMounted(async () => {
  await authStore.fetchProfile()
  await loadEventsForUser(authStore.user)
  await fetchPractitioners()
  try {
    const res = await api.get("/asanas/today"); 
    asana.value = res.data; // make sure backend returns single object
  } catch (err) {
    console.error("Error fetching Asana of the Day:", err);
  }
})

// 👀 Watch for authStore.user changes (in case profile loads later)
watch(
  () => authStore.user,
  (newUser) => {
    if (newUser?._id) {
      loadEventsForUser(newUser)
    }
  },
  { immediate: false }
)
</script>




<style scoped>
/* Optional brand tokens if you want to reference them in custom CSS */
:root {
  --brand-emerald: #059669;
}

/* Hide scrollbar but keep scrolling */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}

</style>