<script setup lang="ts">
import { useScheduleStore } from '@/stores/schedule'
import { storeToRefs } from 'pinia'
import RoundTable from './RoundTable.vue'

const scheduleStore = useScheduleStore()
const { rounds } = storeToRefs(scheduleStore)
</script>

<template>
  <div class="result-area">
    <div class="title-area">
      <h2>Program</h2>
      <h2>Results</h2>
    </div>

    <div class="round-item" v-for="round in rounds" :key="round.name">
      <RoundTable :round="round" type="program" />
      <RoundTable :round="round" type="result" />
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
