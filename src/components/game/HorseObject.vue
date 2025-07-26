<script setup lang="ts">
import IconHorse from '@/components/icons/IconHorse.vue'
import { ref, watchEffect } from 'vue'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import type { HorseData } from '@/utils/interfaces'

const gameStore = useGameStore()
const { gameState } = storeToRefs(gameStore)

const emit = defineEmits(['onRaceFinish'])

const { horse } = defineProps({
  horse: {
    type: Object as () => HorseData,
    required: true,
  },
})

const position = ref(0)
let animationFrame: number | null = null
const speed = horse.condition / 100 // piksel/frame

const start = () => {
  const animate = () => {
    if (position.value < 350) {
      position.value += speed
      animationFrame = requestAnimationFrame(animate)
    } else {
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
  position.value = 0
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
      reset()
      break
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
