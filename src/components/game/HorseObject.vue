<script setup lang="ts">
import IconHorse from '@/components/icons/IconHorse.vue'
import { computed, ref, watchEffect } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import type { HorseData } from '@/utils/interfaces'

const gameStore = useGameStore()
const { gameState } = storeToRefs(gameStore)

const emit = defineEmits<{
  (e: 'onRaceFinish', payload: HorseData): void
}>()

const { horse, distance } = defineProps({
  horse: {
    type: Object as () => HorseData,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
})

const position = ref(0)
const speed = computed(() => horse.condition / 100) // piksel/frame

let animationFrame: number | null = null
let finished = false

const start = () => {
  const animate = () => {
    if (position.value < distance) {
      position.value += speed.value
      animationFrame = requestAnimationFrame(animate)
    } else if (!finished) {
      finished = true
      position.value = distance
      emit('onRaceFinish', { ...horse })
    }
  }
  animationFrame = requestAnimationFrame(animate)
}

const stop = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

const reset = () => {
  stop()
  position.value = 0
  finished = false
}

watchEffect(() => {
  switch (gameState.value) {
    case 'RACE_STARTED':
      start()
      break
    case 'RACE_PAUSED':
    case 'RACE_FINISHED':
      stop()
      break
    case 'ROUND_FINISHED':
    case 'RACE_SCHEDULED':
      reset()
      break
    default:
      break
  }
})
</script>
<template>
  <div class="horse" :style="{ left: position + 'px' }">
    <IconHorse :color="horse.color" />
  </div>
</template>
<style scoped>
.horse {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.02s linear;
}
.move {
  left: 500px;
}
</style>
