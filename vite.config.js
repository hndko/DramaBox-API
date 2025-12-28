import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy API requests to bypass CORS
      "/api": {
        target: "https://dramabox.sansekai.my.id",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
