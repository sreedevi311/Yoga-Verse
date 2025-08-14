<template>
  <div class="min-h-screen bg-[#f8f4ef]">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="relative container mx-auto px-4 py-20 text-center">
        <div class="flex items-center justify-center gap-2 mb-6">
          <Sparkles class="h-8 w-8 text-[#6b4f3f]" />
          <span class="text-lg px-4 py-2 bg-[#efe8df] text-[#6b4f3f] border border-[#ddd2c0] rounded-full font-medium">
            AI-Powered Practice
          </span>
        </div>

        <h1 class="text-5xl md:text-7xl font-bold text-[#4b3a2e] mb-6 leading-tight">
          Yoga AI Practice
          <span class="block text-[#9b7c5f]">Real-Time Feedback</span>
        </h1>

        <div class="max-w-2xl mx-auto mb-8">
          <img
            src="https://media.istockphoto.com/id/1068737028/photo/yoga-silhouette-of-woman-meditating-on-the-beach.webp?a=1&b=1&s=612x612&w=0&k=20&c=DR0i4FcbIHd6RuwRFOgeOeLz7vxbwocQK5JGL1B1Wv8="
            alt="Peaceful yoga practice at sunrise"
            class="w-full h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <blockquote class="text-2xl md:text-3xl text-[#9b7c5f] font-medium mb-8 italic">
          "Find your balance, flow with your breath."
        </blockquote>

        <button
          class="bg-[#6b4f3f] hover:bg-[#5a3f2f] text-[#fdf7f0] px-8 py-4 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
        >
          Start Your Journey Today
        </button>
      </div>
    </section>

    <!-- Asanas Gallery Section -->
    <section class="py-20 bg-[#efe8df]">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <h2 class="text-4xl md:text-5xl font-bold text-[#4b3a2e] mb-4">Practice Asanas</h2>
          <p class="text-xl text-[#9b7c5f] max-w-2xl mx-auto">
            Discover traditional yoga poses with AI-guided feedback to perfect your practice
          </p>
        </div>

        <!-- Search Input -->
        <div class="max-w-md mx-auto mb-12">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search asanas..."
            class="w-full px-4 py-3 rounded-full border border-[#ddd2c0] focus:outline-none focus:ring-2 focus:ring-[#6b4f3f]"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(asana, index) in filteredAsanas"
            :key="index"
            class="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-[#fdf7f0] rounded-lg"
          >
            <div class="relative overflow-hidden">
              <img
                :src="asana.image"


                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div class="absolute top-4 right-4">
                <span class="bg-[#6b4f3f] text-[#fdf7f0] px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Clock class="h-3 w-3" />
                  {{ asana.duration }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <div class="mb-4">
                <h3 class="text-xl font-bold text-[#4b3a2e] mb-1">{{ asana.name }}</h3>
                <p class="text-sm text-[#9b7c5f] font-medium">{{ asana.englishName }}</p>
              </div>

              <p class="text-[#6b4f3f] mb-6 leading-relaxed">{{ asana.benefits }}</p>

              <button
                @click="startPractice(asana)"
                class="w-full bg-[#6b4f3f] hover:bg-[#5a3f2f] text-[#fdf7f0] rounded-full py-3 font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Play class="h-4 w-4" />
                Start Practice
              </button>
            </div>
          </div>
        </div>

        <!-- Modal for ML Feedback -->
        <div v-if="currentAsana" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-2xl w-full relative">
            <button @click="currentAsana = null" class="absolute top-2 right-2 text-xl font-bold">&times;</button>
            <h2 class="text-2xl font-bold mb-4">{{ currentAsana.name }} Feedback</h2>
            <img :src="currentAsana.mlImage" alt="Live Feedback" class="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 bg-[#9b7c5f]">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-3xl md:text-4xl font-bold text-[#fdf7f0] mb-4">Ready to Transform Your Practice?</h3>
        <p class="text-xl text-[#efe8df] mb-8 max-w-2xl mx-auto">
          Join thousands of practitioners using AI-powered feedback to enhance their yoga journey
        </p>
        <button
          class="bg-[#fdf7f0] text-[#6b4f3f] hover:bg-[#fff8f0] px-8 py-4 text-lg rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Get Started Now
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Sparkles, Clock, Play } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const asanas = [
  {
    name: "Tadasana",
    englishName: "Mountain Pose",
    benefits: "Improves posture, strengthens thighs, and enhances balance",
    duration: "1-2 min",
    image: "https://tse1.mm.bing.net/th/id/OIP.KY-_niMGIOTrwWZxuRxBYwHaFE?pid=Api&P=0&h=180",
    mlImage: "http://localhost:8000/tadasana-feed",
  },
  {
    name: "Bhujangasana",
    englishName: "Cobra Pose",
    benefits: "Strengthens spine, opens chest, and reduces stress",
    duration: "30-60 sec",
    image: "https://tse2.mm.bing.net/th/id/OIP.4KWzm9qpeYw6Qfzn1QjlhQHaEK?pid=Api&P=0&h=180",
    mlImage: "http://localhost:8000/bhujangasana-feed",
  },
  {
    name: "Vrikshasana",
    englishName: "Tree Pose",
    benefits: "Improves balance, strengthens legs, and calms the mind",
    duration: "30-60 sec",
    image: "https://tse3.mm.bing.net/th/id/OIP.9OoOwlOiIIK5tiR_rQMfNQHaE8?pid=Api&P=0&h=180",
    mlImage: "http://localhost:8000/vrikshasana-feed",
  },
  {
    name: "Adho Mukha Svanasana",
    englishName: "Downward Dog",
    benefits: "Strengthens arms, stretches hamstrings, energizes body",
    duration: "1-3 min",
    image: "https://tse1.mm.bing.net/th/id/OIP.CCkUgNiDhIBsegr8HJwZTgHaE8?pid=Api&P=0&h=180",
    mlImage: "http://localhost:8000/downward-dog-feed",
  },
  {
    name: "Balasana",
    englishName: "Child's Pose",
    benefits: "Relieves stress, stretches hips, calms nervous system",
    duration: "1-5 min",
    image: "https://tse1.mm.bing.net/th/id/OIP.EG9_7DzwVUhJMk5hl-zR-QHaE7?pid=Api&P=0&h=180",
    mlImage: "http://localhost:8000/balasana-feed",
  },
  {
    name: "Warrior I",
    englishName: "Virabhadrasana I",
    benefits: "Builds strength, improves focus, opens hips and chest",
    duration: "30-60 sec",
    image: "https://tse4.mm.bing.net/th/id/OIP.NwIbrERMOewXDZ38uLSO2gHaD0?pid=Api&P=0&h=180",
    mlImage: "http://localhost:8000/warrior1-feed",
  },
]

const searchQuery = ref('')
const currentAsana = ref(null)

const filteredAsanas = computed(() => {
  if (!searchQuery.value) return asanas
  return asanas.filter(asana =>
    asana.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    asana.englishName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    asana.benefits.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const startPractice = (asana) => {
  currentAsana.value = asana
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>