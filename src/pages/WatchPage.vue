<template>
  <div class="min-h-screen bg-black">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="hasError"
      class="flex items-center justify-center min-h-screen px-6"
    >
      <div class="text-center">
        <div
          class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white mb-2">Gagal Memuat Video</h2>
        <p class="text-gray-400 mb-4">{{ error }}</p>
        <button
          @click="retryLoad"
          class="px-6 py-2 bg-pink-500 rounded-full text-white font-medium"
        >
          Coba Lagi
        </button>
      </div>
    </div>

    <!-- Video Player -->
    <template v-else>
      <!-- Top Bar -->
      <div
        class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4"
      >
        <div class="flex items-center justify-between max-w-6xl mx-auto">
          <button @click="goBack" class="flex items-center gap-2 text-white">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span class="hidden sm:inline">Kembali</span>
          </button>
          <div class="text-center flex-1 mx-4">
            <h1 class="text-white font-semibold truncate">
              {{ currentEpisode?.name }}
            </h1>
            <p class="text-gray-400 text-sm">
              Episode {{ (currentEpisode?.index || 0) + 1 }}
            </p>
          </div>
          <button @click="toggleEpisodeList" class="text-white p-2">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Video Container -->
      <div
        class="relative w-full h-screen flex items-center justify-center bg-black"
      >
        <video
          ref="videoRef"
          :src="videoUrl"
          class="max-w-full max-h-full"
          controls
          autoplay
          playsinline
          @ended="onVideoEnded"
          @error="onVideoError"
        ></video>
      </div>

      <!-- Quality Selector -->
      <div class="fixed bottom-4 left-4 z-50">
        <div
          class="flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-3 py-2"
        >
          <span class="text-gray-400 text-xs">Kualitas:</span>
          <button
            v-for="q in ['sd', 'hd', 'fhd']"
            :key="q"
            @click="setQuality(q)"
            class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            :class="
              quality === q
                ? 'bg-pink-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            "
          >
            {{ q.toUpperCase() }}
          </button>
        </div>
      </div>

      <!-- Episode Navigation -->
      <div class="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        <button
          v-if="hasPrevEpisode"
          @click="prevEpisode"
          class="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          v-if="hasNextEpisode"
          @click="nextEpisode"
          class="p-3 bg-pink-500 rounded-full text-white hover:bg-pink-600"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- Episode List Drawer -->
      <div
        v-if="showEpisodeList"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        @click="toggleEpisodeList"
      >
        <div
          class="absolute right-0 top-0 bottom-0 w-80 bg-gray-900 overflow-y-auto"
          @click.stop
        >
          <div class="sticky top-0 bg-gray-900 p-4 border-b border-gray-800">
            <div class="flex items-center justify-between">
              <h2 class="text-white font-bold">Episodes</h2>
              <button
                @click="toggleEpisodeList"
                class="text-gray-400 hover:text-white"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-4 space-y-2">
            <button
              v-for="ep in episodes"
              :key="ep.id"
              @click="playEpisode(ep.index)"
              class="w-full flex items-center gap-3 p-3 rounded-lg transition-colors"
              :class="
                ep.index === currentIndex
                  ? 'bg-pink-500/20 text-pink-400'
                  : 'bg-white/5 text-white hover:bg-white/10'
              "
            >
              <img
                :src="ep.cover"
                class="w-16 h-10 rounded object-cover"
                @error="onImageError"
              />
              <div class="flex-1 text-left">
                <p class="text-sm font-medium">{{ ep.name }}</p>
                <p class="text-xs text-gray-400">
                  {{ ep.isPaid ? "🔒 Premium" : "✓ Gratis" }}
                </p>
              </div>
              <div v-if="ep.index === currentIndex" class="text-pink-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAllEpisodes } from "../composables/useAllEpisodes.js";

const route = useRoute();
const router = useRouter();

// Get params
const bookId = computed(() => route.params.id);
const episodeIndex = computed(() => parseInt(route.params.episode || "0"));

// State
const videoRef = ref(null);
const showEpisodeList = ref(false);
const currentIndex = ref(0);
const quality = ref("hd");

// Fetch episodes
const { loading, error, episodes, hasError, getStreamUrl, fetchEpisodes } =
  useAllEpisodes(bookId);

// Computed
const currentEpisode = computed(() => {
  return episodes.value.find((ep) => ep.index === currentIndex.value);
});

const videoUrl = computed(() => {
  if (!currentEpisode.value) return "";
  return (
    currentEpisode.value.videos[quality.value] ||
    currentEpisode.value.videos.hd ||
    currentEpisode.value.videos.sd ||
    ""
  );
});

const hasPrevEpisode = computed(() => currentIndex.value > 0);
const hasNextEpisode = computed(
  () => currentIndex.value < episodes.value.length - 1
);

// Methods
function goBack() {
  router.push(`/drama/${bookId.value}`);
}

function toggleEpisodeList() {
  showEpisodeList.value = !showEpisodeList.value;
}

function playEpisode(index) {
  currentIndex.value = index;
  showEpisodeList.value = false;
  // Update URL
  router.replace(`/watch/${bookId.value}/${index}`);
}

function nextEpisode() {
  if (hasNextEpisode.value) {
    playEpisode(currentIndex.value + 1);
  }
}

function prevEpisode() {
  if (hasPrevEpisode.value) {
    playEpisode(currentIndex.value - 1);
  }
}

function setQuality(q) {
  quality.value = q;
}

function onVideoEnded() {
  if (hasNextEpisode.value) {
    nextEpisode();
  }
}

function onVideoError() {
  console.error("Video failed to load");
}

function retryLoad() {
  fetchEpisodes(bookId.value);
}

function onImageError(e) {
  e.target.src = "https://via.placeholder.com/64x40/1a1a2e/666?text=No";
}

// Set initial episode index from route
watch(
  () => route.params.episode,
  (newEp) => {
    if (newEp !== undefined) {
      currentIndex.value = parseInt(newEp || "0");
    }
  },
  { immediate: true }
);

// Hide nav on mount
onMounted(() => {
  document.body.classList.add("hide-nav");
});

onUnmounted(() => {
  document.body.classList.remove("hide-nav");
});
</script>

<style scoped>
video::-webkit-media-controls-panel {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
}
</style>
