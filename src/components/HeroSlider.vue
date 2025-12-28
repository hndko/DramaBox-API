<template>
  <div class="relative h-[80vh] min-h-[600px] overflow-hidden">
    <!-- Background Image with Gradient Overlay -->
    <div class="absolute inset-0">
      <transition name="fade" mode="out-in">
        <img
          :key="currentSlide"
          :src="dramas[currentSlide].image"
          :alt="dramas[currentSlide].title"
          class="w-full h-full object-cover"
        />
      </transition>
      <div
        class="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/30"
      ></div>
    </div>

    <!-- Content -->
    <div
      class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
    >
      <div class="max-w-2xl fade-in">
        <!-- Episode Badge -->
        <div
          class="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-4"
        >
          <span class="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
          <span class="text-sm text-gray-300"
            >{{ dramas[currentSlide].episodes }} Episodes</span
          >
        </div>

        <!-- Title -->
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
        >
          {{ dramas[currentSlide].title }}
        </h1>

        <!-- Description -->
        <p class="text-gray-300 text-lg mb-6 line-clamp-3">
          {{ dramas[currentSlide].description }}
        </p>

        <!-- Genres -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span
            v-for="genre in dramas[currentSlide].genres"
            :key="genre"
            class="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 hover:bg-white/20 transition-colors cursor-pointer"
          >
            {{ genre }}
          </span>
        </div>

        <!-- CTA Buttons -->
        <div class="flex items-center space-x-4">
          <button
            class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Watch Now</span>
          </button>
          <button
            class="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add to List</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Slide Indicators -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2"
    >
      <button
        v-for="(drama, index) in dramas"
        :key="drama.id"
        @click="goToSlide(index)"
        class="group relative h-1 rounded-full transition-all duration-300"
        :class="
          index === currentSlide
            ? 'w-8 bg-pink-500'
            : 'w-4 bg-white/30 hover:bg-white/50'
        "
      >
        <span class="sr-only">Go to slide {{ index + 1 }}</span>
      </button>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hidden sm:block"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hidden sm:block"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  dramas: {
    type: Array,
    required: true,
  },
});

const currentSlide = ref(0);
let autoplayInterval = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.dramas.length;
};

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? props.dramas.length - 1 : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoplay = () => {
  autoplayInterval = setInterval(nextSlide, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
