<template>
  <div class="min-h-screen bg-dark-900">
    <!-- Navbar (hide on video pages) -->
    <Navbar v-if="!hideNav" />

    <!-- Main Content -->
    <main :class="{ 'pt-16': !hideNav }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer (hide on video pages) -->
    <Footer v-if="!hideNav" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();

// Hide navbar and footer on video pages
const hideNav = computed(() => route.meta?.hideNav === true);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
