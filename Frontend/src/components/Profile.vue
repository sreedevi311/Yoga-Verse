<template>
  <div
    class="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
    :style="{ backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80')` }"
  >
    <!-- Gradient Overlays -->
    <div class="absolute inset-0 bg-gradient-to-br from-green-900/30 via-emerald-800/20 to-teal-700/25"></div>
    <div class="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-green-400/10 to-emerald-500/15 rounded-full blur-2xl animate-pulse"></div>
    <div class="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-teal-400/10 to-green-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
    <div class="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-emerald-400/10 to-teal-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>

    <!-- Card -->
    <div class="bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 border border-white/20 relative overflow-hidden hover:scale-105 transition-all duration-500">
      <div class="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-green-500/5 rounded-3xl"></div>

      <div class="relative z-10">
        <!-- Loading -->
        <div v-if="loading" class="text-center">
          <div class="inline-block w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full animate-spin mb-4"></div>
          <div class="text-white font-medium animate-pulse">Loading your profile...</div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center text-red-300 bg-red-500/20 rounded-xl p-4">{{ error }}</div>

        <!-- Profile -->
        <div v-else>
          <!-- User Info -->
          <div class="flex items-center space-x-6 mb-8">
            <div class="relative">
              <div class="absolute -inset-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full blur opacity-60 animate-pulse"></div>
              <img
                src="/professional-woman-profile.png"
                alt="Profile"
                class="relative w-20 h-20 rounded-full border-4 border-white/40 object-cover shadow-2xl"
              />
            </div>
            <div>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent mb-1">
                {{ authStore.user?.name }}
              </h2>
              <p class="text-white/80 text-sm">{{ authStore.user?.email }}</p>
            </div>
          </div>

          <!-- Practice Level -->
          <div class="mb-8">
            <label class="block text-white font-bold mb-4 text-sm uppercase tracking-wider">
              🧘‍♀ Practice Level
            </label>
            <select
              v-model="preferencesStore.selectedLevel"
              @change="updateLevel"
              class="w-full p-4 rounded-2xl border-2 border-white/30"
            >
              <option value="Beginner" class="text-gray-800">🌱 Beginner – Rooting in Practice</option>
              <option value="Intermediate" class="text-gray-800">🌿 Intermediate – Growing Mindfully</option>
              <option value="Expert" class="text-gray-800">🌳 Expert – Flourishing Flow</option>
            </select>

            <div class="mt-6 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 shadow-xl">
              <p class="text-white font-bold text-lg animate-pulse">
                Current Level:
                <span class="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                  {{ preferencesStore.selectedLevel }}
                </span>
              </p>
              <p class="text-white/90 text-sm mt-2 leading-relaxed">
                <span v-if="preferencesStore.selectedLevel === 'Beginner'">🌱 Like a seed, beginning your journey with gentle foundation poses</span>
                <span v-else-if="preferencesStore.selectedLevel === 'Intermediate'">🌿 Growing like bamboo, building strength with mindful breathing</span>
                <span v-else>🌳 Rooted like an ancient tree, flowing with wisdom and grace</span>
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col space-y-3 mb-6">
            <button
              @click="handleFeedback"
              class="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-bold hover:scale-105 transition-all"
            >
              Share Your Journey
            </button>
            <div class="flex space-x-3">
              <button @click="showEditModal = true" class="flex-1 bg-white/20 text-white py-3 rounded-2xl hover:scale-105 transition-all">
                ✏ Edit
              </button>
              <button @click="handleLogout" class="flex-1 bg-white/20 text-white py-3 rounded-2xl hover:scale-105 transition-all">
                🚪 Logout
              </button>
            </div>
          </div>

          <!-- Quote -->
          <div class="text-center bg-gradient-to-r from-white/10 to-green-500/10 rounded-2xl p-4 border border-white/20">
            <p class="text-white/90 text-sm italic">"In every walk with nature, one receives far more than they seek. Breathe deeply and find your center."</p>
            <p class="text-white/70 text-xs mt-2">— Nature's Wisdom</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-20">
      <div class="bg-white/20 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-sm border border-white/30">
        <h3 class="text-2xl font-bold text-white mb-6 text-center">🌿 Edit Profile</h3>
        <div class="space-y-4">
          <input v-model="editName" type="text" placeholder="Your Name" class="w-full p-4 border-2 border-white/30 rounded-2xl bg-white/20 text-white" />
          <input v-model="editEmail" type="email" placeholder="Your Email" class="w-full p-4 border-2 border-white/30 rounded-2xl bg-white/20 text-white" />
        </div>
        <div class="flex justify-center space-x-4 mt-8">
          <button @click="showEditModal = false" class="px-6 py-3 text-white/80">Cancel</button>
          <button @click="saveProfile" class="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePreferencesStore } from '@/stores/preferences'
import { useAuthStore } from '@/stores/auth'

const preferencesStore = usePreferencesStore()
const authStore = useAuthStore()

const loading = ref(true)
const error = ref<string | null>(null)
const showEditModal = ref(false)
const editName = ref('')
const editEmail = ref('')

const fetchUser = async () => {
  try {
    await authStore.fetchProfile()
    preferencesStore.selectedLevel = authStore.user?.skillLevel || 'Beginner'
  } catch (err) {
    error.value = 'Failed to load profile.'
  } finally {
    loading.value = false
  }
}

const updateLevel = async () => {
  await preferencesStore.setLevel(preferencesStore.selectedLevel)
}

const saveProfile = async () => {
  if (!editName.value || !editEmail.value) {
    alert('Please fill out all fields.')
    return
  }
  //await authStore.updateProfile({ name: editName.value, email: editEmail.value })
  showEditModal.value = false
}

const handleFeedback = () => alert('Opening feedback form...')
const handleLogout = () => alert('Logging out...')

onMounted(fetchUser)
</script>
