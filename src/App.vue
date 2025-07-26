<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import HorseList from '@/components/layout/HorseList.vue'
import RaceArea from '@/components/layout/RaceArea.vue'
import ResultArea from '@/components/layout/ResultArea.vue'
</script>

<template>
  <AppHeader />

  <main>
    <HorseList />
    <RaceArea />
    <ResultArea />
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: space-between;
}
</style>
