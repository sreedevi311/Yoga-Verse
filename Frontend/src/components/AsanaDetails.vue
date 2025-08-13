<template>
  <transition name="fade">
    <div v-if="asana" class="min-h-screen bg-cream-50 text-gray-900 px-4 py-8 md:px-16 font-sans">
      <button
        class="mb-4 text-olive-400 hover:text-olive-600 font-semibold"
        @click="$router.back()"
      >
        ← Back to Library
      </button>

      <div class="flex flex-col md:flex-row gap-6 animate-fade-in">
        <div class="flex-1 flex flex-col">
          <div
            class="relative group neon-border rounded-xl overflow-hidden mb-4"
            @mouseenter="hoveredImage = true"
            @mouseleave="hoveredImage = false"
          >
            <img
              :src="asana.image_url"
              :alt="asana.asana_name"
              class="rounded-xl w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500"
              @load="loaded = true"
            />
            <div
              class="absolute bottom-2 left-2 flex flex-row gap-2 transition-all duration-500 z-10"
              :class="{'translate-x-0': loaded, '-translate-x-full': !loaded}"
            >
              <div class="bg-olive-600/90 text-xl font-bold px-2 py-1 rounded-xl text-white">{{ asana.category }}</div>
            </div>
            <div
              v-if="hoveredImage"
              class="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 z-20"
            >
              <div class="flex gap-4">
                <button
                  @click="playNarration(asana._id)"
                  class="bg-olive-600 hover:bg-olive-700 text-white px-4 py-2 rounded-full font-medium flex items-center gap-1 transition-all"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-6-6v12l6-6z" />
                  </svg>
                  Read History
                </button>
                <button
                  @click="practiceWithAI(asana._id)"
                  class="bg-olive-600 hover:bg-olive-700 text-white px-4 py-2 rounded-full font-medium flex items-center gap-1 transition-all"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10" />
                  </svg>
                  Practice with AI
                </button>
              </div>
            </div>
          </div>
          <audio ref="audioPlayer" controls class="mt-4" v-if="audioUrl">
            <source :src="audioUrl" type="audio/mpeg" />
          </audio>
        </div>

        <div class="w-full md:w-[420px] h-[450px] bg-cream-100 neon-border rounded-xl p-6 shadow-lg space-y-4 overflow-y-auto sidebar">
          <div>
            <strong class="text-olive-400">🧘Asana Name:</strong>
            <span class="text-olive-300"> {{ asana.asana_name }}</span>
          </div>
          <div>
            <strong class="text-olive-400">📜Sanskrit Meaning:</strong>
            <span class="text-olive-300"> {{ asana.sanskrit_meaning }}</span>
          </div>
          <div>
            <strong class="text-olive-400">🌍Origin:</strong>
            <span class="text-olive-300"> {{ asana.origin }}</span>
          </div>
          <div>
            <strong class="text-olive-400">📖Historical Background:</strong>
            <span class="text-olive-300"> {{ asana.historical_background }}</span>
          </div>
          <div>
            <strong class="text-olive-400">✅Benefits:</strong>
            <ul class="text-olive-300 list-disc pl-5">
              <li v-for="benefit in asana.benefits" :key="benefit">{{ benefit }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      asana: null,
      audioUrl: null,
      loaded: false,
      hoveredImage: false
    };
  },
  methods: {
    async fetchAsana() {
      const id = this.$route.params.id;
      try {
        const res = await fetch(`http://localhost:5000/yoga-verse/asanas/${id}`);
        if (!res.ok) throw new Error("Network response was not OK");
        this.asana = await res.json();
      } catch (err) {
        console.error("Fetch error:", err);
      }
    },
    async playNarration(id) {
      try {
        const res = await fetch(`http://localhost:5000/yoga-verse/asanas/${id}/tts`);
        if (!res.ok) throw new Error("Network response was not OK");
        const blob = await res.blob();
        this.audioUrl = URL.createObjectURL(blob);
        this.$refs.audioPlayer.play();
      } catch (err) {
        console.error("Narration error:", err);
      }
    },
    practiceWithAI(id) {
      // Placeholder for Practice with AI functionality
      console.log(`Practice with AI for asana ID: ${id}`);
    },
  },
  mounted() {
    this.fetchAsana();
  },
};
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Fade In Animation */
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Neon Border */
.neon-border {
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.3s ease;
}
.neon-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  background: linear-gradient(45deg, #6B7A56, #4B5E40) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  pointer-events: none;
}
.neon-border:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(107, 122, 86, 0.3);
}
.sidebar {
  box-shadow: 0 10px 25px rgba(107, 122, 86, 0.3);
}
/* Button Hover Effect */
button {
  transition: all 0.3s ease;
}
button:hover {
  transform: scale(1.05);
}

/* Cream and Olive Green Color Definitions */
.bg-cream-50 {
  background-color: #FFF8E7;
}
.bg-cream-100 {
  background-color: #FDF5E6;
}
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
.text-olive-300 {
  color: #8A9A76;
}
</style>