<template>
  <section class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white flex items-center space-x-3">
          <span class="w-1 h-8 rounded-full" :class="accentClass"></span>
          <span>{{ title }}</span>
        </h2>
        <a
          href="#"
          class="flex items-center space-x-1 text-gray-400 hover:text-pink-400 transition-colors text-sm font-medium group"
        >
          <span>More</span>
          <svg
            class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
        </a>
      </div>

      <!-- Drama Cards Grid -->
      <div class="grid gap-4 hide-scrollbar" :class="gridClass">
        <DramaCard v-for="drama in dramas" :key="drama.id" :drama="drama" />
      </div>
    </div>
  </section>
</template>

<script setup>
import DramaCard from "./DramaCard.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  dramas: {
    type: Array,
    required: true,
  },
  accent: {
    type: String,
    default: "pink",
  },
});

const accentClass =
  {
    pink: "bg-gradient-to-b from-pink-500 to-rose-600",
    purple: "bg-gradient-to-b from-purple-500 to-indigo-600",
    blue: "bg-gradient-to-b from-blue-500 to-cyan-600",
    orange: "bg-gradient-to-b from-orange-500 to-red-600",
  }[props.accent] || "bg-gradient-to-b from-pink-500 to-rose-600";

const gridClass =
  "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
</script>
