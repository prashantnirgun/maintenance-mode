<script setup lang="ts">
import { computed } from 'vue'
import type { AppConfig } from '../../types'
import CountdownTimer from '@/components/CountdownTimer.vue'
import SplitFlapDigit from '@/components/SplitFlapDigit.vue'
import TechCompanyScene from '@/components/animations/TechCompanyScene.vue'

const props = defineProps<{
  config: AppConfig
  animated?: boolean
}>()

const companyNameStyle = computed(() => ({
  color: props.config.companyNameColor || '#2563eb',
  fontSize: props.config.companyNameFontSize || '28px',
  fontWeight: props.config.companyNameFontWeight || '700',
  letterSpacing: props.config.companyNameLetterSpacing || '0.02em',
}))

const formattedDate = computed(() => {
  if (!props.config.countdownDate) return ''
  return new Date(props.config.countdownDate).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex flex-col">
    <TechCompanyScene v-if="animated" :dark="true" />
    <div
      class="absolute inset-0"
      :class="animated ? 'bg-slate-950/65' : 'bg-[radial-gradient(circle_at_top,#1e293b,transparent_55%),linear-gradient(180deg,#020617,#0f172a)]'"
    />

    <header class="p-6 md:px-12 relative z-10 flex items-center justify-between border-b border-slate-700/60">
      <div class="tracking-tight" :style="companyNameStyle">
        {{ config.companyName }}
      </div>
      <a :href="`mailto:${config.contactEmail}`" class="text-sm text-slate-300 hover:text-white hover:underline">
        Contact Us
      </a>
    </header>

    <main class="relative z-10 flex-1 flex items-center justify-center p-6">
      <div class="w-full max-w-3xl rounded-3xl border border-cyan-400/40 bg-slate-900/70 backdrop-blur-md px-6 py-10 md:p-12 text-center shadow-2xl">
        <div class="inline-flex px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-semibold tracking-[0.16em] uppercase mb-6">
          Event Break Timer
        </div>

        <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          {{ config.title || 'We will be back live shortly' }}
        </h1>
        <p class="text-slate-300 md:text-lg mb-10 max-w-2xl mx-auto">
          {{ config.subtitle || 'Please stay tuned. The session resumes after this timer ends.' }}
        </p>

        <CountdownTimer :target-date="config.countdownDate">
          <template #default="{ time, isComplete }">
            <div v-if="!isComplete" class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div class="rounded-2xl border border-slate-700 bg-slate-900/80 min-h-[8rem] md:min-h-[8.75rem] px-2 py-3 flex flex-col items-center justify-center gap-2">
                <div class="flex items-center justify-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in time.days.split('')"
                    :key="`days-${idx}`"
                    :digit="digit"
                    size="lg"
                  />
                </div>
                <div class="text-xs leading-none tracking-[0.16em] text-slate-400 uppercase">Days</div>
              </div>
              <div class="rounded-2xl border border-slate-700 bg-slate-900/80 min-h-[8rem] md:min-h-[8.75rem] px-2 py-3 flex flex-col items-center justify-center gap-2">
                <div class="flex items-center justify-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in time.hours.split('')"
                    :key="`hours-${idx}`"
                    :digit="digit"
                    size="lg"
                  />
                </div>
                <div class="text-xs leading-none tracking-[0.16em] text-slate-400 uppercase">Hours</div>
              </div>
              <div class="rounded-2xl border border-slate-700 bg-slate-900/80 min-h-[8rem] md:min-h-[8.75rem] px-2 py-3 flex flex-col items-center justify-center gap-2">
                <div class="flex items-center justify-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in time.minutes.split('')"
                    :key="`minutes-${idx}`"
                    :digit="digit"
                    size="lg"
                  />
                </div>
                <div class="text-xs leading-none tracking-[0.16em] text-slate-400 uppercase">Minutes</div>
              </div>
              <div class="rounded-2xl border border-slate-700 bg-slate-900/80 min-h-[8rem] md:min-h-[8.75rem] px-2 py-3 flex flex-col items-center justify-center gap-2">
                <div class="flex items-center justify-center gap-1">
                  <SplitFlapDigit
                    v-for="(digit, idx) in time.seconds.split('')"
                    :key="`seconds-${idx}`"
                    :digit="digit"
                    size="lg"
                  />
                </div>
                <div class="text-xs leading-none tracking-[0.16em] text-slate-400 uppercase">Seconds</div>
              </div>
            </div>
            <div v-else class="text-2xl md:text-3xl font-semibold text-emerald-300">
              We are live again now.
            </div>
          </template>
        </CountdownTimer>

        <p v-if="formattedDate" class="mt-6 text-sm text-slate-400">
          Live resumes at {{ formattedDate }}
        </p>
      </div>
    </main>
  </div>
</template>
