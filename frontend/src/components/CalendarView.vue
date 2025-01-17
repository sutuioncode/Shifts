<template>
    <FullCalendar ref="calendarRef" :options="calendarOptions" />
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

console.log(calendarEvents.value)
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

        onSuccess(
            calendarEvents.value
        )

    }
}


</script>