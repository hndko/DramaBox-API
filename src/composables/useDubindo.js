/**
 * useDubindo Composable
 * Provides reactive state management for Dub Indo drama data
 */

import { ref, computed, watch } from "vue";
import {
  getDubindoDramas,
  parseDubindoResponse,
} from "../services/dramabox.js";

export function useDubindo() {
  // State
  const loading = ref(false);
  const loadingMore = ref(false);
  const error = ref(null);
  const dramas = ref([]);
  const currentPage = ref(1);
  const classify = ref("terpopuler"); // 'terpopuler' or 'terbaru'
  const hasMore = ref(true);

  // Computed
  const hasData = computed(() => dramas.value.length > 0);
  const hasError = computed(() => error.value !== null);
  const isEmpty = computed(() => !loading.value && dramas.value.length === 0);

  // Fetch dramas from API
  async function fetchDramas(reset = true) {
    if (reset) {
      loading.value = true;
      dramas.value = [];
      currentPage.value = 1;
      hasMore.value = true;
    } else {
      loadingMore.value = true;
    }

    error.value = null;

    try {
      const response = await getDubindoDramas(
        classify.value,
        currentPage.value
      );
      const parsed = parseDubindoResponse(response);

      if (reset) {
        dramas.value = parsed;
      } else {
        dramas.value = [...dramas.value, ...parsed];
      }

      // Check if there's more data
      hasMore.value = parsed.length >= 15; // Assuming 15 items per page
    } catch (err) {
      console.error("Failed to fetch dubindo dramas:", err);
      error.value = err.message || "Gagal memuat data drama";
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  }

  // Load more dramas
  async function loadMore() {
    if (loadingMore.value || !hasMore.value) return;
    currentPage.value++;
    await fetchDramas(false);
  }

  // Switch classify (terpopuler/terbaru)
  async function switchClassify(newClassify) {
    if (classify.value === newClassify) return;
    classify.value = newClassify;
    await fetchDramas(true);
  }

  // Refresh data
  async function refresh() {
    await fetchDramas(true);
  }

  return {
    // State
    loading,
    loadingMore,
    error,
    dramas,
    currentPage,
    classify,
    hasMore,

    // Computed
    hasData,
    hasError,
    isEmpty,

    // Methods
    fetchDramas,
    loadMore,
    switchClassify,
    refresh,
  };
}

export default useDubindo;
