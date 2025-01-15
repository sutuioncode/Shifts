<script setup lang="ts">
import ListShifts from './components/ShiftsList.vue'
import CreateShiftForm from './components/CreateShiftForm.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const pinia = createPinia()
const app = createApp(this)
app.use(pinia)
</script>

<template>
  <ListShifts  />
  <CreateShiftForm />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
