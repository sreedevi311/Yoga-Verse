<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-900 via-stone-800 to-slate-900">
    <!-- Background yoga image -->
     <div class="absolute inset-0 opacity-30">
      <img 
        src="https://cdn.pixabay.com/photo/2019/06/16/14/45/yoga-4288477_1280.jpg"
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
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lotus_flower_icon.svg/1024px-Lotus_flower_icon.svg.png" alt="lotus" class="w-full h-full animate-pulse" />
      </div>
      <div class="lotus-float-delayed absolute top-40 right-20 w-6 h-6 opacity-15">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lotus_flower_icon.svg/1024px-Lotus_flower_icon.svg.png" alt="lotus" class="w-full h-full animate-pulse" />
      </div>
      
      <!-- Om symbols -->
      <div class="om-float absolute bottom-32 left-16 w-10 h-10 opacity-10">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Om_symbol.svg/1024px-Om_symbol.svg.png" alt="om" class="w-full h-full animate-spin-slow" />
      </div>
      <div class="om-float-reverse absolute top-60 right-10 w-8 h-8 opacity-15">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Om_symbol.svg/1024px-Om_symbol.svg.png" alt="om" class="w-full h-full animate-spin-slow-reverse" />
      </div>
      
      <!-- Chakra symbols -->
      <div class="chakra-glow absolute bottom-20 right-32 w-12 h-12 opacity-20">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Chakra_Wheel.svg/1024px-Chakra_Wheel.svg.png" alt="chakra" class="w-full h-full animate-pulse-slow" />
      </div>
      
      <!-- Meditation poses -->
      <div class="meditation-float absolute top-1/3 left-8 w-16 h-16 opacity-15">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Meditation_icon.svg/1024px-Meditation_icon.svg.png" alt="meditation" class="w-full h-full animate-breathe" />
      </div>
      
      <!-- Zen circles -->
      <div class="zen-float absolute bottom-40 left-1/4 w-10 h-10 opacity-25">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Enso.svg/1024px-Enso.svg.png" alt="zen circle" class="w-full h-full animate-pulse-slow" />
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

    <div class="relative z-10 flex items-center justify-center py-16 p-4">
      <div class="w-full max-w-md">
        <!-- Updated header styling for dark theme -->
        <div class="text-center mb-8 animate-fade-in">
          <h2 class="text-3xl font-light text-white mb-2">Begin Your Journey</h2>
          <p class="text-white text-opacity-80">Discover your inner universe with us</p>
        </div>

        <!-- Updated form container with dark theme glass morphism -->
        <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white border-opacity-20 animate-slide-up">
          <form @submit.prevent="handleSignup" class="space-y-6">
            <!-- Google Sign Up Button -->
            <button
              type="button"
              @click="signUpWithGoogle"
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
            
            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-white border-opacity-30"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-transparent text-white text-opacity-70">or sign up with email</span>
              </div>
            </div>

            <!-- Form Inputs -->
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="transform transition-all duration-300 hover:scale-105">
                  <label for="firstName" class="block text-sm font-medium text-white text-opacity-90 mb-2">First Name</label>
                  <input
                    id="firstName"
                    v-model="firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="First name"
                  />
                  <p v-if="errors.firstName" class="text-red-400 text-sm mt-1">{{ errors.firstName }}</p>
                </div>
                <div class="transform transition-all duration-300 hover:scale-105">
                  <label for="lastName" class="block text-sm font-medium text-white text-opacity-90 mb-2">Last Name</label>
                  <input
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    placeholder="Last name"
                  />
                  <p v-if="errors.lastName" class="text-red-400 text-sm mt-1">{{ errors.lastName }}</p>
                </div>
              </div>

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
                    placeholder="Create a password"
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

              <div class="transform transition-all duration-300 hover:scale-105">
                <label for="confirmPassword" class="block text-sm font-medium text-white text-opacity-90 mb-2">Confirm Password</label>
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  :class="{ 'border-red-400': password && confirmPassword && password !== confirmPassword }"
                  placeholder="Confirm your password"
                />
                <p v-if="password && confirmPassword && password !== confirmPassword" class="text-red-400 text-sm mt-1">
                  Passwords don't match
                </p>
                <p v-if="errors.confirmPassword" class="text-red-400 text-sm mt-1">{{ errors.confirmPassword }}</p>
              </div>
            </div>

            <!-- Terms -->
            <div class="space-y-4">
              <label class="flex items-start">
                <input type="checkbox" v-model="agreeToTerms" required class="rounded border-white border-opacity-30 bg-white bg-opacity-20 text-white focus:ring-white focus:ring-opacity-50 mt-1" />
                <span class="ml-2 text-sm text-white text-opacity-80">
                  I agree to the <a href="#" class="text-white hover:text-amber-200 underline">Terms of Service</a> 
                  and <a href="#" class="text-white hover:text-amber-200 underline">Privacy Policy</a>
                </span>
              </label>
              <p v-if="errors.agreeToTerms" class="text-red-400 text-sm mt-1">{{ errors.agreeToTerms }}</p>
            </div>

            <!-- General Error Message -->
            <p v-if="signupError" class="text-red-400 text-sm text-center mb-4">{{ signupError }}</p>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full bg-amber-100 bg-opacity-90 hover:bg-opacity-100 text-amber-900 font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">Start Your Journey</span>
              <span v-else class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-900 mr-2"></div>
                Creating account...
              </span>
            </button>

            <!-- Login Switch -->
            <div class="text-center">
              <p class="text-white text-opacity-80">
                Already have an account? 
                <button @click="switchToLogin" class="text-white hover:text-amber-200 font-medium transition-colors">
                  Login
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const agreeToTerms = ref(false)
const isLoading = ref(false)
const errors = ref({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agreeToTerms: '' })
const googleErrorMessage = ref('')
const signupError = ref('')

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

const isFormValid = computed(() => {
  return firstName.value && 
         lastName.value && 
         email.value && 
         validateEmail(email.value) &&
         password.value && 
         confirmPassword.value && 
         password.value === confirmPassword.value && 
         agreeToTerms.value
})

const handleSignup = async () => {
  if (!isFormValid.value) {
    errors.value = {
      firstName: firstName.value ? '' : 'First name is required',
      lastName: lastName.value ? '' : 'Last name is required',
      email: email.value ? (validateEmail(email.value) ? '' : 'Invalid email format') : 'Email is required',
      password: password.value ? '' : 'Password is required',
      confirmPassword: confirmPassword.value ? '' : 'Confirm password is required',
      agreeToTerms: agreeToTerms.value ? '' : 'You must agree to the terms',
    }
    return
  }

  isLoading.value = true
  try {
    // Since authStore.signup only accepts email and password, we pass those
    await authStore.signup(email.value, password.value)
    console.log('Signup successful, user:', authStore.user)
    if (authStore.user.role === 'admin') {
      router.push('/admin-panel')
    } else {
      router.push('/Home')
    }
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message)
    signupError.value = error.response?.data?.message || 'Signup failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const signUpWithGoogle = () => {
  googleErrorMessage.value = ''
  window.location.href = 'http://localhost:5000/yoga-verse/auth/google?mode=signup'
}

const switchToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.lotus-float { animation: lotus-float 6s ease-in-out infinite; }
.lotus-float-delayed { animation: lotus-float 6s ease-in-out infinite 2s; }
.om-float { animation: om-float 8s ease-in-out infinite; }
.om-float-reverse { animation: om-float 8s ease-in-out infinite reverse; }
.chakra-glow { animation: pulse-slow 3s ease-in-out infinite; }
.meditation-float { animation: meditation-float 10s ease-in-out infinite; }
.zen-float { animation: zen-float 12s ease-in-out infinite; }
.animate-spin-slow { animation: spin-slow 20s linear infinite; }
.animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
</style>