<script setup lang="ts">
import type { Round, HorseData } from '@/utils/interfaces'
import AppTable from '../ui/AppTable.vue'
import { computed } from 'vue'

const props = defineProps<{
  round: Round
  type: 'program' | 'result'
}>()

const columns = [
  { columnName: 'position', label: 'Position' },
  { columnName: 'name', label: 'Name' },
]

const title = computed(() => `${props.round.name} - ${props.round.distance}m`)

const rows = computed(() => {
  const sourceList = props.type === 'program' ? props.round.horseList : props.round.resultList
  return (
    sourceList?.map((horse: HorseData, index: number) => ({
      position: index + 1,
      name: horse.name,
    })) ?? []
  )
})
</script>

<template>
  <AppTable :title="title" size="Small" :columns="columns" :rows="rows" />
</template>
