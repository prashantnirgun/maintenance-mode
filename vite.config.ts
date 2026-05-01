import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import configApiPlugin from './vite-plugin-config-api'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), configApiPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
