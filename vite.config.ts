import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL || "/front-bluedove-ma",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // equivalent to '0.0.0.0'
    port: 5174,
    strictPort: true,
    watch: {
      usePolling: true, // helps with volume-mounted code changes in Docker
    },
  },
});
