<template>
  <!--
    YogaEventsImageLeftModal.vue
    - Vue 3 Single File Component (Options API)
    - Tailwind CSS
    - Grid of yoga event cards (>=12)
    - Click card -> open modal
    - Modal layout:
        LEFT: main image only (no overlay text)
        RIGHT: details panel with When, Where, Organizer, Seats, Interested
        BELOW IMAGE: About This Event (multi-paragraph)
    - Modal is scrollable (max-h + overflow-y-auto)
    - No "logo" on event cards (per request)
  -->
  <div class="min-h-screen bg-white text-gray-900 relative selection:bg-green-100 selection:text-green-900">

    <!-- Decorative background (muted) -->
    <div aria-hidden="true" class="absolute inset-0 -z-10 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1920&auto=format&fit=crop"
        alt=""
        class="w-full h-full object-cover object-center opacity-8 filter blur-sm"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-white/95"></div>
    </div>

    <!-- Header -->
    <header class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-6">
      <div class="flex items-start justify-between gap-6">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight">Yoga Events</h1>
          <p class="mt-2 text-sm text-gray-600 max-w-2xl">Discover local yoga gatherings, workshops and restorative sessions. Click any event to view details.</p>
        </div>

        <div class="text-sm text-gray-600 mt-1">
          <div>Events: <span class="font-semibold text-gray-900">{{ totalEvents }}</span></div>
          <div class="mt-1">Groups: <span class="font-semibold text-gray-900">{{ groupCount }}</span></div>
        </div>
      </div>
    </header>

    <!-- Main content: grouped sections with event cards -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      <section
        v-for="(group, gi) in groupedSections"
        :key="group.id"
        class="mb-16"
      >
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">{{ group.title }}</h2>
            <p class="mt-1 text-sm text-gray-600">{{ group.subtitle }}</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="rounded-lg bg-green-50 px-3 py-2 text-green-700 font-medium">{{ group.events.length }} events</div>
            <button @click="scrollToGroup(gi)" class="rounded-full border px-3 py-2 text-sm hover:bg-gray-50">Explore</button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="ev in group.events"
            :key="ev.id"
            class="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm transition-transform hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg cursor-pointer"
            tabindex="0"
            @click="openDetails(ev)"
            @keydown.enter.prevent="openDetails(ev)"
            role="button"
            :aria-label="`View details for ${ev.title}`"
          >
            <div class="h-44 overflow-hidden rounded-t-2xl bg-gray-100">
              <img :src="ev.image" :alt="ev.title" class="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-105" />
            </div>

            <div class="p-5">
              <!-- title and theme only (no logo) -->
              <h3 class="text-base font-semibold text-gray-900 truncate" :title="ev.title">{{ ev.title }}</h3>
              <p class="mt-1 text-sm text-gray-600 truncate">{{ ev.theme }}</p>

              <div class="mt-3 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"/></svg>
                  <span>{{ formatDate(ev.start) }} • {{ formatTime(ev.start) }}</span>
                </div>

                <div class="flex items-center gap-2 mt-2 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 10c0 7-9 11-9 11S3 17 3 10a9 9 0 1118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span class="truncate">{{ ev.city }} • {{ ev.address }}</span>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-between">
                <div class="text-xs text-gray-500">
                  <span>{{ ev.spots }} seats</span>
                </div>

                <div class="flex items-center gap-2">
                  <button @click.stop="openDetails(ev)" class="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none">View</button>

                  <button
                    @click.stop="toggleLike(ev)"
                    :aria-pressed="isLiked(ev)"
                    class="rounded-lg p-2 hover:bg-gray-100"
                    :title="isLiked(ev) ? 'Unlike' : 'Like this event'"
                  >
                    <svg v-if="isLiked(ev)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.657 0L10 6.343l1.172-1.171a4 4 0 115.657 5.657L10 18.657l-6.829-6.828a4 4 0 010-5.657z" clip-rule="evenodd" /></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3.172 5.172a4 4 0 015.657 0L12 8.343l3.172-3.171a4 4 0 115.657 5.657L12 21.657 3.172 10.829a4 4 0 010-5.657z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <!-- bottom bar (show most recently liked) -->
    <div v-if="likedList.length" class="fixed left-4 right-4 bottom-6 z-50 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/5 max-w-7xl mx-auto">
      <div class="flex items-center gap-3">
        <div class="h-14 w-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <img :src="mostRecentLiked?.image" alt="" class="w-full h-full object-cover object-center" />
        </div>
        <div>
          <div class="text-sm font-semibold text-gray-900">{{ mostRecentLiked?.title }}</div>
          <div class="text-xs text-gray-500">{{ mostRecentLiked?.city }} — {{ formatDate(mostRecentLiked?.start) }}</div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="openDetails(mostRecentLiked)" class="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">View</button>
        <button @click="unlikeMostRecent" class="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">Unlike</button>
      </div>
    </div>

    <!-- ===========================
         Modal: single image left (no overlay text),
         details on right, about below image
         Scrollable: max-h-[90vh] overflow-y-auto
         =========================== -->
    <div
      v-if="details.open"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      @keydown.escape.prevent="closeDetails"
    >
      <!-- overlay / scrim -->
      <div class="absolute inset-0 bg-black/40" @click="closeDetails"></div>

      <!-- modal panel -->
      <div class="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl ring-1 ring-black/10">
        <!-- header -->
        <div class="flex items-start justify-between p-6 border-b">
          <div>
            <h2 id="modal-title" class="text-2xl font-semibold">{{ details.ev?.title }}</h2>
            <p class="mt-1 text-sm text-gray-600">{{ details.ev?.theme }}</p>
          </div>

          <div class="text-sm text-gray-500">
            <div>Interested: <span class="font-semibold text-gray-900">{{ details.ev?.interested }}</span></div>
            <div class="mt-2">
              <button @click="copyEventInfo(details.ev)" class="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50">Copy details</button>
            </div>
          </div>
        </div>

        <!-- content: image left (no text overlay), details right, about below -->
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- IMAGE COLUMN -->
            <div class="flex items-center justify-center">
              <div class="h-80 md:h-[420px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm flex items-center justify-center">
                <img
                  :src="details.ev?.gallery?.[0] || details.ev?.image"
                  :alt="details.ev?.title"
                  class="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <!-- DETAILS COLUMN (right) -->
            <aside class="flex flex-col justify-between">
              <div class="space-y-4">
                <div class="rounded-lg bg-gray-50 p-4">
                  <div class="text-xs text-gray-500">When</div>
                  <div class="mt-1 font-medium text-gray-900">{{ formatDate(details.ev?.start) }}</div>
                  <div class="mt-1 text-sm text-gray-700">{{ formatTime(details.ev?.start) }}</div>
                </div>

                <div class="rounded-lg bg-gray-50 p-4">
                  <div class="text-xs text-gray-500">Where</div>
                  <div class="mt-1 font-medium text-gray-900">{{ details.ev?.city }}</div>
                  <div class="mt-1 text-sm text-gray-700 truncate">{{ details.ev?.address }}</div>
                </div>

                <div class="rounded-lg bg-gray-50 p-4">
                  <div class="text-xs text-gray-500">Organizer</div>
                  <div class="mt-1 font-medium text-gray-900">{{ details.ev?.organizer?.name || '—' }}</div>
                  <div class="mt-1 text-xs text-gray-600">Email: <a :href="`mailto:${details.ev?.organizer?.email}`" class="text-green-600">{{ details.ev?.organizer?.email }}</a></div>
                  <div v-if="details.ev?.organizer?.phone" class="mt-1 text-xs text-gray-600">Phone: <a :href="`tel:${details.ev?.organizer?.phone}`" class="text-green-600">{{ details.ev?.organizer?.phone }}</a></div>
                </div>

                <div class="rounded-lg bg-gray-50 p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-xs text-gray-500">Seats</div>
                      <div class="mt-1 font-medium text-gray-900">{{ details.ev?.spots }}</div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500">Interested</div>
                      <div class="mt-1 font-medium text-gray-900">{{ details.ev?.interested }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-end gap-3">
                <button @click="closeDetails" class="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">Close</button>
              </div>
            </aside>
          </div>

          <!-- BELOW IMAGE: About this event (full width) -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900">About this event</h3>

            <div class="mt-4 prose prose-sm max-w-none text-gray-700">
              <p>
                This immersive yoga session is designed to connect movement, breath, and presence. You’ll explore a thoughtfully sequenced practice that warms the body and opens both shoulders and hips with mindful transitions and clear cueing. The instructor will offer accessible options for beginners while providing variations for more experienced practitioners.
              </p>

              <p>
                We begin with gentle centering and breathwork to prepare the nervous system. The main practice includes a flowing sequence that builds strength and mobility, followed by longer-held restorative postures to calm and balance. Props such as blocks and straps will be available on request.
              </p>

              <p>
                After the practice there is a brief period for community connection and questions. Suitable for all levels; teachers will provide modifications and supportive guidance throughout the session. Please bring a mat, water bottle, and any props you prefer.
              </p>
            </div>

            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="rounded-lg bg-gray-50 p-4">
                <div class="text-xs text-gray-500">What to bring</div>
                <ul class="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li v-for="(item, i) in details.ev?.bring || []" :key="i">{{ item }}</li>
                </ul>
              </div>

              <div class="rounded-lg bg-gray-50 p-4">
                <div class="text-xs text-gray-500">More Info</div>
                <div class="mt-2 text-sm text-gray-700">
                  <p><strong>Duration:</strong> {{ calculateDuration(details.ev?.start, details.ev?.end) }}</p>
                  <p class="mt-1"><strong>Group size:</strong> Up to {{ details.ev?.spots }} participants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- =========================== end modal =========================== -->

    <!-- Toast notification -->
    <div v-if="toast.open" class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div class="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg">{{ toast.text }}</div>
    </div>

    <!-- Footer -->
    <footer class="mt-12 border-t bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-gray-500">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ new Date().getFullYear() }} Harmonia — All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-gray-700">Contact</a>
            <a href="#" class="hover:text-gray-700">Privacy</a>
            <a href="#" class="hover:text-gray-700">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
/*
  YogaEventsImageLeftModal.vue
  - Options API style
  - Contains groupedSections with >= 12 events (sample realistic data)
  - The modal shows a single left image (no overlay text) and a right details panel
  - Modal uses max-h + overflow-y-auto to be scrollable on smaller viewports
  - No price is displayed in the modal (kept per request)
*/
export default {
  name: "YogaEventsImageLeftModal",
  data() {
    return {
      toast: { open: false, text: "", _t: null },

      details: {
        open: false,
        ev: null,
        currentImageIndex: 0
      },

      likedList: [],

      // groupedSections with >=12 events
      groupedSections: [
        {
          id: "group-mumbai",
          title: "Mumbai — Morning & Evening",
          subtitle: "Coastal sessions and restorative evenings",
          events: [
            {
              id: "m1",
              title: "Sunrise Vinyasa at Marine Drive",
              theme: "Energizing flow to start the day",
              city: "Mumbai",
              address: "Marine Drive Promenade",
              start: "2025-09-01T06:30:00",
              end: "2025-09-01T07:45:00",
              spots: 24,
              interested: 42,
              organizer: { name: "Seaside Yoga Collective", email: "hello@seasideyoga.in", phone: "+91-22-1234-5678" },
              bring: ["Mat", "Water bottle", "Light towel"],
              image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop"
              ]
            },
            {
              id: "m2",
              title: "Full Moon Restorative",
              theme: "Restorative and breathwork under the moon",
              city: "Mumbai",
              address: "Bandra Seaface Lawn",
              start: "2025-09-03T19:00:00",
              end: "2025-09-03T20:30:00",
              spots: 18,
              interested: 120,
              organizer: { name: "Moonlight Yoga", email: "moon@moonlight.in", phone: "+91-22-9876-5432" },
              bring: ["Blanket", "Cushion"],
              image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop"
              ]
            },
            {
              id: "m3",
              title: "Core & Balance Workshop",
              theme: "Arm balance breakdown and conditioning",
              city: "Mumbai",
              address: "Kala Studio, Lower Parel",
              start: "2025-09-05T10:00:00",
              end: "2025-09-05T12:00:00",
              spots: 15,
              interested: 30,
              organizer: { name: "Kala Studio", email: "info@kalastudio.in" },
              bring: ["Mat", "Grip towel"],
              image: "https://images.unsplash.com/photo-1552689486-f6773047e643?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1552689486-f6773047e643?q=80&w=1600&auto=format&fit=crop"
              ]
            }
          ]
        },

        {
          id: "group-bengaluru",
          title: "Bengaluru — Evenings & Sound Baths",
          subtitle: "Yin, sound, and calm practices",
          events: [
            {
              id: "b1",
              title: "Yin & Sound Bath Evening",
              theme: "Deep resto + crystal bowls",
              city: "Bengaluru",
              address: "Green Leaf, Indiranagar",
              start: "2025-09-06T18:30:00",
              end: "2025-09-06T20:00:00",
              spots: 20,
              interested: 65,
              organizer: { name: "Green Leaf Yoga", email: "contact@greenleaf.in", phone: "+91-80-2345-6789" },
              bring: ["Mat", "Socks"],
              image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop"
              ]
            },
            {
              id: "b2",
              title: "Sunset Rooftop Flow",
              theme: "Golden hour vinyasa",
              city: "Bengaluru",
              address: "Rooftop Studio, Koramangala",
              start: "2025-09-15T18:00:00",
              end: "2025-09-15T19:15:00",
              spots: 16,
              interested: 54,
              organizer: { name: "SkyFlow", email: "bookings@skyflow.in" },
              bring: ["Mat", "Water"],
              image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1600&auto=format&fit=crop"
              ]
            }
          ]
        },

        {
          id: "group-delhi",
          title: "Delhi — Workshops & Community",
          subtitle: "Pranayama, ashtanga & park practice",
          events: [
            {
              id: "d1",
              title: "Pranayama for Focus",
              theme: "Breath techniques for concentration",
              city: "Delhi",
              address: "Studio Prana, Hauz Khas",
              start: "2025-09-10T07:30:00",
              end: "2025-09-10T08:30:00",
              spots: 25,
              interested: 90,
              organizer: { name: "Prana Works", email: "hello@pranaworks.in" },
              bring: ["Notebook", "Water"],
              image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop"
              ]
            },
            {
              id: "d2",
              title: "Ashtanga Primary Led",
              theme: "Counted primary series",
              city: "Delhi",
              address: "Mysore Room, Vasant Kunj",
              start: "2025-09-12T06:00:00",
              end: "2025-09-12T07:30:00",
              spots: 18,
              interested: 47,
              organizer: { name: "Mysore Circle", email: "contact@mysore.in" },
              bring: ["Mat", "Towel"],
              image: "https://images.unsplash.com/photo-1526403224745-1f0f8a9f1b30?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1526403224745-1f0f8a9f1b30?q=80&w=1600&auto=format&fit=crop"
              ]
            },
            {
              id: "d3",
              title: "Community Park Yoga",
              theme: "Open all-levels practice",
              city: "Delhi",
              address: "Lodi Garden Lawn",
              start: "2025-09-02T07:00:00",
              end: "2025-09-02T08:00:00",
              spots: 40,
              interested: 210,
              organizer: { name: "Park Yoga Collective", email: "park@collective.in" },
              bring: ["Mat", "Water"],
              image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
              ]
            }
          ]
        },

        {
          id: "group-pune",
          title: "Pune — Community & Meditation",
          subtitle: "Family sessions and guided meditation",
          events: [
            {
              id: "p1",
              title: "Family Yoga Picnic",
              theme: "Partner and kid-friendly playful yoga",
              city: "Pune",
              address: "Koregaon Park",
              start: "2025-09-18T08:30:00",
              end: "2025-09-18T09:30:00",
              spots: 50,
              interested: 180,
              organizer: { name: "Family Yogis", email: "family@yogis.in" },
              bring: ["Snacks", "Mat"],
              image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1600&auto=format&fit=crop"
              ]
            },
            {
              id: "p2",
              title: "Guided Meditation & Sound",
              theme: "Tibetan bowls and stillness",
              city: "Pune",
              address: "Stillness Room, Lane 7",
              start: "2025-09-21T19:00:00",
              end: "2025-09-21T20:00:00",
              spots: 20,
              interested: 78,
              organizer: { name: "Silent Note", email: "hello@silentnote.in" },
              bring: ["Blanket"],
              image: "https://images.unsplash.com/photo-1508873699372-7ae5a3b7f7f8?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1508873699372-7ae5a3b7f7f8?q=80&w=1600&auto=format&fit=crop"
              ]
            }
          ]
        },

        {
          id: "group-hyderabad",
          title: "Hyderabad — Gentle & Prenatal",
          subtitle: "Supportive gentle practices",
          events: [
            {
              id: "h1",
              title: "Prenatal Comfort Flow",
              theme: "Gentle flow for expecting parents",
              city: "Hyderabad",
              address: "Nurture Studio, Jubilee Hills",
              start: "2025-09-08T16:00:00",
              end: "2025-09-08T17:15:00",
              spots: 10,
              interested: 22,
              organizer: { name: "Nurture Studio", email: "care@nurture.com" },
              bring: ["Cushion", "Water"],
              image: "https://images.unsplash.com/photo-1517821365208-3e9a3c8a9a2f?q=80&w=1200&auto=format&fit=crop",
              gallery: [
                "https://images.unsplash.com/photo-1517821365208-3e9a3c8a9a2f?q=80&w=1600&auto=format&fit=crop"
              ]
            }
          ]
        }
      ] // end groupedSections
    };
  },

  computed: {
    totalEvents() {
      return this.groupedSections.reduce((acc, g) => acc + (g.events?.length || 0), 0);
    },
    groupCount() {
      return this.groupedSections.length;
    },
    mostRecentLiked() {
      const id = this.likedList.length ? this.likedList[this.likedList.length - 1] : null;
      if (!id) return null;
      for (const g of this.groupedSections) {
        for (const e of g.events) {
          if (e.id === id) return e;
        }
      }
      return null;
    }
  },

  methods: {
    scrollToGroup(index) {
      const sections = this.$el.querySelectorAll("main > section");
      const el = sections[index];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        this.showToast("Scrolled to section");
      } else {
        this.showToast("Cannot scroll to section");
      }
    },

    openDetails(ev) {
      // deep clone so modal edits don't affect source list
      this.details.ev = JSON.parse(JSON.stringify(ev));
      if (!this.details.ev.gallery || !this.details.ev.gallery.length) {
        this.details.ev.gallery = [this.details.ev.image || ""];
      }
      this.details.currentImageIndex = 0;
      this.details.open = true;

      this.$nextTick(() => {
        // Reset scroll inside modal to top when opening
        const modalPanel = this.$el.querySelector(".relative.z-10");
        if (modalPanel) modalPanel.scrollTop = 0;
      });

      this.showToast(`Opened "${ev.title}"`);
    },

    closeDetails() {
      this.details.open = false;
      this.details.ev = null;
      this.details.currentImageIndex = 0;
    },

    formatDate(iso) {
      if (!iso) return "";
      try {
        const d = new Date(iso);
        return new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(d);
      } catch {
        return iso;
      }
    },

    formatTime(iso) {
      if (!iso) return "";
      try {
        const d = new Date(iso);
        return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(d);
      } catch {
        return iso;
      }
    },

    calculateDuration(start, end) {
      if (!start || !end) return "—";
      try {
        const s = new Date(start);
        const e = new Date(end);
        const ms = e - s;
        if (ms <= 0) return "—";
        const minutes = Math.round(ms / 60000);
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hrs && mins) return `${hrs}h ${mins}m`;
        if (hrs) return `${hrs}h`;
        return `${mins}m`;
      } catch {
        return "—";
      }
    },

    toggleLike(ev) {
      const idx = this.likedList.indexOf(ev.id);
      if (idx === -1) {
        this.likedList.push(ev.id);
        this.showToast("Added to liked events");
      } else {
        this.likedList.splice(idx, 1);
        this.showToast("Removed from liked events");
      }
    },

    isLiked(ev) {
      return this.likedList.includes(ev.id);
    },

    unlikeMostRecent() {
      if (!this.likedList.length) return;
      this.likedList.pop();
      this.showToast("Removed most recent liked event");
    },

    copyEventInfo(ev) {
      if (!ev) {
        this.showToast("No event selected");
        return;
      }
      const txt = [
        ev.title,
        ev.theme,
        `${ev.city} — ${ev.address}`,
        `${this.formatDate(ev.start)} ${this.formatTime(ev.start)}`,
        `Seats: ${ev.spots}`,
        `Interested: ${ev.interested || 0}`
      ].join("\n");

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(txt).then(() => this.showToast("Event details copied"));
      } else {
        const ta = document.createElement("textarea");
        ta.value = txt;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          this.showToast("Event details copied");
        } catch {
          this.showToast("Copy failed");
        }
        document.body.removeChild(ta);
      }
    },

    shareUrl(ev) {
      if (!ev) return "#";
      const slug = encodeURIComponent(String(ev.title || "").toLowerCase().replace(/\s+/g, "-"));
      return `${window.location.origin}/events/${slug}`;
    },

    showToast(txt = "", ms = 1600) {
      this.toast.text = txt;
      this.toast.open = true;
      clearTimeout(this.toast._t);
      this.toast._t = setTimeout(() => (this.toast.open = false), ms);
    }
  }
};
</script>

<style>
/* Small custom touches in addition to Tailwind */

/* smooth lift */
.group:hover {
  transform: translateY(-4px);
  transition: transform 160ms ease;
}

/* center toast */
.fixed.bottom-6.left-1\/2 {
  transform: translateX(-50%);
}

/* visible focus ring */
:focus-visible {
  outline: 2px solid rgba(16,185,129,0.16);
  outline-offset: 2px;
}

/* base prose tweaks */
.prose-sm p {
  margin-top: 0;
  margin-bottom: 0.75rem;
  line-height: 1.55;
}

/* responsive adjustments */
@media (max-width: 640px) {
  .h-80 { height: 260px; }
  .md\:h-\[420px\] { height: 320px; } /* fallback for small screens */
}

/* reduce overscroll bounce on mobile inside modal panel */
.relative.z-10 {
  overscroll-behavior: contain;
}

/* helper: ensure the image column centers its contents vertically */
.grid > .flex.items-center {
  align-items: center;
}

/* backdrop blur fallback (unused now but kept) */
.backdrop-blur-sm {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

/* subtle border color util */
.border-white\/30 {
  border-color: rgba(255,255,255,0.3);
}
</style>
