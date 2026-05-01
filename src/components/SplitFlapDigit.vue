<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  digit: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})

const FLIP_DURATION_MS = 280

const currentDigit = ref(props.digit)
const previousDigit = ref(props.digit)
const incomingDigit = ref(props.digit)
const isFlipping = ref(false)

const sizeClass = computed(() => {
  if (props.size === 'sm') {
    return 'w-8 h-12 text-[1.75rem]'
  }
  if (props.size === 'lg') {
    return 'w-14 h-[5.2rem] md:w-16 md:h-[6.1rem] text-[2.7rem] md:text-[3.2rem]'
  }
  return 'w-10 h-[4.1rem] md:w-12 md:h-[4.8rem] text-[2.05rem] md:text-[2.45rem]'
})

watch(
  () => props.digit,
  (nextDigit) => {
    if (nextDigit === currentDigit.value) {
      return
    }

    previousDigit.value = currentDigit.value
    incomingDigit.value = nextDigit
    isFlipping.value = true

    window.setTimeout(() => {
      currentDigit.value = nextDigit
      isFlipping.value = false
    }, FLIP_DURATION_MS)
  }
)
</script>

<template>
  <div
    class="split-flap relative rounded-sm overflow-hidden border border-[#0f1116] bg-[#2a2f38] text-[#ffc81d] font-mono font-black tabular-nums select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_1px_rgba(0,0,0,0.5)]"
    :class="sizeClass"
  >
    <div class="absolute inset-0 z-30 leading-none">
      <div class="digit-text">
        {{ isFlipping ? incomingDigit : currentDigit }}
      </div>
    </div>

    <div class="absolute inset-x-0 top-0 h-1/2 z-10 bg-gradient-to-b from-[#3c424d] to-[#2e333d]"></div>
    <div class="absolute inset-x-0 bottom-0 h-1/2 z-10 bg-gradient-to-b from-[#282d36] to-[#1d2129]"></div>
    <div class="absolute inset-x-0 top-1/2 h-[2px] bg-[#0d0f14] z-35"></div>
    <div class="absolute inset-x-0 top-[calc(50%-1px)] h-[1px] bg-white/15 z-35"></div>
    <div class="center-rivet left-1"></div>
    <div class="center-rivet right-1"></div>

    <div v-if="isFlipping" class="flap-overlay absolute inset-x-0 top-0 h-1/2 z-40 overflow-hidden">
      <div class="flap-front h-full leading-none bg-gradient-to-b from-[#424954] to-[#272c35]">
        {{ previousDigit }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.split-flap {
  perspective: 320px;
}

.flap-overlay {
  transform-origin: bottom center;
  animation: flap-down 280ms ease-in-out forwards;
  backface-visibility: hidden;
}

.flap-front {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.digit-text {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Slight baseline correction so numerals look optically centered */
  transform: translateY(0.04em);
  letter-spacing: 0.03em;
  text-shadow: 0 0 1px rgba(255, 213, 70, 0.85), 0 0 10px rgba(255, 194, 31, 0.16);
}

.center-rivet {
  position: absolute;
  top: calc(50% - 2px);
  z-index: 36;
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: radial-gradient(circle at 35% 35%, #8d939e 0%, #545a64 40%, #21262f 100%);
  box-shadow: 0 0 0 1px rgba(11, 13, 18, 0.85);
}

@keyframes flap-down {
  0% {
    transform: rotateX(0deg);
    filter: brightness(1);
  }
  100% {
    transform: rotateX(-88deg);
    filter: brightness(0.7);
  }
}
</style>
