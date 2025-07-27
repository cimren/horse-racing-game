<script setup lang="ts">
import { computed } from 'vue'
import type { TableColumn, TableRow, TableSize } from '@/utils/interfaces'

const props = defineProps({
  title: {
    type: String,
    default: 'Table',
  },
  size: {
    type: String as () => TableSize,
    default: 'Default',
  },
  columns: {
    type: Array<TableColumn>,
    required: true,
  },
  rows: {
    type: Array<TableRow>,
    required: true,
  },
})

const smallClass = computed(() => ({
  small: props.size === 'Small',
}))
</script>

<template>
  <div :class="['app-table', smallClass]">
    <h2>{{ title }}</h2>
    <table v-show="rows.length > 0">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(header, colIndex) in columns" :key="colIndex">
            {{ row[header.columnName] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.app-table {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  height: max-content;
}
.app-table h2 {
  margin: 0;
  padding: 10px;
  background-color: var(--color-background-pink);
  color: var(-);
  text-align: center;
}
.app-table table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--vt-c-white);
}
.app-table th,
.app-table td {
  border: 1px solid var(--color-border-soft);
  padding: 8px;
  text-align: center;
}
.app-table th {
  background-color: var(--color-background-pink-dark);
}
.small td {
  font-size: 0.8rem;
  padding: 2px;
}
.small h2 {
  font-size: 0.8rem;
  padding: 5px;
}
</style>
