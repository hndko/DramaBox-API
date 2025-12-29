/**
 * useLatest Composable
 * Provides reactive state management for Latest dramas
 */

import { ref, computed, onMounted } from "vue";
import { getLatestDramas, parseLatestResponse } from "../services/dramabox.js";

export function useLatest() {
  // State
  const loading = ref(true);
  const error = ref(null);
  const dramas = ref([]);

  // Computed
  const hasData = computed(() => dramas.value.length > 0);
  const hasError = computed(() => error.value !== null);

  // Fetch latest dramas from API
  async function fetchLatest() {
    loading.value = true;
    error.value = null;

    try {
      const response = await getLatestDramas();
      const parsed = parseLatestResponse(response);
      dramas.value = parsed;
    } catch (err) {
      console.error("Failed to fetch latest dramas:", err);
      error.value = err.message || "Gagal memuat drama terbaru";
    } finally {
      loading.value = false;
    }
  }

  // Refresh data
  async function refresh() {
    await fetchLatest();
  }

  // Auto-fetch on mount
  onMounted(() => {
    fetchLatest();
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
    fetchLatest,
    refresh,
  };
}

export default useLatest;
