<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Image -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-800/60 to-emerald-900/90"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-6">
      <!-- Profile Card -->
      <div class="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/20">
        
        <!-- Loading -->
        <div v-if="loading" class="text-center">
          <div class="inline-block w-8 h-8 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
          <div class="text-white font-medium animate-pulse">Loading your profile...</div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center text-red-300 bg-red-500/20 rounded-xl p-4 border border-red-400/30">
          {{ error }}
        </div>

        <!-- Profile Content -->
        <div v-else>
          <!-- User Info -->
          <div class="flex items-center space-x-4 mb-8">
            <div class="relative">
              <div class="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-green-500 to-sage-600 rounded-full blur opacity-60 animate-pulse"></div>
              <img
                :src="authStore.user?.avatar || 'https://via.placeholder.com/80'"
                alt="Profile Avatar"
                class="relative w-20 h-20 rounded-full border-4 border-white/40 object-cover shadow-2xl"
              />
            </div>
            <div>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-white via-emerald-100 to-green-200 bg-clip-text text-transparent mb-1">
                {{ authStore.user?.name }}
              </h2>
              <p class="text-white/80 text-sm">{{ authStore.user?.email }}</p>
            </div>
          </div>

          <!-- Practice Level -->
          <div class="mb-8">
            <label class="block text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Practice Level
            </label>

            <!-- Custom Dropdown -->
            <div class="relative w-full">
              <button
                @click="open = !open"
                class="w-full flex justify-between items-center p-4 rounded-2xl border-2 border-white/30 
                       bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-600/20 
                       backdrop-blur-sm text-white font-semibold focus:outline-none shadow-lg hover:from-emerald-500/30 hover:to-emerald-600/30 transition"
              >
                <span>{{ preferencesStore.selectedLevel }}</span>
                <span>▼</span>
              </button>

              <div
                v-if="open"
                class="absolute mt-2 w-full rounded-2xl overflow-hidden border border-white/30 
                       bg-gradient-to-b from-emerald-600/90 to-green-700/90 
                       shadow-xl backdrop-blur-sm z-50"
              >
                <div
                  v-for="option in levels"
                  :key="option"
                  @click="select(option)"
                  class="px-4 py-3 text-white hover:bg-emerald-500/40 cursor-pointer transition"
                >
                  {{ option }}
                </div>
              </div>
            </div>

            <div class="mt-6 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 shadow-xl">
              <p class="text-white font-bold text-lg animate-pulse">
                Current Level:
                <span class="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                  {{ preferencesStore.selectedLevel }}
                </span>
              </p>
              <p class="text-white/90 text-sm mt-2 leading-relaxed">
                <span v-if="preferencesStore.selectedLevel.includes('Beginner')"> Starting your journey with calm and balance.</span>
                <span v-else-if="preferencesStore.selectedLevel.includes('Intermediate')"> Deepening your flow with strength and mindfulness.</span>
                <span v-else>🧎‍♀ Mastering the art of breath and stillness.</span>
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col space-y-3 mb-6">
            <button
              @click="handleFeedback"
              class="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-green-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Share Your Journey
            </button>
            <div class="flex space-x-3">
              <button 
                @click="showEditModal = true" 
                class="flex-1 bg-white/20 text-white py-3 rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/20"
              >
                 Edit
              </button>
              <button 
                @click="handleLogout" 
                class="flex-1 bg-white/20 text-white py-3 rounded-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/20"
              >
                 Logout
              </button>
            </div>
          </div>

          <!-- Quote -->
          <div class="text-center bg-gradient-to-r from-white/10 to-emerald-500/10 rounded-2xl p-4 border border-white/20">
            <p class="text-white/90 text-sm italic">"Yoga is the perfect opportunity to be curious about who you are."</p>
            <p class="text-white/70 text-xs mt-2">— Jason Crandell</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePreferencesStore } from '@/stores/preferences'
import { useAuthStore } from '@/stores/auth'

const preferencesStore = usePreferencesStore()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref(null)
const showEditModal = ref(false)
const open = ref(false)

const levels = [
  ' Beginner ',
  ' Intermediate ',
  ' Expert'
]

// Dropdown select
const select = (option) => {
  preferencesStore.selectedLevel = option
  open.value = false
}


const handleFeedback = () => alert('Opening feedback form...')
const handleLogout = () => alert('Logging out...')
</script>
