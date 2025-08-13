import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePreferencesStore = defineStore('preferences', () => {
  const selectedCity = ref('')
  const selectedThemes = ref([])
  const nearbyCities = ref([]) // Add this to the store

  function setNearbyCities(cities) {
    nearbyCities.value = cities
  }

  function setCity(city) {
    selectedCity.value = city
  }

  function setThemes(themes) {
    selectedThemes.value = themes
  }

  return {
    selectedCity,
    selectedThemes,
    setCity,
    nearbyCities,
    setNearbyCities,
    setThemes
  }
})
