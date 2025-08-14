<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-96 bg-cream-100 text-gray-900 flex flex-col fixed top-0 left-0 h-screen element-with-scrollbar">
      <div class="px-4 py-4 border-b border-cream-300">
        <h2 class="text-lg font-bold text-olive-400">Your Communities</h2>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div
          v-for="community in communityStore.suggested"
          :key="community._id"
          @click="selectCommunity(community._id)"
          class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-cream-200"
          :class="{ 'bg-cream-200': selectedCommunity?.id === community._id }"
        >
          <div>
            <p class="text-xs text-olive-300 truncate">Cities: {{ community.cities.join(', ') }}</p>
          </div>
          <button
            @click.stop="toggleJoin(community._id)"
            :class="communityStore.joined?.includes(community._id)
              ? 'bg-olive-800 hover:bg-olive-900'
              : 'bg-olive-600 hover:bg-olive-700'"
            class="text-sm text-white px-4 py-2 rounded-full"
          >
            {{ communityStore.joined?.includes(community._id) ? 'Leave' : 'Join' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 bg-cream-50 ml-96">
      <CommunityChat v-if="selectedCommunity" :community="selectedCommunity" />
      <div v-else class="h-full flex items-center justify-center text-olive-300">
        Select a community to view chat
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

/* Cream and Olive Green Color Definitions */
.bg-cream-50 {
  background-color: #FFF8E7;
}
.bg-cream-100 {
  background-color: #FDF5E6;
}
.bg-cream-200 {
  background-color: #FAF0E6;
}
.border-cream-300 {
  border-color: #F5E6D3;
}
.bg-olive-600 {
  background-color: #4B5E40;
}
.bg-olive-700 {
  background-color: #3F4E34;
}
.bg-olive-800 {
  background-color: #2F3A26;
}
.bg-olive-900 {
  background-color: #252F1E;
}
.text-olive-400 {
  color: #6B7A56;
}
.text-olive-300 {
  color: #8A9A76;
}
</style>