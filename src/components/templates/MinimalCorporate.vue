<script setup lang="ts">
import { computed } from 'vue'
import type { AppConfig } from '../../types'
import { Button } from '@/components/ui/button'
import CountdownTimer from '@/components/CountdownTimer.vue'
import TechCompanyScene from '@/components/animations/TechCompanyScene.vue'

const props = defineProps<{
  config: AppConfig
  animated?: boolean
}>()

const isLaunchingSoon = computed(() => props.config.pageType === 'Launching Soon')
const isMaintenance = computed(() => props.config.pageType === 'Maintenance')
const companyNameStyle = computed(() => ({
  color: props.config.companyNameColor || '#2563eb',
  fontSize: props.config.companyNameFontSize || '28px',
  fontWeight: props.config.companyNameFontWeight || '700',
  letterSpacing: props.config.companyNameLetterSpacing || '0.02em',
}))

// Simple static formatting for demo purposes
const formattedDate = computed(() => {
  if (!props.config.countdownDate) return ''
  return new Date(props.config.countdownDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-500 relative overflow-hidden">
    <TechCompanyScene v-if="animated" :dark="false" />
    <div v-if="animated" class="absolute inset-0 bg-white/75 dark:bg-slate-950/80 pointer-events-none"></div>

    <header class="p-6 md:px-12 flex items-center justify-between relative z-10">
      <div class="font-bold tracking-tighter flex items-center gap-2" :style="companyNameStyle">
        <div class="w-6 h-6 bg-slate-900 dark:bg-slate-100 rounded-sm"></div>
        {{ config.companyName }}
      </div>
      <nav v-if="!isMaintenance">
        <a :href="`mailto:${config.contactEmail}`" class="text-sm font-medium hover:underline text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">Contact Us</a>
      </nav>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto w-full relative z-10">
      <div class="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium mb-8 text-slate-600 dark:text-slate-300">
        <span class="w-2 h-2 rounded-full mr-2" :class="isMaintenance ? 'bg-amber-500' : 'bg-blue-500'"></span>
        {{ config.pageType }}
      </div>

      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance leading-tight">
        {{ config.title }}
      </h1>
      
      <p class="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 text-balance max-w-2xl mx-auto leading-relaxed">
        {{ config.subtitle }}
      </p>

      <!-- Launching Soon Specific -->
      <div v-if="isLaunchingSoon" class="mb-10 w-full max-w-md space-y-4">
        <CountdownTimer :target-date="config.countdownDate">
          <template #default="{ time, isComplete }">
            <div v-if="!isComplete" class="flex items-center justify-center gap-4 text-center">
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold tracking-tighter">{{ time.days }}</span>
                <span class="text-xs text-slate-500 uppercase tracking-widest">Days</span>
              </div>
              <span class="text-2xl text-slate-300 dark:text-slate-700">:</span>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold tracking-tighter">{{ time.hours }}</span>
                <span class="text-xs text-slate-500 uppercase tracking-widest">Hours</span>
              </div>
              <span class="text-2xl text-slate-300 dark:text-slate-700">:</span>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold tracking-tighter">{{ time.minutes }}</span>
                <span class="text-xs text-slate-500 uppercase tracking-widest">Mins</span>
              </div>
              <span class="text-2xl text-slate-300 dark:text-slate-700">:</span>
              <div class="flex flex-col items-center">
                <span class="text-3xl font-bold tracking-tighter">{{ time.seconds }}</span>
                <span class="text-xs text-slate-500 uppercase tracking-widest">Secs</span>
              </div>
            </div>
            <p v-else class="text-lg font-semibold">We are live now!</p>
          </template>
        </CountdownTimer>
        <p class="text-sm text-slate-500">Expected launch: {{ formattedDate }}</p>
      </div>

      <!-- Maintenance Specific -->
      <div v-if="isMaintenance" class="mb-10 p-6 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-100 dark:border-amber-500/20 max-w-lg mx-auto">
        <p class="text-amber-800 dark:text-amber-200">{{ config.maintenanceMessage }}</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto">
        <Button v-if="config.ctaText" size="lg" class="w-full sm:w-auto h-12 px-8 rounded-full text-base">
          {{ config.ctaText }}
        </Button>
      </div>
    </main>

    <footer class="p-6 text-center text-sm text-slate-400 relative z-10">
      &copy; {{ new Date().getFullYear() }} {{ config.companyName }}. All rights reserved.
    </footer>
  </div>
</template>
