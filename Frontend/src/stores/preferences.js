import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const usePreferencesStore = defineStore('preferences', () => {
  const selectedCity = ref('')
  const selectedLevel = ref('') // <-- change to string
  const nearbyCities = ref([])

  function setNearbyCities(cities) {
    nearbyCities.value = cities
  }

  function setCity(city) {
    selectedCity.value = city
  }

  async function setLevel(level) {
    selectedLevel.value = level
    // Call authStore here so all updates happen centrally
    const authStore = useAuthStore()
    await authStore.updatePreferences(selectedCity.value, level)
  }

  return {
    selectedCity,
    selectedLevel,
    nearbyCities,
    setNearbyCities,
    setCity,
    setLevel
  }
})
