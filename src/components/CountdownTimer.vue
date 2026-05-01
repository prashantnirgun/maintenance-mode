<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  targetDate?: string
}>(), {
  targetDate: ''
})

const totalSeconds = ref(0)
const isComplete = ref(false)
let intervalId: ReturnType<typeof setInterval> | undefined

const days = computed(() => Math.floor(totalSeconds.value / 86400))
const hours = computed(() => Math.floor((totalSeconds.value % 86400) / 3600))
const minutes = computed(() => Math.floor((totalSeconds.value % 3600) / 60))
const seconds = computed(() => totalSeconds.value % 60)

const formatted = computed(() => ({
  days: days.value.toString().padStart(2, '0'),
  hours: hours.value.toString().padStart(2, '0'),
  minutes: minutes.value.toString().padStart(2, '0'),
  seconds: seconds.value.toString().padStart(2, '0'),
}))

function clearTimer() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = undefined
  }
}

function updateTimer() {
  const target = new Date(props.targetDate).getTime()
  if (!target || Number.isNaN(target)) {
    totalSeconds.value = 0
    isComplete.value = false
    return
  }

  const remainingMs = target - Date.now()
  if (remainingMs <= 0) {
    totalSeconds.value = 0
    isComplete.value = true
    clearTimer()
    return
  }

  totalSeconds.value = Math.floor(remainingMs / 1000)
  isComplete.value = false
}

function startTimer() {
  clearTimer()
  updateTimer()
  intervalId = setInterval(updateTimer, 1000)
}

watch(
  () => props.targetDate,
  () => {
    startTimer()
  }
)

onMounted(startTimer)
onUnmounted(clearTimer)

defineExpose({ formatted, isComplete })
</script>

<template>
  <slot :time="formatted" :is-complete="isComplete" />
</template>
