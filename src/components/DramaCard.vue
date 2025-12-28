<template>
  <div class="drama-card group cursor-pointer">
    <!-- Poster Container -->
    <div
      class="relative aspect-[2/3] rounded-xl overflow-hidden bg-dark-700 mb-3"
    >
      <img
        :src="drama.image"
        :alt="drama.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        @error="handleImageError"
      />

      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <!-- Episode Badge -->
      <div
        class="absolute top-3 left-3 px-2 py-1 bg-dark-900/80 backdrop-blur-sm rounded-md"
      >
        <span class="text-xs font-medium text-white"
          >{{ drama.episodes }} Ep</span
        >
      </div>

      <!-- Corner Badge (VIP, etc) -->
      <div
        v-if="drama.corner"
        class="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium text-white"
        :style="{ backgroundColor: drama.corner.color }"
      >
        {{ drama.corner.name }}
      </div>

      <!-- Play Button (on hover) -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <button
          class="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 transform scale-75 group-hover:scale-100 transition-transform duration-300"
        >
          <svg
            class="w-6 h-6 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <!-- Quick Actions (on hover) -->
      <div
        class="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
      >
        <button
          class="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <button
          class="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Title -->
    <h3
      class="text-white font-medium text-sm line-clamp-2 mb-2 group-hover:text-pink-400 transition-colors"
    >
      {{ drama.title }}
    </h3>

    <!-- View Count & Genres -->
    <div class="flex items-center justify-between">
      <div class="flex flex-wrap gap-1">
        <span
          v-for="(genre, index) in displayGenres"
          :key="index"
          class="text-xs text-gray-500 hover:text-gray-400 transition-colors"
        >
          {{ genre }}{{ index < displayGenres.length - 1 ? " •" : "" }}
        </span>
      </div>
      <span v-if="drama.viewCount" class="text-xs text-gray-500">
        {{ drama.viewCount }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  drama: {
    type: Object,
    required: true,
  },
});

const displayGenres = computed(() => {
  return (props.drama.genres || []).slice(0, 2);
});

const handleImageError = (e) => {
  // Fallback image on error
  e.target.src =
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop";
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
