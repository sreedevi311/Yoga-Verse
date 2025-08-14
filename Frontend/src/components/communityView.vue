<template>
  <div v-if="community" class="flex flex-col h-screen bg-cream-50 text-olive-400">
    <!-- Header -->
    <div class="flex items-center justify-between bg-olive-600 p-2 border-b border-olive-300 sticky top-0 right-0">
      <div class="flex items-center gap-3">
        <div class="w-10 h-11 rounded-full bg-olive-500/30 flex items-center justify-center text-olive-400 font-bold">
          {{ name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2 class="font-semibold text-olive-400">{{ name }}</h2>
          <p class="text-xs text-olive-400/70"></p>
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
            class="text-olive-400 hover:bg-olive-500 hover:text-cream-50 active:bg-olive-500 active:text-cream-50 mt-1 p-1 rounded-full transition-all duration-300"
            title="Delete Post"
          >
            <Trash2Icon class="w-5 h-5" />
          </button>

          <!-- 💬 Message Bubble -->
          <div
            :class="[
              'shadow-md p-4 max-w-[60%] text-sm rounded-2xl',
              post.userId === currentUserId
                ? 'bg-olive-500 text-cream-50 rounded-br-none'
                : 'bg-cream-50 text-olive-400 rounded-bl-none'
            ]"
          >
            <img
              v-if="post.imageUrl"
              :src="post.imageUrl"
              alt="Post"
              class="w-full object-cover rounded-md mb-2"
            />
            <p v-if="post.text" class="leading-relaxed whitespace-pre-wrap">{{ post.text }}</p>
            <p class="text-[11px] text-olive-400/50 mt-2 text-right">
              {{ new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="bg-olive-600 border-t border-olive-300 p-2 sticky bottom-0 z-10">
      <div v-if="newPost.imageFile" class="mb-3 p-3 bg-olive-600 rounded-lg flex items-center justify-between">
        <span class="text-sm text-olive-400">Image selected: {{ newPost.imageFile.name }}</span>
        <button @click="newPost.imageFile = null" class="text-olive-400 hover:bg-olive-500 hover:text-cream-50 active:bg-olive-500 active:text-cream-50 p-1 rounded-full transition-all duration-300">✕</button>
      </div>

      <form @submit.prevent="submitPost" class="flex items-center gap-2">
        <div class="flex-1 flex items-center gap-3 bg-cream-50 border border-olive-300 rounded-full px-4 py-1">
          <button type="button" @click="$refs.fileInput.click()" class="text-olive-400 hover:bg-olive-500 hover:text-cream-50 active:bg-olive-500 active:text-cream-50 p-1 rounded-full transition-all duration-300">
            <Paperclip class="w-5 h-5" />
          </button>
          <textarea
            v-model="newPost.text"
            rows="1"
            placeholder="Type a message"
            class="flex-1 bg-transparent resize-none focus:outline-none text-olive-400 placeholder-olive-400/70"
          />
          <button
            type="submit"
            :disabled="isPosting || (!newPost.text.trim() && !newPost.imageFile)"
            class="bg-olive-500 p-1 rounded-full text-cream-50 hover:bg-olive-600 active:bg-olive-600 transition-all duration-300"
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
  <div v-else class="min-h-screen bg-cream-50 flex items-center justify-center">
    <div class="text-olive-400/70 text-lg">Loading community...</div>
  </div>
</template>

<script setup>
import { ref, watch,nextTick,onMounted,computed } from 'vue'
import { useCommunityStore } from '@/stores/community'
import { api } from '../services/api'
//import imageCompression from 'browser-image-compression'
//import { Paperclip, Send, Trash2Icon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
const name=ref('Yoga Community')
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

/* Theme colors */
.bg-cream-50 {
  background-color: #FFF8E7;
}
.bg-olive-600 {
  background-color: #4B5E40;
}
.bg-olive-500 {
  background-color: #5A6F4A;
}
.text-olive-400 {
  color: #6B7A56;
}
.text-olive-400\/70 {
  color: rgba(107, 122, 86, 0.7);
}
.text-olive-400\/50 {
  color: rgba(107, 122, 86, 0.5);
}
.border-olive-300 {
  border-color: #A8B99A;
}
.text-cream-50 {
  color: #FFF8E7;
}
</style>