<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-96 bg-cream-100 text-gray-900 flex flex-col fixed top-0 left-0 h-screen element-with-scrollbar shadow-lg">
      <div class="px-6 py-5 border-b border-cream-200 bg-gradient-to-r from-cream-100 to-cream-50">
        <h2 class="text-xl font-semibold text-green-600 tracking-tight">Your Communities</h2>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div
          v-for="community in communityStore.suggested"
          :key="community._id"
          @click="selectCommunity(community._id)"
          class="flex items-center justify-between px-6 py-4 cursor

-pointer transition-colors duration-200 hover:bg-cream-200 rounded-lg mx-2 my-1"
          :class="{ 'bg-cream-200 shadow-inner': selectedCommunity?.id === community._id }"
        >
          <div>
            <p class="text-sm text-green-500 font-medium truncate"> {{ community.cities.join(', ') }} Yoga Community</p>
          </div>
          <button
            @click.stop="toggleJoin(community._id)"
            :class="communityStore.joined?.includes(community._id)
              ? 'bg-green-700 hover:bg-green-800'
              : 'bg-green-500 hover:bg-green-600'"
            class="text-sm text-white px-5 py-2 rounded-full transition-colors duration-200 font-semibold shadow-sm"
          >
            {{ communityStore.joined?.includes(community._id) ? 'Leave' : 'Join' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 bg-cream-50 ml-96">
      <CommunityChat v-if="selectedCommunity" :community="selectedCommunity" />
      <div v-else class="h-full flex items-center justify-center text-green-500 text-lg font-medium">
        Select a community to start chatting
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCommunityStore } from '@/stores/community'
import { useAuthStore } from '@/stores/auth'
import CommunityChat from '@/components/communityView.vue'

const communityStore = useCommunityStore()
const authStore = useAuthStore()
authStore.restoreUser()
const selectedCommunity = ref(null)
const hoveredCommunity = ref(null)

async function toggleJoin(id) {
  const userId = authStore.user._id
  if (communityStore.joined.includes(id)) {
    await communityStore.leaveCommunity(id, userId)
    selectedCommunity.value = null
  } else {
    await communityStore.joinCommunity(id, userId)
    await selectCommunity(id)
  }
}

onMounted(() => {
  if (authStore.user) {
    communityStore.fetchSuggested(
      authStore.user.city,
      authStore.user.interests,
      authStore.user.nearbyCities
    )
    communityStore.fetchJoinedCommunities(authStore.user._id)
  } else {
    // Optionally redirect to login or show a message
    console.warn('User not logged in')
  }
})

async function join(id) {
  await communityStore.joinCommunity(id)
  await selectCommunity(id)
}

async function selectCommunity(id) {
  await communityStore.loadCommunity(id)
  selectedCommunity.value = communityStore.activeCommunity
}
</script>

<style scoped>
.element-with-scrollbar::-webkit-scrollbar {
  display: none;
}
.element-with-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none;
}

/* Cream and Green Color Definitions */
.bg-cream-50 {
  background-color: #FFF8E7;
}
.bg-cream-100 {
  background-color: #FDF5E6;
}
.bg-cream-200 {
  background-color: #FAF0E6;
}
.border-cream-200 {
  border-color: #F8E6C8;
}
.bg-green-500 {
  background-color: #22C55E;
}
.bg-green-600 {
  background-color: #16A34A;
}
.bg-green-700 {
  background-color: #15803D;
}
.bg-green-800 {
  background-color: #166534;
}
.text-green-500 {
  color: #22C55E;
}
.text-green-600 {
  color: #16A34A;
}
</style>