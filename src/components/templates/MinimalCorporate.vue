<script setup lang="ts">
import { computed } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import type { AppConfig } from '../../types'
import { Button } from '@/components/ui/button'
import { usePageRefresh } from '@/composables/usePageRefresh'
import CountdownTimer from '@/components/CountdownTimer.vue'
import SplitFlapDigit from '@/components/SplitFlapDigit.vue'

const props = defineProps<{
  config: AppConfig
  animated?: boolean
}>()

const { refreshPage } = usePageRefresh()

const isMaintenance = computed(() => props.config.pageType === 'Maintenance')
const showCounter = computed(() => !isMaintenance.value && Boolean(props.config.countdownDate))
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
    <div v-if="animated" class="rocket-scene absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="rocket-lottie-wrap">
        <DotLottieVue
          class="rocket-lottie"
          autoplay
          loop
          src="https://assets-v2.lottiefiles.com/a/dca5bbf6-4f34-11f0-9265-6b8642d302aa/dRZnYVaXEx.lottie"
        />
      </div>
    </div>
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

      <!-- Countdown -->
      <div v-if="showCounter" class="mb-10 w-full max-w-md space-y-4">
        <CountdownTimer :target-date="config.countdownDate">
          <template #default="{ time, isComplete }">
            <div v-if="!isComplete" class="flex items-center justify-center gap-4 text-center">
              <div class="flex flex-col items-center">
                <div class="flex items-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in time.days.split('')"
                    :key="`days-${idx}`"
                    :digit="digit"
                    size="md"
                  />
                </div>
                <span class="text-xs text-slate-500 uppercase tracking-widest">Days</span>
              </div>
              <span class="text-2xl text-slate-300 dark:text-slate-700">:</span>
              <div class="flex flex-col items-center">
                <div class="flex items-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in time.hours.split('')"
                    :key="`hours-${idx}`"
                    :digit="digit"
                    size="md"
                  />
                </div>
                <span class="text-xs text-slate-500 uppercase tracking-widest">Hours</span>
              </div>
              <span class="text-2xl text-slate-300 dark:text-slate-700">:</span>
              <div class="flex flex-col items-center">
                <div class="flex items-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in time.minutes.split('')"
                    :key="`minutes-${idx}`"
                    :digit="digit"
                    size="md"
                  />
                </div>
                <span class="text-xs text-slate-500 uppercase tracking-widest">Mins</span>
              </div>
              <span class="text-2xl text-slate-300 dark:text-slate-700">:</span>
              <div class="flex flex-col items-center">
                <div class="flex items-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in time.seconds.split('')"
                    :key="`seconds-${idx}`"
                    :digit="digit"
                    size="md"
                  />
                </div>
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
        <Button type="button" variant="outline" size="lg" class="w-full sm:w-auto h-12 px-8 rounded-full text-base" @click="refreshPage">
          Refresh
        </Button>
      </div>
    </main>

    <footer class="p-6 text-center text-sm text-slate-400 relative z-10">
      &copy; {{ new Date().getFullYear() }} {{ config.companyName }}. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
.rocket-scene {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 15% 20%, rgba(59, 130, 246, 0.15), transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(99, 102, 241, 0.12), transparent 40%);
}

.rocket-lottie-wrap {
  width: min(620px, 70vw);
  max-height: 60vh;
  opacity: 0.85;
  transform: translateY(-2%);
  filter: drop-shadow(0 12px 28px rgba(59, 130, 246, 0.2));
}

.rocket-lottie {
  width: 100%;
  height: 100%;
}

.dark .rocket-scene {
  background: radial-gradient(circle at 15% 20%, rgba(14, 116, 144, 0.2), transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(79, 70, 229, 0.18), transparent 40%);
}
</style>
