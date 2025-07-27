import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { HorseData, Round } from '@/utils/interfaces'
import { horseData } from '@/utils/constants'
import { getRandomElements, getOrdinalSuffix } from '@/utils/helpers'
import { MAX_HORSES_PER_RACE } from '@/utils/constants'

const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

export const useScheduleStore = defineStore('schedule', () => {
  const rounds = ref<Array<Round>>([])
  const currentRound = ref(0)

  function goToNextRound() {
    currentRound.value++
  }

  function generateSchedule() {
    currentRound.value = 0
    rounds.value = ROUND_DISTANCES.map((distance, index) => ({
      name: `${getOrdinalSuffix(index)} Lap`,
      distance,
      horseList: getRandomElements(horseData, MAX_HORSES_PER_RACE) as HorseData[],
      resultList: [] as HorseData[],
    }))
  }

  function setRoundResult(roundIndex: number, resultList: Array<HorseData>) {
    const round = rounds.value[roundIndex]
    if (round) {
      round.resultList = resultList
    }
  }

  function resetRace() {
    rounds.value = []
    currentRound.value = 0
  }

  return { rounds, currentRound, generateSchedule, goToNextRound, setRoundResult, resetRace }
})
