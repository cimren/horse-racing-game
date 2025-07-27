<script setup lang="ts">
import HorseObject from '@/components/game/HorseObject.vue'
import type { HorseData } from '@/utils/interfaces'

defineProps<{
  horse: HorseData
  gateNumber: number
  distance: number
}>()

const emit = defineEmits(['onRaceFinish'])
</script>

<template>
  <div class="track">
    <div class="gate">
      <span>{{ gateNumber }}</span>
    </div>
    <div class="lane">
      <HorseObject
        :horse="horse"
        :distance="distance"
        @onRaceFinish="emit('onRaceFinish', horse)"
      />
    </div>
  </div>
</template>

<style scoped>
.track {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.gate {
  width: 26px;
  height: 50px;
  background-color: var(--color-background-green);
  border: 1px solid var(--vt-c-white);
  position: relative;
  text-align: center;
}
.gate span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  color: var(--vt-c-white);
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
</style>
