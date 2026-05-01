import { ref } from 'vue'
import { type AppConfig, defaultConfig } from '../types'

const config = ref<AppConfig>({ ...defaultConfig })
const isLoaded = ref(false)
const isSaving = ref(false)

export function useConfig() {
  async function loadConfig() {
    try {
      const res = await fetch('/api/config')
      if (res.ok) {
        const data = await res.json()
        if (Object.keys(data).length > 0) {
          config.value = { ...defaultConfig, ...data }
        }
      }
    } catch (e) {
      console.error('Failed to load config', e)
    } finally {
      isLoaded.value = true
    }
  }

  async function saveConfig() {
    isSaving.value = true
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config.value)
      })
      if (!res.ok) throw new Error('Failed to save')
      return true
    } catch (e) {
      console.error('Failed to save config', e)
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    config,
    isLoaded,
    isSaving,
    loadConfig,
    saveConfig
  }
}
