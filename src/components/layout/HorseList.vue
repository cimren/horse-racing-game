<script setup lang="ts">
import AppTable from '../ui/AppTable.vue'
import { horseData } from '@/utils/constants'

const columns = [
  { columnName: 'name', label: 'Name' },
  { columnName: 'condition', label: 'Condition' },
  { columnName: 'color', label: 'Color' },
]
</script>
<template>
  <div class="horse-list">
    <AppTable :title="`Horse List 1 - ${horseData.length}`" :columns="columns" :rows="horseData" />
  </div>
</template>
<style scoped>
.horse-list {
  margin-top: 20px;
  height: 600px;
  overflow-y: auto;
}
</style>
