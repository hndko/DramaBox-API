/**
 * useDramas Composable
 * Provides reactive state management for drama data
 */

import { ref, onMounted, computed } from "vue";
import { getVipDramas, parseVipResponse } from "../services/dramabox.js";

export function useDramas() {
  // State
  const loading = ref(true);
  const error = ref(null);
  const sections = ref([]);
  const featured = ref([]);
  const banners = ref([]);

  // Computed
  const hasData = computed(() => sections.value.length > 0);
  const hasError = computed(() => error.value !== null);

  // Get section by title (partial match)
  const getSectionByTitle = (titlePart) => {
    return sections.value.find((s) =>
      s.title.toLowerCase().includes(titlePart.toLowerCase())
    );
  };

  // Fetch dramas from API
  async function fetchDramas() {
    loading.value = true;
    error.value = null;

    try {
      const response = await getVipDramas();
      const parsed = parseVipResponse(response);

      sections.value = parsed.sections;
      featured.value = parsed.featured;
      banners.value = parsed.banners;
    } catch (err) {
      console.error("Failed to fetch dramas:", err);
      error.value = err.message || "Gagal memuat data drama";
    } finally {
      loading.value = false;
    }
  }

  // Refresh data
  async function refresh() {
    await fetchDramas();
  }

  // Auto-fetch on mount
  onMounted(() => {
    fetchDramas();
  });

  return {
    // State
    loading,
    error,
    sections,
    featured,
    banners,

    // Computed
    hasData,
    hasError,

    // Methods
    fetchDramas,
    refresh,
    getSectionByTitle,
  };
}

export default useDramas;
