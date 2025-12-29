<template>
  <div class="min-h-screen pt-4 pb-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-4">Cari Drama</h1>

        <!-- Search Input -->
        <div class="relative">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Masukkan judul drama..."
            class="w-full px-5 py-4 pl-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
            @keyup.enter="handleSearch"
          />
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <button
            v-if="searchInput"
            @click="clearSearch"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Search Button -->
        <button
          @click="handleSearch"
          :disabled="loading || !searchInput.trim()"
          class="mt-4 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg
              class="animate-spin w-5 h-5 mr-2"
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
            Mencari...
          </span>
          <span v-else>Cari</span>
        </button>
      </div>

      <!-- Search Results -->
      <div v-if="hasSearched">
        <!-- Results Count -->
        <div v-if="hasResults" class="mb-6">
          <p class="text-gray-400">
            Ditemukan
            <span class="text-white font-semibold">{{ results.length }}</span>
            hasil untuk "<span class="text-pink-400">{{ query }}</span
            >"
          </p>
        </div>

        <!-- Loading State -->
        <div
          v-if="loading"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          <div v-for="i in 8" :key="i" class="animate-pulse">
            <div class="aspect-[2/3] bg-white/10 rounded-xl mb-2"></div>
            <div class="h-4 bg-white/10 rounded w-3/4 mb-1"></div>
            <div class="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Results Grid -->
        <div
          v-else-if="hasResults"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          <div
            v-for="drama in results"
            :key="drama.id"
            class="group cursor-pointer"
          >
            <div class="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
              <img
                :src="drama.image"
                :alt="drama.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                @error="onImageError"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />

              <!-- Corner Badge -->
              <div
                v-if="drama.corner"
                class="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium text-white"
                :style="{ backgroundColor: drama.corner.color || '#F54E96' }"
              >
                {{ drama.corner.name }}
              </div>
            </div>
            <h3 class="text-white font-medium text-sm line-clamp-2 mb-1">
              {{ drama.title }}
            </h3>
            <p
              v-if="drama.protagonist"
              class="text-gray-500 text-xs line-clamp-1"
            >
              {{ drama.protagonist }}
            </p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="isEmpty" class="text-center py-16">
          <div
            class="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-10 h-10 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Tidak ada hasil</h3>
          <p class="text-gray-400">
            Tidak ditemukan drama dengan judul "{{ query }}"
          </p>
        </div>

        <!-- Error State -->
        <div v-else-if="hasError" class="text-center py-16">
          <div
            class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-10 h-10 text-red-500"
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
          <h3 class="text-xl font-semibold text-white mb-2">
            Terjadi Kesalahan
          </h3>
          <p class="text-gray-400 mb-4">{{ error }}</p>
          <button
            @click="handleSearch"
            class="px-6 py-2 bg-pink-500 rounded-full text-white font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center py-16">
        <div
          class="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-rose-600/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-12 h-12 text-pink-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">
          Cari Drama Favoritmu
        </h3>
        <p class="text-gray-400 max-w-md mx-auto">
          Ketik judul drama yang ingin kamu cari, lalu tekan Enter atau klik
          tombol Cari
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSearch } from "../composables/useSearch.js";

const {
  loading,
  error,
  results,
  query,
  hasResults,
  hasError,
  isEmpty,
  hasSearched,
  search,
  clear,
} = useSearch();

const searchInput = ref("");

function handleSearch() {
  if (searchInput.value.trim()) {
    search(searchInput.value);
  }
}

function clearSearch() {
  searchInput.value = "";
  clear();
}

function onImageError(e) {
  e.target.src = "https://via.placeholder.com/300x450/1a1a2e/666?text=No+Image";
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
