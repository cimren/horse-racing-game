<script setup lang="ts">
import RaceStatus from './RaceStatus.vue'
import RaceTracks from './RaceTracks.vue'
import RoundInfo from './RoundInfo.vue'

import { useScheduleStore } from '@/stores/schedule'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import type { HorseData } from '@/utils/interfaces'

const scheduleStore = useScheduleStore()
const { rounds, currentRound } = storeToRefs(scheduleStore)
const gameStore = useGameStore()

const resultList = ref<HorseData[]>([])

const MAX_HORSES = 10
const ROUND_DELAY = 1000
const NEXT_ROUND_DELAY = 2000

const round = computed(() => rounds.value[currentRound.value])

const convertToPx = (value: number) => value / 4

const onRaceFinish = (horseData: HorseData) => {
  if (resultList.value.some((h) => h.id === horseData.id)) return

  resultList.value.push(horseData)
  scheduleStore.setRoundResult(currentRound.value, [...resultList.value])
  const isLastRound = currentRound.value === rounds.value.length - 1

  if (resultList.value.length >= MAX_HORSES) {
    if (!isLastRound) {
      setTimeout(() => {
        resultList.value = []
        scheduleStore.goToNextRound()
        gameStore.finishRound()
      }, ROUND_DELAY)
      setTimeout(() => {
        gameStore.toggleRace()
      }, NEXT_ROUND_DELAY)
    } else {
      resultList.value = []
      gameStore.finishRace()
    }
  }
}
</script>

<template>
  <div class="race-area">
    <RaceStatus />
    <RaceTracks
      v-if="round"
      :horse-list="round.horseList"
      :distance="convertToPx(round.distance)"
      @onRaceFinish="onRaceFinish"
    />
    <RoundInfo v-if="round" :name="round.name" :distance="round.distance" />
  </div>
</template>

<style scoped>
.race-area {
  padding: 20px;
  margin: 20px;
  width: 50%;
}
</style>
