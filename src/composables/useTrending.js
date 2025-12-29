/**
 * useTrending Composable
 * Provides reactive state management for Trending dramas
 */

import { ref, computed, onMounted } from "vue";
import {
  getTrendingDramas,
  parseTrendingResponse,
} from "../services/dramabox.js";

export function useTrending() {
  // State
  const loading = ref(true);
  const error = ref(null);
  const dramas = ref([]);

  // Computed
  const hasData = computed(() => dramas.value.length > 0);
  const hasError = computed(() => error.value !== null);

  // Fetch trending dramas from API
  async function fetchTrending() {
    loading.value = true;
    error.value = null;

    try {
      const response = await getTrendingDramas();
      const parsed = parseTrendingResponse(response);
      dramas.value = parsed;
    } catch (err) {
      console.error("Failed to fetch trending dramas:", err);
      error.value = err.message || "Gagal memuat drama populer";
    } finally {
      loading.value = false;
    }
  }

  // Refresh data
  async function refresh() {
    await fetchTrending();
  }

  // Auto-fetch on mount
  onMounted(() => {
    fetchTrending();
  });

  return {
    // State
    loading,
    error,
    dramas,

    // Computed
    hasData,
    hasError,

    // Methods
    fetchTrending,
    refresh,
  };
}

export default useTrending;
