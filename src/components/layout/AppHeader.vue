<script setup lang="ts">
import AppButton from '../ui/AppButton.vue'
import { useScheduleStore } from '@/stores/schedule'
import { useGameStore } from '@/stores/game'
const scheduleStore = useScheduleStore()
const gameStore = useGameStore()

const generateProgram = () => {
  if (gameStore.gameState === 'RACE_STARTED' || gameStore.gameState === 'RACE_PAUSED') return
  scheduleStore.generateSchedule()
  gameStore.scheduleRace()
}
const toggleStart = () => {
  if (gameStore.gameState === 'RACE_FINISHED' || gameStore.gameState === 'INITIAL') return
  gameStore.toggleRace()
}
</script>
<template>
  <header>
    <h1>Horse Racing</h1>
    <div class="actions">
      <AppButton label="Generate Program" @click="generateProgram" />
      <AppButton label="START / PAUSE" @click="toggleStart" />
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
