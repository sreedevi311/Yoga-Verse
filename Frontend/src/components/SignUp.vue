<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 flex items-center justify-center p-4">
    <!-- Background yoga imagery -->
    <div class="absolute inset-0 opacity-20">
      <img src="https://i.pinimg.com/736x/f7/de/48/f7de489dcc82a75fda3376e992eec3fc.jpg" alt="" class="w-full h-full object-cover" />
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo and branding -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
          <div class="w-8 h-8 border-2 border-white rotate-45 rounded-sm"></div>
        </div>
        <h1 class="text-3xl font-light text-white mb-2">YogaVerse</h1>
        <p class="text-stone-300 text-sm">Begin your wellness journey</p>
      </div>

      <!-- Signup form -->
      <div class="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-lg">
        <!-- Form header -->
        <div class="text-center p-6 pb-0">
          <h2 class="text-2xl font-light text-white mb-2">Create Account</h2>
          <p class="text-stone-300 text-sm">Start your transformation today</p>
        </div>

        <!-- Form content -->
        <form @submit.prevent="handleSubmit" class="p-6">
          <!-- Google signup button -->
          <div class="mb-6">
            <button
              type="button"
              @click="handleGoogleSignup"
              class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <!-- Error message for Google signup -->
            <p v-if="googleErrorMessage" class="text-red-400 text-sm text-center mt-4">{{ googleErrorMessage }}</p>
            
            <!-- Divider -->
            <div class="flex items-center my-6">
              <div class="flex-1 border-t border-white/20"></div>
              <span class="px-4 text-stone-400 text-sm">or</span>
              <div class="flex-1 border-t border-white/20"></div>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Full Name field -->
            <div class="space-y-2">
              <label for="fullName" class="block text-stone-200 font-light text-sm">
                Full Name
              </label>
              <input
                id="fullName"
                v-model="fullName"
                type="text"
                placeholder="Enter your full name"
                class="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder:text-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-colors"
                :class="{ 'border-red-400': errors.fullName }"
                required
              />
              <p v-if="errors.fullName" class="text-red-400 text-xs">{{ errors.fullName }}</p>
            </div>

            <!-- Email field -->
            <div class="space-y-2">
              <label for="email" class="block text-stone-200 font-light text-sm">
                Email
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="your@email.com"
                class="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder:text-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-colors"
                :class="{ 'border-red-400': errors.email }"
                required
              />
              <p v-if="errors.email" class="text-red-400 text-xs">{{ errors.email }}</p>
            </div>

            <!-- Password field -->
            <div class="space-y-2">
              <label for="password" class="block text-stone-200 font-light text-sm">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a strong password"
                  class="w-full px-3 py-2 pr-10 bg-white/10 border border-white/30 rounded-md text-white placeholder:text-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-colors"
                  :class="{ 'border-red-400': errors.password }"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="text-red-400 text-xs">{{ errors.password }}</p>
            </div>

            <!-- Confirm Password field -->
            <div class="space-y-2">
              <label for="confirmPassword" class="block text-stone-200 font-light text-sm">
                Confirm Password
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  class="w-full px-3 py-2 pr-10 bg-white/10 border border-white/30 rounded-md text-white placeholder:text-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-colors"
                  :class="{ 'border-red-400': errors.confirmPassword }"
                  required
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                >
                  <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="text-red-400 text-xs">{{ errors.confirmPassword }}</p>
            </div>

            <!-- Terms and conditions -->
            <div class="flex items-start space-x-2 text-sm">
              <input
                v-model="agreeToTerms"
                type="checkbox"
                class="mt-0.5 rounded border-white/30 bg-white/10 text-amber-400 focus:ring-amber-400/20 focus:ring-2"
                required
              />
              <label class="text-stone-300 cursor-pointer">
                I agree to the 
                <a href="#" class="text-amber-400 hover:text-amber-300 transition-colors">Terms of Service</a>
                and 
                <a href="#" class="text-amber-400 hover:text-amber-300 transition-colors">Privacy Policy</a>
              </label>
            </div>
            <p v-if="errors.agreeToTerms" class="text-red-400 text-xs">{{ errors.agreeToTerms }}</p>
          </div>

          <!-- General Error Message -->
          <p v-if="signupError" class="text-red-400 text-sm text-center mt-4">{{ signupError }}</p>

          <!-- Submit button and login link -->
          <div class="mt-6 space-y-4">
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-light py-3 px-4 rounded-md text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
              <span v-else>Create Account</span>
            </button>

            <div class="text-center text-stone-300 text-sm">
              Already have an account?
              <a href="#" class="text-amber-400 hover:text-amber-300 transition-colors ml-1" @click="switchToLogin">
                Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Reactive state
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errors = ref({ fullName: '', email: '', password: '', confirmPassword: '', agreeToTerms: '' })
const googleErrorMessage = ref('')
const signupError = ref('')
const router = useRouter()
const authStore = useAuthStore()

// Form validation
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

const isFormValid = computed(() => {
  return fullName.value &&
         email.value &&
         validateEmail(email.value) &&
         password.value &&
         confirmPassword.value &&
         password.value === confirmPassword.value &&
         agreeToTerms.value
})

// Form submission handler
const handleSubmit = async () => {
  if (!isFormValid.value) {
    errors.value = {
      fullName: fullName.value ? '' : 'Full name is required',
      email: email.value ? (validateEmail(email.value) ? '' : 'Invalid email format') : 'Email is required',
      password: password.value ? '' : 'Password is required',
      confirmPassword: confirmPassword.value ? '' : 'Confirm password is required',
      agreeToTerms: agreeToTerms.value ? '' : 'You must agree to the terms'
    }
    if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
      errors.value.confirmPassword = 'Passwords do not match'
    }
    return
  }

  isLoading.value = true
  try {
    await authStore.signup(email.value, password.value)
    console.log('Signup successful, user:', authStore.user)
    if (authStore.user.role === 'admin') {
      router.push('/admin-panel')
    } else {
      router.push('/Home')
    }
  } catch (error) {
    console.error('Signup failed:', error.response?.data || error.message)
    signupError.value = error.response?.data?.message || 'Signup failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Google signup handler
const handleGoogleSignup = async () => {
  googleErrorMessage.value = ''
  try {
    window.location.href = 'http://localhost:5000/yoga-verse/auth/google?mode=signup'
  } catch (error) {
    console.error('Google signup failed:', error)
    googleErrorMessage.value = 'Google signup failed. Please try again.'
  }
}

// Switch to login page
const switchToLogin = () => {
  router.push('/login')
}
</script>