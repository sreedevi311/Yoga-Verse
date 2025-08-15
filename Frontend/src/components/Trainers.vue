Uncaught SyntaxError: The requested module '/src/services/api.js' does not provide an export named 'default' (at Trainers.vue:275:8)
<template>
  <!--
    =============================================================
    Yoga Practitioners — Profile Grid (Vue 3 + TailwindCSS)
    -------------------------------------------------------------
    • Clean, screenshot-matching theme: white cards, green accents
    • NO filters, NO background images, NO online indicator
    • Multiple practitioner profiles displayed in a responsive grid
    • Each card shows avatar, name, yogi type badge, short bio line,
      email, phone, and a Chat button
    • Accessible pop-up Chat modal (keyboard & ARIA ready)
    • Subtle UX polish: hover elevations, focus rings, toasts,
      copy-to-clipboard for contact info, graceful empty state,
      small helper utilities for time formatting and state handling
    • Single self-contained .vue file (SFC) ~700 lines

    Usage
    -----
    Replace your existing src/App.vue with this file and run:
      npm run dev

    Tailwind
    --------
    This file uses Tailwind utility classes only (no line-clamp plugin).
    Make sure Tailwind is configured in your project.
    =============================================================
  -->

  <div
    class="min-h-screen w-full bg-white text-gray-900 selection:bg-green-200 selection:text-green-900"
  >
    <!-- Skip to main content link -->
    <a
      href="#profiles"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 rounded-md bg-white px-3 py-2 text-sm shadow ring-1 ring-gray-200"
    >Skip to profiles</a>

    <!-- Header / Masthead -->
    <header class="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-4">
          <!-- Brand -->
          <div class="flex items-center gap-3">
            <div class="grid h-10 w-10 place-items-center rounded-xl bg-green-500/10">
              <span class="text-lg font-extrabold text-green-600">Y</span>
            </div>
            <div>
              <h1 class="text-xl font-semibold leading-tight tracking-tight">Yoga Practitioners</h1>
              <p class="text-xs text-gray-500">Certified instructors • Private & Group sessions</p>
            </div>
          </div>

          <!-- Right-side quick actions -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              @click="copyAllContacts"
              aria-label="Copy all contacts"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4"><path d="M9 9h11v11H9z"/><path d="M4 4h11v11H4z"/></svg>
              Copy all
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
              @click="openQuickChat()"
              aria-label="Open quick chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M2.25 12c0-4.556 3.916-8.25 8.75-8.25s8.75 3.694 8.75 8.25-3.916 8.25-8.75 8.25c-1.24 0-2.418-.244-3.491-.686L3 21l1.532-4.02A8.045 8.045 0 012.25 12z"/></svg>
              Quick Chat
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main id="profiles" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Intro / helper text -->
      <section class="mb-6">
        <p class="text-sm text-gray-600">
          Explore our community of yoga practitioners. Each profile includes contact details and a chat option so you can reach out right away.
        </p>
      </section>

      <!-- Grid of profile cards -->
      <section
        role="list"
        aria-label="Practitioner profiles"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <!-- Profile card -->
        <article
          v-for="p in practitioners"
          :key="p.id"
          role="listitem"
          class="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm transition hover:shadow-lg focus-within:shadow-lg"
          tabindex="0"
          @keydown.enter.prevent="openChat(p)"
          :aria-label="`Open chat with ${p.name}`"
        >
          <!-- Compact banner bar (pure color, no image) -->
          <div class="h-1.5 w-full bg-gradient-to-r from-green-500 to-emerald-500"></div>

          <div class="p-5">
            <!-- Top row: avatar + name & type badge -->
            <div class="flex items-start gap-4">
              <img
                :src="p.avatar"
                :alt="`${p.name} avatar`"
                class="h-16 w-16 shrink-0 rounded-xl object-cover ring-2 ring-white shadow"
              />

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2">
                  <h3 class="truncate text-base font-semibold tracking-tight" :title="p.name">{{ p.name }}</h3>

                  <!-- Yogi type badge -->
                  <span
                    class="shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-black/5"
                    :class="yogiTypeClass(p.type)"
                  >
                    {{ p.type }}
                  </span>
                </div>

                <!-- Short one-liner -->
                <p class="mt-1 text-sm text-gray-600 truncate" :title="p.short">{{ p.short }}</p>
              </div>
            </div>

            <!-- Contact rows -->
            <dl class="mt-4 space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4 text-gray-500"><path d="M3 5h18v14H3z"/><path d="M3 7l9 6 9-6"/></svg>
                <dd class="truncate" :title="p.email">
                  <a class="text-gray-700 hover:underline" :href="`mailto:${p.email}`">{{ p.email }}</a>
                </dd>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4 text-gray-500"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.08 4.18 2 2 0 014.06 2h3a2 2 0 012 1.72 12.66 12.66 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.66 12.66 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                <dd>
                  <a class="text-gray-700 hover:underline" :href="`tel:${p.phone}`">{{ p.phone }}</a>
                </dd>
              </div>
            </dl>

            <!-- Actions row -->
            <div class="mt-5 flex items-center justify-between">
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <button
                  type="button"
                  class="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 hover:bg-gray-50"
                  @click="copyContacts(p)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4"><path d="M9 9h11v11H9z"/><path d="M4 4h11v11H4z"/></svg>
                  Copy
                </button>
                <span aria-hidden="true" class="text-gray-300">•</span>
                <span>Replies ~ {{ p.responseTime }}h</span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  @click="openChat(p)"
                >Chat</button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- Empty state (hidden when there are profiles) -->
      <section v-if="!practitioners || practitioners.length === 0" class="mt-12">
        <div class="rounded-2xl border border-dashed p-12 text-center">
          <h3 class="text-lg font-semibold">No practitioners found</h3>
          <p class="mt-1 text-sm text-gray-600">Please check back later.</p>
        </div>
      </section>

      <!-- Toast Notification (copy confirmation) -->
      <div v-if="toast.open" class="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <div class="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg">{{ toast.text }}</div>
      </div>

      <!-- Spacer to keep toast off footer on mobile -->
      <div class="h-10"></div>
    </main>

    <!-- Chat Modal -->
    <div
      v-if="chat.open"
      class="fixed inset-0 z-50 grid place-items-center p-4"
      @keydown.escape.prevent="closeChat"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <!-- Scrim -->
      <div class="absolute inset-0 bg-black/40" @click="closeChat" />

      <!-- Panel -->
      <div
        ref="chatPanel"
        class="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b px-4 py-3">
          <div class="flex items-center gap-3">
            <img :src="chat.peer?.avatar" :alt="chat.peer ? chat.peer.name + ' avatar' : 'Avatar'" class="h-9 w-9 rounded-lg object-cover" />
            <div>
              <h3 id="chat-title" class="text-sm font-semibold">Chat with {{ chat.peer?.name }}</h3>
              <p class="text-xs text-gray-500">Typically replies within {{ chat.peer?.responseTime }}h</p>
            </div>
          </div>
          <button
            class="rounded-xl p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            @click="closeChat"
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="chatScroll" class="max-h-[60vh] overflow-y-auto bg-gray-50 px-4 py-3">
          <div class="mx-auto max-w-md space-y-3">
            <div v-for="m in chat.messages" :key="m.id" class="flex" :class="m.mine ? 'justify-end' : 'justify-start'">
              <div
                class="max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow"
                :class="m.mine ? 'bg-green-600 text-white rounded-br-sm' : 'bg-white rounded-bl-sm'"
              >
                <p class="whitespace-pre-wrap">{{ m.text }}</p>
                <p class="mt-1 text-[10px] opacity-70">{{ m.time }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <form class="flex items-end gap-2 border-t bg-white p-3" @submit.prevent="sendChat()">
          <textarea
            v-model="chat.input"
            rows="1"
            placeholder="Type a message…"
            class="min-h-[40px] max-h-32 flex-1 resize-y rounded-xl border px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            @keydown.enter.exact.prevent="sendChat()"
            aria-label="Message input"
          />
          <button
            type="submit"
            class="inline-flex items-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            :disabled="!chat.input.trim()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M2.25 12l18-9-4.5 9 4.5 9-18-9z"/></svg>
            Send
          </button>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-16 border-t bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-gray-500">
        <p>© {{ new Date().getFullYear() }} Yoga Directory. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { api } from '@/services/api';


export default {
  name: 'App',

  data() {
    return {
      toast: { open: false, text: '', _t: null },
      chat: {
        open: false,
        peer: null,
        input: '',
        messages: [],
      },
      practitioners: [], // now starts empty, will be filled from backend
    };
  },

  mounted() {
    this.fetchPractitioners();
  },

  methods: {
    async fetchPractitioners() {
      try {
        const res = await api.get("/trainers");
        this.practitioners = res.data;
      } catch (err) {
        console.error("Error fetching practitioners:", err);
        this.showToast("Failed to load practitioners");
      }
    },

    openQuickChat() {
      const first = this.practitioners[0];
      if (first) this.openChat(first);
    },

    openChat(p) {
      this.chat.open = true;
      this.chat.peer = p;
      this.chat.messages = [
        { id: 1, text: 'Hi! How can I help you today?', time: this.fmtTime(new Date()), mine: false },
      ];
      this.$nextTick(() => {
        const panel = this.$refs.chatPanel;
        const input = panel?.querySelector('textarea');
        input?.focus();
        this.scrollChatToEnd();
      });
    },

    closeChat() {
      this.chat.open = false;
      this.chat.peer = null;
      this.chat.input = '';
      this.chat.messages = [];
    },

    sendChat() {
      const t = (this.chat.input || '').trim();
      if (!t) return;
      this.chat.messages.push({ id: Date.now(), text: t, time: this.fmtTime(new Date()), mine: true });
      this.chat.input = '';
      this.$nextTick(() => this.scrollChatToEnd());

      setTimeout(() => {
        if (!this.chat.open) return;
        this.chat.messages.push({
          id: Date.now() + 1,
          text: 'Thanks for your message! I will get back shortly.',
          time: this.fmtTime(new Date()),
          mine: false
        });
        this.$nextTick(() => this.scrollChatToEnd());
      }, 850);
    },

    scrollChatToEnd() {
      const scroller = this.$refs.chatScroll;
      if (scroller) scroller.scrollTop = scroller.scrollHeight;
    },

    fmtTime(d) {
      try {
        return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(d);
      } catch (e) {
        return d.toLocaleTimeString();
      }
    },

    copyContacts(p) {
      const text = `${p.name}\n${p.type}\nEmail: ${p.email}\nPhone: ${p.phone}`;
      const done = () => this.showToast('Copied contact info');
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => this.fallbackCopy(text, done));
      } else {
        this.fallbackCopy(text, done);
      }
    },

    copyAllContacts() {
      const block = this.practitioners
        .map((p, idx) => `${idx + 1}. ${p.name} — ${p.type}\n   Email: ${p.email}\n   Phone: ${p.phone}`)
        .join('\n\n');
      const done = () => this.showToast('All contacts copied');
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(block).then(done).catch(() => this.fallbackCopy(block, done));
      } else {
        this.fallbackCopy(block, done);
      }
    },

    fallbackCopy(text, cb) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      cb?.();
    },

    showToast(msg) {
      this.toast.text = msg;
      this.toast.open = true;
      clearTimeout(this.toast._t);
      this.toast._t = setTimeout(() => (this.toast.open = false), 1600);
    },

    yogiTypeClass(type) {
      const map = [
        { match: /vinyasa/i, cls: 'bg-green-50 text-green-700' },
        { match: /ashtanga|power/i, cls: 'bg-emerald-50 text-emerald-700' },
        { match: /restorative|yin/i, cls: 'bg-teal-50 text-teal-700' },
        { match: /iyengar|alignment/i, cls: 'bg-lime-50 text-lime-700' },
        { match: /kundalini/i, cls: 'bg-cyan-50 text-cyan-700' },
        { match: /prenatal/i, cls: 'bg-yellow-50 text-yellow-700' },
        { match: /hatha/i, cls: 'bg-green-50 text-green-700' },
      ];
      const found = map.find((m) => m.match.test(type));
      return (found?.cls || 'bg-gray-100 text-gray-700') + ' select-none';
    },
  },
};
</script>


<style>
/* ==================================================================
   Minimal custom CSS — Tailwind handles most visual styling.
   We add a few helpers and accessibility enhancements here.
   ================================================================== */

/* Screen-reader only (same semantics as Tailwind's sr-only) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Make keyboard focus clearly visible for all interactive elements */
:focus-visible {
  outline: 2px solid rgb(34 197 94 / 0.6); /* green-500 */
  outline-offset: 2px;
}

/* Motion reduction for users who prefer less animation */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Scrollbar polish for chat area (WebKit/Chromium) */
/* Optional, safe to remove if undesired */
.max-h-\[60vh\]::-webkit-scrollbar {
  width: 10px;
}
.max-h-\[60vh\]::-webkit-scrollbar-track {
  background: #f3f4f6; /* gray-100 */
}
.max-h-\[60vh\]::-webkit-scrollbar-thumb {
  background: #d1d5db; /* gray-300 */
  border-radius: 8px;
  border: 2px solid #f3f4f6;
}

/* Body text rendering improvements */
html, body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
