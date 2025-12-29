/**
 * useAllEpisodes Composable
 * Provides reactive state management for fetching all episodes with streaming links
 */

import { ref, computed, watch } from "vue";
import {
  getAllEpisodes,
  parseAllEpisodesResponse,
} from "../services/dramabox.js";

export function useAllEpisodes(bookId) {
  // State
  const loading = ref(false);
  const error = ref(null);
  const episodes = ref([]);
  const currentQuality = ref("hd"); // sd, hd, fhd

  // Computed
  const hasEpisodes = computed(() => episodes.value.length > 0);
  const hasError = computed(() => error.value !== null);
  const freeEpisodes = computed(() =>
    episodes.value.filter((ep) => !ep.isPaid)
  );
  const paidEpisodes = computed(() => episodes.value.filter((ep) => ep.isPaid));

  // Fetch all episodes from API
  async function fetchEpisodes(id) {
    if (!id) {
      error.value = "Book ID is required";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await getAllEpisodes(id);
      const parsed = parseAllEpisodesResponse(response);
      episodes.value = parsed;
    } catch (err) {
      console.error("Failed to fetch episodes:", err);
      error.value = err.message || "Gagal memuat episode";
      episodes.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Get streaming URL for an episode
  function getStreamUrl(episodeIndex, quality = null) {
    const q = quality || currentQuality.value;
    const episode = episodes.value.find((ep) => ep.index === episodeIndex);
    if (!episode) return null;

    // Return requested quality, fallback to hd, then sd
    return episode.videos[q] || episode.videos.hd || episode.videos.sd;
  }

  // Set quality preference
  function setQuality(quality) {
    if (["sd", "hd", "fhd"].includes(quality)) {
      currentQuality.value = quality;
    }
  }

  // Watch for bookId changes if it's a ref
  if (bookId && typeof bookId === "object" && "value" in bookId) {
    watch(
      bookId,
      (newId) => {
        if (newId) {
          fetchEpisodes(newId);
        }
      },
      { immediate: true }
    );
  } else if (bookId) {
    fetchEpisodes(bookId);
  }

  return {
    // State
    loading,
    error,
    episodes,
    currentQuality,

    // Computed
    hasEpisodes,
    hasError,
    freeEpisodes,
    paidEpisodes,

    // Methods
    fetchEpisodes,
    getStreamUrl,
    setQuality,
  };
}

export default useAllEpisodes;
