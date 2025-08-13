import { defineStore } from 'pinia'
import { api } from '@/services/api' // Adjust path as needed

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
  }),

  actions: {
    setUser(user) {
      this.user = user
    },
      async fetchProfile() {
      try {
        const res = await api.get('/auth/profile', { withCredentials: true })
        this.user = res.data.user
        console.log('🔁 User rehydrated from cookie:', this.user)
      } catch (err) {
        console.warn('⚠️ Could not fetch profile on app load:', err)
        this.user = null
      }
    }
    ,
    async login(email, password) {
      try {
        const res = await api.post('/auth/login', { email, password })
        this.accessToken = res.data.accessToken
        this.refreshToken = res.data.refreshToken
        this.user = res.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        console.error('Login failed:', err)
        throw err
      }
    },
    async signup(email, password) {
    try {
        const res = await api.post('/auth/signup', { email, password })
        this.accessToken = res.data.accessToken
        this.refreshToken = res.data.refreshToken
        this.user = res.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        console.log("signup success in Auth.js")
        console.log(this.refreshToken)
        console.log(this.accessToken) // You can later replace this with actual user data
    } catch (err) {
        console.error('Signup failed:', err)
        throw err
    }
    },
    restoreUser() {
      const userData = localStorage.getItem('user')
      if (userData) {
        this.user = JSON.parse(userData)
      }
    },
    async logout() {
      try {
        await api.post('/auth/logout', { email: this.user?.email })
      } catch (err) {
        console.warn('Logout error:', err)
      } finally {
        this.user = null
        this.accessToken = null
        this.refreshToken = null
      }
    },

    async refreshTokens() {
      try {
        const res = await api.post('/auth/refresh', {
          token: this.refreshToken,
        })
        this.accessToken = res.data.accessToken
        this.refreshToken = res.data.refreshToken
      } catch (err) {
        console.error('Token refresh failed:', err)
        this.logout()
      }
    },
    async updatePreferences(city) {
      console.log('⚙️ updatePreferences called')
      console.log('🧾 Access token being used:', this.accessToken)
      console.log('📍 City:', city)
      

      try {
        const payload = {}
        if (city) payload.city = city

        console.log('📦 Payload to send:', payload)

        const res = await api.put('/auth/update-preferences', payload, {
          withCredentials: true
        })

        console.log('📬 Response from server:', res)

        if (res.data.success) {
          // Instead of directly assigning user, re-fetch full profile
          await this.fetchProfile()
          console.log('✅ User preferences updated and rehydrated:', this.user)
        } else {
          console.error('⚠️ Update failed with server message:', res.data.error)
        }
      } catch (err) {
        console.error('❌ Failed to update preferences (axios/network error):', err)
      }
    }

},
})