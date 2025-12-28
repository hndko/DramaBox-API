<template>
  <footer class="bg-dark-900 border-t border-white/5 py-12 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
                />
              </svg>
            </div>
            <span class="text-xl font-bold text-white">DramaBox</span>
          </div>
          <p class="text-gray-400 text-sm max-w-md">
            Watch the best Asian dramas online. Discover trending series,
            must-see shows, and hidden gems. Stream anytime, anywhere.
          </p>

          <!-- Social Links -->
          <div class="flex items-center space-x-4 mt-6">
            <a
              href="#"
              class="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Browse</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >Trending</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >Must-sees</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >Hidden Gems</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >New Releases</a
              >
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-white font-semibold mb-4">Support</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >Help Center</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >Terms of Service</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="pt-8 border-t border-white/5">
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <p class="text-gray-500 text-sm">
            © {{ currentYear }} DramaBox. All rights reserved.
          </p>
          <div class="flex items-center space-x-4">
            <a
              href="#"
              class="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                />
              </svg>
              <span class="text-gray-400 text-sm">App Store</span>
            </a>
            <a
              href="#"
              class="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"
                />
              </svg>
              <span class="text-gray-400 text-sm">Google Play</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
