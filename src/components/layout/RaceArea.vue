<script setup lang="ts">
import HorseObject from '@/components/game/HorseObject.vue'
import { useScheduleStore } from '@/stores/schedule'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import type { HorseData } from '@/utils/interfaces'
import { computed, ref } from 'vue'
const scheduleStore = useScheduleStore()
const { rounds, currentRound } = storeToRefs(scheduleStore)
const gameStore = useGameStore()

const resultList = ref<HorseData[]>([])

const RACE_AREA_OFFSET = 50
const MAX_HORSES = 10
const ROUND_DELAY = 1000
const NEXT_ROUND_DELAY = 2000

const onRaceFinish = (horseData: HorseData) => {
  if (resultList.value.some((horse) => horse.id === horseData.id)) {
    return // Horse already finished this round
  }
  resultList.value.push(horseData)
  scheduleStore.setRoundResult(currentRound.value, [...resultList.value])
  const isLastRound = currentRound.value === rounds.value.length - 1

  if (resultList.value.length >= MAX_HORSES) {
    if (!isLastRound) {
      // Simulate a delay for the next round
      setTimeout(() => {
        resultList.value = []
        scheduleStore.goToNextRound()
        gameStore.finishRound()
      }, ROUND_DELAY)

      //Start the next round after a delay
      setTimeout(() => {
        gameStore.toggleRace()
      }, NEXT_ROUND_DELAY)
    } else {
      resultList.value = []
      gameStore.finishRace()
    }
  }
}

const raceStatus = computed(() => {
  switch (gameStore.gameState) {
    case 'INITIAL':
      return 'Welcome to the race. Click GENERATE PROGRAM to start.'
    case 'RACE_SCHEDULED':
      return 'Race scheduled. Click START to begin.'
    case 'RACE_STARTED':
      return 'Race started...'
    case 'ROUND_FINISHED':
      return 'Round finished. Waiting for next round...'
    case 'RACE_PAUSED':
      return 'Race paused. Click START to continue.'
    case 'RACE_FINISHED':
      return 'Race finished. Click GENERATE PROGRAM to start a new race.'
    default:
      return ''
  }
})

const currentDistancePx = computed(() => convertToPx(rounds.value[currentRound.value].distance))

const convertToPx = (value: number) => {
  return value / 4 // Assuming 1px = 4m for the race area
}
</script>
<template>
  <div class="race-area">
    <p class="race-status">{{ raceStatus }}</p>
    <div v-if="rounds.length > 0">
      <div class="race-tracks" :style="{ width: `${currentDistancePx + RACE_AREA_OFFSET}px` }">
        <div class="track" v-for="(item, index) in rounds[currentRound].horseList" :key="item.id">
          <div class="gate">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="lane">
            <HorseObject :horse="item" :distance="currentDistancePx" @onRaceFinish="onRaceFinish" />
          </div>
        </div>
      </div>
      <div class="round-info">
        <p>{{ rounds[currentRound].name }} {{ rounds[currentRound].distance }}m</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.race-area {
  padding: 20px;
  margin: 20px;
  width: 50%;
}
.race-status {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.race-tracks {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  border-right: 3px solid #b12e2e;
}
.track {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.gate {
  width: 26px;
  height: 50px;
  background-color: #357112;
  border: 1px solid #fff;
  position: relative;
  text-align: center;
}
.gate span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  color: #fff;
}
.lane {
  flex-grow: 1;
  height: 50px;
  position: relative;
  border-top: 1px dashed;
}
.track:last-child .lane {
  border-bottom: 1px dashed;
}
.round-info {
  text-align: center;
  color: #b12e2e;
}
.round-info p {
  font-weight: bold;
}
</style>
