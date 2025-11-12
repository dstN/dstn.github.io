import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 1337,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@composables": path.resolve(__dirname, "./src/composables"),
      "@handler": path.resolve(__dirname, "./src/handler"),
      "@util": path.resolve(__dirname, "./src/util"),
      "@node_modules": path.resolve(__dirname, "./node_modules"),
    },
  },
  build: {
    // Optimize build for better performance
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching and loading
        manualChunks: {
          "vue-vendor": ["vue", "vue-router"],
        },
      },
    },
    // Reduce chunk size warning threshold
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify with terser for better compression
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
