<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  label?: string
}>()
</script>
<template>
  <button class="app-button">{{ label }}</button>
</template>
<style scoped>
.app-button {
  background-color: #9ed7cb;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
