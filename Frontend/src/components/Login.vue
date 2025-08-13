<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-900 via-stone-800 to-slate-900">
    <!-- Background yoga image -->
    <div class="absolute inset-0 opacity-30">
      <img 
        src="https://cdn.pixabay.com/photo/2016/11/29/13/14/yoga-1868250_1280.jpg"
        alt="Yoga background"
        class="w-full h-full object-cover"
      />
    </div>
    
    <!-- Added dark overlay to match landing page -->
    <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    
    <!-- Enhanced floating yoga elements with more variety -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Lotus flowers -->
      <div class="lotus-float absolute top-20 left-10 w-8 h-8 opacity-20">
        <img src="https://cdn.pixabay.com/photo/2017/03/06/17/49/lotus-2125616_1280.png" alt="lotus" class="w-full h-full animate-pulse" />
      </div>
      <div class="lotus-float-delayed absolute top-40 right-20 w-6 h-6 opacity-15">
        <img src="https://cdn.pixabay.com/photo/2017/03/06/17/49/lotus-2125616_1280.png" alt="lotus" class="w-full h-full animate-pulse" />
      </div>
      
      <!-- Om symbols -->
      <div class="om-float absolute bottom-32 left-16 w-10 h-10 opacity-10">
        <img src="https://cdn.pixabay.com/photo/2016/10/14/16/42/om-1744956_1280.png" alt="om" class="w-full h-full animate-spin-slow" />
      </div>
      <div class="om-float-reverse absolute top-60 right-10 w-8 h-8 opacity-15">
        <img src="https://cdn.pixabay.com/photo/2016/10/14/16/42/om-1744956_1280.png" alt="om" class="w-full h-full animate-spin-slow-reverse" />
      </div>
      
      <!-- Chakra symbols -->
      <div class="chakra-glow absolute bottom-20 right-32 w-12 h-12 opacity-20">
        <img src="https://cdn.pixabay.com/photo/2020/03/30/17/34/chakra-4984695_1280.png" alt="chakra" class="w-full h-full animate-pulse-slow" />
      </div>
      
      <!-- Meditation poses -->
      <div class="meditation-float absolute top-1/3 left-8 w-16 h-16 opacity-15">
        <img src="https://cdn.pixabay.com/photo/2013/07/12/13/57/meditation-147717_1280.png" alt="meditation" class="w-full h-full animate-breathe" />
      </div>
      
      <!-- Zen circles -->
      <div class="zen-float absolute bottom-40 left-1/4 w-10 h-10 opacity-25">
        <img src="https://cdn.pixabay.com/photo/2020/01/06/19/28/zen-4744563_1280.png" alt="zen circle" class="w-full h-full animate-pulse-slow" />
      </div>
    </div>

    <!-- Header -->
    <header class="relative z-10 flex justify-between items-center p-6">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div class="w-4 h-4 border-2 border-white rotate-45"></div>
        </div>
        <span class="text-white text-xl font-semibold">YogaVerse</span>
      </div>
    </header>

    <div class="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
      <div class="w-full max-w-md">
        <!-- Fixed the icon above Welcome Back with proper yoga pose SVG -->
        <div class="text-center mb-8 animate-fade-in">
          <div class="inline-block w-20 h-20 mb-4 opacity-80">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-white animate-breathe">
              <path d="M12 2c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm-1 6v3l-2 2v6h2v-5l2-2 2 2v5h2v-6l-2-2V8c-1.1 0-2-0.9-2-2s-0.9-2-2-2z"/>
            </svg>
          </div>
          <h2 class="text-3xl font-light text-white mb-2">Welcome Back</h2>
          <p class="text-white text-opacity-80">Continue your inner journey</p>
        </div>

        <!-- Updated form container with dark theme glass morphism -->
        <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 animate-slide-up">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Added Google Sign In Button -->
            <button
              type="button"
              @click="redirectToGoogle('login')"
              class="w-full flex items-center justify-center space-x-3 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <p v-if="googleErrorMessage" class="text-red-400 text-sm text-center mb-4">{{ googleErrorMessage }}</p>

            <!-- Added divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-white border-opacity-30"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-transparent text-white text-opacity-70">or sign in with email</span>
              </div>
            </div>

            <div class="space-y-4">
              <div class="transform transition-all duration-300 hover:scale-105">
                <label for="email" class="block text-sm font-medium text-white text-opacity-90 mb-2">Email</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your email"
                />
                <p v-if="errors.email" class="text-red-400 text-sm mt-1">{{ errors.email }}</p>
              </div>

              <div class="transform transition-all duration-300 hover:scale-105">
                <label for="password" class="block text-sm font-medium text-white text-opacity-90 mb-2">Password</label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm transition-all duration-300 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-60 hover:text-white transition-colors"
                  >
                    {{ showPassword ? '👁' : '👁‍🗨' }}
                  </button>
                </div>
                <p v-if="errors.password" class="text-red-400 text-sm mt-1">{{ errors.password }}</p>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input type="checkbox" v-model="rememberMe" class="rounded border-white border-opacity-30 bg-white bg-opacity-20 text-white focus:ring-white focus:ring-opacity-50" />
                <span class="ml-2 text-sm text-white text-opacity-80">Remember me</span>
              </label>
              <a href="#" class="text-sm text-white hover:text-amber-200 underline transition-colors">
                Forgot password?
              </a>
            </div>

            <!-- Changed button text from "Sign In" to "Log In" -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-amber-100 bg-opacity-90 hover:bg-opacity-100 text-amber-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">Log In</span>
              <span v-else class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-900 mr-2"></div>
                Signing in...
              </span>
            </button>

            <div class="text-center">
              <p class="text-white text-opacity-80">
                Don't have an account? 
                <button @click="switchToSignup" class="text-white hover:text-amber-200 font-medium transition-colors">
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const errors = ref({ email: '', password: '' })
const googleErrorMessage = ref('')
const signupError = ref('')

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

const handleLogin = async () => {
  isLoading.value = true
  errors.value = { email: '', password: '' }

  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!validateEmail(email.value)) {
    errors.value.email = 'Invalid email format'
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
  }

  if (!errors.value.email && !errors.value.password) {
    try {
      await authStore.login(email.value, password.value)
      if (authStore.user.role === 'admin') {
        router.push('/admin-panel')
      } else {
        router.push('/Home')
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message)
      signupError.value = error.response?.data?.message || 'Login failed. Please try again.'
    }
  }
  isLoading.value = false
}

const redirectToGoogle = () => {
  window.location.href = 'http://localhost:5000/yoga-verse/auth/google?mode=login'
}

const signInWithGoogle = () => {
  googleErrorMessage.value = ''
  redirectToGoogle('login')
}

const switchToSignup = () => {
  router.push('/signup')
}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(8deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(-5deg); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes lotus-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes om-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(10deg); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-slow-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes meditation-float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-20px) scale(1.1); }
}

@keyframes zen-float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(180deg); }
}

.animate-breathe {
  animation: breathe 4s ease-in-out infinite;
}

.lotus-float {
  animation: lotus-float 6s ease-in-out infinite;
}

.lotus-float-delayed {
  animation: lotus-float 6s ease-in-out infinite 2s;
}

.om-float {
  animation: om-float 8s ease-in-out infinite;
}

.om-float-reverse {
  animation: om-float 8s ease-in-out infinite reverse;
}

.chakra-glow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.meditation-float {
  animation: meditation-float 10s ease-in-out infinite;
}

.zen-float {
  animation: zen-float 12s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-spin-slow-reverse {
  animation: spin-slow-reverse 25s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}
</style>