<template>
  <div class="min-h-screen">
    <!-- Page Header -->
    <div class="bg-gradient-to-b from-dark-800 to-dark-900 pt-8 pb-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center space-x-3 mb-4">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">Dub Indonesia</h1>
            <p class="text-gray-400 text-sm">
              Drama dengan sulih suara Indonesia
            </p>
          </div>
        </div>

        <!-- Classify Tabs -->
        <div class="flex space-x-2">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="switchClassify(tab.value)"
            class="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
            :class="
              classify === tab.value
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            "
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <template v-if="loading">
      <LoadingSkeleton :count="12" />
    </template>

    <!-- Error State -->
    <template v-else-if="hasError">
      <div class="flex flex-col items-center justify-center min-h-[40vh] px-4">
        <div
          class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            class="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white mb-2">Gagal Memuat Data</h2>
        <p class="text-gray-400 mb-4">{{ error }}</p>
        <button
          @click="refresh"
          class="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white font-medium hover:shadow-lg transition-all"
        >
          Coba Lagi
        </button>
      </div>
    </template>

    <!-- Empty State -->
    <template v-else-if="isEmpty">
      <div class="flex flex-col items-center justify-center min-h-[40vh] px-4">
        <div
          class="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            class="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white mb-2">Tidak Ada Drama</h2>
        <p class="text-gray-400">Belum ada drama tersedia untuk kategori ini</p>
      </div>
    </template>

    <!-- Drama Grid -->
    <template v-else>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          <DramaCard v-for="drama in dramas" :key="drama.id" :drama="drama" />
        </div>

        <!-- Load More Button -->
        <div v-if="hasMore" class="flex justify-center mt-8">
          <button
            @click="loadMore"
            :disabled="loadingMore"
            class="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full text-white font-medium transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
          >
            <svg
              v-if="loadingMore"
              class="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ loadingMore ? "Memuat..." : "Muat Lebih Banyak" }}</span>
          </button>
        </div>

        <!-- End of List -->
        <div v-else class="text-center mt-8 text-gray-500 text-sm">
          Tidak ada lagi drama untuk ditampilkan
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import DramaCard from "../components/DramaCard.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";
import { useDubindo } from "../composables/useDubindo.js";

const tabs = [
  { label: "Terpopuler", value: "terpopuler" },
  { label: "Terbaru", value: "terbaru" },
];

const {
  loading,
  loadingMore,
  error,
  dramas,
  classify,
  hasMore,
  hasError,
  isEmpty,
  fetchDramas,
  loadMore,
  switchClassify,
  refresh,
} = useDubindo();

onMounted(() => {
  fetchDramas();
});
</script>
