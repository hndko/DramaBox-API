/**
 * useVideoFeed Composable
 * Provides reactive state management for video feed
 */

import { ref, computed } from "vue";
import {
  getRandomDramas,
  parseRandomDramaResponse,
} from "../services/dramabox.js";

export function useVideoFeed() {
  // State
  const loading = ref(true);
  const error = ref(null);
  const videos = ref([]);
  const currentIndex = ref(0);
  const muted = ref(true);
  const paused = ref(false);

  // Computed
  const hasVideos = computed(() => videos.value.length > 0);
  const hasError = computed(() => error.value !== null);
  const currentVideo = computed(() => videos.value[currentIndex.value] || null);
  const hasNext = computed(() => currentIndex.value < videos.value.length - 1);
  const hasPrev = computed(() => currentIndex.value > 0);

  // Video progress info
  const progressInfo = computed(() => {
    return `${currentIndex.value + 1} / ${videos.value.length}`;
  });

  // Fetch videos from API
  async function fetchVideos() {
    loading.value = true;
    error.value = null;

    try {
      const response = await getRandomDramas();
      const parsed = parseRandomDramaResponse(response);
      videos.value = parsed;
      currentIndex.value = 0;
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      error.value = err.message || "Gagal memuat video";
    } finally {
      loading.value = false;
    }
  }

  // Navigation
  function nextVideo() {
    if (hasNext.value) {
      currentIndex.value++;
      paused.value = false;
    } else {
      // Load more videos when reaching the end
      loadMoreVideos();
    }
  }

  function prevVideo() {
    if (hasPrev.value) {
      currentIndex.value--;
      paused.value = false;
    }
  }

  function goToVideo(index) {
    if (index >= 0 && index < videos.value.length) {
      currentIndex.value = index;
      paused.value = false;
    }
  }

  // Load more videos
  async function loadMoreVideos() {
    try {
      const response = await getRandomDramas();
      const parsed = parseRandomDramaResponse(response);
      videos.value = [...videos.value, ...parsed];
      // Move to next video after loading
      if (parsed.length > 0) {
        currentIndex.value++;
      }
    } catch (err) {
      console.error("Failed to load more videos:", err);
    }
  }

  // Controls
  function toggleMute() {
    muted.value = !muted.value;
  }

  function togglePause() {
    paused.value = !paused.value;
  }

  // Refresh
  async function refresh() {
    await fetchVideos();
  }

  return {
    // State
    loading,
    error,
    videos,
    currentIndex,
    muted,
    paused,

    // Computed
    hasVideos,
    hasError,
    currentVideo,
    hasNext,
    hasPrev,
    progressInfo,

    // Methods
    fetchVideos,
    nextVideo,
    prevVideo,
    goToVideo,
    loadMoreVideos,
    toggleMute,
    togglePause,
    refresh,
  };
}

export default useVideoFeed;
