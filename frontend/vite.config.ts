import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(
    {template: {
      compilerOptions: {
        isCustomElement: (tag) => ['ShiftDialog'].includes(tag),
      }
    }}
  )],
  server: {
    host: "0.0.0.0",
    port: 8080, // Ensure this matches the exposed port
    hmr: {
      host: 'localhost', // or your Docker host IP
    },
    watch:{
      usePolling: true
    }
  },
})
