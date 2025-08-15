<template>
  <div v-if="community" class="flex flex-col h-screen bg-neutral-50 text-green-700">
    <!-- Header -->
    <div class="flex items-center justify-between bg-green-600 p-3 border-b border-green-300 sticky top-0 right-0 shadow-sm">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-700 font-bold text-lg">
          {{ name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2 class="font-semibold text-green-100 text-lg">{{ name }}</h2>
          <p class="text-xs text-green-100/60">Online</p>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-5 space-y-6 element-with-scrollbar" ref="messageList">
      <div
        v-for="post in community.posts"
        :key="post._id"
        class="mb-5"
      >
        <div
          :class="[
            'flex items-start gap-4',
            post.userId === currentUserId ? 'justify-end' : 'justify-start'
          ]"
        >
          <!-- 🗑️ Trash Icon (only if it's admin or own post) -->
          <button
            v-if="post.userId === currentUserId || isAdmin"
            @click="communityStore.deletePost(post._id)"
            class="text-green-700 hover:bg-green-100 hover:text-green-800 active:bg-green-200 active:text-green-900 mt-1 p-1.5 rounded-full transition-all duration-200"
            title="Delete Post"
          >
            <Trash2Icon class="w-5 h-5" />
          </button>

          <!-- 💬 Message Bubble -->
          <div
            :class="[
              'shadow-lg p-5 max-w-[65%] text-sm rounded-3xl transition-all duration-200',
              post.userId === currentUserId
                ? 'bg-green-500 text-white rounded-br-none'
                : 'bg-white text-green-700 rounded-bl-none border border-green-200'
            ]"
          >
            <img
              v-if="post.imageUrl"
              :src="post.imageUrl"
              alt="Post"
              class="w-full object-cover rounded-lg mb-3"
            />
            <p v-if="post.text" class="leading-relaxed whitespace-pre-wrap">{{ post.text }}</p>
            <p class="text-[10px] text-green-400/60 mt-2 text-right">
              {{ new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="bg-green-600 border-t border-green-300 p-3 sticky bottom-0 z-10 shadow-t-sm">
      <div v-if="newPost.imageFile" class="mb-4 p-4 bg-green-700/80 rounded-xl flex items-center justify-between">
        <span class="text-sm text-green-100">Image selected: {{ newPost.imageFile.name }}</span>
        <button @click="newPost.imageFile = null" class="text-green-100 hover:bg-green-800 hover:text-white active:bg-green-900 active:text-white p-1.5 rounded-full transition-all duration-200">✕</button>
      </div>

      <form @submit.prevent="submitPost" class="flex items-center gap-3">
        <div class="flex-1 flex items-center gap-3 bg-white border border-green-300 rounded-full px-4 py-2 shadow-sm">
          <button type="button" @click="$refs.fileInput.click()" class="text-green-700 hover:bg-green-100 hover:text-green-800 active:bg-green-200 active:text-green-900 p-1.5 rounded-full transition-all duration-200">
            <Paperclip class="w-5 h-5" />
          </button>
          <textarea
            v-model="newPost.text"
            rows="1"
            placeholder="Type a message"
            class="flex-1 bg-transparent resize-none focus:outline-none text-green-700 placeholder-green-700/60"
          />
          <button
            type="submit"
            :disabled="isPosting || (!newPost.text.trim() && !newPost.imageFile)"
            class="bg-green-500 p-1.5 rounded-full text-white hover:bg-green-600 active:bg-green-700 transition-all duration-200"
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
  <div v-else class="min-h-screen bg-neutral-50 flex items-center justify-center">
    <div class="text-green-700/70 text-lg animate-pulse">Loading community...</div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, computed } from 'vue'
import { useCommunityStore } from '@/stores/community'
import { api } from '../services/api'
import imageCompression from 'browser-image-compression'
import { Paperclip, Send, Trash2Icon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
const name = ref('Yoga Community')
const props = defineProps({
  community: Object
})

const authStore = useAuthStore()
const communityStore = useCommunityStore()
const community = ref(props.community)
const newPost = ref({ text: '', imageFile: null })
const isPosting = ref(false)
const messageList = ref(null)
const currentUserId = computed(() => authStore.user?._id)
const isAdmin = computed(() => authStore.user.role === 'admin')

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

/* Theme colors */
.bg-neutral-50 {
  background-color: #F9FAFB;
}
.bg-green-600 {
  background-color: #15803D;
}
.bg-green-700 {
  background-color: #166534;
}
.bg-green-500 {
  background-color: #22C55E;
}
.bg-green-200 {
  background-color: #BBF7D0;
}
.bg-green-100 {
  background-color: #DCFCE7;
}
.text-green-700 {
  color: #15803D;
}
.text-green-800 {
  color: #166534;
}
.text-green-900 {
  color: #14532D;
}
.text-green-400 {
  color: #4ADE80;
}
.text-green-100 {
  color: #DCFCE7;
}
.text-green-100\/60 {
  color: rgba(220, 252, 231, 0.6);
}
.text-green-400\/60 {
  color: rgba(74, 222, 128, 0.6);
}
.border-green-300 {
  border-color: #86EFAC;
}
.border-green-200 {
  border-color: #BBF7D0;
}
.text-white {
  color: #FFFFFF;
}
.shadow-t-sm {
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
}
</style>