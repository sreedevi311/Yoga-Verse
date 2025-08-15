// stores/event.js
import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const useEventStore = defineStore('event', {
  state: () => ({
    upcomingEvents: [],
    selectedEvent:null,
  }),
  actions: {
    async fetchUpcomingEvents(userId) {
  try {
    const { data } = await api.get(`/events/user-city-upcoming-day-events/${userId}`)
    this.upcomingEvents = data
    console.log('📅 upcomingEvents in store:', this.upcomingEvents)
    return data // ✅ return actual array
  } catch (err) {
    console.error('❌ Failed to fetch upcoming events:', err)
    return [] // fallback so UI won't break
  }
}
,
    async fetchEventById(id) {
      try {
        const { data } = await api.get(`/events/${id}`) // make sure this endpoint exists
        this.selectedEvent = data
      } catch (err) {
        console.error('❌ Failed to fetch event by ID:', err)
      }
    },
  },
})
