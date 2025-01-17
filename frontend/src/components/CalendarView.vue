<template>
    <div class="calendar-container">
        <FullCalendar ref="calendarRef" style="width: 100%; height: 100%;" :options="calendarOptions" />
    </div>
</template>
  
<script setup lang="ts">
import type { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/vue3';
import { computed, onMounted, useTemplateRef, watch } from 'vue';
import { useShiftStore } from '../stores/shiftStore';

const store = useShiftStore();
const calendarRef = useTemplateRef<typeof FullCalendar>('calendarRef')

// Transform shifts into FullCalendar event format
const calendarEvents = computed(() =>
    store.shifts
);

watch(store.shifts, () => {
    (calendarRef.value?.getApi() as Calendar).refetchEvents()
})

onMounted(() => {
    const calendar = (calendarRef.value?.getApi() as Calendar)
    store.listShifts(calendar.getDate())
})

const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: (_, onSuccess, __) => {
        onSuccess(calendarEvents.value)
    }
}
</script>
  
<style scoped>
/* Calendar Container */
.calendar-container {
    width: 1200px;
    /* Set a max-width to prevent it from becoming too large */
    width: 1000px;
    /* Set a max-width to prevent it from becoming too large */
    margin: 20px auto;
    padding: 20px;
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* FullCalendar custom styles */
.fc {
    border-radius: 8px;
    overflow: hidden;
}

.fc-toolbar {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2#fc-dom-1 {
    color: #6fff00;
}

.fc-toolbar button {
    background-color: #45a049;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    padding: 6px 12px;
    margin-left: 5px;
    transition: background-color 0.3s;
}

.fc-toolbar button:hover {
    background-color: #388e3c;
}

.fc-daygrid-day-number {
    font-weight: bold;
}

.fc-daygrid-event {
    border-radius: 4px;
    padding: 5px;
    font-size: 0.9rem;
    color: #fff;
}

.fc-daygrid-day {
    min-height: 80px;
    border: 1px solid #e0e0e0;
}

.fc-daygrid-day-top {
    padding: 8px;
}

/* Event background color */
.fc-event {
    background-color: #4CAF50;
    color: white;
    border-radius: 4px;
    padding: 5px;
    font-size: 0.9rem;
}
</style>
  