<template>
  <div class="min-h-screen bg-dark-900">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="pt-16">
      <!-- Hero Slider -->
      <HeroSlider :dramas="featuredDramas" />

      <!-- Genre Pills -->
      <section class="py-6 border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="flex items-center space-x-3 overflow-x-auto hide-scrollbar pb-2"
          >
            <button
              v-for="genre in genres"
              :key="genre"
              class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              :class="
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              "
              @click="selectedGenre = genre"
            >
              {{ genre }}
            </button>
          </div>
        </div>
      </section>

      <!-- Must-sees Section -->
      <DramaSection title="Must-sees" :dramas="mustSeeDramas" accent="pink" />

      <!-- Trending Section -->
      <DramaSection title="Trending" :dramas="trendingDramas" accent="purple" />

      <!-- Hidden Gems Section -->
      <DramaSection title="Hidden Gems" :dramas="hiddenGems" accent="orange" />

      <!-- CTA Banner -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 p-8 md:p-12"
          >
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <svg
                class="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="white"
                      stroke-width="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            <div
              class="relative flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
            >
              <div class="text-center md:text-left">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
                  Download the DramaBox App
                </h3>
                <p class="text-white/80 max-w-md">
                  Watch your favorite dramas anytime, anywhere. Get exclusive
                  content and early access to new releases.
                </p>
              </div>
              <div class="flex items-center space-x-4">
                <a
                  href="#"
                  class="flex items-center space-x-2 px-6 py-3 bg-white rounded-xl text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                    />
                  </svg>
                  <span>App Store</span>
                </a>
                <a
                  href="#"
                  class="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-white/20 transition-colors border border-white/20"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"
                    />
                  </svg>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import HeroSlider from "./components/HeroSlider.vue";
import DramaSection from "./components/DramaSection.vue";
import Footer from "./components/Footer.vue";
import {
  featuredDramas,
  mustSeeDramas,
  trendingDramas,
  hiddenGems,
  genres,
} from "./data/dramas.js";

const selectedGenre = ref("Romance");
</script>
