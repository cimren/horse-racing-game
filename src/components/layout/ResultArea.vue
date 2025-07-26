<script setup lang="ts">
import { useScheduleStore } from '@/stores/schedule'
import { storeToRefs } from 'pinia'
import type { HorseData, Round } from '@/utils/interfaces'
import AppTable from '../ui/AppTable.vue'

const scheduleStore = useScheduleStore()
const { rounds } = storeToRefs(scheduleStore)

const scheduleColumns = [
  { columnName: 'position', label: 'Position' },
  { columnName: 'name', label: 'Name' },
]

const getTableRows = (horseList: HorseData[]) => {
  return horseList
    ? horseList.map((horse: HorseData, index: number) => ({
        position: index + 1,
        name: horse.name,
      }))
    : []
}

const getTableTitle = (round: Round) => {
  return `${round.name} - ${round.distance}m`
}
</script>
<template>
  <div class="result-area">
    <div class="title-area">
      <h2>Program</h2>
      <h2>Results</h2>
    </div>
    <div class="round-item" v-for="(round, index) in rounds" :key="round.name">
      <div>
        <AppTable
          :title="getTableTitle(round)"
          size="Small"
          :columns="scheduleColumns"
          :rows="getTableRows(rounds[index]?.horseList)"
        />
      </div>
      <div>
        <AppTable
          :title="getTableTitle(round)"
          size="Small"
          :columns="scheduleColumns"
          :rows="getTableRows(rounds[index]?.resultList)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.result-area {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  height: 600px;
  overflow: auto;
  width: 25%;
}
.round-item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  justify-content: space-evenly;
}

.round-item > div {
  width: 50%;
}
.title-area {
  display: flex;
}
.title-area h2 {
  flex: 1;
  text-align: center;
  margin: 0;
}
</style>
