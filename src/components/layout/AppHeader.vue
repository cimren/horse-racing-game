<script setup lang="ts">
import AppButton from '../ui/AppButton.vue'
import { useScheduleStore } from '@/stores/schedule'
import { useGameStore } from '@/stores/game'
const scheduleStore = useScheduleStore()
const gameStore = useGameStore()

const generateProgram = () => {
  if (['RACE_STARTED', 'RACE_PAUSED'].includes(gameStore.gameState)) return
  scheduleStore.generateSchedule()
  gameStore.scheduleRace()
}
const toggleStart = () => {
  if (['INITIAL', 'ROUND_FINISHED', 'RACE_FINISHED'].includes(gameStore.gameState)) return
  gameStore.toggleRace()
}
</script>
<template>
  <header>
    <h1>Horse Racing</h1>
    <div class="actions">
      <AppButton label="GENERATE PROGRAM" name="generateProgram" @click="generateProgram" />
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
