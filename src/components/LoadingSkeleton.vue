<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header Skeleton -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <div class="w-1 h-8 rounded-full bg-dark-600 animate-pulse"></div>
          <div class="h-7 w-32 bg-dark-600 rounded animate-pulse"></div>
        </div>
        <div class="h-5 w-16 bg-dark-600 rounded animate-pulse"></div>
      </div>

      <!-- Cards Grid Skeleton -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        <div v-for="i in count" :key="i" class="animate-pulse">
          <!-- Poster Skeleton -->
          <div class="aspect-[2/3] rounded-xl bg-dark-600 mb-3"></div>
          <!-- Title Skeleton -->
          <div class="h-4 bg-dark-600 rounded w-3/4 mb-2"></div>
          <!-- Genre Skeleton -->
          <div class="h-3 bg-dark-600 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 6,
  },
});
</script>
