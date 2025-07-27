<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { GameStates } from '@/utils/constants'

const gameStore = useGameStore()

const statusMessage = computed(() => {
  switch (gameStore.gameState) {
    case GameStates.INITIAL:
      return 'Welcome to the race. Click GENERATE PROGRAM to start.'
    case GameStates.RACE_SCHEDULED:
      return 'Race scheduled. Click START to begin.'
    case GameStates.RACE_STARTED:
      return 'Race started...'
    case GameStates.ROUND_FINISHED:
      return 'Round finished. Waiting for next round...'
    case GameStates.RACE_PAUSED:
      return 'Race paused. Click START to continue.'
    case GameStates.RACE_FINISHED:
      return 'Race finished. Click GENERATE PROGRAM to start a new race.'
    default:
      return ''
  }
})
</script>

<template>
  <p class="race-status">{{ statusMessage }}</p>
</template>

<style scoped>
.race-status {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
</style>
