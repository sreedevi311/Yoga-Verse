<template>
  <div class="p-6 bg-white min-h-screen">
    <header class="text-center mb-10 relative">
      <h1 class="text-4xl font-bold mb-4 text-olive-400 bg-clip-text bg-gradient-to-r from-olive-400 to-olive-600">
        Asana Library
      </h1>
    </header>

    <div v-for="categoryObj in asanas" :key="categoryObj._id" class="mb-12">
      <h2 class="text-xl font-semibold mb-6 text-olive-400">{{ categoryObj._id }}</h2>
      <div class="flex overflow-x-auto space-x-6 pb-4 hide-scrollbar">
        <div 
          v-for="asana in categoryObj.asanas" 
          :key="asana._id"
          @mouseenter="hoveredAsana = asana._id"
          @mouseleave="hoveredAsana = null"
          class="flex-none w-[300px] bg-gray-100/50 border border-gray-300 rounded-xl overflow-hidden transition-transform"
        >
          <div class="relative h-48">
            <img 
              :src="asana.image_url" 
              :alt="asana.asana_name" 
              class="w-full h-full object-cover"
            />
            
            <div 
              v-if="hoveredAsana === asana._id"
              class="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300"
            >
              <button 
                @click="goToDetails(asana._id)"
                class="bg-olive-600 hover:bg-olive-700 text-white px-4 py-2 rounded-full font-medium flex items-center gap-1 transition-all"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore
              </button>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="p-5">
            <h3 class="text-olive-400 text-md font-bold">{{ asana.asana_name }}</h3>
            <span class="text-gray-500 text-xs font-medium">{{ asana.sanskrit_meaning }}</span>
          </div>
        </div>
      </div>
    </div>

    <audio ref="audioPlayer" controls class="mt-4" v-if="audioUrl">
      <source :src="audioUrl" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      asanas: [],
      hoveredAsana: null,
      audioUrl: null,
      loaded: ref(false)
    };
  },
  methods: {
    async fetchAsanas() {
      try {
        const res = await fetch("http://localhost:5000/yoga-verse/asanas");
        if (!res.ok) throw new Error("Network response was not OK");
        this.asanas = await res.json();
      } catch (err) {
        console.error("Fetch error:", err);
      }
    },
    goToDetails(id) {
      this.$router.push(`/asanas/${id}`);
    },
    playNarration(id) {
      // Your existing audio logic
    }
  },
  mounted() {
    this.fetchAsanas();
    setTimeout(() => {
      this.loaded = true;
    }, 100);
  }
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.transition-transform {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.transition-transform:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(107, 122, 86, 0.3);
}

/* Hide Scrollbar */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

/* Olive Green Color Definitions */
.bg-olive-600 {
  background-color: #4B5E40;
}
.bg-olive-700 {
  background-color: #3F4E34;
}
.text-olive-400 {
  color: #6B7A56;
}
.bg-olive-900\/30 {
  background-color: rgba(47, 58, 38, 0.3);
}
</style>