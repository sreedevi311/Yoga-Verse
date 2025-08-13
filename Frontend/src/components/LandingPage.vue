<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
  <section class="relative h-screen flex flex-col overflow-hidden">
  <!-- Background Image -->
  <div class="absolute inset-0">
    <img 
      src="https://www.rishikulyogshalarishikesh.com/blog/wp-content/uploads/2023/09/Balasana.jpg" 
      alt="Yoga pose"
      class="w-full h-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
  </div>

  <!-- Navbar -->
  <nav class="absolute top-6 left-1/2 -translate-x-1/2 flex items-center justify-between px-8 py-3 bg-white/30 backdrop-blur-md border border-white/50 rounded-full w-[92%] max-w-6xl z-20">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
        <div class="w-6 h-6 border-2 border-white rounded-sm rotate-45"></div>
      </div>
      <span class="font-medium text-white text-lg tracking-wide">YogaVerse</span>
    </div>
    
    
    <button class="px-6 py-2 rounded-full text-sm font-medium border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
      Login
    </button>
  </nav>

  <!-- Hero Text -->
  <div class="relative z-20 mt-40 ml-16 max-w-2xl text-white">
    <h1 class="text-6xl md:text-7xl font-thin mb-6 leading-tight tracking-tight">
    Welcome to YogaVerse <br />
    <span class="italic font-light">Discover Your Inner Universe</span>
  </h1>
    <p class="text-xl mb-10 text-white/90 max-w-xl leading-relaxed font-light">
      Step into a space where mind, body, and breath flow in harmony.
    </p>
    <button class="bg-white text-gray-900 px-10 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
      Get Started
    </button>
  </div>

</section>


    <!-- Yoga Practices Section -->
    <section class="py-24 px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Text Card -->
          <div class="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-10 flex flex-col justify-center shadow-sm">
  <h2 class="text-3xl font-thin text-gray-900 mb-6 leading-tight">
    Explore the<br />
    <span class="italic">Asanas Library</span>
  </h2>
  <p class="text-gray-700 text-sm leading-relaxed font-light">
    Browse a rich library of yoga asanas with filters for type, difficulty, and benefits. View detailed instructions, history, and videos for each pose to enhance your practice.
  </p>
</div>

          
          <!-- Practice Cards -->
          <div class="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Hatha Yoga" 
              class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-8 left-8 text-white">
              <h3 class="text-xl font-medium mb-2 tracking-wide">Hatha Yoga</h3>
              <p class="text-sm text-white/80 font-light">Traditional slow practice</p>
            </div>
          </div>
          
<div class="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
  <img 
    src="https://hellomyyoga.com/blog/wp-content/uploads/2023/03/vinayasa-yoga-1.jpg" 
    alt="Vinyasa Yoga" 
    class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
  />

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-8 left-8 text-white">
              <h3 class="text-xl font-medium mb-2 tracking-wide">Vinyasa Yoga</h3>
              <p class="text-sm text-white/80 font-light">Dynamic flow with breath</p>
            </div>
          </div>
          
          <div class="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Ashtanga Yoga" 
              class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-8 left-8 text-white">
              <h3 class="text-xl font-medium mb-2 tracking-wide">Ashtanga Yoga</h3>
              <p class="text-sm text-white/80 font-light">Powerful sequence practice</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Classes Section -->
    <!-- Section 1: Introductory Classes Section -->
<section class="py-24 px-8 bg-white">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
      
      <!-- AI Practice Text -->
      <div>
        <h2 class="text-5xl font-thin text-gray-900 mb-8 leading-tight tracking-tight">
          AI-Powered <span class="italic">Yoga Practice</span>
        </h2>
        <p class="text-gray-600 mb-10 text-lg leading-relaxed font-light">
          Experience real-time posture correction using advanced AI.  
          Our system uses your device’s camera to analyze your form,  
          guide you into perfect alignment, and help you improve safely over time.
        </p>
        <button class="bg-gray-900 text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Start AI Practice
        </button>
      </div>

      <!-- AI Practice Image -->
      <div class="relative">
        <div class="absolute -inset-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl opacity-30 blur-lg"></div>
        <img 
          src="https://deeplobe.ai/wp-content/uploads/2023/04/Deeplobe-Pose-Detection-Yoga-Image-1024x683.png" 
          alt="AI posture correction yoga" 
          class="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl"
        />
      </div>

    </div>
  </div>
</section>


<!-- Section 2: Core Features Grid -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Heading -->
    <h2 class="text-3xl font-bold text-gray-900 mb-10 text-center">
      Core Features
    </h2>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Asanas Library -->
      <div
        class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <div
          class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
        >
          <svg
            class="w-7 h-7 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <h3 class="font-medium text-gray-900 mb-3 text-lg">Asanas Library</h3>
        <p class="text-sm text-gray-600 leading-relaxed font-light">
          Browse a rich library of yoga asanas with filters for type, difficulty,
          and benefits. View detailed history, instructions, and videos for each
          pose.
        </p>
      </div>

      <!-- AI Practice -->
      <div
        class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <div
          class="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
        >
          <svg
            class="w-7 h-7 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="font-medium text-gray-900 mb-3 text-lg">AI Practice</h3>
        <p class="text-sm text-gray-600 leading-relaxed font-light">
          Practice with real-time AI posture correction using your device’s
          camera. Track progress and improve with each guided session.
        </p>
      </div>

      <!-- Events -->
      <div
        class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <div
          class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
        >
          <svg
            class="w-7 h-7 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-6H3v6a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 class="font-medium text-gray-900 mb-3 text-lg">Events</h3>
        <p class="text-sm text-gray-600 leading-relaxed font-light">
          Discover upcoming yoga events near you. Filter by date, location, and
          type, and join directly from the event details page.
        </p>
      </div>

      <!-- Practitioners -->
      <div
        class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        <div
          class="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
        >
          <svg
            class="w-7 h-7 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 class="font-medium text-gray-900 mb-3 text-lg">Practitioners</h3>
        <p class="text-sm text-gray-600 leading-relaxed font-light">
          Connect with certified yoga practitioners. View detailed profiles,
          bios, and join private or group sessions.
        </p>
      </div>
    </div>
  </div>
</section>


    <!-- Instructors Section -->
    <section class="py-24 px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Text Card -->
          <div class="bg-gradient-to-br from-emerald-800 to-green-900 rounded-3xl p-10 flex flex-col justify-center text-white shadow-xl">
            <h2 class="text-3xl font-thin mb-6 leading-tight">
              Meet Our<br />
              Expert<br />
              <span class="italic font-light">Instructors</span>
            </h2>
            <p class="text-green-100 text-sm leading-relaxed font-light opacity-90">
              Experienced and deeply talented instructors who will guide your transformative journey to discover inner peace and physical strength.
            </p>
          </div>
          
          <!-- Instructor Cards -->
          <div class="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Lala Sundara" 
              class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-8 left-8 text-white">
              <h3 class="text-xl font-medium mb-2 tracking-wide">Lala Sundara</h3>
              <p class="text-sm text-white/80 font-light">Hatha Yoga Master</p>
            </div>
          </div>
          
          <div class="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Ethan Harmony" 
              class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-8 left-8 text-white">
              <h3 class="text-xl font-medium mb-2 tracking-wide">Ethan Harmony</h3>
              <p class="text-sm text-white/80 font-light">Vinyasa Flow Expert</p>
            </div>
          </div>
          
          <div class="relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Sophie Light" 
              class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-8 left-8 text-white">
              <h3 class="text-xl font-medium mb-2 tracking-wide">Sophie Light</h3>
              <p class="text-sm text-white/80 font-light">Meditation & Mindfulness Guide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 px-8 bg-white">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <!-- Text Content -->
    <div>
      <h2 class="text-5xl font-thin text-gray-900 mb-8 leading-tight tracking-tight">
        Discover Upcoming <br />
        <span class="italic">Yoga Events</span> Near You
      </h2>
      <p class="text-gray-600 mb-10 text-lg leading-relaxed font-light">
        Stay connected with the vibrant yoga community. Find events by date, location, and style to deepen your practice and meet fellow enthusiasts. Join workshops, retreats, and local gatherings with ease.
      </p>
      <button
        class="bg-purple-700 text-white px-10 py-4 rounded-full font-medium hover:bg-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Explore Events
      </button>
    </div>

    <!-- Image Content -->
    <div class="relative">
      <div class="absolute -inset-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-3xl opacity-30 blur-lg"></div>
      <img
        src="https://images.303magazine.com/uploads/2017/06/18278607_1070291076437518_4452175960629823528_o.jpg"
        alt="Yoga event group"
        class="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl"
      />
    </div>
  </div>
</section>


    <!-- Community Section -->
   <section class="py-24 px-8 bg-white">
  <div class="max-w-7xl mx-auto text-center">
    <h2 class="text-5xl font-thin text-gray-900 mb-6 tracking-tight">
      Join & Build Your Own<br />
      <span class="italic">Thriving Wellness Community</span>
    </h2>
    
    <div class="flex justify-center items-center space-x-6 mb-16">
      <div class="flex -space-x-3">
        <img class="w-12 h-12 rounded-full border-4 border-white shadow-lg" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..." alt="" />
        <img class="w-12 h-12 rounded-full border-4 border-white shadow-lg" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?..." alt="" />
        <img class="w-12 h-12 rounded-full border-4 border-white shadow-lg" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?..." alt="" />
        <div class="w-12 h-12 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center">
          <span class="text-xs text-gray-600 font-medium">+2k</span>
        </div>
      </div>
      <p class="text-gray-600 max-w-md leading-relaxed font-light">
        Join thousands of happy members—or start your own group—and share your wellness journey with a supportive network of like-minded individuals.
      </p>
    </div>
    
    
  </div>
</section>



    <!-- Footer -->
<footer class="bg-gray-900 text-white py-16 px-8">
  <div class="max-w-7xl mx-auto">
    <!-- Top Flex -->
    <div class="flex flex-wrap gap-12 mb-12">
      
      <!-- Logo & About -->
      <div class="flex-1 min-w-[250px] max-w-sm">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div class="w-6 h-6 border-2 border-gray-900 rounded-sm rotate-45"></div>
          </div>
          <span class="font-medium text-lg tracking-wide">YogaVerse</span>
        </div>
        <p class="text-sm text-gray-300 leading-relaxed font-light mb-6">
          Experienced and trained team of yoga professionals ready to help you find perfect balance and harmony in your daily life.
        </p>
        <!-- Social Icons -->
        <div class="flex space-x-2">
          <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557..."/></svg>
          </a>
          <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3..."/></svg>
          </a>
          <a href="#" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396..."/></svg>
          </a>
        </div>
      </div>

      <!-- Resources -->
      <div class="flex-1 min-w-[200px]">
        <h3 class="font-semibold mb-4 text-lg">Resources</h3>
        <ul class="space-y-3 text-sm text-gray-300">
          <li><a href="#" class="hover:text-white transition-colors">Webinar Tips</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Yoga Dictionary</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Pose Library</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Meditation Techniques</a></li>
        </ul>
      </div>

      <!-- Support -->
      <div class="flex-1 min-w-[200px]">
        <h3 class="font-semibold mb-4 text-lg">Support</h3>
        <ul class="space-y-3 text-sm text-gray-300">
          <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      
    </div>

    <!-- Bottom -->
    <div class="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
      <p>© 2024 Harmonia. All Rights Reserved.</p>
      <div class="flex space-x-6 mt-4 md:mt-0">
        <a href="#" class="hover:text-white">Privacy Policy</a>
        <a href="#" class="hover:text-white">Terms</a>
        <a href="#" class="hover:text-white">Cookies</a>
      </div>
    </div>
  </div>
</footer>

  </div>
</template>

<script>
export default {
  name: 'HarmoniaTemplate',
  data() {
    return {
      isMenuOpen: false
    }
  },
  mounted() {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add scroll effect to navigation
    let lastScroll = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.classList.add('shadow-lg');
        nav.classList.remove('shadow-sm');
      } else {
        nav.classList.remove('shadow-lg');
        nav.classList.add('shadow-sm');
      }
      
      lastScroll = currentScroll;
    });

    console.log('Harmonia template loaded with enhanced features');
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
</script>

<style scoped>
/* Enhanced custom styles */
.backdrop-blur-md {
  backdrop-filter: blur(8px);
}

/* Smooth animations for cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Enhanced gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #374151, #1f2937);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Subtle shadow variations */
.shadow-soft {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.shadow-soft-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Button hover effects */
.btn-hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Enhanced card hover effects */
.card-hover {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

/* Text selection styling */
::selection {
  background: rgba(34, 197, 94, 0.2);
  color: #1f2937;
}

/* Focus styles for accessibility */
button:focus,
input:focus,
a:focus {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Responsive image optimization */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>