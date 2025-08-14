import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePreferencesStore = defineStore('preferences', () => {
  const selectedCity = ref('')
  const selectedLevel = ref([])
  const nearbyCities = ref([]) // Add this to the store

  function setNearbyCities(cities) {
    nearbyCities.value = cities
  }

  function setCity(city) {
    selectedCity.value = city
  }

  function setLevel(level) {
    selectedLevel.value = level
  }

  return {
    selectedCity,
    selectedLevel,
    setCity,
    nearbyCities,
    setNearbyCities,
    setLevel
  }
})
