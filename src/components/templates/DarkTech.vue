<script setup lang="ts">
import { computed } from 'vue'
import type { AppConfig } from '../../types'
import CountdownTimer from '@/components/CountdownTimer.vue'

const props = defineProps<{
  config: AppConfig
}>()

const isLaunchingSoon = computed(() => props.config.pageType === 'Launching Soon')
const isMaintenance = computed(() => props.config.pageType === 'Maintenance')
const companyNameStyle = computed(() => ({
  color: props.config.companyNameColor || '#22d3ee',
  fontSize: props.config.companyNameFontSize || '28px',
  fontWeight: props.config.companyNameFontWeight || '700',
  letterSpacing: props.config.companyNameLetterSpacing || '0.08em',
}))
</script>

<template>
  <div class="min-h-screen bg-[#020617] text-slate-300 flex flex-col font-mono relative overflow-hidden selection:bg-cyan-500/30">
    
    <!-- Grid Background -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

    <!-- Glowing Orb -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

    <header class="p-6 md:px-12 relative z-10 flex items-center justify-between border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
      <div class="font-bold tracking-widest flex items-center gap-3" :style="companyNameStyle">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        {{ config.companyName }}
      </div>
      <div class="text-xs tracking-widest text-slate-500 uppercase flex items-center gap-2">
        Status: <span :class="isMaintenance ? 'text-amber-400' : 'text-emerald-400'">{{ isMaintenance ? 'OFFLINE' : 'STANDBY' }}</span>
        <span class="w-2 h-2 rounded-full animate-pulse" :class="isMaintenance ? 'bg-amber-400' : 'bg-emerald-400'"></span>
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full relative z-10">
      
      <div class="mb-8 px-4 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs tracking-[0.2em] uppercase">
        // {{ config.pageType }}
      </div>

      <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-100 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
        {{ config.title }}
      </h1>
      
      <p class="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        > {{ config.subtitle }} <span class="animate-pulse">_</span>
      </p>

      <CountdownTimer v-if="isLaunchingSoon" :target-date="config.countdownDate">
        <template #default="{ time, isComplete }">
          <div class="mb-12">
            <div class="text-5xl md:text-7xl font-light tracking-[0.1em] text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              {{ isComplete ? 'LAUNCHED' : `${time.days}:${time.hours}:${time.minutes}:${time.seconds}` }}
            </div>
            <div class="text-xs text-slate-500 tracking-[0.3em] mt-4 uppercase">DD:HH:MM:SS</div>
          </div>
        </template>
      </CountdownTimer>

      <div v-if="isMaintenance" class="mb-12 p-6 border border-amber-500/30 bg-amber-500/5 max-w-lg mx-auto relative overflow-hidden group">
        <div class="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <p class="text-amber-400 font-medium relative z-10">{{ config.maintenanceMessage }}</p>
      </div>

      <button v-if="config.ctaText" class="group relative px-8 py-4 bg-transparent border border-cyan-500 text-cyan-400 font-bold uppercase tracking-widest overflow-hidden transition-all hover:text-slate-950">
        <div class="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-10"></div>
        {{ config.ctaText }}
      </button>

    </main>

    <footer class="p-6 text-center text-xs tracking-widest text-slate-600 relative z-10 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-md">
      TERMINAL v1.0.0 // {{ new Date().getFullYear() }} // {{ config.contactEmail }}
    </footer>
  </div>
</template>
