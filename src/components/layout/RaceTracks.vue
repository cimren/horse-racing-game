<script setup lang="ts">
import TrackLane from '@/components/layout/TrackLane.vue'
import type { HorseData } from '@/utils/interfaces'

defineProps<{
  horseList: HorseData[]
  distance: number
}>()

const RACE_AREA_OFFSET = 50

const emit = defineEmits(['onRaceFinish'])
const onRaceFinish = (horse: HorseData) => emit('onRaceFinish', horse)
</script>

<template>
  <div class="race-tracks" :style="{ width: `${distance + RACE_AREA_OFFSET}px` }">
    <TrackLane
      v-for="(horse, index) in horseList"
      :key="horse.id"
      :horse="horse"
      :index="index"
      :distance="distance"
      @onRaceFinish="onRaceFinish"
    />
  </div>
</template>

<style scoped>
.race-tracks {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  border-right: 3px solid #b12e2e;
}
</style>
