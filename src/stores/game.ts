import { ref } from 'vue'
import { defineStore } from 'pinia'
import { GameStates } from '@/utils/constants'
import type { GameState } from '@/utils/interfaces'

export const useGameStore = defineStore('game', () => {
  const gameState = ref(GameStates.INITIAL)

  const updateGameState = (state: GameState) => {
    gameState.value = state
  }

  const toggleRace = () => {
    if (gameState.value === GameStates.RACE_STARTED) {
      updateGameState(GameStates.RACE_PAUSED)
    } else {
      updateGameState(GameStates.RACE_STARTED)
    }
  }

  const scheduleRace = () => updateGameState(GameStates.RACE_SCHEDULED)
  const finishRound = () => updateGameState(GameStates.ROUND_FINISHED)
  const finishRace = () => updateGameState(GameStates.RACE_FINISHED)
  const resetGame = () => updateGameState(GameStates.INITIAL)

  return {
    gameState,
    scheduleRace,
    toggleRace,
    finishRound,
    finishRace,
    resetGame,
  }
})
