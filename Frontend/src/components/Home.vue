<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="flex items-center justify-between px-8 py-6 bg-white/90 backdrop-blur-md fixed w-full top-0 z-50 border-b border-gray-100">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
          <div class="w-6 h-6 border-2 border-white rounded-sm rotate-45"></div>
        </div>
        <span class="font-medium text-gray-900 text-lg tracking-wide">Harmonia</span>
      </div>
      
      <div class="hidden md:flex items-center space-x-10">
        <a href="#" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">Home</a>
        <a href="#" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">About</a>
        <a href="#" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">Service</a>
        <a href="#" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">Pricings</a>
        <a href="#" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">Blog</a>
      </div>
      
      <button class="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl">
        Sign up
      </button>
    </nav>

    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-start overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>
      <img 
        src="https://www.rishikulyogshalarishikesh.com/blog/wp-content/uploads/2023/09/Balasana.jpg" 
        alt="Yoga pose" 
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      
      <div class="relative z-20 max-w-2xl mx-auto px-8 text-white ml-16">
        <h1 class="text-6xl md:text-7xl font-thin mb-8 leading-[1.1] tracking-tight">
          Your harmony starts<br />
          here - <span class="italic font-light">get involved</span>
        </h1>
        <p class="text-xl mb-10 text-white/90 max-w-xl leading-relaxed font-light">
          Consectetur tellus id egestas. Ut enim tempor metus tellus quis pulvinar commodo malesuada. Mattis facilisis lorem et risus volutpat.
        </p>
        <button class="bg-white text-gray-900 px-10 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
          Try 14 Days Free
        </button>
      </div>
      
      <!-- Stats -->
      <div class="absolute bottom-16 left-8 right-8 z-20">
        <div class="flex justify-between text-white max-w-6xl mx-auto">
          <div class="text-left">
            <div class="text-4xl font-thin mb-2 tracking-wide">5,000<span class="text-2xl">+</span></div>
            <div class="text-sm text-white/70 font-light tracking-wide">Classes Streamed Monthly</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-thin mb-2 tracking-wide">10,000</div>
            <div class="text-sm text-white/70 font-light tracking-wide">Happy Students</div>
          </div>
          <div class="text-right">
            <div class="text-4xl font-thin mb-2 tracking-wide">95<span class="text-2xl">%</span></div>
            <div class="text-sm text-white/70 font-light tracking-wide">Retention Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Yoga Practices Section -->
    <section class="py-24 px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Text Card -->
          <div class="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-10 flex flex-col justify-center shadow-sm">
            <h2 class="text-3xl font-thin text-gray-900 mb-6 leading-tight">
              Discover<br />
              yoga's<br />
              <span class="italic">practices</span>
            </h2>
            <p class="text-gray-700 text-sm leading-relaxed font-light">
              Yoga is not just about asanas and meditation. Find balance and strength in your mind, body and soul through ancient wisdom.
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
              src="https://images.unsplash.com/photo-1506629905607-cb7c900f7676?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
    <section class="py-24 px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 class="text-5xl font-thin text-gray-900 mb-8 leading-tight tracking-tight">
              Classes for Every Level<br />
              and <span class="italic">Intention</span>
            </h2>
            <p class="text-gray-600 mb-10 text-lg leading-relaxed font-light">
              Our classes will help you find balance, improve your flexibility, strengthen and refine your body, and bring peace to your mind through mindful practice.
            </p>
            <button class="bg-gray-900 text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Try 14 Days Free
            </button>
          </div>
          
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl opacity-30 blur-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Yoga meditation" 
              class="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>
        
        <!-- Class Types Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="font-medium text-gray-900 mb-3 text-lg">Medias Tailored for You</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-light">Personalized content and mindful training sessions adapted specifically to your unique needs and goals.</p>
          </div>
          
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div class="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-medium text-gray-900 mb-3 text-lg">Yoga Anytime Anywhere</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-light">Practice yoga at your own pace, in your own space, wherever life takes you in the world.</p>
          </div>
          
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="font-medium text-gray-900 mb-3 text-lg">Expert Instructions</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-light">Learn from certified and highly experienced yoga instructors with decades of practice and wisdom.</p>
          </div>
          
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <svg class="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-medium text-gray-900 mb-3 text-lg">Flexibility on the Go</h3>
            <p class="text-sm text-gray-600 leading-relaxed font-light">Seamlessly access your personalized classes from mobile, tablet, or desktop devices anytime.</p>
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

    <!-- Community Section -->
    <section class="py-24 px-8 bg-white">
      <div class="max-w-7xl mx-auto text-center">
        <h2 class="text-5xl font-thin text-gray-900 mb-6 tracking-tight">
          Wellness from Our<br />
          <span class="italic">Thriving Community</span>
        </h2>
        
        <div class="flex justify-center items-center space-x-6 mb-16">
          <div class="flex -space-x-3">
            <img class="w-12 h-12 rounded-full border-4 border-white shadow-lg" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
            <img class="w-12 h-12 rounded-full border-4 border-white shadow-lg" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
            <img class="w-12 h-12 rounded-full border-4 border-white shadow-lg" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
            <div class="w-12 h-12 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center">
              <span class="text-xs text-gray-600 font-medium">+2k</span>
            </div>
          </div>
          <p class="text-gray-600 max-w-md leading-relaxed font-light">
            Join thousands of happy students who have transformed their lives. Start your wellness journey today - your body and mind will deeply thank you!
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1506629905607-cb7c900f7676?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Community member" 
              class="w-full h-72 object-cover"
            />
            <div class="p-8 text-left">
              <h3 class="font-medium text-gray-900 mb-2 text-lg">Laily R.</h3>
              <p class="text-sm text-gray-500 mb-4 font-light">Yoga Enthusiast • 2 years</p>
              <p class="text-sm text-gray-700 leading-relaxed font-light">
                "Harmonia has completely transformed my approach to wellness. The instructors are incredibly knowledgeable and the community support is amazing!"
              </p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Community member" 
              class="w-full h-72 object-cover"
            />
            <div class="p-8 text-left">
              <h3 class="font-medium text-gray-900 mb-2 text-lg">Sarah M.</h3>
              <p class="text-sm text-gray-500 mb-4 font-light">Beginner Practitioner • 6 months</p>
              <p class="text-sm text-gray-700 leading-relaxed font-light">
                "I was completely new to yoga and felt intimidated, but Harmonia made the journey so welcoming and accessible. Perfect for beginners like me!"
              </p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Community member" 
              class="w-full h-72 object-cover"
            />
            <div class="p-8 text-left">
              <h3 class="font-medium text-gray-900 mb-2 text-lg">Mike J.</h3>
              <p class="text-sm text-gray-500 mb-4 font-light">Advanced Student • 4 years</p>
              <p class="text-sm text-gray-700 leading-relaxed font-light">
                "The incredible variety of classes keeps me motivated every day. I've found an amazing community of like-minded, supportive people here."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- App Download Section -->
    <section class="py-24 px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-5xl font-thin text-gray-900 mb-8 leading-tight tracking-tight">
          Several People Have already<br />
          <span class="italic">Tried the Harmonia App</span>
        </h2>
        
        <div class="mb-12">
          <div class="text-7xl font-thin text-gray-900 mb-4 tracking-wider">
            1.530.21<span class="text-4xl ml-2 text-green-600">↗</span>
          </div>
          <p class="text-gray-600 font-light">Active users this month</p>
        </div>
        
        <button class="bg-gray-900 text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 inline-flex items-center shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
          Try App
          <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 py-20 px-8 text-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <!-- Logo & Contact -->
          <div class="md:col-span-1">
            <div class="flex items-center space-x-3 mb-8">
              <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div class="w-6 h-6 border-2 border-gray-900 rounded-sm rotate-45"></div>
              </div>
              <span class="font-medium text-white text-lg tracking-wide">Harmonia</span>
            </div>
            <p class="text-sm text-gray-300 mb-8 leading-relaxed font-light">
              Experienced and trained team of yoga professionals ready to help you find perfect balance and harmony in your daily life.
            </p>
            <div class="flex space-x-4 mb-8">
              <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
              <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </div>
              <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.001 12.017.001z"/></svg>
              </div>
              <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.056 10.056v3.888h6.664c-.275 1.494-1.056 2.775-2.219 3.612v2.944h3.556c2.081-1.919 3.275-4.744 3.275-8.106 0-.775-.069-1.525-.194-2.244h-10.994v.906h-.088z"/><path d="M12.056 23.056c2.944 0 5.419-1 7.219-2.669l-3.556-2.944c-.981.669-2.244 1.056-3.663 1.056-2.831 0-5.219-1.906-6.081-4.481h-3.669v3.044c1.844 3.681 5.631 6.044 9.75 6.044z"/><path d="M5.975 14.056c-.219-.669-.344-1.375-.344-2.106s.125-1.437.344-2.106v-3.044h-3.669c-.731 1.456-1.156 3.106-1.156 4.906s.425 3.45 1.156 4.906l3.669-2.556z"/><path d="M12.056 4.794c1.594 0 3.025.544 4.156 1.625l3.081-3.081c-1.869-1.731-4.294-2.794-7.237-2.794-4.119 0-7.906 2.363-9.75 6.044l3.669 3.044c.862-2.575 3.25-4.481 6.081-4.481z"/></svg>
              </div>
            </div>
            <div class="border-t border-gray-700 pt-6">
              <p class="text-xl font-medium text-white mb-2">+1 234 567 890</p>
              <p class="text-sm text-gray-400 font-light">hello@harmonia.com</p>
            </div>
          </div>
          
          <!-- Resources -->
          <div>
            <h3 class="font-medium text-white mb-6 text-lg tracking-wide">Resources</h3>
            <ul class="space-y-4 text-sm text-gray-300">
              <li><a href="#" class="hover:text-white transition-colors font-light">Webinar Tips</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Yoga Dictionary</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Pose Library</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Meditation Techniques</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Breathing Exercises</a></li>
            </ul>
          </div>
          
          <!-- Support -->
          <div>
            <h3 class="font-medium text-white mb-6 text-lg tracking-wide">Support</h3>
            <ul class="space-y-4 text-sm text-gray-300">
              <li><a href="#" class="hover:text-white transition-colors font-light">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Help Center</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Terms of Service</a></li>
            </ul>
          </div>
          
          <!-- Company -->
          <div>
            <h3 class="font-medium text-white mb-6 text-lg tracking-wide">Company</h3>
            <ul class="space-y-4 text-sm text-gray-300">
              <li><a href="#" class="hover:text-white transition-colors font-light">About Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Our Story</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Blog</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Careers</a></li>
              <li><a href="#" class="hover:text-white transition-colors font-light">Press Kit</a></li>
            </ul>
          </div>
        </div>
        
        <!-- Bottom Footer -->
        <div class="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div class="flex items-center space-x-1 mb-4 md:mb-0">
            <span class="font-light">Copyright 2024</span>
            <span>•</span>
            <span class="font-light">All Rights Reserved</span>
          </div>
          <div class="flex space-x-8">
            <a href="#" class="hover:text-white transition-colors font-light">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors font-light">Terms & Conditions</a>
            <a href="#" class="hover:text-white transition-colors font-light">Cookie Policy</a>
          </div>
        </div>
        
        <!-- Newsletter Signup -->
        <div class="mt-12 pt-8 border-t border-gray-700">
          <div class="max-w-md mx-auto text-center">
            <h4 class="text-lg font-medium text-white mb-4">Stay Updated</h4>
            <p class="text-sm text-gray-400 mb-6 font-light">Get the latest yoga tips and wellness insights delivered to your inbox.</p>
            <div class="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-full text-white placeholder-gray-400 focus:outline-none focus:border-gray-600 transition-colors"
              />
              <button class="bg-white text-gray-900 px-6 py-3 rounded-r-full font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
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