/**
 * usePopularSearch Composable
 * Provides reactive state management for Popular Search dramas
 */

import { ref, computed, onMounted } from "vue";
import {
  getPopularSearchDramas,
  parsePopularSearchResponse,
} from "../services/dramabox.js";

export function usePopularSearch() {
  // State
  const loading = ref(true);
  const error = ref(null);
  const dramas = ref([]);

  // Computed
  const hasData = computed(() => dramas.value.length > 0);
  const hasError = computed(() => error.value !== null);

  // Fetch popular search dramas from API
  async function fetchPopularSearch() {
    loading.value = true;
    error.value = null;

    try {
      const response = await getPopularSearchDramas();
      const parsed = parsePopularSearchResponse(response);
      dramas.value = parsed;
    } catch (err) {
      console.error("Failed to fetch popular search dramas:", err);
      error.value = err.message || "Gagal memuat pencarian populer";
    } finally {
      loading.value = false;
    }
  }

  // Refresh data
  async function refresh() {
    await fetchPopularSearch();
  }

  // Auto-fetch on mount
  onMounted(() => {
    fetchPopularSearch();
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
    fetchPopularSearch,
    refresh,
  };
}

export default usePopularSearch;
