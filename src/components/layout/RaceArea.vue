<script setup lang="ts">
import HorseObject from '@/components/game/HorseObject.vue'
import { useScheduleStore } from '@/stores/schedule'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import type { HorseData } from '@/utils/interfaces'
const scheduleStore = useScheduleStore()
const { rounds, currentRound } = storeToRefs(scheduleStore)
const gameStore = useGameStore()

let resultList: HorseData[] = []

const onRaceFinish = (horseData: HorseData) => {
  resultList.push(horseData)
  scheduleStore.setRoundResult(currentRound.value, [...resultList])
  if (resultList.length >= 10) {
    if (currentRound.value < 5) {
      // Simulate a delay for the next round
      setTimeout(() => {
        scheduleStore.goToNextRound()
        resultList = []
        gameStore.finishRound()
      }, 1000)

      //Start the next round after a delay
      setTimeout(() => {
        gameStore.toggleRace()
      }, 2000)
    } else {
      gameStore.finishRace()
    }
  }
}

const getRaceStatus = () => {
  switch (gameStore.gameState) {
    case 'INITIAL':
      return 'Click GENERATE PROGRAM to start'
    case 'RACE_STARTED':
      return 'Race started...'
    case 'ROUND_FINISHED':
      return 'Round finished. Waiting for next round...'
    case 'RACE_PAUSED':
      return 'Race paused. Click START to continue'
    case 'RACE_FINISHED':
      return 'Race finished. Click GENERATE PROGRAM to start a new race'
    default:
      return ''
  }
}
</script>
<template>
  <div class="race-area" v-if="rounds.length > 0">
    <p>{{ getRaceStatus() }}</p>
    <div class="race-tracks">
      <div class="track" v-for="(item, index) in rounds[currentRound].horseList" :key="item.id">
        <div class="gate">
          <span>{{ index + 1 }}</span>
        </div>
        <div class="lane">
          <HorseObject :key="index" :horse="item" @onRaceFinish="onRaceFinish" />
        </div>
      </div>
    </div>
    <div class="race-status">
      <p>{{ rounds[currentRound].name }} {{ rounds[currentRound].distance }}m</p>
    </div>
  </div>
</template>
<style scoped>
.race-area {
  min-width: 440px;
  padding: 20px;
  margin: 20px;
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
.race-status {
  text-align: center;
  color: #b12e2e;
}
.race-status p {
  font-weight: bold;
}
</style>
