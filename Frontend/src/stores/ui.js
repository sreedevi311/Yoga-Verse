import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  
  const showLocationModal = ref(false)
  const showInterestModal = ref(false)

  
  return {
    
    showLocationModal,
    showInterestModal,
   
  }
})
