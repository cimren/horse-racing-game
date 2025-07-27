<script setup lang="ts">
defineProps<{
  label?: string
  name?: string
  disabled?: boolean
}>()
</script>
<template>
  <button class="app-button" :name="name" :disabled="disabled">{{ label }}</button>
</template>
<style scoped>
.app-button {
  background-color: var(--color-button-primary);
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
