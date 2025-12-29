/**
 * useDramaDetail Composable
 * Provides reactive state management for Drama Detail
 */

import { ref, computed, watch } from "vue";
import { getDramaDetail, parseDetailResponse } from "../services/dramabox.js";

export function useDramaDetail(bookId) {
  // State
  const loading = ref(true);
  const error = ref(null);
  const book = ref(null);
  const chapters = ref([]);
  const recommendations = ref([]);

  // Computed
  const hasData = computed(() => book.value !== null);
  const hasError = computed(() => error.value !== null);
  const hasChapters = computed(() => chapters.value.length > 0);
  const unlockedChapters = computed(() =>
    chapters.value.filter((ch) => ch.unlocked)
  );
  const lockedChapters = computed(() =>
    chapters.value.filter((ch) => !ch.unlocked)
  );

  // Fetch drama detail from API
  async function fetchDetail(id) {
    if (!id) {
      error.value = "Book ID is required";
      loading.value = false;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await getDramaDetail(id);
      const parsed = parseDetailResponse(response);

      if (parsed) {
        book.value = parsed.book;
        chapters.value = parsed.chapters;
        recommendations.value = parsed.recommendations;
      } else {
        throw new Error("Drama tidak ditemukan");
      }
    } catch (err) {
      console.error("Failed to fetch drama detail:", err);
      error.value = err.message || "Gagal memuat detail drama";
      book.value = null;
      chapters.value = [];
      recommendations.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Refresh data
  async function refresh() {
    if (bookId?.value) {
      await fetchDetail(bookId.value);
    } else if (typeof bookId === "string") {
      await fetchDetail(bookId);
    }
  }

  // Watch for bookId changes if it's a ref
  if (bookId && typeof bookId === "object" && "value" in bookId) {
    watch(
      bookId,
      (newId) => {
        if (newId) {
          fetchDetail(newId);
        }
      },
      { immediate: true }
    );
  } else if (bookId) {
    // If bookId is a string, fetch immediately
    fetchDetail(bookId);
  }

  return {
    // State
    loading,
    error,
    book,
    chapters,
    recommendations,

    // Computed
    hasData,
    hasError,
    hasChapters,
    unlockedChapters,
    lockedChapters,

    // Methods
    fetchDetail,
    refresh,
  };
}

export default useDramaDetail;
