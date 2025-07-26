import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { HorseData } from '@/utils/interfaces'

export const useGameStore = defineStore('game', () => {
  const gameState = ref('INITIAL')
  const resultList = ref<Array<HorseData>>([])

  function updateGameState(state: string) {
    gameState.value = state
  }

  function scheduleRace() {
    resultList.value = []
    updateGameState('RACE_SCHEDULED')
  }

  function toggleRace() {
    if (gameState.value === 'RACE_STARTED') {
      updateGameState('RACE_PAUSED')
    } else {
      updateGameState('RACE_STARTED')
    }
  }

  function finishRound() {
    updateGameState('ROUND_FINISHED')
  }

  function finishRace() {
    updateGameState('RACE_FINISHED')
  }

  function resetGame() {
    updateGameState('INITIAL')
  }

  return {
    gameState,
    resultList,
    scheduleRace,
    toggleRace,
    finishRound,
    finishRace,
    resetGame,
  }
})
