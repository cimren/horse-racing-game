import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { HorseData, Round } from '@/utils/interfaces'
import { horseData } from '@/utils/constants'

export const useScheduleStore = defineStore('schedule', () => {
  const rounds = ref<Array<Round>>([])
  const currentRound = ref(0)

  function goToNextRound() {
    currentRound.value++
  }

  function generateSchedule() {
    currentRound.value = 0
    const roundData = [
      {
        name: '1st Lap',
        distance: 1200,
        horseList: getRandomElements(horseData, 10),
        resultList: [],
      },
      {
        name: '2nd Lap',
        distance: 1400,
        horseList: getRandomElements(horseData, 10),
        resultList: [],
      },
      {
        name: '3rd Lap',
        distance: 1600,
        horseList: getRandomElements(horseData, 10),
        resultList: [],
      },
      {
        name: '4th Lap',
        distance: 1800,
        horseList: getRandomElements(horseData, 10),
        resultList: [],
      },
      {
        name: '5th Lap',
        distance: 2000,
        horseList: getRandomElements(horseData, 10),
        resultList: [],
      },
      {
        name: '6th Lap',
        distance: 2200,
        horseList: getRandomElements(horseData, 10),
        resultList: [],
      },
    ]
    rounds.value = [...roundData]
  }

  function setRoundResult(roundIndex: number, resultList: Array<HorseData>) {
    if (rounds.value[roundIndex]) {
      rounds.value[roundIndex].resultList = resultList
    }
  }

  function resetRace() {
    rounds.value = []
  }

  return { rounds, currentRound, generateSchedule, goToNextRound, setRoundResult, resetRace }
})

const getRandomElements = (arr: Array<HorseData>, count: number): Array<HorseData> => {
  const arrayCopy = [...arr]
  const newArray = []

  for (let i = 0; i < count; i++) {
    const randNum = Math.floor(Math.random() * arrayCopy.length)
    const splicedItem = arrayCopy.splice(randNum, 1)[0]
    newArray.push(splicedItem)
  }
  return newArray
}
