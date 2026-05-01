<script setup lang="ts">
import { computed } from 'vue'
import type { AppConfig } from '../../types'
import { Button } from '@/components/ui/button'
import CountdownTimer from '@/components/CountdownTimer.vue'
import SplitFlapDigit from '@/components/SplitFlapDigit.vue'

const props = defineProps<{
  config: AppConfig
}>()

const isLaunchingSoon = computed(() => props.config.pageType === 'Launching Soon')
const isMaintenance = computed(() => props.config.pageType === 'Maintenance')
const showCounter = computed(() => !isMaintenance.value && Boolean(props.config.countdownDate))
const companyNameStyle = computed(() => ({
  color: props.config.companyNameColor || '#7c3aed',
  fontSize: props.config.companyNameFontSize || '28px',
  fontWeight: props.config.companyNameFontWeight || '800',
  letterSpacing: props.config.companyNameLetterSpacing || '0.05em',
}))

</script>

<template>
  <div class="min-h-screen bg-[#faf5f0] dark:bg-[#1a1525] text-slate-800 dark:text-slate-100 flex flex-col relative overflow-hidden transition-colors duration-500" style="font-family: 'Poppins', sans-serif;">
    
    <!-- Background Decorative Elements -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-pink-300 to-purple-400 blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-yellow-200 to-orange-300 blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen" style="animation: pulse 8s infinite alternate;"></div>

    <header class="p-8 relative z-10 flex items-center justify-between gap-4">
      <div class="font-black tracking-widest uppercase" :style="companyNameStyle">
        {{ config.companyName }}
      </div>
      <a :href="`mailto:${config.contactEmail}`" class="text-sm font-semibold text-purple-700 dark:text-purple-300 hover:underline">
        Contact Us
      </a>
    </header>

    <main class="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 gap-12 max-w-6xl mx-auto w-full relative z-10">
      
      <div class="flex-1 text-center lg:text-left space-y-8">
        <div class="inline-block px-4 py-1.5 rounded-full bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-white/20 shadow-sm text-sm font-semibold tracking-wide uppercase text-purple-700 dark:text-purple-300">
          {{ config.pageType }}
        </div>

        <h1 class="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
          {{ config.title }}
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-medium opacity-90">
          {{ config.subtitle }}
        </p>

        <CountdownTimer v-if="showCounter" :target-date="config.countdownDate">
          <template #default="{ time, isComplete }">
            <div class="grid grid-cols-4 gap-2 max-w-md mx-auto lg:mx-0">
              <div class="rounded-xl bg-white/60 dark:bg-black/30 backdrop-blur-sm px-3 py-3 text-center">
                <div class="flex items-center justify-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in (isComplete ? '00' : time.days).split('')"
                    :key="`days-${idx}`"
                    :digit="digit"
                    size="sm"
                  />
                </div>
                <div class="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-300">Days</div>
              </div>
              <div class="rounded-xl bg-white/60 dark:bg-black/30 backdrop-blur-sm px-3 py-3 text-center">
                <div class="flex items-center justify-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in (isComplete ? '00' : time.hours).split('')"
                    :key="`hours-${idx}`"
                    :digit="digit"
                    size="sm"
                  />
                </div>
                <div class="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-300">Hours</div>
              </div>
              <div class="rounded-xl bg-white/60 dark:bg-black/30 backdrop-blur-sm px-3 py-3 text-center">
                <div class="flex items-center justify-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in (isComplete ? '00' : time.minutes).split('')"
                    :key="`minutes-${idx}`"
                    :digit="digit"
                    size="sm"
                  />
                </div>
                <div class="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-300">Mins</div>
              </div>
              <div class="rounded-xl bg-white/60 dark:bg-black/30 backdrop-blur-sm px-3 py-3 text-center">
                <div class="flex items-center justify-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in (isComplete ? '00' : time.seconds).split('')"
                    :key="`seconds-${idx}`"
                    :digit="digit"
                    size="sm"
                  />
                </div>
                <div class="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-300">Secs</div>
              </div>
            </div>
          </template>
        </CountdownTimer>

        <div v-if="isMaintenance" class="p-4 bg-orange-100/80 dark:bg-orange-900/40 backdrop-blur-md rounded-xl border border-orange-200 dark:border-orange-800 max-w-md mx-auto lg:mx-0">
          <p class="font-medium text-orange-800 dark:text-orange-200">{{ config.maintenanceMessage }}</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
          <Button v-if="config.ctaText" size="lg" class="h-14 px-8 rounded-2xl text-lg shadow-xl shadow-purple-500/20 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 border-0">
            {{ config.ctaText }}
          </Button>
        </div>
      </div>

      <!-- Illustration Area -->
      <div class="flex-1 flex justify-center items-center relative w-full max-w-md lg:max-w-none">
        <div class="relative w-full aspect-square max-w-[400px]">
          <!-- Abstract CSS Illustration -->
          <div class="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-xl rounded-[3rem] shadow-2xl transform rotate-3 scale-105 border border-white/40"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] shadow-inner flex items-center justify-center p-8 transform -rotate-3 overflow-hidden">
             
             <!-- Inner Abstract shapes -->
             <div class="absolute top-4 left-4 w-24 h-24 bg-white/20 rounded-full blur-md"></div>
             <div class="absolute bottom-12 right-8 w-32 h-32 bg-black/10 rounded-full blur-lg"></div>
             
             <!-- Content inside illustration based on type -->
             <div v-if="isLaunchingSoon" class="text-white text-center relative z-10">
                <div class="text-6xl font-black mb-2 tracking-tighter">SOON</div>
                <div class="text-xl font-medium opacity-80 uppercase tracking-widest">Get Ready</div>
             </div>
             <div v-else-if="isMaintenance" class="text-white text-center relative z-10">
                <div class="w-24 h-24 border-8 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <div class="text-2xl font-bold tracking-widest uppercase">Upgrading</div>
             </div>
             <div v-else class="text-white text-center relative z-10">
                <div class="grid grid-cols-2 gap-3">
                  <div class="w-12 h-12 bg-white/20 rounded-xl"></div>
                  <div class="w-12 h-12 bg-white/40 rounded-xl"></div>
                  <div class="w-12 h-12 bg-white/60 rounded-xl"></div>
                  <div class="w-12 h-12 bg-white/80 rounded-xl"></div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </main>

    <footer class="px-8 pb-8 pt-4 text-center text-sm text-slate-500 dark:text-slate-400 relative z-10">
      {{ config.contactEmail }}
    </footer>
  </div>
</template>
