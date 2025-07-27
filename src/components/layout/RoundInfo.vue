<script setup lang="ts">
defineProps<{
  name: string
  distance: number
}>()
</script>

<template>
  <div class="round-info">
    <p>{{ name }} {{ distance }}m</p>
  </div>
</template>

<style scoped>
.round-info {
  text-align: center;
  color: #b12e2e;
}
.round-info p {
  font-weight: bold;
}
</style>
