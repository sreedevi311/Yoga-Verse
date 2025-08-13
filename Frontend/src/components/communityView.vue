<template>
  <div v-if="community" class="flex flex-col h-screen bg-[#111B1F] text-white">
    <!-- Header -->
    <div class="flex items-center justify-between bg-[#1F2C33] p-2 border-b border-gray-700 sticky top-0 right-0">
      <div class="flex items-center gap-3 ">
        <div class="w-10 h-11 rounded-full bg-[#128C7E]/30 flex items-center justify-center text-[#128C7E] font-bold bg-teal-500">
          {{ community.theme.name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2 class="font-semibold">{{ community.theme.name }} Community</h2>
          <p class="text-xs text-gray-400"></p>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-6 element-with-scrollbar" ref="messageList">
    <div
  v-for="post in community.posts"
  :key="post._id"
  class="mb-4"
>
  <div
    :class="[
      'flex items-center gap-3',
      post.userId === currentUserId ? 'justify-end' : 'justify-start'
    ]"
  >
    <!-- 🗑️ Trash Icon (only if it's admin or own post) -->
    <button
      v-if="post.userId === currentUserId || isAdmin"
      @click="communityStore.deletePost(post._id)"
      class="text-red-500 hover:text-red-700 mt-1"
      title="Delete Post"
    >
      <Trash2Icon class="w-5 h-5" />
    </button>

    <!-- 💬 Message Bubble -->
    <div
      :class="[
        'shadow-md p-4 max-w-[60%] text-sm rounded-2xl',
        post.userId === currentUserId
          ? 'bg-[#128C7E] text-white rounded-br-none'
          : 'bg-[#1E2A30] text-white rounded-bl-none'
      ]"
    >
      <img
        v-if="post.imageUrl"
        :src="post.imageUrl"
        alt="Post"
        class="w-full object-cover rounded-md mb-2"
      />
      <p v-if="post.text" class="leading-relaxed whitespace-pre-wrap">{{ post.text }}</p>
      <p class="text-[11px] text-gray-300 mt-2 text-right">
        {{ new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </p>
    </div>
  </div>
</div>



    </div>

    <!-- Message Input -->
    <div class="bg-[#1F2C33] border-t border-gray-700 p-2 sticky bottom-0 z-10">
      <div v-if="newPost.imageFile" class="mb-3 p-3 bg-gray-800 rounded-lg flex items-center justify-between">
        <span class="text-sm">Image selected: {{ newPost.imageFile.name }}</span>
        <button @click="newPost.imageFile = null" class="text-gray-400 hover:text-white">✕</button>
      </div>

      <form @submit.prevent="submitPost" class="flex items-center gap-2">
        <div class="flex-1 flex items-center gap-3 bg-[#2C3A3F] border border-gray-700 rounded-full px-4 py-1">
          <button type="button" @click="$refs.fileInput.click()" class="text-gray-400 hover:text-white">
            <Paperclip class="w-5 h-5" />
          </button>
          <textarea
            v-model="newPost.text"
            rows="1"
            placeholder="Type a message"
            class="flex-1 bg-transparent resize-none focus:outline-none text-white placeholder-gray-400"
          />
          <button
            type="submit"
            :disabled="isPosting || (!newPost.text.trim() && !newPost.imageFile)"
            class="bg-[#128C7E] p-1 rounded-full text-white hover:bg-[#0f6f61] transition"
          >
            <Send class="w-5 h-5" />
          </button>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="hidden"
        />
      </form>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="min-h-screen bg-[#111B1F] flex items-center justify-center">
    <div class="text-gray-400 text-lg">Loading community...</div>
  </div>
</template>

<script setup>
import { ref, watch,nextTick,onMounted,computed } from 'vue'
import { useCommunityStore } from '@/stores/community'
import { api } from '../services/api'
//import imageCompression from 'browser-image-compression'
//import { Paperclip, Send, Trash2Icon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  community: Object
})

const authStore = useAuthStore()
const communityStore = useCommunityStore()
const community = ref(props.community)
const newPost = ref({ text: '', imageFile: null })
const isPosting = ref(false)
const messageList = ref(null)
const currentUserId =computed(() => authStore.user?._id)
const isAdmin = computed(()=>authStore.user.role === 'admin')

const scrollToBottom = () => {
  nextTick(() => {
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight
    }
  })
}

// Scroll after loading or posting
watch(() => community.value?.posts, scrollToBottom)

watch(
  () => props.community,
  (newVal) => {
    community.value = newVal
  },
  { immediate: true }
)

const handleImageUpload = (e) => {
  newPost.value.imageFile = e.target.files[0]
}

const submitPost = async () => {
  isPosting.value = true
  let imageUrl = null

  try {
    if (newPost.value.imageFile) {
      const compressed = await imageCompression(newPost.value.imageFile, {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1024,
        useWebWorker: true
      })

      const formData = new FormData()
      formData.append('image', compressed)

      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      imageUrl = res.data.url
    }

    await communityStore.postMessage(community.value._id, newPost.value.text, imageUrl)
    newPost.value = { text: '', imageFile: null }

    // Refresh posts (optional)
    await communityStore.loadCommunity(community.value._id)
    community.value = communityStore.activeCommunity
  } catch (err) {
    console.error('❌ Failed to post:', err)
  } finally {
    isPosting.value = false
  }
}

onMounted(scrollToBottom)
</script>

<style scoped>
/* Hide scrollbar for Webkit browsers */
.element-with-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>