import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue()],
    server: {
      proxy: {
        // Proxy API requests to bypass CORS
        "/api": {
          target: env.VITE_API_URL || "https://dramabox.sansekai.my.id",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
