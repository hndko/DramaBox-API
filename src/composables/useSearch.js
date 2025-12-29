/**
 * useSearch Composable
 * Provides reactive state management for Search functionality
 */

import { ref, computed } from "vue";
import { searchDramas, parseSearchResponse } from "../services/dramabox.js";

export function useSearch() {
  // State
  const loading = ref(false);
  const error = ref(null);
  const results = ref([]);
  const query = ref("");
  const hasSearched = ref(false);

  // Computed
  const hasResults = computed(() => results.value.length > 0);
  const hasError = computed(() => error.value !== null);
  const isEmpty = computed(
    () => hasSearched.value && !loading.value && results.value.length === 0
  );

  // Search dramas
  async function search(searchQuery) {
    if (!searchQuery || searchQuery.trim() === "") {
      results.value = [];
      hasSearched.value = false;
      return;
    }

    query.value = searchQuery.trim();
    loading.value = true;
    error.value = null;
    hasSearched.value = true;

    try {
      const response = await searchDramas(query.value);
      const parsed = parseSearchResponse(response);
      results.value = parsed;
    } catch (err) {
      console.error("Failed to search dramas:", err);
      error.value = err.message || "Gagal mencari drama";
      results.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Clear search
  function clear() {
    query.value = "";
    results.value = [];
    error.value = null;
    hasSearched.value = false;
  }

  return {
    // State
    loading,
    error,
    results,
    query,
    hasSearched,

    // Computed
    hasResults,
    hasError,
    isEmpty,

    // Methods
    search,
    clear,
  };
}

export default useSearch;
