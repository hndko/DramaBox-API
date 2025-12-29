/**
 * useForYou Composable
 * Provides reactive state management for For You recommendations
 */

import { ref, computed, onMounted } from "vue";
import { getForYouDramas, parseForYouResponse } from "../services/dramabox.js";

export function useForYou() {
  // State
  const loading = ref(true);
  const error = ref(null);
  const dramas = ref([]);

  // Computed
  const hasData = computed(() => dramas.value.length > 0);
  const hasError = computed(() => error.value !== null);

  // Fetch recommendations from API
  async function fetchRecommendations() {
    loading.value = true;
    error.value = null;

    try {
      const response = await getForYouDramas();
      const parsed = parseForYouResponse(response);
      dramas.value = parsed;
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      error.value = err.message || "Gagal memuat rekomendasi";
    } finally {
      loading.value = false;
    }
  }

  // Refresh data
  async function refresh() {
    await fetchRecommendations();
  }

  // Auto-fetch on mount
  onMounted(() => {
    fetchRecommendations();
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
    fetchRecommendations,
    refresh,
  };
}

export default useForYou;
