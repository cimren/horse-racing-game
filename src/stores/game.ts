import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const gameState = ref('INITIAL')

  function updateGameState(state: string) {
    gameState.value = state
  }

  function scheduleRace() {
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
    scheduleRace,
    toggleRace,
    finishRound,
    finishRace,
    resetGame,
  }
})
