<template>
  <div class="min-h-screen pb-16">
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <!-- Cover Skeleton -->
      <div class="relative h-[50vh] bg-gray-800"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="w-48 h-72 bg-gray-700 rounded-xl shrink-0"></div>
          <div class="flex-1 pt-4">
            <div class="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
            <div class="h-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="hasError"
      class="flex items-center justify-center min-h-[60vh] px-6"
    >
      <div class="text-center">
        <div
          class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white mb-2">Gagal Memuat Drama</h2>
        <p class="text-gray-400 mb-4">{{ error }}</p>
        <div class="flex items-center justify-center gap-4">
          <router-link
            to="/"
            class="px-6 py-2 bg-white/10 rounded-full text-white font-medium"
          >
            Kembali
          </router-link>
          <button
            @click="refresh"
            class="px-6 py-2 bg-pink-500 rounded-full text-white font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </div>

    <!-- Detail Content -->
    <template v-else-if="book">
      <!-- Hero Banner -->
      <div class="relative h-[50vh] overflow-hidden">
        <img
          :src="book.image"
          :alt="book.title"
          class="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-40"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"
        ></div>
      </div>

      <!-- Content -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Poster -->
          <div class="shrink-0">
            <img
              :src="book.image"
              :alt="book.title"
              class="w-48 h-auto rounded-xl shadow-2xl"
            />
          </div>

          <!-- Info -->
          <div class="flex-1 pt-4">
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
              {{ book.title }}
            </h1>

            <!-- Stats -->
            <div
              class="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4"
            >
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  />
                </svg>
                {{ book.viewCountFormatted }} views
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                {{ book.followCount.toLocaleString() }} followers
              </span>
              <span class="flex items-center gap-1">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
                {{ book.chapterCount }} episodes
              </span>
            </div>

            <!-- Genres -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="genre in book.genres"
                :key="genre"
                class="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-medium"
              >
                {{ genre }}
              </span>
              <span
                v-for="tag in book.tags.slice(0, 3)"
                :key="tag"
                class="px-3 py-1 bg-white/10 text-gray-400 rounded-full text-xs"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-gray-300 leading-relaxed mb-6">
              {{ book.description }}
            </p>

            <!-- Performers -->
            <div v-if="book.performers.length > 0" class="mb-6">
              <h3 class="text-white font-semibold mb-3">Performers</h3>
              <div class="flex flex-wrap gap-4">
                <div
                  v-for="performer in book.performers"
                  :key="performer.id"
                  class="flex items-center gap-3 bg-white/5 rounded-full pr-4"
                >
                  <img
                    :src="performer.avatar"
                    :alt="performer.name"
                    class="w-10 h-10 rounded-full object-cover"
                    @error="onAvatarError"
                  />
                  <span class="text-white text-sm">{{ performer.name }}</span>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="flex flex-wrap gap-4">
              <router-link
                v-if="unlockedChapters.length > 0"
                :to="`/watch/${bookId}/0`"
                class="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Tonton Sekarang
              </router-link>
              <button
                class="px-6 py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Tambah ke Library
              </button>
            </div>
          </div>
        </div>

        <!-- Episodes -->
        <div class="mt-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">Episodes</h2>
            <span class="text-gray-400 text-sm"
              >{{ chapters.length }} episodes</span
            >
          </div>

          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <router-link
              v-for="chapter in displayedChapters"
              :key="chapter.id"
              :to="chapter.unlocked ? `/watch/${bookId}/${chapter.index}` : '#'"
              class="group cursor-pointer block"
              :class="{ 'pointer-events-none': !chapter.unlocked }"
            >
              <div
                class="relative aspect-[3/4] rounded-xl overflow-hidden mb-2"
              >
                <img
                  :src="chapter.cover"
                  :alt="chapter.name"
                  class="w-full h-full object-cover"
                  @error="onImageError"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                />

                <!-- Lock Icon -->
                <div
                  v-if="!chapter.unlocked"
                  class="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <svg
                    class="w-8 h-8 text-white/60"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
                    />
                  </svg>
                </div>

                <!-- Play Icon -->
                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div
                    class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <!-- Duration -->
                <div
                  class="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-white"
                >
                  {{ chapter.durationFormatted }}
                </div>
              </div>
              <p class="text-white text-sm font-medium">
                Ep {{ chapter.index + 1 }}
              </p>
              <p class="text-gray-500 text-xs">{{ chapter.name }}</p>
            </router-link>
          </div>

          <!-- Show More -->
          <div v-if="chapters.length > 12" class="mt-6 text-center">
            <button
              @click="toggleShowAllEpisodes"
              class="px-6 py-2 bg-white/10 rounded-full text-white font-medium hover:bg-white/20 transition-colors"
            >
              {{
                showAllEpisodes
                  ? "Sembunyikan"
                  : `Lihat Semua ${chapters.length} Episode`
              }}
            </button>
          </div>
        </div>

        <!-- Recommendations -->
        <div v-if="recommendations.length > 0" class="mt-16">
          <h2 class="text-2xl font-bold text-white mb-6">Rekomendasi</h2>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <router-link
              v-for="rec in recommendations.slice(0, 6)"
              :key="rec.id"
              :to="`/drama/${rec.id}`"
              class="group cursor-pointer"
            >
              <div
                class="relative aspect-[2/3] rounded-xl overflow-hidden mb-2"
              >
                <img
                  :src="rec.image"
                  :alt="rec.title"
                  class="w-full h-full object-cover"
                  @error="onImageError"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <h3 class="text-white text-sm font-medium line-clamp-2">
                {{ rec.title }}
              </h3>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useDramaDetail } from "../composables/useDramaDetail.js";

const route = useRoute();
const bookId = computed(() => route.params.id);
const showAllEpisodes = ref(false);

const {
  loading,
  error,
  book,
  chapters,
  recommendations,
  hasError,
  unlockedChapters,
  refresh,
} = useDramaDetail(bookId);

// Show all or first 12
const displayedChapters = computed(() => {
  return showAllEpisodes.value ? chapters.value : chapters.value.slice(0, 12);
});

function toggleShowAllEpisodes() {
  showAllEpisodes.value = !showAllEpisodes.value;
}

function onImageError(e) {
  e.target.src = "https://via.placeholder.com/300x450/1a1a2e/666?text=No+Image";
}

function onAvatarError(e) {
  e.target.src = "https://via.placeholder.com/40x40/1a1a2e/666?text=?";
}
</script>

<style scoped>
/* Page containment */
.min-h-screen {
  contain: layout style;
}

/* Hero image optimization */
.blur-xl {
  will-change: opacity;
  transform: translateZ(0);
}

/* Grid containment */
.grid {
  contain: layout;
}

/* Remove heavy hover animations */
.group:hover img {
  /* Removed scale-110 - causes reflow */
}

/* Episode card containment */
.aspect-\[3\/4\],
.aspect-\[2\/3\] {
  contain: layout paint;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Optimized transitions - only opacity */
.transition-opacity {
  transition: opacity 150ms ease-out;
}
</style>
