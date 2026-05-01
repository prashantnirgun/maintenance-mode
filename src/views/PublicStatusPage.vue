<script setup lang="ts">
import { onMounted, computed, watchEffect } from 'vue'
import { useConfig } from '../composables/useConfig'
import MinimalCorporate from '../components/templates/MinimalCorporate.vue'
import CreativeIllustration from '../components/templates/CreativeIllustration.vue'
import DarkTech from '../components/templates/DarkTech.vue'
import EventBreakTimer from '../components/templates/EventBreakTimer.vue'

const props = defineProps<{
  previewMode?: boolean
}>()

const { config, isLoaded, loadConfig } = useConfig()

onMounted(() => {
  // If not in preview mode, we might want to ensure config is loaded.
  // Actually, useConfig handles caching if already loaded, but let's just call it to be safe.
  if (!props.previewMode && !isLoaded.value) {
    loadConfig()
  }
})

watchEffect(() => {
  const fallbackTitle = config.value.title || 'Status Page'
  document.title = (config.value.pageTitle || fallbackTitle).trim() || fallbackTitle
})

// Dynamic component mapping
const templateComponents = {
  MinimalCorporate,
  CreativeIllustration,
  DarkTech
}

const currentTemplate = computed(() => {
  if (config.value.pageType === 'Timer') {
    return EventBreakTimer
  }
  return templateComponents[config.value.template] || MinimalCorporate
})

const useAnimation = computed(() => config.value.animationMode === 'with-animation')

</script>

<template>
  <div v-if="!isLoaded && !previewMode" class="min-h-screen flex items-center justify-center bg-background">
    <!-- Optional loading state -->
  </div>
  
  <component 
    v-else
    :is="currentTemplate" 
    :config="config"
    :animated="useAnimation"
  />
</template>
