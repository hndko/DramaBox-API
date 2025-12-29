<template>
  <div
    class="video-feed-container relative h-screen w-full bg-black overflow-hidden"
  >
    <!-- Loading State -->
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="text-center">
        <div
          class="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
        ></div>
        <p class="text-white text-sm">Memuat video...</p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="hasError"
      class="absolute inset-0 flex items-center justify-center px-6"
    >
      <div class="text-center">
        <div
          class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white mb-2">Gagal Memuat Video</h2>
        <p class="text-gray-400 mb-4">{{ error }}</p>
        <button
          @click="refresh"
          class="px-6 py-2 bg-pink-500 rounded-full text-white font-medium"
        >
          Coba Lagi
        </button>
      </div>
    </div>

    <!-- Video Player -->
    <template v-else-if="currentVideo">
      <!-- Video Container -->
      <div
        class="absolute inset-0 flex items-center justify-center"
        @click="togglePause"
      >
        <video
          ref="videoRef"
          :src="currentVideo.videoUrl"
          :poster="currentVideo.thumbnail"
          :muted="muted"
          class="h-full w-full object-contain"
          playsinline
          loop
          @loadeddata="onVideoLoaded"
          @error="onVideoError"
        ></video>

        <!-- Pause Indicator -->
        <transition name="fade">
          <div
            v-if="paused"
            class="absolute inset-0 flex items-center justify-center bg-black/30"
          >
            <div
              class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </transition>
      </div>

      <!-- Top Bar -->
      <div
        class="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-10"
      >
        <div class="flex items-center justify-between">
          <router-link to="/" class="p-2 -ml-2 text-white">
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
          </router-link>
          <span class="text-white text-sm font-medium">For You</span>
          <div class="flex items-center space-x-3">
            <button @click.stop="toggleMute" class="p-2 text-white">
              <svg
                v-if="muted"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
              <svg
                v-else
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Side Actions -->
      <div
        class="absolute right-4 bottom-32 flex flex-col items-center space-y-6 z-10"
      >
        <!-- Performer Avatar -->
        <div v-if="currentVideo.performers?.length > 0" class="relative">
          <img
            :src="currentVideo.performers[0].avatar"
            :alt="currentVideo.performers[0].name"
            class="w-12 h-12 rounded-full border-2 border-white object-cover"
            @error="onAvatarError"
          />
          <button
            class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <!-- Like -->
        <button class="flex flex-col items-center text-white">
          <div
            class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-1"
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <span class="text-xs">{{ currentVideo.viewCount }}</span>
        </button>

        <!-- Comment -->
        <button class="flex flex-col items-center text-white">
          <div
            class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-1"
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <span class="text-xs">Comment</span>
        </button>

        <!-- Share -->
        <button class="flex flex-col items-center text-white">
          <div
            class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-1"
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </div>
          <span class="text-xs">Share</span>
        </button>

        <!-- Bookmark -->
        <button class="flex flex-col items-center text-white">
          <div
            class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-1"
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <span class="text-xs">Save</span>
        </button>
      </div>

      <!-- Bottom Info -->
      <div
        class="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"
      >
        <!-- Performer -->
        <div
          v-if="currentVideo.performers?.length > 0"
          class="flex items-center space-x-2 mb-2"
        >
          <span class="text-white font-semibold text-sm"
            >@{{ currentVideo.performers[0].name }}</span
          >
          <button
            class="px-3 py-1 border border-white/50 rounded text-white text-xs"
          >
            Follow
          </button>
        </div>

        <!-- Title -->
        <h2 class="text-white font-bold text-lg mb-1 line-clamp-1">
          {{ currentVideo.title }}
        </h2>

        <!-- Episode Info -->
        <p class="text-gray-300 text-sm mb-2">
          Episode {{ currentVideo.chapterIndex + 1 }} /
          {{ currentVideo.totalChapters }}
        </p>

        <!-- Description -->
        <p class="text-gray-400 text-sm mb-3 line-clamp-2">
          {{ currentVideo.description }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in currentVideo.genres?.slice(0, 4)"
            :key="tag"
            class="text-pink-400 text-sm"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Navigation Hints -->
      <div
        class="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-2 z-10"
      >
        <button
          v-if="hasPrev"
          @click.stop="prevVideo"
          class="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
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
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        <span class="text-white/60 text-xs">{{ progressInfo }}</span>
        <button
          @click.stop="nextVideo"
          class="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <!-- Swipe Overlay for touch -->
      <div
        class="absolute inset-0 z-5"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      ></div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useVideoFeed } from "../composables/useVideoFeed.js";

const {
  loading,
  error,
  currentVideo,
  muted,
  paused,
  hasError,
  hasNext,
  hasPrev,
  progressInfo,
  fetchVideos,
  nextVideo,
  prevVideo,
  toggleMute,
  togglePause,
  refresh,
} = useVideoFeed();

const videoRef = ref(null);

// Touch handling
let touchStartY = 0;
const SWIPE_THRESHOLD = 50;

function onTouchStart(e) {
  touchStartY = e.touches[0].clientY;
}

function onTouchEnd(e) {
  const touchEndY = e.changedTouches[0].clientY;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    if (diff > 0) {
      nextVideo();
    } else {
      prevVideo();
    }
  }
}

// Video control
function onVideoLoaded() {
  if (videoRef.value && !paused.value) {
    videoRef.value.play().catch(() => {});
  }
}

function onVideoError() {
  console.error("Video load error");
}

function onAvatarError(e) {
  e.target.src = "https://ui-avatars.com/api/?name=User&background=random";
}

// Watch for video changes
watch(currentVideo, () => {
  nextTick(() => {
    if (videoRef.value) {
      videoRef.value.load();
      if (!paused.value) {
        videoRef.value.play().catch(() => {});
      }
    }
  });
});

// Watch pause state
watch(paused, (isPaused) => {
  if (videoRef.value) {
    if (isPaused) {
      videoRef.value.pause();
    } else {
      videoRef.value.play().catch(() => {});
    }
  }
});

// Keyboard navigation
function handleKeydown(e) {
  if (e.key === "ArrowUp") {
    prevVideo();
  } else if (e.key === "ArrowDown") {
    nextVideo();
  } else if (e.key === " ") {
    e.preventDefault();
    togglePause();
  } else if (e.key === "m") {
    toggleMute();
  }
}

onMounted(() => {
  fetchVideos();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.video-feed-container {
  -webkit-overflow-scrolling: touch;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
