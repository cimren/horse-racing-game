<script setup lang="ts">
import AppButton from '../ui/AppButton.vue'
import { useScheduleStore } from '@/stores/schedule'
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'
import { GameStates } from '@/utils/constants'

const scheduleStore = useScheduleStore()
const gameStore = useGameStore()

const generateProgramStates = [
  GameStates.INITIAL,
  GameStates.RACE_SCHEDULED,
  GameStates.RACE_FINISHED,
]
const toggleStartStates = [
  GameStates.RACE_SCHEDULED,
  GameStates.RACE_STARTED,
  GameStates.RACE_PAUSED,
]

const canGenerateProgram = computed(() => generateProgramStates.includes(gameStore.gameState))
const canToggleStart = computed(() => toggleStartStates.includes(gameStore.gameState))

const generateProgram = () => {
  if (canGenerateProgram.value) {
    scheduleStore.generateSchedule()
    gameStore.scheduleRace()
  }
}
const toggleStart = () => {
  if (canToggleStart.value) {
    gameStore.toggleRace()
  }
}
</script>
<template>
  <header>
    <h1>Horse Racing</h1>
    <div class="actions">
      <AppButton
        label="GENERATE PROGRAM"
        name="generateProgram"
        @click="generateProgram"
        :disabled="!canGenerateProgram"
      />
      <AppButton label="START / PAUSE" @click="toggleStart" :disabled="!canToggleStart" />
    </div>
  </header>
</template>
<style scoped>
header {
  background-color: #147a64;
  color: #fff;
  padding: 10px;
  width: 100%;
  display: flex;
}
h1 {
  margin: 0;
  font-size: 2rem;
  flex-grow: 1;
}
.actions {
  display: flex;
  gap: 10px;
}
</style>
